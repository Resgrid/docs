---
sidebar_position: 19
title: Contacts
---

# Contacts

The Contacts module manages external contacts (people and organizations) with category organization, notes, and address management. It is managed by the `ContactsController`.

## Contact List

**Authorization:** `Contacts_View` policy

Displays all contacts organized in a tree structure:
- **All Contacts** — Root node
- **No Category** — Contacts without a category
- **Per-Category** — Contacts grouped by category

## Contact Types

The system supports two contact types:

| Type | Required Fields |
|------|----------------|
| **Person** (0) | First name, Last name |
| **Company** (1) | Company name |

## Creating Contacts

**Authorization:** `Contacts_Create` policy

### Contact Fields

| Field | Required | Description |
|-------|----------|-------------|
| Contact Type | Yes | Person or Company |
| First/Last Name | Yes (Person) | Person's name |
| Company Name | Yes (Company) | Organization name |
| Category | No | Classification category |
| Email | No | Contact email |
| Phone | No | Contact phone |

### Address Management

Contacts support two addresses:

| Address Type | Description |
|-------------|-------------|
| **Physical Address** | Primary location |
| **Mailing Address** | Postal address (can be same as physical) |

Both addresses include full fields (street, city, state, zip, country).

### GPS Coordinates

Contacts can have three sets of coordinates:
- **Location** — Primary contact location
- **Entrance** — Entrance point
- **Exit** — Exit point

All coordinates are validated for proper decimal format.

### Audit Trail
Creates `AuditEvent` on creation with IP address and user agent.

## Editing Contacts

**Authorization:** `Contacts_Create` policy

Full edit with same validation as creation. Updates or creates addresses as needed.

Creates `AuditEvent` with before/after JSON snapshots.

## Deleting Contacts

**Authorization:** `Contacts_Create` policy + `CanUserDeleteContactAsync` runtime check

Creates `AuditEvent` on deletion.

## Contact Notes

### Adding Notes

Notes can be added to contacts with:

| Field | Description |
|-------|-------------|
| Note Text | Note content |
| Alert Flag | Whether this note should be displayed as an alert |
| Note Type | Classification type (color-coded) |
| Expiration | Optional expiry date |

Alert-flagged notes are highlighted with a yellow background and appear prominently when the contact is referenced in calls.

### Viewing Notes

The `GetNotesJson` endpoint returns notes with:
- Note text and type name
- Created-by user name
- Alert background styling
- Note type color

## Contact Categories

### Managing Categories

| Action | Authorization | Description |
|--------|---------------|-------------|
| List Categories | `Contacts_Create` | View all categories |
| Add Category | `Contacts_Create` | Create new category |
| Edit Category | `Contacts_Create` | Modify category |
| Delete Category | `Contacts_Delete` | Remove category (blocked if contacts exist) |

:::warning Category Deletion Protection
A category **cannot be deleted** if contacts are assigned to it. Reassign or remove contacts first.
:::

## Call Integration

The `GetCallsJson` endpoint returns all calls linked to a contact with:
- Call name and type
- Priority name and color
- Timestamp

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Dispatch** | Contacts linked to calls; alert notes displayed during dispatch |
| **Types** | Contact note types managed in Types controller |
| **Calls** | Calls reference contacts |
