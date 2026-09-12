---
sidebar_position: 12
title: Contacts
---

# Contacts

**Contacts** are the people and organisations *outside* your department that you deal with on calls and in business: property owners, key-holders, businesses, mutual-aid agencies, vendors, patients' next of kin, clients. Contacts carry addresses, phone numbers, **notes** (including *alert notes* that pop up when the contact is attached to a call), attachments, categories and — for premises — legacy **pre-plan** data.

**Left menu → Contacts.** Categories and contact note types are managed from the page and under **Department → Types**. Suppliers in [Inventory purchasing](inventory#purchasing) and occupancies in [Records](records/occupancies) link to contacts.

![Contacts](/img/web-app/contacts/index.png)

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

![Add contact](/img/web-app/contacts/add.png)

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

![Contact detail](/img/web-app/contacts/view.png)

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

## Setup examples

| Department type | How to set it up |
|---|---|
| **Fire** | Categories: Key holders, Businesses, Mutual aid, Vendors; alert notes for aggressive dogs, oxygen in use, access issues; pre-plan data moves to Records occupancies when enabled. |
| **EMS** | Categories: Facilities (nursing homes with charge-nurse numbers), Hospitals, Frequent patients (with ADP enrolled). |
| **SAR** | Categories: Agencies (sheriff, park service), Landowners, Helicopter providers, Subjects (restricted). |
| **Emergency management** | Categories: ESF partners, Shelter operators, Utilities, Media; distribution lists built from contacts. |
| **Security** | Categories: Clients, Site contacts, Alarm companies, Police liaison; per-client visibility via group scoping. |
| **Delivery / transit** | Customers and stops as contacts; link to route stops. |

## Technical reference

`ContactsController`; routes `/User/Contacts/{Index,Add,View,Edit,Delete,Categories,AddCategory,EditCategory,Preplan,Attachments}?contactId=`; permissions `ContactView`, `ContactEdit`, `ContactDelete`, `ViewProtectedContactData`; contact details are ADP-protected fields.

### Interactions with Other Modules
| Module | Interaction |
|--------|-------------|
| **Dispatch** | Contacts linked to calls; alert notes displayed during dispatch |
| **Types** | Contact note types managed in Types controller |
| **Calls** | Calls reference contacts |
