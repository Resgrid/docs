---
sidebar_position: 22
title: Types & Configuration
---

# Types & Configuration

The Types module is a centralized configuration area for managing various entity types used throughout the system. It is managed by the `TypesController`.

## Unit Types

Define categories for units (Engine, Ladder, Ambulance, etc.):

| Field | Description |
|-------|-------------|
| Type Name | Unit type name (required, unique) |
| Custom State ID | Associate with a custom unit state set |
| Map Icon Type | Icon used on maps |

### Operations
- **Create** — `Department_Update` + `CanUserAddUnitTypeAsync`
- **Edit** — `Department_Update` + `CanUserEditUnitTypeAsync`; validates no duplicate names
- **Delete** — `Department_Update` + authorization check

All operations fire audit events with before/after snapshots.

## Call Types

Define incident categories (Fire, EMS, MVA, etc.):

| Field | Description |
|-------|-------------|
| Type Name | Call type name (required) |
| Map Icon Type | Icon used on maps |

### Operations
- **Create** — `Department_Update` + `CanUserAddCallTypeAsync`
- **Edit** — `Department_Update` + `CanUserModifyCallTypeAsync`
- **Delete** — `Department_Update` + authorization check

## Call Priorities

Define urgency levels for calls with visual and audio indicators:

| Field | Description |
|-------|-------------|
| Priority Name | Display name (required, unique) |
| Color | Priority color (hex) |
| Is Default | Default priority (only one allowed) |
| Dispatch Personnel | Whether to auto-dispatch personnel |
| Dispatch Units | Whether to auto-dispatch units |
| Force Notify All | Force notification to all personnel |
| Tone | Alert tone selection |
| Alert Sound | WAV file upload (≤1 MB) |

:::note
Push notification and iOS push sound upload features are currently disabled (code commented out).
:::

### Operations
- **Create** — Validates single-default rule and name uniqueness
- **Edit** — Same validations
- **Delete** — Soft-deletes (`IsDeleted = true`)

## Certification Types

Define categories for personnel certifications (EMT-B, Paramedic, Firefighter I, etc.):

| Field | Description |
|-------|-------------|
| Type Name | Certification type name (required, unique) |

## Document Categories

Categorize department documents:

| Field | Description |
|-------|-------------|
| Category Name | Document category name (required, unique) |

## Note Categories

Categorize department notes:

| Field | Description |
|-------|-------------|
| Category Name | Note category name (required, unique) |

## Contact Note Types

Categorize notes on external contacts with color coding:

| Field | Description |
|-------|-------------|
| Type Name | Note type name (required, unique) |
| Color | Display color for the note type |

### Operations
- Create, Edit (with `CanUserEditContactNoteTypeAsync`), and Delete

## Personnel Status List Ordering

Configure the sort order of personnel statuses in the dashboard view:

- Define which statuses appear in the list
- Set the display order (weight-based)
- Add or remove statuses from the ordered list

## Common Patterns

### Validation
All types validate:
- Name is not empty
- Name is unique within the department (no duplicates)

### Audit Trail
Every create, edit, and delete operation fires an `AuditEvent` with:
- Audit log type (e.g., `UnitTypeAdded`, `CallTypeEdited`, `CertificationTypeRemoved`)
- Before/after JSON snapshots for edits
- IP address and user agent

### Two-Layer Authorization
All operations use:
1. ASP.NET `[Authorize(Policy = "Department_Update")]` attribute
2. Resgrid's `IAuthorizationService` for fine-grained checks

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Units** | Unit types categorize units |
| **Dispatch** | Call types and priorities used in call creation |
| **Custom Statuses** | Unit types reference custom state sets |
| **Documents** | Document categories used for filtering |
| **Notes** | Note categories used for filtering |
| **Contacts** | Contact note types used for note classification |
| **Certifications** | Certification types used in personnel profiles |
| **Mapping** | Map icon types for calls and units |
| **Dashboard** | Personnel status ordering affects status display |
