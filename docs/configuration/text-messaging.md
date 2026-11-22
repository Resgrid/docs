---
sidebar_position: 6
---

# Text Messaging

Text Messaging configuration allows your department to enable two powerful SMS-based features: **Text-to-Call** and **Text Commands**. Text-to-Call lets authorized personnel create new calls by sending a text message, while Text Commands allow personnel to update their status or staffing level via SMS without needing the mobile app or web interface.

<AcademyVideo id="05-calls" />

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
- Replying to a dispatch text to respond to the call (or to a station) sets the person's status to your department's own personnel status with the meaning **Responding** (the first by order). Without custom personnel statuses, or when none of them has that meaning, it sets the built-in *Responding to Scene* or *Responding to Station*. Give your responding status that [meaning](custom-statuses#status-meanings) so SMS replies set it

## Texts and Calls to the Dispatcher Desk

When your department's [dispatcher desk](../web-app/dispatcher-desk#texts-and-calls-to-the-desk) routes **Text messages** and **Phone calls** (Shifts → Dispatcher Desk Settings), the department number also takes requests from the public:

- A text from **someone who is not a member** becomes a conversation offered to a dispatcher on duty in the Dispatch app. The dispatcher replies from the same number. More texts from the same person within the conversation window (30 minutes by default) join it. With **Acknowledge texts automatically**, the texter is told a dispatcher has their message.
- A call from someone who is not a member is held for a dispatcher, who answers it from their own phone.
- **Members keep their text commands** and the voice menu, and texts from the **Text-to-Call Source Numbers** still create calls as described above.
- When no dispatcher is free, a text becomes a pending call that waits for one (optionally filled in by Enhanced AI), and a caller goes to Enhanced AI voice intake or voicemail.

## Your Own Number and Intake Channels

Text Messaging also links to two related pages:

- **Private Inbound Dispatch Number** (*Private inbound dispatch number* box): an add-on that gives your department its own number for the public. Every text to it becomes a pending call and opens a text conversation answered from the main Resgrid number; members can call it to reach the voice menu; callers who are not members can leave a report by voice with Enhanced AI. *Department numbers only receive texts; replies come from the main Resgrid number.* See [Private Inbound Dispatch Number](../web-app/intake-channels/dedicated-number).
- **Manage Intake Channels**: email addresses, chat channels and signed webhooks that turn requests into pending calls, with spam screening. See [Intake Channels](../web-app/intake-channels/overview).

Text-to-call creates calls that are dispatched at once; intake channels and the Private Inbound Dispatch Number always create **pending** calls for a dispatcher to review.

## Contact Verification and SMS

Outbound SMS notifications and text message delivery are gated by each user's mobile number verification status. Users whose mobile number is in the **Pending** verification state will not receive SMS dispatches, notifications, or text message delivery. Users with **Verified** or **Grandfathered** mobile numbers continue to receive SMS normally.

If personnel report not receiving text messages, verify that their mobile number is verified on their profile page. See [Contact Method Verification](contact-verification) for details.

## Common Errors and Resolutions

| Error                                              | Resolution                                                                               |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| "Must supply phone numbers to prevent command texts as calls" | Add Text-to-Call Source Numbers when both features are enabled           |
| Text commands not being recognized                 | Verify the person's mobile number in their profile matches the sending number            |
| Calls not being created from texts                 | Ensure the sending number is listed in the Text-to-Call Source Numbers                   |
| Cannot provision a number                          | Check that your subscription plan supports phone number provisioning                     |
| Personnel receiving no response to commands        | Verify text commands are enabled and the department phone number is correctly provisioned |
| Personnel not receiving outbound SMS               | Verify the person's mobile number is **Verified** or **Grandfathered** on their profile. See [Contact Verification](contact-verification). |
