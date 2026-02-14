---
sidebar_position: 2
title: Dashboard
---

# Dashboard

The Dashboard is the main operations hub of Resgrid, providing a real-time overview of department activity, personnel status, and active calls. It is served by the `HomeController`.

## Accessing the Dashboard

Navigate to **User → Dashboard** after logging in. This is the default landing page for the User Area.

## Features

### Personnel Status Overview

The dashboard displays a comprehensive status table showing all department personnel grouped by their station/group assignment.

**How it works:**
1. The system loads all action logs (current status) and user states (staffing levels) for the department
2. Personnel are grouped by their `DepartmentGroup` (station) assignment
3. Ungrouped personnel are shown in a separate section
4. The display respects the **authorization visibility matrix** — users only see personnel they have permission to view

**Sorting Options:**
Personnel can be sorted by the department's configured sort order:
- **Default** — System default ordering
- **First Name** — Alphabetical by first name
- **Last Name** — Alphabetical by last name

Additionally, a **status weight sort** can be applied that prioritizes personnel by their current status severity.

### Custom Staffing Levels

If the department has configured custom staffing levels (see [Custom Statuses](custom-statuses)), the dashboard displays custom staffing buttons. Otherwise, it uses the default staffing levels:

| Default Staffing Level | Description |
|----------------------|-------------|
| Available | Ready for dispatch |
| Delayed | Available but with delay |
| Unavailable | Not available |
| Committed | Currently committed |
| On Shift | Currently on shift duty |

### Custom Personnel Statuses

Similarly, personnel action statuses can be customized. Default statuses include:

| Default Status | Description |
|---------------|-------------|
| Standing By | Available and waiting |
| Not Responding | Not responding to calls |
| Responding | En route to call |
| On Scene | Arrived at call scene |
| Available Station | Available at station |
| Responding to Station | En route to station |
| Responding to Scene | En route to scene |

## User Actions

### Setting Your Own Status

Users can set their own action status from the dashboard:

- **SetCustomAction** — Set your current status with an optional note
- **SetCustomStaffing** — Set your staffing level
- **SetUserState** — Set a custom or standard staffing state with a note
- **UserRespondingToStation** — Mark yourself as responding to a specific station
- **UserRespondingToCall** — Mark yourself as responding to a specific call

### Managing Other Users' Status

Users with appropriate permissions can set status for other personnel:

- **SetCustomUserAction** — Set another user's action status
- **SetCustomStaffing** — Set another user's staffing level
- **SetStateForUser** — Set a specific user's staffing state
- **SetActionForUser** — Set a specific user's action type

### Bulk Status Actions

- **ResetAllToStandingBy** — Reset the entire department to StandingBy status
- **ResetGroupToStandingBy** — Reset all personnel in a specific group to StandingBy

## Editing User Profiles

The dashboard provides access to edit any user's profile (with proper permissions):

### Profile Edit Capabilities

| Field | Description | Notes |
|-------|-------------|-------|
| First/Last Name | User's display name | Required |
| Email | Login email address | Must be unique across the system |
| Mobile Number | SMS contact number | UK carriers require specific number prefixes |
| Mobile Carrier | SMS provider | Required for text messaging |
| Group Assignment | Station/group membership | Select from department groups |
| Personnel Roles | Role assignments | Multiple roles supported |
| Home Address | Physical home address | Used for proximity calculations |
| Mailing Address | Postal address | Optional |
| Voice Settings | VoIP call settings | Subject to subscription plan |
| Admin Status | Department administrator | Admin-only setting |
| Disabled Status | Account disabled | Prevents login |
| Hidden Status | Hidden from views | Personnel still exists but not shown |
| Language | UI language preference | Sets a language cookie |
| Timezone | User's timezone | Affects time display |

### Profile Edit Validation

- Mobile carrier rules enforce UK-specific number prefixes for UK carriers
- Email addresses must be unique across the entire system
- Password changes require the new password to meet strength requirements
- Username changes are supported
- All profile changes fire an `AuditEvent` and clear multiple caches

## Dashboard Widgets

### Active Calls Widget
Displays currently active calls with priority colors and quick access to call details.

### Subscription Warning
Shows a warning banner if:
- The department exceeds its subscription plan limits (personnel or units)
- There are system-wide notices

### Top Icons Area
Shows unread message count and quick navigation to messages.

### Upgrade Button
Displayed for free plan department administrators to encourage plan upgrade.

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Custom Statuses** | Dashboard reads custom personnel statuses and staffing levels |
| **Groups** | Personnel are grouped by their station/group assignment |
| **Personnel Roles** | Roles are displayed alongside personnel names |
| **Calls** | Active calls widget, responding-to-call links |
| **Subscription** | Plan limit warnings displayed |
| **Messages** | Unread count shown in top icons |
| **Department Settings** | Sort order, text-to-call number, 24h time format |
