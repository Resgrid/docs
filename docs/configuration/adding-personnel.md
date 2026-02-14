---
sidebar_position: 15
---

# Adding Personnel

Adding Personnel is how you bring members of your department into the Resgrid system. Each person gets their own account with login credentials, allowing them to receive dispatch notifications, update their status and staffing, access the web and mobile applications, and participate in all department operations. Personnel can be added by creating new accounts or by inviting existing Resgrid users.

## Why Adding Personnel Matters

Personnel are the foundation of your Resgrid department. Until members are added to the system, they cannot receive dispatch notifications, update their status, view calls, or interact with any department features. Properly onboarding personnel — including assigning them to groups and roles — ensures they receive the right notifications and have appropriate access to department resources.

## Scope

Personnel management is department-wide. Adding a person creates a user account (or associates an existing one) and places them in your department. Personnel can be assigned to one group and multiple roles. Who can add personnel is controlled by the [Security and Permissions](permissions.md) settings.

## Add a Person

Navigate to **Personnel** and click **Add Person** to create a new user account and add them to your department.

### Required Fields

| Field            | Required | Constraints                        | Description                                              |
| ---------------- | -------- | ---------------------------------- | -------------------------------------------------------- |
| Username         | Yes      | Max 50 characters, must be unique  | The login username for the person                        |
| First Name       | Yes      | Max 50 characters                  | Person's first name                                      |
| Last Name        | Yes      | Max 50 characters                  | Person's last name                                       |
| Email            | Yes      | Max 150 characters, valid email    | Person's email address (used for account and notifications) |
| Password         | Yes      | Min 8 characters                   | Account password                                         |
| Confirm Password | Yes      | Must match password                | Password confirmation                                    |

:::warning Password Requirements
Passwords must be at least 8 characters and must contain at least one uppercase letter, one lowercase letter, and one digit.
:::

### Optional Fields

| Field                    | Required | Description                                                       |
| ------------------------ | -------- | ----------------------------------------------------------------- |
| Mobile Number            | No       | Person's mobile phone number for SMS notifications                |
| Mobile Carrier           | No       | Required if mobile number is provided (for SMS routing)           |
| Send SMS Notifications   | No       | Enable SMS notifications (requires mobile number)                 |
| Send Message SMS         | No       | Enable SMS for internal messages                                  |
| Group                    | No       | Assign the person to a group or station                           |
| Roles                    | No       | Assign one or more personnel roles                                |
| Send Account Notification | No      | Send a welcome email with login credentials to the person         |

:::tip Mobile Carrier
If you provide a mobile number, you must also select the mobile carrier. For UK-based carriers, phone numbers must start with 0 or 44. If SMS notifications are enabled but no mobile number is provided, you will receive a validation error.
:::

### What Happens When You Add a Person

1. A new user account is created with the provided credentials
2. The person is added to your department
3. They are assigned to the selected group (if any)
4. They are assigned to the selected roles (if any)
5. If "Send Account Notification" is checked, a welcome email is sent
6. The person can now log in and access the department's web and mobile apps

## Manage Invites

Instead of creating accounts directly, you can **invite** people to join your department via email. Invites send an email with a link that allows the recipient to create their own account and join your department.

Navigate to **Department → Invites** to manage invitations.

### Sending Invites

Enter one or more email addresses to send invitations. The system validates:
- Email address format must be valid
- Email address must not already be associated with an existing account in the department
- Duplicate email addresses in the same batch are rejected

Each invited person receives an email with instructions to create their account and join your department.

### Managing Pending Invites

From the Invites page, you can view all pending (not yet accepted) invitations and their status.

## Adding an Existing User

If a person already has a Resgrid account (for example, they are a member of another department), they can be added to your department without creating a new account. When you attempt to add a person and the email address is already associated with an existing Resgrid account, the system will redirect you to the **Add Existing User** flow.

## Reactivating a Deleted User

If you attempt to add a person whose email was previously associated with a deleted account in your department, the system will prompt you to **reactivate** the existing account instead of creating a new one. This preserves the person's historical data and associations.

## How Personnel Connect to Other Features

| Feature          | Connection                                                        |
| ---------------- | ----------------------------------------------------------------- |
| Groups           | Personnel are assigned to one group for organizational structure  |
| Roles            | Personnel can have multiple roles for dispatch and notification targeting |
| Dispatch         | Personnel receive dispatch notifications for calls               |
| Custom Statuses  | Personnel use statuses and staffing levels to report availability |
| Shifts           | Personnel can sign up for shifts                                  |
| Notifications    | Personnel can be targeted individually or by role/group           |
| Permissions      | Access to features is controlled by the person's admin/role status |

## Common Errors and Resolutions

| Error                                              | Resolution                                                            |
| -------------------------------------------------- | --------------------------------------------------------------------- |
| "Username already exists"                          | Choose a different username                                           |
| "Email already in use"                             | The email is associated with an existing account; use Add Existing User or check for deleted accounts |
| "Password must contain uppercase, lowercase, digit" | Ensure the password meets all complexity requirements                |
| "Mobile carrier is required"                        | Select a carrier when providing a mobile number                      |
| "SMS notification requires a mobile number"         | Provide a mobile number before enabling SMS notifications            |
| "Cannot delete the Managing User"                   | The managing user cannot be removed; change the managing user in Department Settings first |
| Person not receiving notifications                  | Verify they are in the correct group, have the app installed, and notification preferences are set |