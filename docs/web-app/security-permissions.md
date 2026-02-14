---
sidebar_position: 31
title: Security & Permissions
---

# Security & Permissions

The Security module manages department-wide permissions and provides access to audit logs. It is managed by the `SecurityController`.

:::note Admin Only
All write operations in this module require **department administrator** status, checked via `ClaimsAuthorizationHelper.IsUserDepartmentAdmin()`.
:::

## Permission Configuration

### Available Permissions

The system manages approximately 20 permission types:

| Permission | Description |
|------------|-------------|
| AddPersonnel | Who can add new personnel |
| RemovePersonnel | Who can remove personnel |
| CreateCall | Who can create dispatch calls |
| CreateTraining | Who can create trainings |
| CreateDocument | Who can upload documents |
| CreateCalendarEntry | Who can create calendar events |
| CreateNote | Who can create notes |
| CreateLog | Who can create work logs |
| CreateShift | Who can create shifts |
| ViewPersonalInfo | Who can view PII (email, phone) |
| AdjustInventory | Who can adjust inventory |
| ViewPersonnelLocation | Who can see personnel GPS locations |
| ViewUnitLocation | Who can see unit GPS locations |
| CreateMessage | Who can send messages |
| ViewGroupUsers | Who can see users in groups |
| DeleteCall | Who can delete calls |
| CloseCall | Who can close calls |
| AddCallData | Who can add data to calls |
| ViewGroupUnits | Who can see units in groups |
| ViewContacts | Who can view contacts |
| EditContacts | Who can edit contacts |
| DeleteContacts | Who can delete contacts |

### Permission Levels

| Level | Code | Description |
|-------|------|-------------|
| Department Admins | 0 | Only department administrators |
| Department + Group Admins | 1 | Department admins and group/station admins |
| Admins + Select Roles | 2 | Admins plus users with specific personnel roles |
| Everyone | 3 | All department members |

### Setting Permissions

**SetPermission:** Sets the permission level for a type.

**SetPermissionData:** Sets additional data (e.g., role IDs) for a permission type while keeping the current action level.

### Cache Refresh

When **location/unit/personnel visibility** permissions change, a `SecurityRefreshEvent` is dispatched to invalidate caches across the system.

## Audit Logs

### Viewing Audit Logs

The audit log system records all significant operations across the application:
- Timestamp
- Audit type (e.g., DepartmentSettingsChanged, CallAdded, PersonnelRemoved)
- Descriptive message
- Before/after JSON snapshots
- Acting user
- IP address and user agent

### Audit Log Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GetAuditLogsList` | All audit logs as JSON with formatted timestamps and type strings |
| `ViewAudit` | Single audit log entry detail (validates department ownership) |

## Interactions with Other Modules

Security permissions affect behavior across the entire application:

| Module | Affected Permissions |
|--------|---------------------|
| **Personnel** | AddPersonnel, RemovePersonnel, ViewPersonalInfo |
| **Dispatch** | CreateCall, DeleteCall, CloseCall, AddCallData |
| **Mapping** | ViewPersonnelLocation, ViewUnitLocation |
| **Units** | ViewGroupUnits |
| **Groups** | ViewGroupUsers |
| **Inventory** | AdjustInventory |
| **Documents** | CreateDocument |
| **Calendar** | CreateCalendarEntry |
| **Notes** | CreateNote |
| **Logs** | CreateLog |
| **Shifts** | CreateShift |
| **Messages** | CreateMessage |
| **Trainings** | CreateTraining |
| **Contacts** | ViewContacts, EditContacts, DeleteContacts |
