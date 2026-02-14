---
sidebar_position: 32
title: Profile & Account
---

# Profile & Account

The Profile module manages user-specific settings including scheduled reports, staffing schedules, certifications, department membership, and avatars. It is managed by the `ProfileController`. Account deletion is handled by the `AccountController`.

## Scheduled Reports

**Authorization:** `Profile_View` / `Profile_Update` policies

### Viewing Scheduled Reports
Lists configured scheduled report deliveries with type, active status, day schedule, and time.

### Creating Scheduled Reports

| Field | Required | Description |
|-------|----------|-------------|
| Report Type | Yes | Type of report to deliver |
| Days | Yes | Day(s) of week for delivery |
| Time | Yes | Delivery time |
| Active | Default On | Whether the schedule is active |

Creates a `ScheduledTask` of type `ReportDelivery`.

### Editing Scheduled Reports
Modify existing report delivery schedules.

## Staffing Schedules

### Creating Staffing Schedules

**Authorization:** `Profile_View` / `Profile_Update` policies

| Field | Required | Description |
|-------|----------|-------------|
| User | Yes | Target user for schedule |
| Staffing Level | Yes | Level to set at scheduled time |
| Schedule Type | Yes | Weekly or Specific Date/Time |
| Days (Weekly) | Conditional | Day(s) of week |
| Date/Time (Specific) | Conditional | Exact date and time |

Creates a `ScheduledTask` of type `UserStaffingLevel`.

Custom staffing levels are resolved from the department's custom state configuration.

### Viewing Schedules
Lists all staffing schedules for a user with custom state name resolution.

### Managing Schedules
- **Activate** — Enable a disabled schedule
- **Deactivate** — Disable an active schedule
- **Delete** — Remove a schedule permanently

## Certifications

### Viewing Certifications
**Authorization:** `Profile_View` policy

Lists all certifications for a user.

### Adding Certifications

| Field | Required | Description |
|-------|----------|-------------|
| Type | Yes | Certification type |
| Name | Yes | Certification name |
| Number | No | Certification number |
| Issuer | No | Issuing organization |
| Expiry | No | Expiration date |
| Area | No | Certification area |
| File | No | Supporting document |

**File Upload Constraints:**
- Maximum 10 MB
- Allowed types: jpg, jpeg, png, gif, pdf, doc, docx, ppt, pptx, pps, ppsx, odt, xls, xlsx, txt

### Downloading Certification Files
Retrieve attached certification documents with department ownership validation.

## Password Reset

**Authorization:** `Profile_View` policy

Administrators can reset passwords for other users:
- Cannot reset the department owner's password
- Uses `UserManager.GeneratePasswordResetToken` + `ResetPassword`
- Optionally emails new credentials to the user

## Your Departments

### Viewing Departments
Lists all departments the user belongs to with default/active indicators.

### Joining a Department
Join a new department using a department join code:
1. Enter the department's link code
2. System validates the code
3. User added to the department

### Switching Active Department
**Action:** `SetActiveDepartment` (JSON body)

Switches the user's active department:
1. Signs out the user
2. Re-signs in with new department context
3. Authentication claims are refreshed

### Setting Default Department
Sets which department loads by default on login. Also switches to it immediately.

### Leaving a Department
**Action:** `DeleteDepartmentLink`

Removes the user from a secondary department:
- Complex logic handles active/default department reassignment
- Re-signs in if the removed department was active

## Avatar Management

### Retrieving Avatars
The `GetAvatar` endpoint returns images by type:
- **Type 1 (or null)** — User avatar
- **Type 2** — Department logo/avatar

### Uploading Images
- Validates content type starts with `image/`
- Converts to PNG format via ImageSharp library
- Stores for later cropping

### Cropping Images
The `Crop` endpoint uses ImageSharp to:
- Resize the image to specified dimensions
- Crop to final size
- Save as PNG

## Account Deletion

The `AccountController` handles permanent account deletion:

### Prerequisites
- Must be a registered user (`SystemRoles.Users`)
- System checks if user owns any departments (warns about ownership)
- Requires confirmation (`AreYouSure` checkbox)

### Deletion Process
1. User confirms deletion
2. `_deleteService.DeleteUserAccountAsync` called
3. Audit trail records IP address and user-agent
4. Redirects to LogOff

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Reports** | Scheduled report delivery uses report generation |
| **Custom Statuses** | Custom staffing levels in staffing schedules |
| **Certifications** | Certification types from Types module |
| **Department** | Multi-department membership management |
| **Security** | Password reset subject to admin permissions |
| **Dashboard** | Active department determines dashboard context |
