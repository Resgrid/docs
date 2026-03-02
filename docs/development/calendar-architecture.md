---
sidebar_position: 4
---

# Calendar System Architecture

This reference document describes the internal architecture of the Resgrid calendar system, including all-day and multi-day event handling, iCal export, calendar feed subscriptions, and the data model.

## Data Model

### CalendarItem

The `CalendarItem` entity is the core model stored in the `CalendarItems` table. All changes in this enhancement are **backwards-compatible** with the existing table schema.

| Property | Type | Description |
|----------|------|-------------|
| `Title` | string | Event name |
| `Start` | DateTime | Event start (always populated; auto-normalized for all-day events) |
| `End` | DateTime | Event end (always populated; auto-normalized for all-day events) |
| `IsAllDay` | bool | Whether the event is an all-day event |
| `Description` | string | Event description |
| `Location` | string | Event location |
| `RecurrenceType` | int | Recurrence schedule (none, weekly, monthly, yearly) |
| `RecurrenceEnd` | DateTime? | When recurrence stops |
| `Reminder` | int | Reminder type |
| `Attendees` | string | Event attendees |

#### IsMultiDay() Helper

A `[NotMapped]` pure helper method on `CalendarItem`:

```csharp
public bool IsMultiDay() => Start.Date != End.Date;
```

This is used by the UI and API to determine display formatting without additional database queries.

### UserProfile — CalendarSyncToken

A new nullable column on the `UserProfiles` table stores the per-user calendar sync GUID:

| Column | Type | Max Length | Nullable | Description |
|--------|------|-----------|----------|-------------|
| `CalendarSyncToken` | string | 128 | Yes | GUID for validating iCal feed subscription tokens |

**Migration:** `M0047_AddingCalendarSyncToken` (SQL Server) and `M0047_AddingCalendarSyncTokenPg` (PostgreSQL).

No new repository or DI registrations are required — `UserProfile` is managed by the existing `IUserProfilesRepository` with Dapper `SaveOrUpdate`. The new column is a nullable string on the existing entity.

## All-Day Event Normalization

When `IsAllDay` is `true`, the service layer automatically normalizes the `Start` and `End` times:

| Field | Normalized Value | Purpose |
|-------|-----------------|---------|
| `Start` | `Start.Date` (midnight 00:00:00) | Ensures consistent date boundary |
| `End` | `End.Date.AddDays(1).AddTicks(-1)` (23:59:59.9999999) | Ensures the event covers the full end date |

This normalization is applied in:
- `CalendarService.AddNewCalendarItemAsync` — after the existing UTC conversion block
- `CalendarService.UpdateCalendarItemAsync` — same location
- `CalendarItem.CreateRecurranceItem` — when generating recurrence children

The `[Required]` attributes on `Start` and `End` are preserved — they are always populated. The "no time required" behavior is purely a UI/service-layer concern.

## Calendar Sync Token System

### Token Generation Flow

1. User clicks **Activate Calendar Sync** in the web UI
2. `CalendarService.ActivateCalendarSyncAsync` generates a new GUID
3. The GUID is saved to `UserProfile.CalendarSyncToken`
4. An encrypted token payload is created: `"{departmentId}|{userId}|{calendarSyncToken}"`
5. The payload is encrypted via `IEncryptionService.Encrypt()`
6. The encrypted bytes are encoded as URL-safe Base64 (`+` → `-`, `/` → `_`, trailing `=` trimmed)
7. The full subscription URL is returned to the user

### Token Validation Flow

1. External calendar app requests `CalendarFeed/{token}`
2. Token is decoded from URL-safe Base64
3. Token is decrypted via `IEncryptionService`
4. Payload is split into `departmentId`, `userId`, and `calendarSyncToken`
5. `UserProfile` is loaded and `CalendarSyncToken` is compared
6. If the GUID matches, the department iCal feed is generated and returned
7. If the GUID does not match (e.g., user regenerated the key), 401 is returned

### Token Regeneration

`RegenerateCalendarSyncAsync` overwrites the existing GUID with a new one, instantly invalidating all previously issued subscription URLs.

## iCal Export Service

The `CalendarExportService` (implementing `ICalendarExportService`) generates standard RFC 5545 iCalendar output using the `Ical.Net` NuGet package.

### Service Methods

| Method | Description |
|--------|-------------|
| `GenerateICalForItemAsync(int calendarItemId)` | Single `VEVENT` as `.ics` string |
| `GenerateICalForDepartmentAsync(int departmentId)` | Full department calendar as `.ics` with all items |

### Event Mapping Rules

| CalendarItem | Ical.Net CalendarEvent | Notes |
|--------------|----------------------|-------|
| `Title` | `Summary` | |
| `Description` | `Description` | |
| `Location` | `Location` | |
| `Start` | `DtStart` | `CalDateTime` with date-only when `IsAllDay` |
| `End` | `DtEnd` | Date-only + 1 day (exclusive) when all-day |
| `IsAllDay` | `IsAllDay` | Emits `VALUE=DATE` in output |
| `Reminder` | `Alarms` (VALARM) | Trigger from `GetMinutesForReminder()` |
| `Attendees` | `Attendees` | Only if populated |

### Recurrence Handling

Each materialized recurrence instance is emitted as a separate `VEVENT`. No `RRULE` properties are used because Resgrid pre-expands recurrences in the database. The `IsAllDay` flag is propagated to recurrence children.

### Registration

`CalendarExportService` is registered as `ICalendarExportService` in `ServicesModule.cs`.

## Configuration

Calendar-specific config values are stored in `CalendarConfig.cs` in the `Resgrid.Config` project, following existing patterns:

```csharp
public static class CalendarConfig
{
    /// <summary>Feature flag to enable/disable the external iCal feed endpoint.</summary>
    public static bool ICalFeedEnabled = true;

    /// <summary>PRODID value used in generated iCal files.</summary>
    public static string ICalProductId = "-//Resgrid//Calendar//EN";

    /// <summary>How long (in minutes) a feed response can be cached by the subscribing client.</summary>
    public static int ICalFeedCacheDurationMinutes = 15;
}
```

These values can be overridden via `ResgridConfig.json` like all other config classes (handled by `ConfigProcessor`).

## FullCalendar Upgrade (v3 → v6)

The web calendar UI is upgraded from FullCalendar v3 to FullCalendar v6:

| Aspect | v3 (Old) | v6 (New) |
|--------|----------|----------|
| API | jQuery plugin (`$('#calendar').fullCalendar({...})`) | Vanilla JS (`new FullCalendar.Calendar(el, {...})`) |
| Library | Single `fullcalendar` package | `@fullcalendar/core`, `daygrid`, `timegrid`, `interaction`, `list` |
| CSS | `fullcalendar.print.min.css` | FullCalendar 6 CSS bundles |
| All-day rendering | Manual handling | Native support via `allDay: true` in event JSON |
| Multi-day rendering | Limited | Native continuous banner rendering |

### FullCalendar JSON Changes

The `GetV2CalendarEntriesForCal` endpoint now includes:
- `allDay` boolean property (set from `IsAllDay`)
- For all-day events, `end` is set to `End.Date.AddDays(1)` (FullCalendar uses exclusive end dates)

## Localization

All new user-facing strings use the existing `IStringLocalizer` / `.resx` localization system. New keys are added to `Calendar.en.resx` and `Calendar.es.resx`:

| Key | English | Spanish |
|-----|---------|---------|
| `AllDayEvent` | All Day Event | Evento de todo el día |
| `DateRange` | {0} – {1} | {0} – {1} |
| `DownloadIcs` | Download .ics | Descargar .ics |
| `SubscribeCalendar` | Subscribe to Calendar | Suscribirse al calendario |
| `CalendarSyncTitle` | Calendar Sync | Sincronización de calendario |
| `CalendarSyncDescription` | Subscribe to your department calendar in Google Calendar, Microsoft Outlook, Apple Calendar, or any application that supports iCal feeds. | Suscríbase al calendario de su departamento en Google Calendar, Microsoft Outlook, Apple Calendar o cualquier aplicación que admita fuentes iCal. |
| `ActivateCalendarSync` | Activate Calendar Sync | Activar sincronización de calendario |
| `RegenerateCalendarSync` | Regenerate Sync Key | Regenerar clave de sincronización |
| `CalendarSyncActivateHelp` | To sync your department calendar with an external calendar application, you must first activate calendar sync. This generates a unique subscription URL. If the URL is compromised, you can regenerate it to invalidate the old one. | Para sincronizar el calendario de su departamento con una aplicación de calendario externa, primero debe activar la sincronización del calendario. Esto genera una URL de suscripción única. Si la URL se ve comprometida, puede regenerarla para invalidar la anterior. |
| `CopyToClipboard` | Copy to Clipboard | Copiar al portapapeles |
| `SubscriptionUrl` | Subscription URL | URL de suscripción |
| `WebCalLink` | Open in Calendar App | Abrir en aplicación de calendario |
| `CalendarSyncActive` | Calendar sync is active. Use the URL below to subscribe. | La sincronización de calendario está activa. Use la URL a continuación para suscribirse. |
| `CalendarSyncInactive` | Calendar sync is not yet activated. Click the button below to generate your subscription URL. | La sincronización del calendario aún no está activada. Haga clic en el botón a continuación para generar su URL de suscripción. |

## New and Modified Files Summary

### New Files

| File | Description |
|------|-------------|
| `CalendarConfig.cs` | Calendar-specific configuration values |
| `ICalendarExportService.cs` | Interface for iCal generation |
| `CalendarExportService.cs` | iCal generation implementation using Ical.Net |
| `CalendarExportController.cs` | v4 API controller for export and feed endpoints |
| `M0047_AddingCalendarSyncToken.cs` | SQL Server migration for UserProfiles column |
| `M0047_AddingCalendarSyncTokenPg.cs` | PostgreSQL migration for UserProfiles column |
| `CalendarExportServiceTests.cs` | Unit tests for iCal export |

### Modified Files

| File | Changes |
|------|---------|
| `CalendarItem.cs` | Added `IsMultiDay()` helper method |
| `UserProfile.cs` | Added `CalendarSyncToken` property |
| `ICalendarService.cs` | Added sync token management methods |
| `CalendarService.cs` | All-day normalization, sync token implementation |
| `ServicesModule.cs` | Registered `CalendarExportService` |
| `CalendarController.cs` (web) | All-day normalization, sync actions, view model updates |
| `CalendarController.cs` (v4 API) | Added `IsMultiDay` to calendar item results |
| `CalendarItemV2Json.cs` | Added `allDay` property |
| `GetAllCalendarItemResult.cs` | Added `IsMultiDay` property |
| `IndexView.cs` | Added `CalendarSyncToken` and `CalendarSubscriptionUrl` |
| `CalendarItemView.cs` | Added `ExportIcsUrl` |
| `Index.cshtml` | Calendar sync subscription panel |
| `View.cshtml` | All-day display, multi-day date range, .ics download |
| `New.cshtml` / `Edit.cshtml` | All-day date-only picker UX |
| `resgrid.calendar.index.js` | Rewritten for FullCalendar v6 API |
| `resgrid.calendar.newEntry.js` | All-day toggle hides time pickers |
| `_UserLayout.cshtml` | FullCalendar v6 CSS/JS references |
| `libman.json` | FullCalendar v6 library references |
| `Calendar.en.resx` / `Calendar.es.resx` | New localization keys |
| `CalendarServiceTests.cs` | Expanded with all-day, multi-day, sync token tests |

## Backwards Compatibility

All changes are backwards-compatible:
- The `CalendarItems` table schema is unchanged — no migration needed for calendar data
- The `UserProfiles` table gains a single nullable column — existing rows are unaffected
- Existing API contracts are additive only (new properties, new endpoints)
- The `IsAllDay` normalization only activates when `IsAllDay` is `true`; existing events with `IsAllDay = false` are not modified
- The FullCalendar v6 upgrade maintains the same data source URL (`GetV2CalendarEntriesForCal`)
