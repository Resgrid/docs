---
sidebar_position: 8
---

# Protocols

Protocols in Resgrid are structured decision-support guides that can be attached to calls during dispatch. They provide step-by-step instructions, questionnaires, and reference documents that help dispatchers and responders follow standardized procedures based on the type and priority of a call. Protocols can be automatically suggested based on call characteristics or manually attached during dispatch.

## Why Protocols Matter

Emergency response organizations rely on standard operating procedures to ensure consistent, safe, and effective responses. Protocols in Resgrid digitize these procedures and make them available at the point of dispatch. When a call is created, relevant protocols are automatically identified based on triggers (such as call priority and type), ensuring that responders always have the right guidance for the situation.

## Scope

Protocols are department-wide. All protocols defined in a department are available during call creation and can be viewed by personnel with the appropriate permissions. Protocols are triggered automatically based on call properties but can also be manually attached to any call.

## How Protocols Work

1. A dispatcher creates a new call with a specific Priority and/or Call Type
2. Resgrid evaluates all active protocol triggers against the call properties
3. Matching protocols are suggested to the dispatcher (shown as active or pending)
4. The dispatcher can attach protocols to the call
5. Responders can view attached protocols and answer questionnaire questions
6. Question answers are scored by weight to guide decision-making

## Creating a Protocol

Navigate to **Department → Protocols** and click **New Protocol**.

### Protocol Fields

| Field          | Required | Description                                                         |
| -------------- | -------- | ------------------------------------------------------------------- |
| Name           | Yes      | The name of the protocol (e.g., "Structure Fire Response")          |
| Code           | Yes      | A short code identifier (automatically uppercased, e.g., "SFR")    |
| Description    | No       | A brief description of what the protocol covers                     |
| Protocol Text  | No       | Full text of the protocol instructions and procedures               |
| Is Disabled    | No       | Disables the protocol without deleting it                           |
| Minimum Weight | No       | Minimum trigger score required for the protocol to be suggested     |

### Triggers

Triggers define the conditions under which a protocol is automatically suggested for a call. Each protocol can have multiple triggers.

| Field      | Required | Description                                                     |
| ---------- | -------- | --------------------------------------------------------------- |
| Type       | Yes      | The type of trigger (from the trigger types list)               |
| Priority   | No       | Match calls with this priority level                            |
| Call Type  | No       | Match calls with this call type                                 |
| Starts On  | No       | Date range start — only active during this period               |
| Ends On    | No       | Date range end — protocol trigger expires after this date       |
| Geofence   | No       | Geographic area — only trigger for calls within this area       |

:::tip Multiple Triggers
You can add multiple triggers to a single protocol. The protocol will be suggested if **any** of its triggers match the call properties. This allows a single protocol to cover multiple scenarios.
:::

### Questions

Protocols can include a questionnaire that responders answer during a call. Each question has a set of possible answers, and each answer carries a weight that contributes to an overall score.

| Field    | Required | Description                                        |
| -------- | -------- | -------------------------------------------------- |
| Question | Yes      | The question text                                  |
| Answers  | Yes      | One or more possible answers                       |

Each answer has:

| Field  | Required | Description                                                 |
| ------ | -------- | ----------------------------------------------------------- |
| Answer | Yes      | The answer text                                             |
| Weight | Yes      | A numeric weight/score for this answer                      |

The total weight of selected answers can be used to guide decision-making — for example, a high total score might indicate a more severe situation requiring additional resources.

### Attachments

Protocols can include file attachments such as reference documents, images, or procedure sheets.

| Field | Required | Description                                                    |
| ----- | -------- | -------------------------------------------------------------- |
| File  | Yes      | The file to attach                                             |

**Allowed file types:** jpg, jpeg, png, gif, pdf, doc, docx, ppt, pptx, pps, ppsx, odt, xls, xlsx, txt, mpg, avi, mpeg

**Maximum file size:** 30 MB

## Viewing and Managing Protocols

From the Protocols list, you can:
- **View** a protocol's full details, triggers, questions, and attachments
- **Delete** a protocol that is no longer needed
- **Disable** a protocol to temporarily remove it from trigger matching without deleting it

## How Protocols Connect to Other Features

| Feature         | Connection                                                            |
| --------------- | --------------------------------------------------------------------- |
| Dispatch        | Protocols are suggested and attached during call creation             |
| Call Types      | Protocol triggers can match on Call Type                              |
| Call Priorities | Protocol triggers can match on Call Priority                          |
| Calls           | Attached protocols are stored with the call record                    |
| Geofences       | Protocol triggers can be limited to geographic areas                  |

## Common Errors and Resolutions

| Error                                        | Resolution                                                          |
| -------------------------------------------- | ------------------------------------------------------------------- |
| "File type ({ext}) is not importable"        | Use one of the allowed file types listed above                      |
| "Attachment is too large, must be smaller than 30MB" | Reduce the file size or split into smaller files             |
| Protocol not being suggested for calls       | Verify the trigger conditions match the call's priority and type    |
| Protocol showing as disabled                 | Edit the protocol and uncheck the "Is Disabled" option              |
