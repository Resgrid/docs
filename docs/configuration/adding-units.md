---
sidebar_position: 17
---

# Adding Units

Units in Resgrid represent physical apparatus, vehicles, or teams that respond to calls. Examples include fire engines, ambulances, rescue trucks, command vehicles, or specialized teams. Each unit can have a type, be assigned to a station, have defined roles (positions), and maintain its own status independent of individual personnel.

## Why Adding Units Matters

Units are a core component of dispatch operations. When a call comes in, dispatchers often dispatch units rather than (or in addition to) individual personnel. Each unit tracks its own state (Available, Responding, On Scene, etc.), can be staffed with personnel in specific roles, and appears on maps with location tracking. Without properly configured units, dispatch operations, unit tracking, and resource management will not function.

## Scope

Units are department-wide. Each unit belongs to the department and can optionally be assigned to a station group. Unit states and staffing are visible to all personnel (subject to [Security and Permissions](permissions.md) settings).

## Creating a Unit

Navigate to **Units** and click **New Unit** to create a new unit.

### Unit Fields

| Field          | Required | Description                                                        |
| -------------- | -------- | ------------------------------------------------------------------ |
| Name           | Yes      | The unit name (must be unique within the department, e.g., "Engine 1") |
| Type           | No       | The unit type (from defined [Unit Types](types.md))                |
| Station Group  | No       | The station group the unit is assigned to ("No Station" if unassigned) |

:::warning Unique Unit Names
Each unit name must be unique within your department. Attempting to create a unit with a duplicate name will result in an error.
:::

### Unit Roles

When creating or editing a unit, you can define **roles** (positions) for the unit. Roles represent the positions that need to be staffed on the unit (e.g., Driver, Officer, Firefighter 1, Firefighter 2).

To add a role, click **Add Role** and enter the role name. Role names must be unique within the unit.

Unit roles serve two purposes:
1. **Staffing** — Personnel can be assigned to specific roles on a unit
2. **Dispatch** — When a unit is dispatched, personnel assigned to its roles can also be automatically notified (if configured in [Department Settings](department-settings.md))

## Unit Types

Unit Types are defined in [Department Types](types.md) and provide:
- A common classification for similar units
- A map icon for the unit on maps
- An association with [Custom Unit Statuses](custom-statuses.md)

If you want a unit to use custom status buttons (instead of the default unit statuses), you must:
1. Create Custom Unit Statuses in [Custom Statuses](custom-statuses.md)
2. Create a Unit Type in [Types](types.md) and assign the custom statuses to it
3. Assign that Unit Type to the unit

## Unit Staffing

Unit Staffing allows you to assign personnel to specific roles on a unit for a given time period. This tracks who is currently operating the unit.

Navigate to a unit and click **Staffing** to manage role assignments.

When a unit is staffed:
- The assigned personnel are tracked as being on that unit
- If "Unit Dispatch Also Dispatch to Assigned Personnel" is enabled in Department Settings, dispatching the unit will also notify assigned personnel
- Unit state changes can optionally cascade to assigned personnel statuses

## Unit States

Units have their own status tracking, separate from personnel statuses. By default, the following unit states are available:

| State           | Description                                           |
| --------------- | ----------------------------------------------------- |
| Available       | Unit is available to respond to calls                 |
| Delayed         | Unit is available but may have delayed response       |
| Unavailable     | Unit is not available                                 |
| Committed       | Unit is committed to an active call                   |
| Out Of Service  | Unit is out of service and cannot respond             |

Custom unit statuses can be configured via [Custom Statuses](custom-statuses.md) and assigned through [Unit Types](types.md).

### State Detail Types

Unit states can have detail types that determine what additional information can be selected when setting a state:

| Detail Type          | Description                                           |
| -------------------- | ----------------------------------------------------- |
| None                 | No additional detail required                         |
| Calls                | Select a call when setting this state                 |
| Stations             | Select a station when setting this state              |
| Calls and Stations   | Select either a call or station                       |

### Setting Unit State

Unit states can be set from:
- The Units page (single or bulk state changes)
- The Dispatch dashboard
- The Resgrid Unit mobile application
- Optionally, states can include a destination (call or station) and GPS coordinates

## Unit Event History

Each unit maintains a history of state changes. You can view the event history to see:
- What state the unit was in and when
- Who changed the state
- GPS coordinates at the time of the state change (if available)
- The state change displayed on a map

From the event history, you can:
- **Generate a Report** from selected events
- **Clear All Events** to reset the unit's history

## Unit Logs

Units can have narrative log entries added to them. Logs are free-text entries that record significant events, maintenance notes, or operational details.

| Field      | Required | Description                           |
| ---------- | -------- | ------------------------------------- |
| Narrative  | Yes      | The log entry text                    |

## Editing a Unit

Click on an existing unit to edit its name, type, station assignment, or roles. Changes take effect immediately.

## Deleting a Unit

Deleting a unit removes it from the department. This action is audited. Before deleting, consider:
- Active calls the unit may be assigned to
- Shift assignments that reference the unit
- Historical data that may reference the unit

## How Units Connect to Other Features

| Feature           | Connection                                                          |
| ----------------- | ------------------------------------------------------------------- |
| Dispatch          | Units are dispatched to calls; dispatching notifies assigned personnel |
| Custom Statuses   | Custom unit statuses are assigned via Unit Types                    |
| Types             | Unit Types define classification, map icons, and status associations |
| Groups/Stations   | Units are assigned to station groups                                |
| Mapping           | Units appear on maps with real-time location tracking               |
| Shifts            | Units can be part of shift configurations                           |
| Notifications     | Unit type availability alerts monitor unit counts                   |
| Department Settings | Dispatch settings control how unit dispatch interacts with personnel |

## Common Errors and Resolutions

| Error                                  | Resolution                                                          |
| -------------------------------------- | ------------------------------------------------------------------- |
| "Unit name already exists"             | Choose a unique unit name within the department                     |
| Duplicate role names on a unit         | Each role name must be unique within the unit                       |
| Custom statuses not appearing          | Assign a Unit Type with custom statuses; set the type on the unit   |
| Unit not showing on map                | Ensure the unit has reported a GPS location via status update       |
| Dispatching unit not notifying personnel | Enable "Unit Dispatch Also Dispatch to Assigned Personnel" in Department Settings |