---
sidebar_position: 19
---

# Calendar Types

Calendar Types in Resgrid allow you to categorize calendar events by type, such as "Training", "Meeting", "Drill", "Fundraiser", or "Maintenance". Each type can have an associated color, which is used to visually distinguish different event categories on the calendar view.

## Why Calendar Types Matter

As your department schedules more events, it becomes important to quickly distinguish between different kinds of activities at a glance. Calendar types provide color-coded categorization that makes it easy to scan the calendar and identify trainings versus meetings versus community events. Types also enable filtering and organizing events by category for reporting and planning purposes.

## Scope

Calendar Types are department-wide. All types are available when creating any calendar event, and the color coding is visible to all personnel viewing the calendar.

## Viewing Calendar Types

Navigate to **Calendar → Manage Types** to see all calendar types defined in your department.

## Creating a Calendar Type

Click **New Type** to create a new calendar type.

| Field  | Required | Description                                                     |
| ------ | -------- | --------------------------------------------------------------- |
| Name   | Yes      | The name of the calendar type (must be unique in the department) |
| Color  | Yes      | The color used to display events of this type on the calendar   |

:::tip Color Selection
Choose distinct, high-contrast colors for each calendar type so they are easily distinguishable on the calendar. Using similar colors for different types can cause confusion when scanning the calendar view.
:::

## Editing a Calendar Type

Click on an existing type to edit its name or color. Changes will be reflected on all future calendar events using this type. Existing events that already have the type assigned will also display with the updated color.

## Deleting a Calendar Type

Calendar types can be deleted from the types list. 

:::warning Unique Type Names
Each calendar type name must be unique within your department. Attempting to create a type with a name that already exists will result in an error.
:::

## How Calendar Types Are Used

When creating or editing a calendar event, you select a type from the dropdown. The event will then appear on the calendar with the type's assigned color.

### Calendar Event Fields That Use Types

| Field          | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| Item Type      | The calendar type assigned to the event                       |

Calendar events also support:
- **Title and Description** — event details
- **Start/End Times** — with time zone support
- **Location** — with geocoding for map display
- **Recurrence** — none, weekly, monthly, or yearly
- **Signup Type** — for RSVP-based events
- **Entity Targeting** — target specific groups or the whole department
- **Required/Optional Attendees** — for attendance tracking
- **Reminders** — automated reminders before the event

## How Calendar Types Connect to Other Features

| Feature    | Connection                                                        |
| ---------- | ----------------------------------------------------------------- |
| Calendar   | Types provide color-coded categorization for calendar events      |
| Reports    | Events can be analyzed by type for operational reporting          |
| Notifications | New calendar events trigger notifications to targeted entities |
| Permissions | Calendar event creation is controlled by the Create Calendar Entry permission |

## Common Errors and Resolutions

| Error                                    | Resolution                                                 |
| ---------------------------------------- | ---------------------------------------------------------- |
| "Type name already exists"               | Choose a unique name for the calendar type                 |
| Type color not showing on calendar       | Ensure the event has the correct type selected             |
| Cannot create calendar events            | Check the Create Calendar Entry permission in Security     |
| End date before start date               | Ensure the event end date/time is after the start date/time |
| Recurrence end before event dates        | Recurrence end date must be after both the start and end dates |