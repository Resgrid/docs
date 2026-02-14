---
sidebar_position: 16
---

# Personnel Roles

Personnel Roles allow you to define functional roles within your department and assign them to personnel. Roles represent capabilities, qualifications, or job functions (such as "Firefighter", "EMT", "Officer", "Driver/Engineer") rather than organizational positions. Roles are used throughout Resgrid for dispatch targeting, notification rules, permissions, and availability tracking.

## Why Personnel Roles Matter

Roles provide a powerful way to organize your personnel by capability rather than just by group. When dispatching a call, you can dispatch to a role (e.g., "All EMTs") rather than selecting individuals. Notification rules can target roles to alert specific skill sets when conditions change. Permissions can be granted to roles, allowing you to give specific access without making someone a full administrator.

## Scope

Personnel Roles are department-wide. Each role has a name, description, and a list of members. A person can belong to multiple roles simultaneously (unlike groups, where each person can only be in one group).

## Viewing Roles

Navigate to **Personnel → Manage Roles** to see all roles defined in your department. The list shows each role's name and member count.

## Creating a Role

Click **Add Role** to create a new personnel role.

### Role Fields

| Field       | Required | Description                                              |
| ----------- | -------- | -------------------------------------------------------- |
| Name        | Yes      | The name of the role (must be unique within the department) |
| Description | No       | A description of what the role represents                |
| Members     | No       | Department personnel assigned to this role               |

When creating a role, you can assign members immediately, or create the role first and add members later by editing it.

:::warning Unique Role Names
Each role name must be unique within your department. If you attempt to create a role with a name that already exists, you will receive a duplicate name error.
:::

## Editing a Role

Click on a role to edit its name, description, or member list. You can add or remove members at any time. Changes take effect immediately.

## Deleting a Role

Roles can be deleted from the role list. Before deleting a role, consider the impact on:
- **Dispatch rules** — if the role is used as a dispatch target
- **Notification rules** — if notifications target this role
- **Permissions** — if the role is used in "Department Admins and Select Roles" permission settings
- **Unit assignments** — if personnel in this role are assigned to units based on their role

:::tip Review Dependencies Before Deleting
Before deleting a role, check Notifications, Permissions, and any dispatch configurations that reference the role. Removing a role that is actively used in these features could cause notifications to stop firing or permissions to change unexpectedly.
:::

## How Roles Are Used in the System

| Feature          | How Roles Are Used                                                      |
| ---------------- | ----------------------------------------------------------------------- |
| Dispatch         | Dispatch to a role sends notifications to all members of that role      |
| Notifications    | Notification rules can target roles as recipients                       |
| Permissions      | "Department Admins and Select Roles" permission level uses roles        |
| Availability     | Availability alerts can monitor specific roles (e.g., alert when fewer than 3 EMTs are available) |
| Units            | Unit roles define positions on a unit (e.g., Driver, Officer, Firefighter) that map to personnel roles |
| Reports          | Personnel roles appear in reports and personnel exports                 |

## Roles vs Groups

It's important to understand the difference between roles and groups:

| Aspect        | Roles                                    | Groups                                    |
| ------------- | ---------------------------------------- | ----------------------------------------- |
| Purpose       | Functional capability / job function     | Organizational structure / location       |
| Membership    | Person can have multiple roles           | Person can only be in one group           |
| Example       | EMT, Officer, Firefighter, Driver        | Station 1, Alpha Team, Division 2         |
| Dispatch      | Dispatch by capability                   | Dispatch by organization                  |

## Common Errors and Resolutions

| Error                                | Resolution                                                          |
| ------------------------------------ | ------------------------------------------------------------------- |
| "Role name already exists"           | Choose a unique role name                                           |
| Cannot delete role                   | Check for dependencies in Notifications, Permissions, and Dispatch  |
| Person not receiving role-based dispatch | Verify the person is a member of the role                       |
| Role members not showing correctly   | Ensure members have been saved; refresh the page                    |
