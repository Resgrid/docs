---
sidebar_position: 6
title: Units
---

# Units

Units represent vehicles, apparatus, equipment, or any tracked asset in the department. The Units module is managed by the `UnitsController`.

## Unit List

**Authorization:** `Unit_View` policy

The main index displays all units organized by group/station with:
- Unit name and type
- Current state (with custom state colors)
- Station assignment
- Tree-view sidebar for group filtering

**Visibility:** Unit visibility is governed by the `CanUserViewUnitViaMatrix` authorization check, which can restrict visibility based on group membership.

## Creating Units

**Authorization:** `Unit_Create` policy

### Unit Fields

| Field | Required | Description |
|-------|----------|-------------|
| Unit Name | Yes | Must be unique within the department |
| Unit Type | No | Classification (Engine, Ladder, Ambulance, etc.) |
| Station Group | No | Home station assignment |
| Custom State | No | Assign a custom unit state set |

### Unit Roles

Each unit can have defined roles (Driver, Officer, etc.):
- Role names must be unique within the unit
- Roles are used for staffing assignments

### Creation Process
1. Validates name uniqueness
2. Saves the unit and its roles
3. Creates a Novu subscriber (for push notifications)
4. Fires `AuditEvent` (UnitAdded) and `UnitAddedEvent`

## Editing Units

**Authorization:** `Unit_Update` policy + `CanUserModifyUnit` runtime check

Updates unit name, type, station group, and roles. Fires `AuditEvent` (UnitChanged).

## Deleting Units

**Authorization:** `Unit_Delete` policy + `CanUserModifyUnit` runtime check

Deletes a unit. Fires `AuditEvent` (UnitRemoved).

## Unit State Management

### Setting Unit State

Units have a current operational state that can be set through several methods:

| Method | Description |
|--------|-------------|
| `SetUnitState` | Set a single unit's state |
| `SetUnitStateWithDest` | Set state with a destination (call or station) |
| `SetUnitStateForMultiple` | Batch state change for multiple units (pipe-delimited IDs) |
| `SetUnitStateWithDestForMultiple` | Batch state + destination for multiple units |

### State Destinations

When setting a unit state, a destination type determines the context:

| Detail Type | Options |
|-------------|---------|
| None | No destination |
| Calls | Select from active calls |
| Stations | Select from station groups |
| CallsAndStations | Select from either calls or stations |

### Default Unit Statuses

If no custom unit states are defined:

| Status | Description |
|--------|-------------|
| Available | Ready for dispatch |
| Delayed | Available with delay |
| Unavailable | Not available |
| Committed | Currently committed |
| Out Of Service | Not operational |
| Responding | En route |
| On Scene | At incident |
| Staging | At staging area |
| Returning | Returning to station |
| Cancelled | Response cancelled |
| Released | Released from incident |
| Manual | Manual status |
| Enroute | En route to destination |

### Dynamic Status Dropdowns

The controller provides several endpoints for building dynamic status dropdowns:
- `GetUnitStatusHtmlForDropdown` — HTML options based on unit type's custom states
- `GetUnitStatusHtmlForDropdownByStateId` — HTML options by custom state ID
- `GetUnitStatusDestinationHtmlForDropdown` — Destination dropdown based on status detail type
- `GetUnitOptionsDropdown` — Full HTML dropdown menu with state options and destination sub-menus
- `GetUnitOptionsDropdownForStates` — Same for multiple units with a shared state

## Unit Staffing

**Authorization:** `Unit_View` policy

Unit staffing assigns personnel to specific unit roles:

### Viewing Staffing
Displays all units with their roles and currently assigned personnel.

### Updating Staffing
1. Select personnel for each role on each unit
2. On save, existing active role assignments are deleted
3. New `UnitActiveRole` entries are created from the form data

### Personnel Search for Staffing
The `GetPersonnelForUnitStaffingJson` endpoint supports search-as-you-type for finding personnel to assign, returning name, group, and role information.

## Unit Logs

### Creating Unit Logs
**Authorization:** `UnitLog_Create` policy

Add narrative log entries for a unit. The narrative text is HTML-decoded before storage.

### Viewing Unit Logs
**Authorization:** `UnitLog_View` policy

View all log entries for a specific unit.

## Unit Events & Tracking

### Viewing Events
**Authorization:** `Unit_View` policy

Displays unit state change events on a map with:
- Map centered on department coordinates
- OSM (OpenStreetMap) integration
- Custom state resolution for event labels

### Event Data
The `GetUnitEvents` endpoint returns:
- All unit state events
- Custom state name and color resolution
- Destination names (calls or stations resolved from IDs)
- GPS coordinates for map display

### Generating Event Reports
Select specific events to generate a report with:
- Event details and timestamps
- Resolved destination names (station names, call names)
- Timeline of unit activity

## ETA Calculation

When viewing units for a call, the system calculates **Estimated Time of Arrival**:
1. Gets the unit's last known GPS position
2. Uses `IGeoService.GetEtaInSecondsAsync` to calculate travel time to the call location
3. Displays ETA in the call dispatch grid

## Data Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GetUnits` | All units (id, name, type, station) |
| `GetUnitsForGroup` | Units for a specific group |
| `GetUnitsAndRolesForGroup` | Units with roles for a group |
| `GetUnitTypes` | Department unit types |
| `GetUnitsList` | Units with current state, color, timestamp |
| `GetUnitsForCallGrid` | Units with ETA to call location |
| `GetActivePersonnelForUnitStaffingRoleJson` | Currently assigned person for a unit role |

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Dispatch** | Units dispatched to calls |
| **Groups** | Units assigned to station groups |
| **Custom Statuses** | Custom unit state definitions |
| **Mapping** | Unit locations shown on maps |
| **Shifts** | Unit roles used in shift requirements |
| **Calls** | Unit destination can be a call |
| **Reports** | Unit state history reports |
| **Command** | Unit types used in command definitions |
| **Novu** | Push notification integration |
