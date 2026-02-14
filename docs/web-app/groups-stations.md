---
sidebar_position: 7
title: Groups & Stations
---

# Groups & Stations

Groups organize department personnel and serve as station locations. The module is managed by the `GroupsController`.

## Group List

**Authorization:** `GenericGroup_View` policy

The index page displays all department groups with the option to create new groups (subject to plan limits via `CanDepartmentAddNewGroup`).

## Creating Groups

**Authorization:** `GenericGroup_Create` policy

### Group Fields

| Field | Required | Description |
|-------|----------|-------------|
| Group Name | Yes | Display name for the group |
| Group Type | Yes | Regular group or Station type |
| Parent Group | No | Hierarchical parent group |
| Members | No | Personnel to assign to this group |

### Station Group Requirements

When creating a **Station** type group, at least one of the following is required:
- **Physical address** — Full street address
- **GPS coordinates** — Latitude and longitude
- **What3Words** — Three-word location code

### Printer Configuration

Station groups can optionally be configured with PrinterNet integration:
- API key (stored encrypted using Symmetric Encryption)
- Printer selection
- Enables automatic dispatch printing at the station

### Dispatch/Message Email

Each group can have a generated dispatch or message email address for external integrations.

### Member Assignment Rules

- A user can only belong to **one group at a time**
- The system validates that selected members are not already assigned to another group
- Members are added as `DepartmentGroupMember` entries

### Creation Process
1. Validates member uniqueness (no user in multiple groups)
2. Validates station address/coordinates for station type
3. Saves group and member assignments
4. Configures printer if specified
5. Fires `AuditEvent` (GroupAdded)

## Editing Groups

**Authorization:** `GenericGroup_Update` policy + `CanUserEditDepartmentGroup` runtime check

Editing supports:
- Changing group name and parent
- Adding/removing members (diff-based)
- Updating address, GPS coordinates, or What3Words
- Modifying printer configuration

Fires `AuditEvent` (GroupChanged).

## Deleting Groups

**Authorization:** `GenericGroup_Delete` policy

:::warning Cascade Protection
A group **cannot be deleted** if it has:
- Child groups
- Assigned users
- Assigned units
- Referenced shifts

The delete confirmation page shows counts for each of these dependencies.
:::

Uses `IDeleteService.DeleteGroupAsync` when deletion is allowed. Fires `AuditEvent` (GroupRemoved).

## Geofencing

**Authorization:** `GenericGroup_Update` policy

Station groups support response area geofencing:

### Viewing/Editing Geofences
- Opens a map editor centered on the department's configured coordinates
- Allows drawing polygon geofences
- Supports custom geofence colors

### Saving Geofences
The `SaveGeofence` endpoint accepts:
- Geofence color (hex)
- Polygon coordinate data (GeoJSON-compatible)

Returns a JSON success/failure result.

## Data Endpoints

| Endpoint | Parameters | Purpose |
|----------|------------|---------|
| `GetMembersForGroup` | `groupId`, `includeAdmins`, `includeNormal` | Group members filtered by admin/normal status |
| `GetAllGroups` | — | All groups (id, name) |
| `GetGroupsForCallGrid` | — | Groups with member counts for dispatch |

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Personnel** | Personnel belong to groups; group admins manage their members |
| **Units** | Units are assigned to station groups |
| **Dispatch** | Groups are dispatch targets; station locations used for routing |
| **Shifts** | Shifts reference groups for scheduling |
| **Mapping** | Station locations displayed on maps; geofences shown as overlays |
| **Reports** | Group data used in staffing and personnel reports |
| **Department** | Printer and email configuration per group |
| **Notifications** | Group-level availability alerts |
| **Security** | Group admin permissions affect personnel management |
