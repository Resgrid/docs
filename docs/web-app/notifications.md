---
sidebar_position: 20
title: Notifications
---

# Notifications

The Notifications module configures automated notification rules that trigger based on department events. It is managed by the `NotificationsController`.

## Notification List

Displays all configured notification rules with resolved human-readable descriptions of:
- Who is notified
- What triggers the notification
- Threshold values

## Creating Notifications

### Notification Targeting

Notifications can target:

| Target | Description |
|--------|-------------|
| **Everyone** | All department members |
| **Department Admins** | Only administrators |
| **Selected Group Admins** | Admins of specific groups |
| **Specific combinations** | Custom mix of roles, groups, and individual users |

### Notification Event Types

| Event Type | Description | Configuration |
|------------|-------------|---------------|
| `RolesInGroupAvailabilityAlert` | Alert when available personnel with a specific role in a group drops below threshold | Role, Group, Lower/Upper limits |
| `UnitTypesInGroupAvailabilityAlert` | Alert when available units of a type in a group drops below threshold | Unit Type, Group, Lower/Upper limits |
| `RolesInDepartmentAvailabilityAlert` | Alert when available personnel with a role department-wide drops below threshold | Role, Lower/Upper limits |
| `UnitTypesInDepartmentAvailabilityAlert` | Alert when available units of a type department-wide drops below threshold | Unit Type, Lower/Upper limits |

### Threshold Configuration

| Field | Description |
|-------|-------------|
| Lower Limit | Alert when count drops below this value |
| Upper Limit | Alert when count exceeds this value |

### Current State Data

When creating a notification, the system captures the current state of relevant resources (staffing levels, unit states) for comparison when evaluating triggers.

## Deleting Notifications

Removes a notification rule by ID.

## Display Resolution

The notification list performs extensive resolution to display human-readable information:
- Role IDs → Role names
- Group IDs → Group names
- User IDs → User names
- Event type codes → Descriptive text
- Unit type IDs → Unit type names

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Personnel Roles** | Role-based availability alerts |
| **Groups** | Group-level availability alerts |
| **Units** | Unit type availability alerts |
| **Custom Statuses** | Current state data references custom states |
| **Department Settings** | Notification delivery channels |
