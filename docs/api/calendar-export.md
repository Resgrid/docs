---
sidebar_position: 6
---

# Calendar Export API

The Calendar Export API provides endpoints for exporting calendar events as iCalendar (`.ics`) files and managing calendar feed subscriptions. These endpoints are part of the v4 API and are served by the `CalendarExportController`.

## Endpoints Overview

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `v4/CalendarExport/ExportICalFile` | GET | Bearer token | Download a single event as `.ics` |
| `v4/CalendarExport/ExportDepartmentICalFeed` | GET | Bearer token | Download full department calendar as `.ics` |
| `v4/CalendarExport/GetCalendarSubscriptionUrl` | GET | Bearer token | Get or activate the calendar subscription URL |
| `v4/CalendarExport/RegenerateCalendarSubscriptionUrl` | POST | Bearer token | Regenerate the subscription URL (invalidates old) |
| `v4/CalendarExport/CalendarFeed/{token}` | GET | Anonymous | Fetch the iCal feed via encrypted token |

## Export Single Event

```
GET /api/v4/CalendarExport/ExportICalFile?calendarItemId={id}
Authorization: Bearer {access_token}
```

Returns a single calendar event as a `.ics` file with content type `text/calendar`.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `calendarItemId` | int | Yes | The ID of the calendar item to export |

### Response

- **Content-Type:** `text/calendar`
- **Content-Disposition:** attachment with `.ics` filename
- Body contains a valid iCalendar file with a single `VEVENT`

## Export Department Calendar

```
GET /api/v4/CalendarExport/ExportDepartmentICalFeed
Authorization: Bearer {access_token}
```

Returns all calendar events for the authenticated user's department as a single `.ics` file.

### Response

- **Content-Type:** `text/calendar`
- Body contains a valid iCalendar file with multiple `VEVENT` entries

## Get Calendar Subscription URL

```
GET /api/v4/CalendarExport/GetCalendarSubscriptionUrl
Authorization: Bearer {access_token}
```

Returns the user's calendar subscription URL. If the user has not yet activated calendar sync, it is activated automatically and a new subscription URL is generated.

### Response

```json
{
  "Data": {
    "SubscriptionUrl": "https://api.resgrid.com/api/v4/CalendarExport/CalendarFeed/{encrypted_token}",
    "WebCalUrl": "webcal://api.resgrid.com/api/v4/CalendarExport/CalendarFeed/{encrypted_token}",
    "IsActive": true
  },
  "Status": "success"
}
```

## Regenerate Calendar Subscription URL

```
POST /api/v4/CalendarExport/RegenerateCalendarSubscriptionUrl
Authorization: Bearer {access_token}
```

Generates a new sync key, invalidating all previously issued subscription URLs for this user.

### Response

```json
{
  "Data": {
    "SubscriptionUrl": "https://api.resgrid.com/api/v4/CalendarExport/CalendarFeed/{new_encrypted_token}",
    "WebCalUrl": "webcal://api.resgrid.com/api/v4/CalendarExport/CalendarFeed/{new_encrypted_token}",
    "IsActive": true
  },
  "Status": "success"
}
```

:::warning
Regenerating the subscription URL immediately invalidates the previous URL. Any external calendar application using the old URL will no longer receive updates.
:::

## Calendar Feed (Anonymous)

```
GET /api/v4/CalendarExport/CalendarFeed/{token}
```

This endpoint does **not** require a Bearer token. Authentication is performed via the encrypted token embedded in the URL. This is the endpoint that external calendar applications (Google Calendar, Outlook, Apple Calendar) call to fetch events.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | string | Yes | URL-safe Base64-encoded encrypted token |

### Response

- **200 OK** — Content-Type `text/calendar` with the full department iCal feed
- **401 Unauthorized** — Token is invalid, expired, or the sync key has been regenerated

### Token Format

The encrypted token contains `{departmentId}|{userId}|{calendarSyncToken}` encrypted via the system's `IEncryptionService`. The token is made URL-safe using Base64 URL-safe encoding (`+` → `-`, `/` → `_`, trailing `=` trimmed).

On each request, the system:
1. Decodes and decrypts the token
2. Extracts the department ID, user ID, and sync GUID
3. Loads the user profile and validates that `CalendarSyncToken` matches the embedded GUID
4. If valid, generates and returns the department calendar feed

### Feature Flag

The feed endpoint respects the `CalendarConfig.ICalFeedEnabled` configuration flag. When disabled, the endpoint returns an error response.

## iCal Output Format

All iCal output conforms to **RFC 5545** and is generated using the `Ical.Net` library.

### Event Mapping

| Calendar Item Field | iCal Property | Notes |
|---------------------|---------------|-------|
| Title | `SUMMARY` | |
| Description | `DESCRIPTION` | |
| Location | `LOCATION` | |
| Start | `DTSTART` | `VALUE=DATE` format when all-day |
| End | `DTEND` | `VALUE=DATE` format when all-day; exclusive (day after last event day) |
| IsAllDay | `DTSTART`/`DTEND` format | Date-only vs. date-time |
| Reminder | `VALARM` | `TRIGGER` based on `GetMinutesForReminder()` |
| Attendees | `ATTENDEE` | Only if populated |

### All-Day and Multi-Day Events

- **All-day events** use `VALUE=DATE` format (no time component) per RFC 5545
- **Multi-day all-day events** set `DTEND` to one day after the last event day (iCal standard uses exclusive end dates for all-day events)
- **Timed events** use full date-time format with UTC offset

### Recurrences

Each materialized recurrence instance is emitted as a separate `VEVENT`. No `RRULE` properties are used because Resgrid pre-expands recurrences in the database.

### PRODID

The `PRODID` value is configurable via `CalendarConfig.ICalProductId` (default: `-//Resgrid//Calendar//EN`).

## Calendar Items API Enhancement

The existing `GetAllCalendarItems` v4 API endpoint response now includes an `IsMultiDay` boolean property on each calendar item, indicating whether the event spans multiple days (where `Start.Date != End.Date`).

### Updated Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `IsMultiDay` | boolean | `true` if the event spans more than one day |
| `IsAllDay` | boolean | `true` if the event is an all-day event (existing field) |

## FullCalendar JSON Enhancement

The `GetV2CalendarEntriesForCal` endpoint (used by the web calendar view) now includes:

| Field | Type | Description |
|-------|------|-------------|
| `allDay` | boolean | `true` for all-day events; enables FullCalendar banner rendering |

For all-day events, the `end` date is set to one day after the last event day to match FullCalendar's exclusive end-date convention.
