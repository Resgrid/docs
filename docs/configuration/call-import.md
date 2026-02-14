---
sidebar_position: 4
---

# Call Import

Call Import allows your department to automatically create calls in Resgrid from incoming emails. This is commonly used to integrate with existing CAD (Computer-Aided Dispatch) systems, paging services, or alerting platforms that can send dispatch notifications via email. When an email arrives at your department's dispatch email address, Resgrid parses it according to the configured format and creates a new call automatically.

## Why Call Import Matters

Many departments receive dispatch alerts from a county or regional dispatch center via email or pager. Without Call Import, someone would need to manually enter each call into Resgrid. By configuring email-based call import, dispatches can flow automatically into the system, triggering notifications, mapping, and all other call-related features with no manual intervention.

## Scope

Call Import settings are department-wide and affect a single monitored email inbox. All calls imported from the email are created at the department level and are visible to all personnel (subject to normal permission rules).

## How It Works

1. Your department is assigned an internal dispatch email address (shown in the Call Settings page)
2. Alternatively, you configure an external email server (POP3) for Resgrid to monitor
3. When a new email arrives, Resgrid parses the email body using the selected format type
4. A new call is created in the system with the parsed data (name, nature, address, etc.)
5. Standard dispatch notifications are sent to the appropriate personnel

## Configuring Call Import

Navigate to **Department → Call Settings** to configure email-based call import.

### Email Server Settings

| Field           | Required | Default | Description                                                          |
| --------------- | -------- | ------- | -------------------------------------------------------------------- |
| Hostname        | Yes      | —       | The POP3 email server hostname (e.g., mail.yourdomain.com)          |
| Username        | Yes      | —       | The email account username                                           |
| Password        | Yes      | —       | The email account password                                           |
| Port            | No       | 110     | The POP3 server port (typically 110 or 995 for SSL)                 |
| Use SSL         | No       | Off     | Enable SSL/TLS for secure connection to the mail server              |

### Format Type

The format type tells Resgrid how to parse the incoming email body into call fields. You must select the format that matches the system sending you dispatch emails.

| Format Type             | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| Generic                 | Basic email parsing for simple email formats               |
| Resgrid                 | Native Resgrid format                                      |
| Generic Page            | Standard paging format                                     |
| Connect                 | Resgrid Connect integration format                         |
| Active911               | Active911 platform format                                  |
| Four Part Pipe          | Pipe-delimited four-part format                            |
| CAL FIRE ECC            | California Fire ECC dispatch format                        |
| CAL FIRE SCU            | California Fire SCU dispatch format                        |
| Carencro                | Carencro Fire Department format                            |
| Grand Blanc             | Grand Blanc Township format                                |
| Lowestoft               | Lowestoft Coast Rescue format                              |
| Union Fire              | Union Fire Company format                                  |
| Parkland County         | Parkland County format                                     |
| Parkland County 2       | Parkland County alternate format                           |
| Brockport               | Brockport Fire Department format                           |
| Hancock County          | Hancock County format                                      |
| Spotted Dog             | Spotted Dog format                                         |
| Port Jervis             | Port Jervis Fire Department format                         |
| Yellowhead              | Yellowhead County format                                   |
| R&R                     | R&R format                                                 |
| Ottawa County           | Ottawa County format                                       |
| Ottawa Kingston Toronto | Ottawa/Kingston/Toronto regional format                    |

:::tip Choosing a Format
If your dispatch provider is not listed, try the **Generic** or **Generic Page** format first. These formats attempt to extract basic call information from standard email layouts. If the parsing does not produce accurate results, contact Resgrid support to request a custom format for your dispatch system.
:::

### Email Pruning

Email pruning automatically cleans up processed emails from the monitored inbox to prevent reprocessing.

| Field                | Required | Description                                                   |
| -------------------- | -------- | ------------------------------------------------------------- |
| Prune Email Calls    | No       | Enable automatic deletion of processed emails                 |
| Minutes Till Prune   | No       | How many minutes after processing to delete the email         |

## Internal Dispatch Email

Each department is assigned an internal dispatch email address that can be used to forward emails to Resgrid. This address is displayed on the Call Settings page. You can configure your CAD or alerting system to send emails directly to this address as an alternative to configuring POP3 monitoring.

## How Imported Calls Are Used

Once a call is imported, it behaves identically to a manually created call:
- It appears on the dispatch dashboard and maps
- Notifications are sent to dispatched personnel
- It can be updated, closed, or deleted like any other call
- It shows up in reports and logs

## Common Errors and Resolutions

| Error                                      | Resolution                                                                        |
| ------------------------------------------ | --------------------------------------------------------------------------------- |
| Calls not being imported                   | Verify the hostname, username, password, port, and SSL settings are correct       |
| Calls imported with missing data           | Check that the correct format type is selected for your dispatch email format     |
| Duplicate calls being created              | Enable email pruning to prevent the same email from being processed twice         |
| Connection timeout                         | Verify the mail server is accessible and the port is not blocked by a firewall    |
| SSL/TLS errors                             | Ensure the Use SSL setting matches your mail server requirements (port 995 for SSL) |
