---
sidebar_position: 14
---

# Notifications

Notifications in Resgrid allow you to configure automated alerts that are triggered by specific system events. When an event occurs (such as a personnel status change, a unit going out of service, or staffing levels dropping below a threshold), the system can automatically notify designated personnel, roles, groups, or the entire department.

## Why Notifications Matter

In emergency operations, awareness of changing conditions is critical. A key responder going unavailable, a unit going out of service, or staffing dropping below safe levels are all situations that require immediate attention. Notification rules automate this awareness, ensuring the right people are informed when important events occur — without requiring someone to manually monitor the system.

## Scope

Notification rules are department-wide. Each rule defines an event trigger and a set of recipients. Multiple notification rules can be active simultaneously, and they can overlap in their triggers and recipients.

## How Notifications Work

1. An event occurs in the system (e.g., a person changes their staffing level)
2. Resgrid evaluates all active notification rules against the event
3. For each matching rule, the designated recipients are notified
4. Notifications are delivered via push notification, email, or SMS (based on user preferences)

## Creating a Notification Rule

Navigate to **Department → Notifications** and click **New Notification**.

### Notification Fields

| Field                        | Required | Description                                                           |
| ---------------------------- | -------- | --------------------------------------------------------------------- |
| Event Type                   | Yes      | The system event that triggers this notification                      |
| Everyone                     | No       | Notify all personnel in the department                                |
| Department Admins            | No       | Notify only department administrators                                 |
| Selected Groups Admins Only  | No       | Notify only the admins of selected groups                             |

### Recipient Targeting

You can target notifications to specific recipients using any combination of:

| Target        | Description                                               |
| ------------- | --------------------------------------------------------- |
| Roles         | Notify all personnel in selected personnel roles          |
| Groups        | Notify all personnel in selected groups                   |
| Users         | Notify specific individual users                          |

### Threshold Settings

Some event types support threshold-based triggering:

| Field        | Required | Description                                                    |
| ------------ | -------- | -------------------------------------------------------------- |
| Lower Limit  | No       | Minimum threshold value for the notification to trigger        |
| Upper Limit  | No       | Maximum threshold value for the notification to trigger        |

## Event Types

Notification rules can be configured for various system events. Some event types have special configuration options:

### Standard Events

Standard events trigger when a specific action occurs in the system, such as a personnel status change or a new call being created.

### Availability Alert Events

Availability alerts monitor staffing levels and trigger when available resources drop below a threshold:

| Event Type                              | Scope      | Description                                                    |
| --------------------------------------- | ---------- | -------------------------------------------------------------- |
| Roles in Group Availability Alert       | Group      | Alerts when available personnel in a role within a group drops below threshold |
| Unit Types in Group Availability Alert  | Group      | Alerts when available units of a type within a group drops below threshold     |
| Roles in Department Availability Alert  | Department | Alerts when available personnel in a role department-wide drops below threshold |
| Unit Types in Department Availability Alert | Department | Alerts when available units of a type department-wide drops below threshold |

For availability alert events, you configure:

| Field           | Required | Description                                                    |
| --------------- | -------- | -------------------------------------------------------------- |
| Role/Unit Type  | Yes      | The personnel role or unit type to monitor                     |
| Current States  | No       | The status states to consider as "available" for counting      |
| Lock to Group   | No       | Whether to scope the alert to a specific group                 |

:::tip Availability Thresholds
Use the Lower Limit to set the minimum number of available resources. When the count drops to or below this number, the notification fires. For example, setting a Lower Limit of 2 for "Firefighter" role means the notification triggers when fewer than 2 firefighters are available.
:::

## Managing Notifications

From the Notifications page, you can:
- **View** all notification rules with their event types and resolved recipient names
- **Delete** a notification rule that is no longer needed

## How Notifications Connect to Other Features

| Feature           | Connection                                                           |
| ----------------- | -------------------------------------------------------------------- |
| Personnel Roles   | Notifications can target roles and monitor role-based availability   |
| Groups            | Notifications can target groups and monitor group-level availability |
| Units             | Unit type availability can trigger notification alerts               |
| Custom Statuses   | Current status states are used to determine availability counts      |
| Personnel         | Individual users can be targeted as notification recipients          |

## Common Errors and Resolutions

| Error                                      | Resolution                                                              |
| ------------------------------------------ | ----------------------------------------------------------------------- |
| Notification not triggering                | Verify the event type matches the event occurring in the system         |
| Recipients not receiving notifications     | Check recipient targeting (roles, groups, users) and user notification preferences |
| Availability alert not firing              | Verify the lower/upper limits, selected role/unit type, and current states are configured correctly |
| Too many notifications being sent          | Review notification rules for overlapping triggers and consolidate      |
