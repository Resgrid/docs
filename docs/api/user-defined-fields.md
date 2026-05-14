---
sidebar_position: 5
---

# User Defined Fields API

The User Defined Fields API provides full programmatic access to UDF definitions, field configurations, field values, and the mobile rendering schema. All endpoints are scoped to the authenticated user's department.

**Base URL:** `/api/v4/UserDefinedFields`

## Authentication

All User Defined Fields API endpoints require a valid JWT token. See [API Authentication](authentication) for details.

## Entity Types

The `entityType` parameter is an integer enum used across all endpoints:

| Value | Entity |
|-------|--------|
| `0` | Call |
| `1` | Personnel |
| `2` | Unit |
| `3` | Contact |

## Field Data Types

The `fieldDataType` value on field objects is an integer enum:

| Value | Type | Description |
|-------|------|-------------|
| `0` | Text | Single-line text |
| `1` | Number | Integer |
| `2` | Decimal | Floating-point number |
| `3` | Boolean | True/false checkbox |
| `4` | Date | Date only (ISO 8601: `YYYY-MM-DD`) |
| `5` | DateTime | Date and time (ISO 8601: `YYYY-MM-DDTHH:MM:SS`) |
| `6` | Dropdown | Single-select; requires `options` in validation rules |
| `7` | MultiSelect | Multi-select; requires `options` in validation rules |
| `8` | Email | Email address |
| `9` | Phone | Phone number |
| `10` | URL | URL |

---

## Definitions

### Get Active Definition

Returns the currently active UDF definition and its fields for the specified entity type.

```
GET /api/v4/UserDefinedFields/{entityType}
```

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `entityType` | int | Path | Entity type enum value |

**Response:** `UdfDefinitionResult`

```json
{
  "udfDefinitionId": "def_abc123",
  "departmentId": 42,
  "entityType": 0,
  "version": 3,
  "isActive": true,
  "createdOn": "2026-03-01T10:00:00Z",
  "createdBy": "user_xyz",
  "updatedOn": "2026-03-05T14:30:00Z",
  "updatedBy": "user_xyz",
  "fields": [
    {
      "udfFieldId": "fld_001",
      "udfDefinitionId": "def_abc123",
      "name": "chemical_class",
      "label": "Chemical Class",
      "description": "Select the UN hazard class for the primary chemical involved.",
      "placeholder": "Select a class...",
      "fieldDataType": 6,
      "isRequired": true,
      "isReadOnly": false,
      "defaultValue": null,
      "validationRules": {
        "options": [
          { "key": "class1", "label": "Class 1 – Explosives" },
          { "key": "class2", "label": "Class 2 – Gases" },
          { "key": "class3", "label": "Class 3 – Flammable Liquids" }
        ],
        "customErrorMessage": null
      },
      "sortOrder": 1,
      "groupName": "Hazmat Details",
      "isVisibleOnMobile": true,
      "isVisibleOnReports": true,
      "isEnabled": true
    }
  ]
}
```

Returns `404 Not Found` if no active definition exists for the entity type.

---

### Create or Update Definition

Creates a new definition (or a new version of an existing definition) for the specified entity type. The previous active version is automatically marked inactive.

```
POST /api/v4/UserDefinedFields
```

**Authorization:** Department Admin

**Request Body:** `UdfDefinitionInput`

```json
{
  "entityType": 0,
  "fields": [
    {
      "name": "chemical_class",
      "label": "Chemical Class",
      "description": "Select the UN hazard class for the primary chemical involved.",
      "placeholder": "Select a class...",
      "fieldDataType": 6,
      "isRequired": true,
      "isReadOnly": false,
      "defaultValue": null,
      "validationRules": {
        "options": [
          { "key": "class1", "label": "Class 1 – Explosives" },
          { "key": "class2", "label": "Class 2 – Gases" }
        ]
      },
      "sortOrder": 1,
      "groupName": "Hazmat Details",
      "isVisibleOnMobile": true,
      "isVisibleOnReports": true,
      "isEnabled": true
    }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `entityType` | int | Yes | Entity type enum value |
| `fields` | array | Yes | Array of field definitions (see [Field Input](#field-input)) |

**Response:** `UdfDefinitionResult` — the newly created definition with the incremented version number.

**Audit:** Creates a `UdfDefinitionCreated` or `UdfDefinitionUpdated` audit log entry.

---

### Delete Field from Active Definition

Removes a single field from the active definition by creating a new definition version without that field.

```
DELETE /api/v4/UserDefinedFields/Fields/{fieldId}
```

**Authorization:** Department Admin

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `fieldId` | string | Path | The `udfFieldId` of the field to remove |

**Response:** `UdfDefinitionResult` — the new definition version without the removed field.

**Audit:** Creates a `UdfFieldRemoved` audit log entry.

:::note Historical Preservation
Removing a field creates a new definition version. Existing `UdfFieldValue` records for the removed field in prior entity records are preserved in the database and remain accessible via historical queries.
:::

---

## Field Values

### Get Values for an Entity

Returns all UDF field values saved for a specific entity record, keyed to the definition version active at the time the values were saved.

```
GET /api/v4/UserDefinedFields/Values/{entityType}/{entityId}
```

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `entityType` | int | Path | Entity type enum value |
| `entityId` | string | Path | The ID of the entity record (e.g., call ID, user ID, unit ID, contact ID) |

**Response:** `UdfFieldValuesResult`

```json
{
  "entityId": "call_789",
  "entityType": 0,
  "udfDefinitionId": "def_abc123",
  "definitionVersion": 3,
  "values": [
    {
      "udfFieldValueId": "val_001",
      "udfFieldId": "fld_001",
      "udfDefinitionId": "def_abc123",
      "entityId": "call_789",
      "entityType": 0,
      "value": "class3",
      "createdOn": "2026-03-06T09:15:00Z",
      "createdBy": "user_xyz",
      "updatedOn": "2026-03-06T09:15:00Z",
      "updatedBy": "user_xyz"
    }
  ]
}
```

Returns `404 Not Found` if the entity has no saved UDF values.

---

### Save Values for an Entity

Saves (creates or updates) UDF field values for a specific entity record. Server-side validation is applied against the field's `validationRules` before saving.

```
POST /api/v4/UserDefinedFields/Values
```

**Request Body:** `UdfFieldValuesInput`

```json
{
  "entityType": 0,
  "entityId": "call_789",
  "values": [
    {
      "udfFieldId": "fld_001",
      "value": "class3"
    },
    {
      "udfFieldId": "fld_002",
      "value": "150"
    }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `entityType` | int | Yes | Entity type enum value |
| `entityId` | string | Yes | The ID of the entity record |
| `values` | array | Yes | Array of field value pairs |
| `values[].udfFieldId` | string | Yes | The field's `udfFieldId` |
| `values[].value` | string | Yes | The value as a string (see type-specific formatting below) |

#### Value Formatting by Data Type

| Data Type | Expected Format |
|-----------|----------------|
| Text, Email, Phone, URL | Plain string |
| Number | Integer string (e.g., `"42"`) |
| Decimal | Decimal string (e.g., `"3.14"`) |
| Boolean | `"true"` or `"false"` |
| Date | ISO 8601 date string (`"2026-03-01"`) |
| DateTime | ISO 8601 datetime string (`"2026-03-01T14:30:00"`) |
| Dropdown | The option **key** string |
| MultiSelect | Comma-separated option **key** strings (e.g., `"key1,key2"`) |

**Response:** `UdfFieldValuesResult` — the saved values.

**Validation Errors:** Returns `400 Bad Request` with a validation error object if any field values fail server-side validation:

```json
{
  "errors": {
    "fld_001": ["Chemical Class is required."],
    "fld_002": ["Quantity must be between 0 and 10000."]
  }
}
```

**Audit:** Creates a `UdfFieldValueSaved` audit log entry capturing the entity type, entity ID, and changed field values (old → new).

---

## Mobile Schema

The schema endpoints return a structured JSON representation of the UDF definition and fields that mobile applications (React Native) use to dynamically render form controls with native validation.

### Get Schema (Empty Form)

Returns the field schema for an entity type without any pre-populated values. Use this when rendering a **new record** form on mobile.

```
GET /api/v4/UserDefinedFields/Schema/{entityType}
```

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `entityType` | int | Path | Entity type enum value |

**Response:** `UdfSchemaResult`

```json
{
  "definitionId": "def_abc123",
  "entityType": 0,
  "version": 3,
  "groups": [
    {
      "groupName": "Hazmat Details",
      "fields": [
        {
          "fieldId": "fld_001",
          "name": "chemical_class",
          "label": "Chemical Class",
          "description": "Select the UN hazard class for the primary chemical involved.",
          "placeholder": "Select a class...",
          "fieldDataType": 6,
          "isRequired": true,
          "isReadOnly": false,
          "isVisibleOnMobile": true,
          "currentValue": null,
          "defaultValue": null,
          "validationRules": {
            "options": [
              { "key": "class1", "label": "Class 1 – Explosives" },
              { "key": "class2", "label": "Class 2 – Gases" },
              { "key": "class3", "label": "Class 3 – Flammable Liquids" }
            ]
          }
        }
      ]
    }
  ]
}
```

Returns `404 Not Found` if no active definition exists for the entity type.

---

### Get Schema (Pre-Populated)

Returns the field schema pre-populated with an existing entity record's saved values. Use this when rendering an **edit record** form on mobile.

```
GET /api/v4/UserDefinedFields/Schema/{entityType}/{entityId}
```

| Parameter | Type | Location | Description |
|-----------|------|----------|-------------|
| `entityType` | int | Path | Entity type enum value |
| `entityId` | string | Path | The ID of the entity record |

**Response:** `UdfSchemaResult` — same structure as the empty schema, but all `currentValue` fields are populated with the entity's saved values.

---

## Validation Rules Object

The `validationRules` property is a JSON object on each field. Not all properties apply to every field data type.

```json
{
  "minLength": 2,
  "maxLength": 100,
  "regex": "^[A-Z]{2,5}$",
  "regexErrorMessage": "Must be 2–5 uppercase letters.",
  "minValue": 0,
  "maxValue": 10000,
  "options": [
    { "key": "opt1", "label": "Option One" },
    { "key": "opt2", "label": "Option Two" }
  ],
  "customErrorMessage": "This field is required for hazmat incidents."
}
```

| Property | Applies To | Description |
|----------|-----------|-------------|
| `minLength` | Text, Email, Phone, URL | Minimum character count |
| `maxLength` | Text, Email, Phone, URL | Maximum character count |
| `regex` | Text | Regex pattern the value must match |
| `regexErrorMessage` | Text | Error message for regex mismatch |
| `minValue` | Number, Decimal | Minimum numeric value |
| `maxValue` | Number, Decimal | Maximum numeric value |
| `options` | Dropdown, MultiSelect | Array of `{ key, label }` pairs representing valid choices |
| `customErrorMessage` | All | Overrides the default validation error message |

---

## Integration with Entity Endpoints

UDF field values are also accessible via the standard entity API endpoints. The response models for Calls, Personnel, Units, and Contacts include a `udfValues` array when UDF values exist for that record.

### Call Responses

`CallResult` objects include a `udfValues` field:

```json
{
  "callId": "call_789",
  "name": "Structure Fire",
  ...
  "udfValues": [
    { "udfFieldId": "fld_001", "name": "chemical_class", "label": "Chemical Class", "value": "class3" }
  ]
}
```

### Submitting UDF Values via Entity Endpoints

When creating or updating a Call, Personnel record, Unit, or Contact via their respective API endpoints, include a `udfValues` array in the request body:

```json
{
  "name": "Structure Fire",
  "nature": "Working fire",
  ...
  "udfValues": [
    { "udfFieldId": "fld_001", "value": "class3" },
    { "udfFieldId": "fld_002", "value": "150" }
  ]
}
```

Values are validated server-side and saved atomically with the parent record. Validation errors for UDF fields are included in the `400 Bad Request` response alongside standard field errors.

---

## Related

- [User Defined Fields Configuration](../configuration/user-defined-fields.md) — Admin guide for configuring field definitions, data types, and validation rules
- [User Defined Fields (Web App)](../web-app/user-defined-fields.md) — Web application usage guide
- [API Authentication](authentication) — How to authenticate API requests
