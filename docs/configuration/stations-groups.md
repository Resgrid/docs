---
sidebar_position: 3
---

# Stations and Groups

Stations and Groups define the organizational structure of your department in Resgrid. Groups represent logical groupings of personnel (such as divisions, platoons, or teams), while Stations are a special type of group that have a physical location. Personnel are assigned to groups, units are assigned to stations, and many features such as dispatch, shifts, and notifications rely on this organizational hierarchy.

## Why Stations and Groups Matter

Your group structure is foundational to how Resgrid operates. Dispatch uses groups to determine who to notify, shifts are organized around groups, permissions can be scoped to groups, and mapping uses station locations for routing and display. Without properly configured groups and stations, dispatch targeting, shift management, and location-based features will not function correctly.

## Scope

Groups and stations are department-wide and visible to all personnel in the department. Each person can belong to only one group at a time. Groups can have a parent-child hierarchy (e.g., a Division group containing multiple Station groups).

## Viewing Groups

Navigate to the **Groups** section to see all groups in your department. The list shows each group's name, type (Station or Organizational), member count, and parent group if applicable.

## Creating a Group

To create a new group, click the **New Group** button.

### Group Fields

| Field          | Required | Description                                                        |
| -------------- | -------- | ------------------------------------------------------------------ |
| Name           | Yes      | The name of the group (e.g., "Station 1", "Alpha Team")           |
| Type           | Yes      | Station (has a physical location) or Organizational (logical only) |
| Parent Group   | No       | An optional parent group for creating hierarchies                  |

### Members

When creating or editing a group, you assign members from your department personnel. Each member can be designated as a regular member or a **Group Admin**. Group admins have elevated permissions within the group, such as the ability to edit group settings (depending on your permission configuration).

:::warning One Group Per Person
Each person in your department can only belong to one group at a time. If you attempt to add someone who is already in another group, you will receive an error: *"{Name} is already in a group. Cannot add to another."* You must remove them from their current group first.
:::

### Station-Specific Fields

When the group type is **Station**, additional location fields are required so the station can appear on maps and be used for routing.

| Field         | Required                    | Description                                              |
| ------------- | --------------------------- | -------------------------------------------------------- |
| Address       | Yes (if no GPS or W3W)      | Street address of the station                            |
| City          | Yes (if no GPS or W3W)      | City                                                     |
| State         | Yes (if no GPS or W3W)      | State or province                                        |
| Postal Code   | Yes (if no GPS or W3W)      | ZIP or postal code                                       |
| Country       | Yes (if no GPS or W3W)      | Country                                                  |
| Latitude      | Alternative to Address      | GPS latitude in decimal format                           |
| Longitude     | Alternative to Address      | GPS longitude in decimal format                          |
| What3Words    | Alternative to Address/GPS  | A What3Words address that will be geocoded to coordinates |

You must provide at least one of: a full address, GPS coordinates, or a What3Words address. The system will validate that at least one complete location option is provided.

### Printer Integration

Stations can optionally be configured to print dispatches to a physical printer.

| Field               | Required | Description                                        |
| ------------------- | -------- | -------------------------------------------------- |
| Printer API Key     | No       | API key for the printing service                   |
| Printer ID          | No       | The printer identifier                             |
| Printer Name        | No       | Friendly name for the printer                      |
| Dispatch to Printer | No       | Enable automatic printing of dispatches            |

## Station Geofences

Each station can have a geofence defined — a geographic boundary drawn on a map that represents the station's response area or district. Geofences appear as colored polygons on the department map and can be used for location-based features.

To configure a geofence, click the **Geofence** option on a station group. You can draw a polygon on the map and assign a color to it.

## Editing a Group

Click on an existing group to edit its name, type, members, location, or other settings. You can add or remove members, change group admins, and update the station address.

## Deleting a Group

Groups can only be deleted if they meet all of the following conditions:
- The group has **no child groups** (sub-groups)
- The group has **no members** assigned to it
- The group has **no units** assigned to it
- The group has **no shifts** assigned to it

If any of these conditions are not met, you will receive an error: *"Cannot delete the {name} group because it is the parent to other groups, has users or units in it or has shifts assigned to it."*

To delete a group, first reassign or remove all members, units, and shifts, and delete or reparent any child groups.

## How Groups Are Used in the System

| Feature          | How Groups Are Used                                                       |
| ---------------- | ------------------------------------------------------------------------- |
| Dispatch         | Dispatch to an entire group to notify all members                         |
| Shifts           | Shifts are organized by groups; personnel sign up for shifts within groups |
| Permissions      | Some permissions can be locked to group scope                             |
| Notifications    | Notification rules can target specific groups                             |
| Mapping          | Station locations appear on the map with geofence districts               |
| Personnel Sort   | Personnel can be sorted and displayed by group                            |
| Units            | Units are assigned to station groups for organizational purposes          |

## Common Errors and Resolutions

| Error                                                        | Resolution                                                              |
| ------------------------------------------------------------ | ----------------------------------------------------------------------- |
| "{Name} is already in a group"                               | Remove the person from their current group before adding to a new one   |
| "The Address field is required for station groups"           | Provide a full address, GPS coordinates, or What3Words for stations     |
| "The What3Words address entered was incorrect"               | Verify the What3Words address is valid at what3words.com                |
| "Cannot delete the group because it has..."                  | Remove all members, units, shifts, and child groups before deleting     |
