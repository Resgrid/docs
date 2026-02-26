---
sidebar_position: 5
title: Personnel
---

# Personnel Management

The Personnel module manages department members, their roles, certifications, and access. It is handled by the `PersonnelController`.

## Personnel List

**Authorization:** `Personnel_View` policy

The main personnel index displays all department members with:
- Full name and profile information
- Current action status (responding, on-scene, etc.)
- Current staffing level (available, unavailable, etc.)
- Group/station assignment
- Personnel roles
- Admin/disabled/hidden status

### Visibility Controls

The personnel list respects the **authorization visibility matrix**:
- Users only see personnel they have permission to view
- PII (email addresses) visibility is controlled by `CanViewPII()` check
- Personnel marked as **hidden** are not shown to non-admin users

### Sorting

Personnel can be sorted by the department's configured sort order:
- **Default** — System default
- **First Name** — Alphabetical by first name
- **Last Name** — Alphabetical by last name
- **Group** — Organized by group/station

### Group Tree Filtering

A sidebar tree view allows filtering personnel by group/station.

## Adding Personnel

**Authorization:** `Personnel_Create` policy + subscription limit check

### Prerequisites
- Department must not have reached its subscription plan's personnel limit (`CanUserAddNewUser`)
- Group administrators can only add users to their own group (when `CanGroupAdminsAddUsers` is enabled)

### Required Fields

| Field | Required | Description |
|-------|----------|-------------|
| First Name | Yes | User's first name |
| Last Name | Yes | User's last name |
| Email | Yes | Must be unique across the system |
| Username | Yes | Login username |
| Password | Yes | Must meet strength requirements |

### Optional Fields

| Field | Description |
|-------|-------------|
| Mobile Number | SMS contact (UK carrier rules apply) |
| Mobile Carrier | Required for text messaging |
| Group | Station/group assignment |
| Roles | Personnel role assignments |

### Creation Process
1. Validates email uniqueness across the system
2. Creates an `IdentityUser` account
3. Assigns user to the department
4. Sets group membership (if specified)
5. Saves user profile
6. Assigns personnel roles
7. Optionally sends a welcome/creation notification email
8. Fires an `AuditEvent`

:::info Contact Verification
When an administrator creates a new user, all contact methods (email, mobile number, home number) are initialized in the **Pending** verification state. The new user must verify their contact methods from their profile page before they will receive dispatches, notifications, or messages via those channels. See [Contact Method Verification](../configuration/contact-verification) for details.
:::

## Viewing Personnel

**Authorization:** `Personnel_View` policy + `CanUserViewUser` runtime check

The view shows:
- User profile details
- Group assignment
- All assigned roles
- Department member state (admin, disabled, hidden)
- Last known user state (staffing level)
- Last action log (current status)

## Deleting Personnel

**Authorization:** `Personnel_Delete` policy + `CanUserRemoveUser` runtime check

- Group administrators can only remove users from their group (when `CanGroupAdminsRemoveUsers` is enabled)
- Uses `IDeleteService.DeleteUserAsync` for proper cleanup

## Personnel Roles

### Viewing Roles
**Authorization:** `Role_View` policy

Lists all personnel roles defined for the department.

### Creating Roles
**Authorization:** `Role_Create` policy

Create a role with:
- Role name
- Initial member assignments from form selection

### Editing Roles
**Authorization:** `Role_Update` policy + `CanUserEditRole` runtime check

Modify role name and member assignments.

### Deleting Roles
**Authorization:** `Role_Delete` policy + `CanUserEditRole` runtime check

Remove a role from the department.

## Data Endpoints

### Personnel Grid Data

| Endpoint | Parameters | Purpose |
|----------|------------|---------|
| `GetPersonnelForCallGrid` | `callId` | Personnel with ETA to call location |
| `GetPersonnelForGridWithFilter` | `filterSelf` | Basic personnel list (optionally excluding self) |
| `GetPersonnelList` | — | Full personnel list with admin/disabled/hidden state |
| `GetPersonnelListPaged` | `perPage`, `page` | Paginated personnel list |

### ETA Calculation

When displaying personnel for a call, the system calculates **Estimated Time of Arrival**:
1. Gets the user's last known GPS location
2. Gets the call's GPS coordinates
3. Uses `IGeoService.GetEtaInSecondsAsync` to calculate travel time
4. Displays ETA alongside personnel information

### Role Data

| Endpoint | Purpose |
|----------|---------|
| `GetRoles` | All department roles |
| `GetCertifications` | All certification types |
| `GetRolesForUser` | Roles assigned to a specific user |

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Dashboard** | Personnel status displayed on main dashboard |
| **Dispatch** | Personnel dispatched to calls |
| **Groups** | Personnel belong to groups/stations |
| **Shifts** | Personnel sign up for shifts |
| **Custom Statuses** | Custom status levels shown for personnel |
| **Mapping** | Personnel location shown on maps (permission-controlled) |
| **Reports** | Personnel data used in roster and staffing reports |
| **Trainings** | Personnel assigned to trainings |
| **Profile** | Certifications and schedules managed per person |
| **Security** | Visibility matrix controls who can see whom |
| **Contact Verification** | Admin-created personnel start with Pending verification; communications are gated by verification status |
