---
sidebar_position: 11
---

# Security and Permissions

Security and Permissions in Resgrid control who can perform specific actions within your department. The permissions system allows department administrators to restrict access to features like call creation, personnel management, document creation, and more. Each permission can be set to allow everyone, only department admins, department and group admins, or admins plus specific personnel roles.

## Why Permissions Matter

As your department grows, not every member should have the same level of access. Dispatchers may need to create calls but not manage personnel. Group leaders may need to view their group's personnel but not all department personnel. The permissions system gives you fine-grained control over who can do what, ensuring operational security and preventing accidental changes to critical data.

## Scope

Permissions are department-wide and apply to all personnel. They are managed exclusively by department administrators. Some permissions also support a **Lock to Group** option, which restricts visibility to only the user's own group rather than the entire department.

## Accessing Permissions

Navigate to **Security → Permissions** from the main menu. Only department administrators can view and modify permission settings.

## Permission Levels

Each permission can be set to one of the following levels:

| Level                         | Description                                                              |
| ----------------------------- | ------------------------------------------------------------------------ |
| Everyone                      | All personnel in the department can perform this action                  |
| Department Admins             | Only department administrators can perform this action                   |
| Department and Group Admins   | Department admins and group admins can perform this action               |
| Department Admins and Select Roles | Department admins plus members of specific personnel roles          |

When **Department Admins and Select Roles** is selected, you can specify which personnel roles are granted the permission. This allows for precise access control without making someone a full administrator.

## Available Permissions

### Personnel Management

| Permission               | Default       | Description                                                     |
| ------------------------ | ------------- | --------------------------------------------------------------- |
| Add Personnel            | Dept Admins   | Who can add new personnel to the department                     |
| Remove Personnel         | Dept Admins   | Who can remove personnel from the department                    |
| View Personal Info       | Everyone      | Who can view personal details (email, phone, etc.)              |

### Call Management

| Permission               | Default       | Description                                                     |
| ------------------------ | ------------- | --------------------------------------------------------------- |
| Create Call              | Everyone      | Who can create new dispatch calls                               |
| Delete Call              | Everyone      | Who can delete calls                                            |
| Close Call               | Everyone      | Who can close active calls                                      |
| Add Call Data            | Everyone      | Who can add notes and data to existing calls                    |

### Content Creation

| Permission               | Default       | Description                                                     |
| ------------------------ | ------------- | --------------------------------------------------------------- |
| Create Training          | Dept Admins   | Who can create training records                                 |
| Create Document          | Everyone      | Who can upload documents                                        |
| Create Calendar Entry    | Everyone      | Who can create calendar events                                  |
| Create Note              | Everyone      | Who can create department notes                                 |
| Create Log               | Everyone      | Who can create log entries                                      |
| Create Shift             | Dept Admins   | Who can create and manage shifts                                |
| Create Message           | Everyone      | Who can send internal messages                                  |

### Inventory

| Permission               | Default       | Description                                                     |
| ------------------------ | ------------- | --------------------------------------------------------------- |
| Adjust Inventory         | Everyone      | Who can create inventory adjustments                            |

### Visibility and Location

| Permission                    | Default  | Lock to Group | Description                                        |
| ----------------------------- | -------- | ------------- | -------------------------------------------------- |
| Can See Personnel Locations   | Everyone | Yes           | Who can view personnel GPS locations on maps       |
| Can See Unit Locations        | Everyone | Yes           | Who can view unit GPS locations on maps            |
| View Group Users              | Everyone | Yes           | Who can view personnel in groups                   |
| View Group Units              | Everyone | Yes           | Who can view units in groups                       |

### Contacts

| Permission               | Default       | Description                                                     |
| ------------------------ | ------------- | --------------------------------------------------------------- |
| Contact View             | Everyone      | Who can view contact records                                    |
| Contact Edit             | Everyone      | Who can edit contact records                                    |
| Contact Delete           | Everyone      | Who can delete contact records                                  |

## Lock to Group

Some visibility permissions support a **Lock to Group** option. When enabled, personnel can only see data (locations, users, units) that belongs to their own group. This is useful for large departments where groups operate independently and should only see their own members on maps and in personnel lists.

Permissions that support Lock to Group:
- Can See Personnel Locations
- Can See Unit Locations
- View Group Users
- View Group Units

## Setting Permissions

To change a permission:
1. Navigate to **Security → Permissions**
2. Find the permission you want to modify
3. Select the new permission level from the dropdown
4. If selecting "Department Admins and Select Roles", choose the roles to include
5. If applicable, configure the Lock to Group option
6. The change is saved automatically

:::warning Permission Changes
Permission changes take effect immediately. When you change location-based or group visibility permissions, a security refresh is triggered to update cached permission data across the system. Users may need to refresh their browser or app to see the updated permissions.
:::

## Audit Logs

The Security section also provides access to **Audit Logs**, which record significant actions taken in the system. Audit logs track who performed an action, what the action was, and when it occurred. This provides accountability and a trail for investigating issues.

You can view audit logs from the Security page and drill into individual entries for details.

## Common Errors and Resolutions

| Error                                    | Resolution                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------ |
| Personnel cannot create calls            | Check the Create Call permission — it may be set to Dept Admins only     |
| Users cannot see other personnel on map  | Check Can See Personnel Locations permission and Lock to Group setting   |
| Group admin cannot manage their group    | Ensure the relevant permissions include "Department and Group Admins"    |
| Permission change not taking effect      | Have users refresh their browser or log out and back in                  |
| Cannot access Security page              | Only department administrators can access Security and Permissions       |
