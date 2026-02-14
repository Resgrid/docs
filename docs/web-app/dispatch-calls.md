---
sidebar_position: 4
title: Dispatch & Calls
---

# Dispatch & Calls

The Dispatch module is the core operational component of Resgrid, handling call creation, dispatch, management, and lifecycle. It is managed by the `DispatchController` and is one of the most complex areas of the application.

## Overview

The dispatch workflow follows this lifecycle:

```
New Call → Dispatch → Active → Update/Notes → Close → Archive
```

## Call Dashboard

The main dispatch dashboard displays:
- All currently active calls with priority coloring
- Map centered on the department's configured location (GPS coordinates or geocoded address)
- Quick access to create new calls, view archived calls, and call analytics

## Creating a New Call

**Authorization:** `Call_Create` policy + `CanUserCreateCall` runtime check

### Required and Optional Fields

| Field | Required | Description |
|-------|----------|-------------|
| Call Name | Yes | Short title for the call |
| Call Nature | Yes | Description of the incident |
| Call Type | No | Classification type (Fire, EMS, etc.) |
| Call Priority | No | Urgency level (with custom priorities supported) |
| Address/Location | No | Incident address, GPS coordinates, or What3Words |
| Dispatch To | No | Personnel, groups, units, and/or roles to dispatch |
| Call Notes | No | Initial notes for the call |
| Protocols | No | Attach dispatch protocols |
| Linked Calls | No | Reference related calls |
| Contacts | No | Attach relevant contacts |
| Form Data | No | Custom form data |

### Dispatch Targets

Calls can be dispatched to multiple target types simultaneously:

| Target Type | Description |
|-------------|-------------|
| **Individual Users** | Specific personnel by ID |
| **Groups** | All members of a station/group |
| **Roles** | All personnel with a specific role |
| **Units** | Specific units (apparatus/vehicles) |

### Shift-Based Dispatch

When the department setting **"Dispatch Shift Instead of Group"** is enabled:
1. Group dispatch targets are intercepted
2. Instead of dispatching all group members, the system looks up who is signed up for the current day's shift
3. Only shift personnel are dispatched
4. If **"Auto-Set Status for Shift Dispatch"** is enabled, dispatched shift personnel are automatically set to a configurable status (default: RespondingToScene)

### Call Broadcast Pipeline

After a call is saved:
1. The call is persisted to the database
2. A `CallAddedEvent` is fired through the event aggregator
3. The call is enqueued via `IQueueService.EnqueueCallBroadcastAsync`
4. The queue processor sends push notifications, SMS, and email to all dispatched personnel

### Location Handling

The system supports multiple location input methods:
- **Direct address** — Street address that gets geocoded
- **GPS coordinates** — Latitude/longitude pairs
- **What3Words** — Three-word location codes resolved via the W3W API
- **Reverse geocoding** — If only coordinates are provided, the system can look up the address

## Updating a Call

**Authorization:** `Call_Update` policy + `CanUserEditCall` runtime check

Updating a call supports:
- Modifying call details (name, nature, type, priority, location)
- Adding or removing dispatch targets (diff-based — only changes are applied)
- Updating linked calls and contacts
- Updating protocols
- **Rebroadcast option** — Optionally re-send notifications to all dispatched personnel

Changes fire a `CallUpdatedEvent`.

## Closing a Call

**Authorization:** `Call_Update` policy + `CanUserCloseCall` runtime check

When closing a call:
- Set a close state (Cancelled, Completed, etc.)
- Add closing notes
- A `CallClosedEvent` is fired

## Re-Opening a Call

Previously closed calls can be re-opened, which fires a `CallUpdatedEvent`.

## Deleting a Call

**Authorization:** `Call_Delete` policy + `CanUserDeleteCall` runtime check

Calls are **soft-deleted**:
- `IsDeleted` flag set to `true`
- `DeletedOn` timestamp recorded
- `DeletedByUserId` recorded
- `DeletedReason` stored (optional reason text)

## Call Notes

### Adding Notes
Any user with `Call_View` permission can add notes to a call. Notes include:
- Text content
- Source indicator (Web, Mobile, etc.)
- Timestamp
- User location at time of posting

### Flagging Notes
Notes can be flagged/unflagged with a reason by users with `Call_Update` permission.

### Viewing Notes
The `GetCallNotes` endpoint returns all notes for a call with:
- Note text and source
- User's full name
- Timestamp (department timezone-converted)
- Location coordinates
- Flag status and reason

## File Attachments

Files can be attached to calls:

| Constraint | Value |
|-----------|-------|
| Maximum file size | 10 MB |
| Supported image types | jpg, jpeg, png, gif, bmp |
| Supported document types | pdf, doc, docx, ppt, pptx, xls, xlsx, txt |
| Supported audio types | mp3, m4a, ogg, wav |
| Supported video types | mp4, m4v, mov, wmv, avi, mpg |

## Call Export

### Authenticated Export
The `CallExport` action provides a comprehensive call export including:
- Full call details
- Work logs
- Unit states
- Action logs
- Group information
- Child/linked calls
- Contacts

### Anonymous Export
The `CallExportEx` endpoint supports **anonymous access** via encrypted Base64 query parameters. This enables:
- External sharing of call information
- Integration with external systems
- Station routing display

### PDF Export
The `CallExportPdf` endpoint generates a PDF document from the call export HTML. It:
1. Fetches the HTML from `CallExportEx`
2. Strips script tags
3. Converts to PDF via `IPdfProvider`

## Adding Archived Calls

Historical calls can be created retroactively:
- Custom `LoggedOn` date
- Pre-set call state (already closed)
- Optional **call number recalculation** for the year
- Useful for importing historical data or logging calls that happened outside the system

## Call Audio

Calls with audio attachments (dispatch audio) can be retrieved as `audio/mpeg` streams.

## Analytics & Reporting

### Year-to-Date Calls
Groups calls by week and type for the current year.

### Calls by Type in Range
Call type distribution within a specified date range.

### Calls by State in Range
Call state distribution within a specified date range.

## Chat

The dispatch area includes a chat view for real-time communication with department/user identification.

## Data Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GetActiveCallsForGrid` | Active calls data for grid display |
| `GetAllCallsForGrid` | All calls data for grid display |
| `GetActiveCallsList` | Active calls with permissions and priority colors |
| `GetArchivedCallsList` | Closed calls filtered by year |
| `GetCallById` | Single call data |
| `GetPersonnelForCall` | Personnel with dispatch status for a call |
| `GetAllDispatchesForCall` | All dispatch codes for a call |
| `GetMapDataForCall` | Map center and marker data |
| `GetCallTypes` | Department call types |
| `GetCallPriorities` | Active call priorities |
| `GetCallsForSelectList` | Recent calls for dropdown (last 14 days) |
| `GetCoordinatesFromW3W` | What3Words to GPS conversion |
| `GetAlertNotesForContact` | Alert-flagged contact notes |

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Groups** | Dispatch to station groups |
| **Units** | Dispatch to units, unit state tracking |
| **Personnel** | Dispatch to individuals, status tracking |
| **Roles** | Dispatch to roles |
| **Shifts** | Shift-based dispatch substitution |
| **Protocols** | Protocol attachment and matching |
| **Forms** | Custom form data attachment |
| **Templates** | Quick call templates pre-fill form |
| **Contacts** | Link contacts to calls |
| **Custom Statuses** | Custom personnel and unit statuses |
| **Mapping** | Call location display on maps |
| **Logs** | Work logs reference calls |
| **Reports** | Call analytics and reports |
| **Queue** | Async notification broadcast |
