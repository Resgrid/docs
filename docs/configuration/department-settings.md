---
sidebar_position: 2
---

# Department Settings

Department Settings is the central configuration hub for your Resgrid department. These settings control department-wide behavior including time display, personnel sorting, map configuration, status/staffing resets, dispatch behavior, module visibility, and more. Changes made here affect every user in your department.

## Why Department Settings Matter

Department Settings define the global behavior and defaults for your entire organization. They control how data is displayed, how automated resets work, how dispatch interacts with shifts and groups, and which modules are available to your users. Misconfigured settings can lead to incorrect time displays, missed notifications, mapping issues, or features being unavailable to your team.

## Accessing Department Settings

Navigate to the **Department** menu and select **Settings**. Only department administrators can access and modify these settings.

## Core Settings

The core settings section controls fundamental department configuration.

| Setting             | Required | Default    | Description                                                        |
| ------------------- | -------- | ---------- | ------------------------------------------------------------------ |
| Department Name     | Yes      | —          | Your department name as shown across the system                    |
| Managing User       | Yes      | Creator    | The primary administrator of the department                        |
| Time Zone           | Yes      | US Pacific | Time zone used for all timestamps, scheduling, and resets          |
| Use 24-Hour Time    | No       | Off        | Switches between 12-hour (AM/PM) and 24-hour time format          |
| Disable Auto-Available | No    | Off        | Prevents the system from automatically setting personnel to Available |

:::tip Time Zone Selection
All times displayed in the web application and mobile apps use the department time zone. Make sure this matches your operating time zone to avoid confusion with status timestamps, calendar events, and scheduled resets.
:::

## Department Address

The department address establishes the geographic reference point for your organization.

| Field         | Required | Description                                                |
| ------------- | -------- | ---------------------------------------------------------- |
| Address       | Yes      | Street address of your headquarters or primary station     |
| City          | Yes      | City                                                       |
| State         | Yes      | State or province                                          |
| Postal Code   | Yes      | ZIP or postal code                                         |
| Country       | Yes      | Country                                                    |

This address is used as the default map center when no other center is specified in the Big Board/Map Settings.

## Sort Orders

Sort orders control how personnel, units, and calls are displayed throughout the system.

| Setting          | Options                                    | Description                                  |
| ---------------- | ------------------------------------------ | -------------------------------------------- |
| Personnel Sort   | Default, First Name, Last Name, Group      | How personnel lists are ordered              |
| Unit Sort        | Default, Name, Type, Station               | How unit lists are ordered                   |
| Call Sort        | Default, Priority, Date, Name              | How call lists are ordered                   |

## Big Board and Map Settings

These settings control the behavior of the Big Board and map views across the system.

| Setting                     | Required | Default | Description                                                     |
| --------------------------- | -------- | ------- | --------------------------------------------------------------- |
| Map Zoom Level              | No       | 10      | Initial zoom level (0–15, where 0 is fully zoomed out)          |
| Refresh Time                | No       | 30      | Auto-refresh interval in seconds (5–120)                        |
| Map Center Address          | No       | —       | Override address for map centering (City and Country required)   |
| Map Center GPS (Lat/Long)   | No       | —       | Override GPS coordinates for map centering (decimal format)      |
| Hide Unavailable on Map     | No       | Off     | Hides personnel with unavailable staffing from the map           |

:::warning Map Center Configuration
If you specify a Map Center Address, you must provide at least the City and Country fields. GPS coordinates must be in decimal format (e.g., 38.8977 not 38°53'51.6"N). Invalid values will cause an error when saving.
:::

## Staffing Reset

The staffing reset feature automatically resets all personnel staffing levels to a baseline value at a specified time each day. This is useful for departments that want everyone to start each day at a known staffing state.

| Setting               | Required           | Default      | Description                                          |
| --------------------- | ------------------ | ------------ | ---------------------------------------------------- |
| Enable Staffing Reset | No                 | Off          | Turns on the daily automatic staffing reset          |
| Time to Reset         | Yes (if enabled)   | —            | The time of day (in department time zone) to reset   |
| Reset Staffing To     | Yes (if enabled)   | Unavailable  | The staffing level to set all personnel to           |

:::warning Staffing Reset and Custom Staffing
When you update or remove custom staffing levels, make sure to also update the Reset Staffing To value here. If the configured reset staffing level no longer exists, the reset may not function as expected. Also notify your personnel to update any personal scheduled staffing changes they have configured.
:::

## Status Reset

Similar to staffing reset, the status reset automatically resets all personnel statuses at a specified time each day.

| Setting              | Required           | Default     | Description                                          |
| -------------------- | ------------------ | ----------- | ---------------------------------------------------- |
| Enable Status Reset  | No                 | Off         | Turns on the daily automatic status reset            |
| Time to Reset        | Yes (if enabled)   | —           | The time of day (in department time zone) to reset   |
| Reset Status To      | Yes (if enabled)   | Standing By | The status to set all personnel to                   |

## Staffing Suppression

Staffing suppression allows you to prevent notifications from going to personnel who are in certain staffing levels. For example, if someone is marked as Unavailable, you may not want them to receive dispatch notifications.

| Setting                       | Required | Description                                              |
| ----------------------------- | -------- | -------------------------------------------------------- |
| Enable Staffing Suppress      | No       | Enables the suppression of notifications                 |
| Staffing Levels to Suppress   | Yes (if enabled) | Select which staffing levels should be suppressed |

## Dispatch Settings

Dispatch settings control how the dispatch system interacts with shifts, groups, and units.

| Setting                                          | Default | Description                                                                    |
| ------------------------------------------------ | ------- | ------------------------------------------------------------------------------ |
| Dispatch Shift Instead of Group                  | Off     | When dispatching to a group, use the shift signup list instead of group members |
| Auto Set Status for Shift Personnel              | Off     | Automatically sets a status when shift personnel are dispatched                |
| Shift Dispatch Status                            | —       | The status to automatically set when shift personnel are dispatched            |
| Shift Clear Status                               | —       | The status to set when shift personnel are cleared from a call                 |
| Unit Dispatch Also Dispatch to Assigned Personnel | Off    | When dispatching a unit, also notify personnel assigned to unit roles          |
| Unit Dispatch Also Dispatch to Group             | Off     | When dispatching a unit, also notify the unit's station group                  |
| Personnel On Unit Set Unit Status                | Off     | When personnel on a unit change status, update the unit status accordingly     |

## Mapping Settings

These settings control how long personnel and unit location data remains visible on maps.

| Setting                                  | Default | Description                                                              |
| ---------------------------------------- | ------- | ------------------------------------------------------------------------ |
| Personnel Location TTL                   | —       | How long personnel location pins remain on the map                       |
| Unit Location TTL                        | —       | How long unit location pins remain on the map                            |
| Personnel Allow No-Location Overwrite    | Off     | A status update without GPS can overwrite a previous status that had GPS |
| Unit Allow No-Location Overwrite         | Off     | A unit state without GPS can overwrite a previous state that had GPS     |

## Module Settings

Module settings allow you to enable or disable entire sections of the Resgrid system. Disabling a module hides it from navigation and prevents access for all users.

| Module       | Default | Description                                    |
| ------------ | ------- | ---------------------------------------------- |
| Messaging    | On      | Internal messaging system                      |
| Mapping      | On      | Maps and geolocation features                  |
| Shifts       | On      | Shift scheduling and management                |
| Logs         | On      | Activity and narrative logging                 |
| Reports      | On      | Report generation                              |
| Documents    | On      | Document storage and management                |
| Calendar     | On      | Calendar and event scheduling                  |
| Notes        | On      | Department notes                               |
| Training     | On      | Training records and management                |
| Inventory    | On      | Inventory tracking                             |
| Maintenance  | On      | Equipment maintenance tracking                 |

## Shift Settings

| Setting                                | Default | Description                                                       |
| -------------------------------------- | ------- | ----------------------------------------------------------------- |
| Allow Signups for Multiple Shift Groups | Off    | Allows personnel to sign up for shifts across multiple groups     |

## API Settings

The API section displays your department's API key and Active Call RSS key. These are used for external integrations.

| Setting              | Description                                                       |
| -------------------- | ----------------------------------------------------------------- |
| API Key              | Used to authenticate API requests to the Resgrid API              |
| Active Call RSS Key  | Used to generate an RSS feed of your active calls                 |

You can provision (generate) a new API key or RSS key from this section. Generating a new key will invalidate the previous one.

## Common Errors and Resolutions

| Error                                           | Resolution                                                                                   |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------- |
| "Map zoom level must be between 0 and 15"       | Enter an integer between 0 and 15                                                            |
| "Refresh time must be between 5 and 120"        | Enter a value between 5 and 120 seconds                                                      |
| "Need to specify a city and country"             | When setting a Map Center Address, City and Country are required                             |
| "Need to supply a time to reset"                | When enabling staffing or status reset, you must specify the time                            |
| "Latitude/Longitude value seems invalid"         | GPS coordinates must be in decimal format (e.g., 38.8977, -77.0365)                         |
| Settings not taking effect                       | Clear the department cache and have users log out and back in to their mobile apps           |
