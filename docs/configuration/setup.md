---
sidebar_position: 1
---

# Setup

The Setup Wizard guides you through the initial configuration of your Resgrid department after you first create your account. It walks you through the essential settings required to get your department operational, including basic department information, address, and initial preferences. Completing the setup wizard ensures your department is properly configured before you start adding personnel, units, and configuring advanced features.

## Why Setup Matters

Proper initial setup is critical because many other features in Resgrid depend on your department's core settings. For example, your department address is used as the default map center, your time zone affects all scheduling and status timestamps, and your department name appears across all communications and reports. Skipping or misconfiguring setup can lead to incorrect time displays, mapping issues, and confusion for your personnel.

## Running the Setup Wizard

When you first log in after creating a department, you will be directed to the Setup Wizard automatically. You can also access it later from the Department Settings area if you need to re-run it.

### Step 1: Department Information

The first step collects your core department details.

| Field              | Required | Description                                                        |
| ------------------ | -------- | ------------------------------------------------------------------ |
| Department Name    | Yes      | The name of your department as it will appear across the system    |
| Time Zone          | Yes      | Your department's operating time zone (defaults to US Pacific)     |
| Use 24-Hour Time   | No       | Toggle between 12-hour (AM/PM) and 24-hour time display           |
| Managing User      | Yes      | The primary administrator account for the department               |

:::tip Department Name
Choose your department name carefully as it appears in all notifications, emails, and reports sent from the system. You can change it later in Department Settings if needed.
:::

### Step 2: Department Address

Setting your department address establishes the geographic center for mapping and dispatch operations.

| Field         | Required | Description                                    |
| ------------- | -------- | ---------------------------------------------- |
| Address       | Yes      | Street address of your department headquarters |
| City          | Yes      | City name                                      |
| State         | Yes      | State or province                              |
| Postal Code   | Yes      | ZIP or postal code                             |
| Country       | Yes      | Country                                        |

:::warning Address Accuracy
Ensure your department address is accurate. This address is used as the default center point for maps throughout the system including the Big Board, Dispatch Map, and Mapping modules. An incorrect address will cause maps to center on the wrong location.
:::

## After Setup

Once the Setup Wizard is complete, you should proceed to configure the following areas in order:

1. **[Stations and Groups](stations-groups.md)** — Create your organizational structure
2. **[Adding Personnel](adding-personnel.md)** — Invite and add your team members
3. **[Adding Units](adding-units.md)** — Configure your apparatus and teams
4. **[Department Settings](department-settings.md)** — Fine-tune department-wide settings
5. **[Custom Statuses](custom-statuses.md)** — Set up your status and staffing options
6. **[Types](types.md)** — Define call types, unit types, and other categories

## Clearing the Department Cache

If you experience stale data or settings not appearing to take effect after setup, you can clear the department cache from the Department Settings page. This forces all cached data to be refreshed from the database and can resolve display inconsistencies.

## Common Issues

| Issue                              | Resolution                                                                              |
| ---------------------------------- | --------------------------------------------------------------------------------------- |
| Maps centered on wrong location    | Update your department address in Department Settings → Address                         |
| Times showing in wrong time zone   | Update Time Zone in Department Settings                                                 |
| Setup wizard not appearing         | Navigate to Department Settings to access configuration manually                        |
| Settings not taking effect         | Clear the department cache from Department Settings and have users log out and back in   |
