---
sidebar_position: 12
title: Calendar
---

# Calendar

The Calendar module provides event scheduling, RSVP management, and recurring event support. It is managed by the `CalendarController`.

## Calendar View

**Authorization:** `Schedule_View` policy

The main calendar view displays:
- All department calendar events
- Color-coded by event type
- IANA timezone conversion for proper display
- Upcoming items list

## Creating Events

**Authorization:** `Schedule_Create` policy

### Event Fields

| Field | Required | Description |
|-------|----------|-------------|
| Title | Yes | Event name |
| Description | No | Event description (HTML supported, sanitized on display) |
| Start Date/Time | Yes | Event start (defaults to now + 3 hours) |
| End Date/Time | Yes | Event end (defaults to now + 4 hours) |
| Location | No | Event location (geocodable for map display) |
| Item Type | No | Event category/type |
| Entities | No | Target department or specific groups |

### Validation
- Start date must be before end date
- Recurrence end date validated if recurrence is set

### Recurrence

Events can recur on these schedules:
- **Weekly** — Repeats every week
- **Monthly** — Repeats every month
- **Yearly** — Repeats every year

Recurring events have a recurrence end date.

### Notifications
Event creation triggers a notification delivery to relevant personnel. Fires `CalendarEventAddedEvent`.

## Editing Events

**Authorization:** `Schedule_Update` policy + `CanUserModifyCalendarEntry` runtime check

Only department admins and the original event creator can modify events.

Fires `CalendarEventUpdatedEvent`.

## Deleting Events

**Authorization:** `Schedule_Delete` policy

### Single Event Deletion
Deletes a single calendar item after department ownership validation.

### Recurring Event Deletion
The `DeleteAllCalendarItems` action deletes a calendar item **and all its recurrences**. Requires `CanUserModifyCalendarEntry` check.

## RSVP / Signup

**Authorization:** `Schedule_View` policy

Personnel can RSVP to events:
- Sign up with an optional note
- RSVP type set to `CalendarItemAttendeeTypes.RSVP`

### Removing RSVP
The `RemoveFromEvent` action removes an attendee from a calendar event.

## Calendar Types

Calendar item types provide categorization and color coding.

### Managing Types
| Action | Authorization | Description |
|--------|---------------|-------------|
| View Types | `Schedule_View` | List all item types |
| Create Type | `Schedule_Create` | New type (validates name uniqueness) |
| Edit Type | `Schedule_Create` | Modify type (validates department ownership) |
| Delete Type | `Schedule_Create` | Remove type (validates department ownership) |

## Calendar Data Formats

### FullCalendar v2 Format
The `GetV2CalendarEntriesForCal` endpoint returns events in FullCalendar-compatible JSON format:
- Start/end times in ISO format
- Type-based background colors
- URL links to event detail pages
- Admin/creator flags for edit permissions

### Calendar Items JSON
The `GetDepartmentCalendarItems` endpoint returns all items with:
- Time zone-converted timestamps
- Recurrence parent validity check
- `IsAdminOrCreator` flag for permissions

## Map Integration

The `GetMapDataForItem` endpoint geocodes a calendar item's location and returns lat/lon coordinates for map display.

## Data Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GetDepartmentCalendarItems` | All calendar items as JSON |
| `GetV2CalendarEntriesForCal` | FullCalendar v2 format events |
| `GetDepartmentCalendarItemTypes` | Item types (includes "None" default) |
| `GetDepartmentEnitites` | Department + groups as entities for targeting |
| `GetMapDataForItem` | Geocoded coordinates for event location |

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Groups** | Events can target specific groups |
| **Department** | Timezone affects all time displays |
| **Mapping** | Event locations can be geocoded and displayed on maps |
| **Notifications** | Event creation/update triggers notifications |
| **Department Settings** | Module can be enabled/disabled |
