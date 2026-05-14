---
sidebar_position: 23
---

# User Defined Fields

User Defined Fields (UDFs) allow departments to extend the built-in data model with custom fields tailored to their specific operational, compliance, or reporting requirements. UDFs can be added to **Calls**, **Personnel**, **Units**, and **Contacts**, and are rendered automatically in web forms, mobile apps, and exports.

## Why User Defined Fields Matter

Every department captures information that the standard system fields do not cover. A hazmat team may need a "Chemical Class" field on calls. A government agency may require a "Certification Level" field on personnel records. A fire department may track a "Service Date" on each unit. UDFs let department admins define these fields without any custom development, while preserving full audit trails and historical data integrity.

## Entity Types

UDFs are organized by entity type. Each entity type has its own independent set of field definitions:

| Entity Type | Description |
|-------------|-------------|
| **Call** (0) | Fields added to new and existing call records |
| **Personnel** (1) | Fields added to personnel/member profiles |
| **Unit** (2) | Fields added to unit (apparatus) records |
| **Contact** (3) | Fields added to external contact records |

## Definitions and Versioning

A **UDF Definition** is the versioned container that holds a set of fields for a given entity type. Every time you modify the field configuration for an entity type, Resgrid automatically creates a **new version** of the definition rather than overwriting the existing one.

### Why Versioning Matters

- Existing records (call values, personnel values, etc.) remain linked to the version of the definition that was active when they were saved. Historical data is never altered.
- New and edited records always use the currently active version.
- Reports and exports query across all versions, so historical UDF values remain accessible regardless of subsequent definition changes.

:::info Immutable Versions
You cannot edit a previous version. Each save of a definition creates a new version and marks the old version inactive. The version number is displayed on the management page so you can track definition history.
:::

## Managing User Defined Fields

Navigate to **Department → User Defined Fields** to access the UDF management page.

### Selecting an Entity Type

Use the **Entity Type** selector at the top of the page to switch between Call, Personnel, Unit, and Contact field configurations. Each entity type is managed independently.

### Adding a Field

Click **Add Field** to open the field editor. Configure the field settings described in [Field Settings](#field-settings) below, then click **Save**. The system will create a new definition version with the added field.

### Editing a Field

Click the **Edit** button next to any existing field. Update the field settings and click **Save**. A new definition version is created. Existing saved values for the affected entity records are preserved and remain linked to the previous version.

### Removing a Field

Click **Remove** next to a field to remove it from the active definition. A new version is created without that field. Existing saved values for that field in historical records are preserved.

### Reordering Fields

Drag fields up or down in the field list to adjust their display order. Click **Save Order** to apply. A new definition version is created reflecting the new sort order.

---

## Field Settings

Each field in a UDF definition has the following configurable settings:

### Basic Settings

| Setting | Required | Description |
|---------|----------|-------------|
| **Name** | Yes | Internal name used as the data key (no spaces; e.g., `chemical_class`). Cannot be changed after the field is created in a version. |
| **Label** | Yes | Human-readable label displayed on forms and reports (e.g., "Chemical Class"). |
| **Description** | No | Tooltip or help text displayed next to the field on forms. Useful for compliance-heavy workflows where field meaning must be unambiguous. |
| **Placeholder** | No | Placeholder text shown inside the input before the user types. |
| **Group Name** | No | Section heading for grouping related fields together. Fields with the same Group Name are rendered inside a shared section/fieldset. |
| **Sort Order** | Yes | Numeric position of the field within its group. Lower numbers appear first. |

### Data Type

The **Field Data Type** determines the input control rendered and the validation rules available:

| Data Type | Value | Description |
|-----------|-------|-------------|
| **Text** | 0 | Single-line text input |
| **Number** | 1 | Integer numeric input |
| **Decimal** | 2 | Floating-point numeric input |
| **Boolean** | 3 | Checkbox (true/false) |
| **Date** | 4 | Date picker (date only) |
| **DateTime** | 5 | Date and time picker |
| **Dropdown** | 6 | Single-select dropdown; options defined in Validation Rules |
| **MultiSelect** | 7 | Multi-select list; options defined in Validation Rules |
| **Email** | 8 | Text input with email format validation |
| **Phone** | 9 | Text input with phone format validation |
| **URL** | 10 | Text input with URL format validation |

### Behavior Flags

| Setting | Default | Description |
|---------|---------|-------------|
| **Is Required** | Off | When enabled, the form cannot be submitted without a value for this field. |
| **Is Read-Only** | Off | When enabled, the field is displayed on forms but cannot be edited by users. Useful for values populated by integrations or workflows (e.g., CAD system sync). |
| **Is Visible on Mobile** | On | When disabled, the field is hidden in mobile apps (Responder, Dispatch app). |
| **Is Visible on Reports** | On | When disabled, the field is excluded from exports and reports. |
| **Is Enabled** | On | When disabled, the field is temporarily hidden from forms without creating a new version or losing the field definition. Useful during phased rollouts or for seasonal fields. |

:::tip Is Enabled vs. Remove
Use **Is Enabled = Off** to temporarily hide a field without losing its configuration. Use **Remove** only when you are certain you no longer need the field in future definitions. Historical values are preserved in both cases.
:::

---

## Validation Rules

Validation rules are configured per field and control both server-side and client-side validation. The available rules depend on the field's data type.

### Text, Email, Phone, URL Fields

| Rule | Description |
|------|-------------|
| **Min Length** | Minimum character count required |
| **Max Length** | Maximum character count allowed |
| **Regex** | Regular expression pattern the value must match |
| **Regex Error Message** | Custom message displayed when the regex pattern fails |
| **Custom Error Message** | Override for the default required/format error message |

### Number and Decimal Fields

| Rule | Description |
|------|-------------|
| **Min Value** | Minimum allowed numeric value |
| **Max Value** | Maximum allowed numeric value |
| **Custom Error Message** | Override for the default range error message |

### Dropdown and MultiSelect Fields

| Rule | Description |
|------|-------------|
| **Options** | List of key/label pairs defining the valid choices. Each option has a **Key** (stored value) and a **Label** (displayed text). |
| **Custom Error Message** | Override for the default required error message |

:::info Dual-Layer Validation
Validation is enforced on both the client and the server. Web forms use HTML5 validation attributes and data-attributes for in-browser validation before submission. The server independently validates all submitted values against the stored rules, preventing circumvention. Mobile apps receive the same rules via the [Schema API endpoint](../api/user-defined-fields.md#get-schema) and implement equivalent native validation.
:::

---

## Field Grouping

Fields with the same **Group Name** are visually grouped together in a labeled section on the form. Use grouping to organize related fields into logical categories, such as:

- "Hazmat Details" (for hazmat call fields)
- "Patient Information" (for EMS calls)
- "Vehicle Specifications" (for apparatus/unit records)
- "Compliance Fields" (for government-required data)

Fields without a Group Name are rendered in an ungrouped section at the top of the UDF area.

---

## Read-Only Fields

Fields marked **Is Read-Only** are displayed with a non-editable input on forms. These fields are typically populated by:

- **Workflow actions** — A workflow step can write a value to a UDF field after a trigger event.
- **External integrations** — A CAD system or records management system can populate fields via the API.
- **Computed defaults** — A default value set in the field definition.

Read-only fields are still included in exports and reports if **Is Visible on Reports** is enabled.

---

## Default Values

The **Default Value** setting pre-populates a field when a new record is created. For Dropdown and MultiSelect fields, the default value must match one of the configured option keys. For Date and DateTime fields, the value must be in ISO 8601 format (`YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`).

---

## Audit Trail

All UDF configuration changes are recorded in the department audit log:

| Event | Description |
|-------|-------------|
| UDF Definition Created | A new definition (first version) was created for an entity type |
| UDF Definition Updated | A new version was created due to a field add, edit, remove, or reorder |
| UDF Field Added | A new field was added to the active definition |
| UDF Field Updated | A field's settings were changed |
| UDF Field Removed | A field was removed from the definition |
| UDF Field Value Saved | UDF values were saved for a specific entity record |

Navigate to **Department → Audit Log** and filter by the UDF event types to review configuration history.

---

## Permissions

UDF management is restricted to **Department Admins** by default. There are no per-user UDF management permissions; if a user has Department Admin access, they can manage UDF definitions for all entity types.

UDF field values on records (calls, personnel, units, contacts) are subject to the same create/edit permissions as the parent record. Users who can edit a call can also edit that call's UDF field values.

---

## Integration with Reports and Exports

UDF fields are automatically included in reports and data exports as additional dynamic columns. All versions of a definition are queried so that historical records display the UDF values that were active at the time of the record's creation. No additional configuration is required to include UDF columns in exports.

---

## Related

- [Forms](forms.md) — Visual form builder for extending the New Call workflow with custom form layouts
- [Workflows](workflows.md) — Event-driven automations that can read and write UDF field values
- [User Defined Fields API](../api/user-defined-fields.md) — REST API for managing definitions and values programmatically
