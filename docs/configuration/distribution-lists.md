---
sidebar_position: 10
---

# Distribution Lists

Distribution Lists in Resgrid allow you to create email-based communication groups within your department. A distribution list has an email address that, when emailed, forwards the message to all members of the list. Lists can be configured as Internal (using Resgrid's messaging system) or External (connecting to an outside email server to monitor an inbox and distribute messages).

## Why Distribution Lists Matter

Departments often need to communicate with subsets of their personnel — for example, all officers, all training staff, or all members of a particular committee. Distribution lists provide a simple way to email a group of people without needing to maintain separate email groups outside of Resgrid. They integrate directly with your department's personnel roster, so membership stays current as people join or leave.

## Scope

Distribution lists are department-wide. Each list has a unique email address and a set of members drawn from the department's personnel. Any number of lists can be created, and personnel can be members of multiple lists simultaneously.

## Types of Distribution Lists

| Type     | Description                                                                     |
| -------- | ------------------------------------------------------------------------------- |
| Internal | Uses Resgrid's internal messaging — no external email server required           |
| External | Connects to an external email server (POP3) to monitor and distribute messages  |

## Creating a Distribution List

Navigate to **Department → Distribution Lists** and click **New List**.

### Distribution List Fields

| Field         | Required              | Default | Description                                                  |
| ------------- | --------------------- | ------- | ------------------------------------------------------------ |
| Name          | Yes                   | —       | A descriptive name for the list                              |
| Email Address | Yes                   | —       | The unique email address for the list (must not be in use)   |
| Type          | Yes                   | —       | Internal or External                                         |
| Members       | Yes                   | —       | Department personnel who will receive messages               |

### External List Settings

When the type is set to **External**, additional email server settings are required:

| Field     | Required | Default | Description                                           |
| --------- | -------- | ------- | ----------------------------------------------------- |
| Hostname  | Yes      | —       | POP3 email server hostname (e.g., mail.example.com)   |
| Port      | No       | 110     | POP3 server port                                      |
| Use SSL   | No       | Off     | Enable SSL/TLS for secure connection                  |
| Username  | Yes      | —       | Email account username                                |
| Password  | Yes      | —       | Email account password                                |

:::tip Internal vs External
Use **Internal** lists when you only need to distribute messages within Resgrid's system. Use **External** lists when you need to monitor an existing email inbox (such as a department-wide email address) and forward messages to specific personnel.
:::

## Managing Distribution Lists

From the Distribution Lists page, you can:
- **View** all lists with their email addresses and member counts
- **Edit** a list to change its name, members, or server settings
- **Enable/Disable** a list to temporarily stop or resume message distribution
- **Delete** a list that is no longer needed

## Enabling and Disabling Lists

Lists can be enabled or disabled without deleting them. A disabled list will not process or distribute any messages. This is useful for temporarily pausing a list (e.g., during a transition period) without losing its configuration.

## Validation

The system validates the following when creating or editing a distribution list:
- **Email address uniqueness** — each list must have a unique email address. If the address is already in use, you will see: *"Email address already in use, please try another one."*
- **Hostname format** — for External lists, the hostname must be a valid domain format (e.g., mail.mydepartment.com). An invalid hostname will produce: *"The hostname supplied is not valid, must look something like mail.mydepartment.com."*

## Common Errors and Resolutions

| Error                                              | Resolution                                                          |
| -------------------------------------------------- | ------------------------------------------------------------------- |
| "Email address already in use"                     | Choose a different email address for the list                       |
| "The hostname supplied is not valid"               | Enter a valid mail server hostname (e.g., mail.yourdomain.com)      |
| Messages not being distributed                     | Check that the list is enabled and members are assigned             |
| External list not receiving emails                 | Verify hostname, port, SSL, username, and password settings         |
| Members not receiving messages                     | Confirm the members are still active in the department              |
