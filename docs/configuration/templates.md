---
sidebar_position: 7
---

# Templates

Templates in Resgrid provide two features that speed up call creation: **Call Quick Templates** and **Call Note Autofills**. Call Quick Templates pre-fill call creation fields with commonly used values, allowing dispatchers to create recurring call types with a single click. Call Note Autofills provide pre-written text snippets that can be quickly inserted into call notes during an active call.

## Why Templates Matter

During an emergency, speed is critical. Dispatchers often create the same types of calls repeatedly (e.g., "Structure Fire", "Medical Emergency", "Traffic Accident") with similar details. Templates eliminate the need to type the same information every time, reducing call creation time and ensuring consistency across dispatches. Call Note Autofills similarly speed up documentation during active calls.

## Scope

Templates are department-wide. All dispatchers and personnel with call creation permissions can use any template defined in the department. Templates are created by individual users but are available to the entire department.

## Call Quick Templates

Call Quick Templates pre-populate the New Call form with predefined values. When creating a new call, a dropdown appears allowing you to select a template, which fills in the configured fields automatically.

### Viewing Templates

Navigate to **Department → Templates** to see all call quick templates defined for your department.

### Creating a Call Quick Template

Click **New Template** to create a new call quick template.

| Field          | Required    | Description                                                     |
| -------------- | ----------- | --------------------------------------------------------------- |
| Call Name      | Conditional | The call name to pre-fill (at least Name or Nature is required) |
| Call Nature    | Conditional | The nature of the call to pre-fill                              |
| Call Priority  | No          | The priority to pre-select                                      |
| Call Type      | No          | The call type to pre-select (from your defined Call Types)      |

:::warning At Least One Field Required
You must specify at least a **Call Name** or **Call Nature** to save a template. A template with neither will produce the error: *"You must specify a call name and/or call nature to save the template."*
:::

### Using a Template

When creating a new call from the Dispatch page, select a template from the **Quick Template** dropdown at the top of the New Call form. The form fields will be populated with the template values. You can then modify any field before submitting the call.

### Editing and Deleting Templates

From the Templates list, click on a template to edit its fields, or use the delete option to remove it. Deleting a template does not affect any calls that were previously created using it.

## Call Note Autofills

Call Note Autofills are pre-written text snippets that can be quickly added to call notes. These are useful for standard operating procedures, common observations, or recurring notes that dispatchers frequently add to calls.

### Viewing Autofills

Navigate to **Department → Templates** and click the **Call Notes** tab to see all call note autofills.

### Creating a Call Note Autofill

Click **New Call Note** to create a new autofill entry.

| Field | Required | Description                                                    |
| ----- | -------- | -------------------------------------------------------------- |
| Name  | Yes      | A label for the autofill (shown in the selection dropdown)     |
| Data  | Yes      | The text content that will be inserted into the call notes     |
| Sort  | No       | Sort order for the autofill list (lower numbers appear first)  |

### Editing and Deleting Autofills

From the Call Notes list, click on an autofill to edit it, or use the delete option to remove it. Changes to autofills do not affect notes that have already been added to calls.

## How Templates Connect to Other Features

| Feature         | Connection                                                            |
| --------------- | --------------------------------------------------------------------- |
| Dispatch        | Quick Templates appear in the New Call form dropdown                  |
| Call Types      | Templates can pre-select a Call Type (defined in Types configuration) |
| Call Priorities | Templates can pre-select a Call Priority                              |
| Call Notes      | Autofills are available when adding notes to active calls             |

## Common Errors and Resolutions

| Error                                                       | Resolution                                                |
| ----------------------------------------------------------- | --------------------------------------------------------- |
| "You must specify a call name and/or call nature"           | Add at least a Call Name or Call Nature to the template   |
| Template not appearing in New Call dropdown                  | Ensure the template was saved successfully; refresh the page |
| Call Type or Priority not available in template              | Define Call Types and Call Priorities in the Types configuration first |
