---
sidebar_position: 6
---

# Text Messaging

Text Messaging configuration allows your department to enable two powerful SMS-based features: **Text-to-Call** and **Text Commands**. Text-to-Call lets authorized personnel create new calls by sending a text message, while Text Commands allow personnel to update their status or staffing level via SMS without needing the mobile app or web interface.

## Why Text Messaging Matters

Not all personnel have reliable internet access or may not always have the Resgrid mobile app available. Text messaging provides a fallback communication channel that works on any mobile phone. It enables personnel to interact with Resgrid using basic SMS, ensuring critical dispatch and status functions remain accessible even in low-connectivity situations.

## Scope

Text Messaging settings are department-wide. When enabled, all personnel in the department can use text commands from their registered mobile numbers. Text-to-Call creates calls at the department level visible to all personnel.

## Configuring Text Messaging

Navigate to **Department → Text Settings** to configure text messaging options.

### Settings

| Setting                    | Required           | Default | Description                                                          |
| -------------------------- | ------------------ | ------- | -------------------------------------------------------------------- |
| Enable Text-to-Call        | No                 | Off     | Allows creating calls by sending a text message                      |
| Enable Text Command        | No                 | Off     | Allows personnel to update status/staffing via text                  |
| Text-to-Call Source Numbers | Conditional       | —       | Phone numbers that are authorized to create calls via text           |

:::warning Source Numbers Required
When **both** Text-to-Call and Text Command are enabled, you **must** specify the Text-to-Call Source Numbers. This prevents all personnel command texts from being accidentally imported as new calls. The source numbers tell Resgrid which incoming texts should be treated as new calls versus status commands.
:::

### Phone Number Provisioning

Depending on your subscription plan, you may be able to provision a dedicated phone number for your department's text messaging. This gives your department its own SMS number that personnel can text to interact with the system.

To provision a number:
1. Select the desired country
2. Enter an area code (optional, to get a local number)
3. Click provision to acquire the number

:::tip Plan Requirements
Phone number provisioning is a feature that may require a paid subscription plan. If the provisioning option is not available, check your department's subscription level.
:::

## How Text-to-Call Works

1. An authorized source number sends a text message to your department's provisioned number
2. Resgrid receives the text and parses it as a new call
3. The call is created in the system with the text content as the call nature
4. Standard dispatch notifications are sent

## How Text Commands Work

Personnel can text commands to the department number to update their status without using the app:

- Texts are matched against the registered mobile number of each person
- The system parses the command and updates the person's status or staffing accordingly
- Confirmation is typically sent back via the notification system

## Common Errors and Resolutions

| Error                                              | Resolution                                                                               |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| "Must supply phone numbers to prevent command texts as calls" | Add Text-to-Call Source Numbers when both features are enabled           |
| Text commands not being recognized                 | Verify the person's mobile number in their profile matches the sending number            |
| Calls not being created from texts                 | Ensure the sending number is listed in the Text-to-Call Source Numbers                   |
| Cannot provision a number                          | Check that your subscription plan supports phone number provisioning                     |
| Personnel receiving no response to commands        | Verify text commands are enabled and the department phone number is correctly provisioned |
