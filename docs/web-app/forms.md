---
sidebar_position: 24
title: Forms
---

# Forms

The Forms module provides a custom form builder that integrates with the dispatch workflow. It is managed by the `FormsController`.

## Form List

**Authorization:** `Forms_View` policy

Displays all non-deleted forms for the department.

## Creating Forms

**Authorization:** `Forms_Create` policy

### Form Fields

| Field | Required | Description |
|-------|----------|-------------|
| Name | Yes | Form name |
| Type | Yes | Form type (from `FormType` enum) |
| Data | Yes | Form definition/structure data |

### Form Automations

Forms support automation rules that trigger actions based on field values:

| Automation Field | Description |
|-----------------|-------------|
| Trigger Field | Which form field to watch |
| Trigger Value | What value triggers the automation |
| Operation Type | What action to perform |
| Operation Value | Parameter for the action |

**Example:** Automatically set call priority to "High" when a form field "Severity" equals "Critical."

Automations are parsed from form keys:
- `callAutomationTriggerField_*`
- `callAutomationTriggerValue_*`
- `callAutomationOperationType_*`
- `callAutomationOperationValue_*`

## Viewing Forms

**Authorization:** `Forms_View` policy

Displays form details. Validates department ownership.

## Enabling/Disabling Forms

**Authorization:** `Forms_Update` policy

Forms can be toggled active/inactive without deletion:
- **Enable** — Makes the form available for use
- **Disable** — Hides the form from selection

## Deleting Forms

**Authorization:** `Forms_Delete` policy

Soft-deletes the form. Validates department ownership.

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Dispatch** | Forms attached to calls; automations affect call properties |
| **Types** | Form types define categorization |
