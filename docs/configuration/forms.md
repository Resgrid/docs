---
sidebar_position: 9
---

# Forms

Forms in Resgrid allow you to create custom data entry forms that extend the built-in functionality of the system. The primary use of forms is to add custom fields to the New Call creation workflow, enabling your department to capture specific information that is unique to your operations. Forms are built using a visual form builder and can include automations that set call fields based on form input.

## Why Forms Matter

Every department has unique data requirements that go beyond the standard call fields (name, nature, priority, etc.). For example, your department may need to capture specific incident codes, apparatus requirements, hazmat information, or mutual aid details at the time of dispatch. Forms allow you to define these custom fields and have them appear directly in the call creation interface, ensuring critical data is captured consistently.

## Scope

Forms are department-wide. When a form is enabled, it applies to all users who create calls in the department. Only one form of each type (e.g., New Call form) can be active at a time.

## Form Types

Forms are categorized by type, which determines where in the system they appear:

| Type       | Description                                              |
| ---------- | -------------------------------------------------------- |
| New Call    | Custom fields added to the New Call creation form        |

:::tip Future Form Types
The forms system is designed to support additional form types in the future. Currently, the primary use case is extending the New Call form.
:::

## Creating a Form

Navigate to **Department → Forms** and click **New Form**.

### Form Fields

| Field  | Required | Description                                              |
| ------ | -------- | -------------------------------------------------------- |
| Name   | Yes      | A descriptive name for the form                          |
| Type   | Yes      | The form type (determines where it appears in the system)|
| Data   | Yes      | The form definition built using the visual form builder  |

The **form builder** provides a drag-and-drop interface for constructing your form. You can add various field types including text inputs, dropdowns, checkboxes, radio buttons, and more. Each field can be configured with labels, placeholder text, validation rules, and default values.

## Form Automations

Forms can include automations that automatically set call fields based on form input. For example, if a user selects "Hazmat" from a dropdown field, an automation could automatically set the call priority to "Emergency".

Automations are configured as trigger-action pairs:

| Field            | Required | Description                                                 |
| ---------------- | -------- | ----------------------------------------------------------- |
| Trigger Field    | Yes      | The form field that triggers the automation                 |
| Trigger Value    | Yes      | The value that activates the automation                     |
| Operation Type   | Yes      | The type of call field to set                               |
| Operation Value  | Yes      | The value to set on the call field                          |

## Managing Forms

From the Forms list, you can:
- **View** a form's configuration and fields
- **Enable** a disabled form to make it active
- **Disable** an active form to remove it from the call workflow without deleting it
- **Delete** a form that is no longer needed (soft delete)

:::warning One Active Form Per Type
Only one form of each type can be active at a time. If you enable a new form of the same type, consider disabling the previous one first to avoid confusion.
:::

## Permissions

Form management is controlled by the following permissions:

| Permission     | Description                            |
| -------------- | -------------------------------------- |
| Forms View     | View the list of forms                 |
| Forms Create   | Create new forms                       |
| Forms Update   | Enable or disable forms                |
| Forms Delete   | Delete forms                           |

## How Forms Connect to Other Features

| Feature   | Connection                                                          |
| --------- | ------------------------------------------------------------------- |
| Dispatch  | New Call forms appear in the call creation interface                 |
| Calls     | Form data is stored with the call record                            |
| Automations | Form automations can set call priority, type, and other fields    |

## Common Errors and Resolutions

| Error                              | Resolution                                                            |
| ---------------------------------- | --------------------------------------------------------------------- |
| Form not appearing in New Call     | Ensure the form is enabled and is of type "New Call"                  |
| Form fields not saving             | Check that all required fields in the form builder are properly configured |
| Automation not triggering          | Verify the trigger field name and trigger value match exactly         |
| Permission denied when managing forms | Check that your account has the appropriate Forms permissions       |
