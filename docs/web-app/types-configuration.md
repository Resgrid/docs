---
sidebar_position: 39
title: Types & Configuration
---

# Types & Configuration

**Types** are the pick-lists the rest of Resgrid is built on: **unit types** (Engine, Ambulance, Patrol car), **call types** (Fire, Medical, Alarm), **call priorities** (with colours, sounds and dispatch behaviour), **certification types**, **document categories**, **note categories**, **contact note types** and the **personnel status list ordering**. Set them up early — dispatch, run cards, NERIS crosswalks, custom statuses and reports all refer to them.

**Department menu → Types.**

![Types](/img/web-app/types/index.png)

## Unit Types

Define categories for units (Engine, Ladder, Ambulance, etc.):

![New unit type](/img/web-app/types/new-unit-type.png)

| Field | Description |
|-------|-------------|
| Type Name | Unit type name (required, unique) |
| Class | What kind of unit it is (Engine, Aerial, Ambulance …), see [Classes and meanings](#classes-and-meanings) |
| Custom State ID | Associate with a custom unit state set |
| Map Icon Type | Icon used on maps |

### Operations
- **Create** — `Department_Update` + `CanUserAddUnitTypeAsync`
- **Edit** — `Department_Update` + `CanUserEditUnitTypeAsync`; validates no duplicate names
- **Delete** — `Department_Update` + authorization check

All operations fire audit events with before/after snapshots.

## Call Types

Define incident categories (Fire, EMS, MVA, etc.):

![New call type](/img/web-app/types/new-call-type.png)

| Field | Description |
|-------|-------------|
| Type Name | Call type name (required) |
| Class | What kind of call it is (Fire, Medical, Rescue …), see [Classes and meanings](#classes-and-meanings) |
| Map Icon Type | Icon used on maps |

Calls remember which call type they were logged with, so **renaming a call type** keeps its old calls linked to it (check-in timer overrides, run cards and protocols keyed on the type still apply to them). Protocol triggers and call templates that name the type are renamed with it.

### Operations
- **Create** — `Department_Update` + `CanUserAddCallTypeAsync`
- **Edit** — `Department_Update` + `CanUserModifyCallTypeAsync`
- **Delete** — `Department_Update` + authorization check

## Call Priorities

Define urgency levels for calls with visual and audio indicators:

![New call priority](/img/web-app/types/new-call-priority.png)

| Field | Description |
|-------|-------------|
| Priority Name | Display name (required, unique) |
| Meaning | Which standard priority it means: Low, Medium, High or Emergency, see [Classes and meanings](#classes-and-meanings) |
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

Until you add a priority of your own, calls use the four built-in priorities (Low, Medium, High, Emergency). Once you add one, your priorities replace the built-in ones.

<a id="classes-and-meanings"></a>

## Classes and meanings

Call types, unit types and call priorities are named however your department likes: *Code 3 Medical*, *Pumper*, *Priority 1*. A **class** (call and unit types) or **meaning** (priorities) tells Resgrid what each one is, the same way a [status meaning](custom-statuses#status-meanings) does for statuses. Resgrid uses it, not the name, for reports, defaults and integrations, and for comparing priorities across departments and apps, such as sorting by urgency. A new or existing type starts with **None**.

The edit page shows **Suggested from the name: …** under the picker when the name gives a clear hint, for example *Fire* for *STRUCTURE FIRE*. It is only a hint: Resgrid never sets a class for you, so pick it and press **Update** to keep it.

![Edit Call Type: the Class picker on None with "Suggested from the name: Fire"](/img/web-app/types/call-type-class.png)

![Edit Unit Type: the Class picker on None with "Suggested from the name: Engine"](/img/web-app/types/unit-type-class.png)

![Edit Call Priority: the Meaning picker on None with "Suggested from the name: Emergency"](/img/web-app/types/call-priority-meaning.png)

| List | Choices |
|---|---|
| **Call type class** | Fire, Medical, Rescue, Traffic Collision, Hazardous Materials, Alarm, Service Call, Law Enforcement, Disaster or Weather, Mutual Aid, Non-Emergency Activity (training, drills, standby, planned events), Other |
| **Unit type class** | Engine, Aerial, Rescue, Tanker, Ambulance, Medical Response (non-transporting), Wildland, Hazardous Materials, Command, Support, Watercraft, Aircraft, Patrol, Other |
| **Priority meaning** | Low, Medium, High, Emergency. The built-in priorities are their own meaning. |

The classes are deliberately broad so they fit any country and discipline. NERIS incident types are mapped separately, on [Records](records/overview) incident reports.

| Your name | Class or meaning |
|---|---|
| Call type *STRUCTURE FIRE*, *Brush Fire*, *Vehicle Fire* | Fire |
| Call type *MVA*, *TRAFFIC ACCIDENT* | Traffic Collision |
| Call type *Lift Assist*, *Lockout* | Service Call |
| Call type *Fire Alarm* | Alarm |
| Call type *SAR*, *Missing Hiker* | Rescue |
| Unit type *Pumper*, *Quint* | Engine, Aerial |
| Unit type *Medic*, *ALS*, *QRV* | Ambulance, Ambulance, Medical Response |
| Unit type *Brush*, *Tender*, *Utility* | Wildland, Tanker, Support |
| Priority *Code 3*, *Echo* | Emergency |
| Priority *Routine*, *Non-emergency* | Low |

## Certification Types

Define categories for personnel certifications (EMT-B, Paramedic, Firefighter I, etc.):

| Field | Description |
|-------|-------------|
| Type Name | Certification type name (required, unique) |

The **Manage typed catalog** button opens the full [Certifications](business-ops/certifications) module, where each type also gets a stable code, category, person/unit scope, default validity, verification and credit-hour rules, and where you can add 90+ common credentials from the template gallery. Types created here appear in that catalog too; open them there to add the code, scope and rules.

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

## Setup examples

| Department type | How to set it up |
|---|---|
| **Volunteer / career fire** | Unit types: Engine, Ladder/Truck, Rescue, Tender, Brush, Command, Utility. Call types: Structure fire, Vehicle fire, Brush/wildland, Alarm, MVA, Medical, Hazmat, Public assist, Water rescue. Priorities: Low, Medium, High, Emergency (Emergency = full alert sound, overrides quiet hours). Certifications: FF1, FF2, Driver/Operator, EMT, Officer 1. |
| **EMS** | Unit types: ALS, BLS, Supervisor, Wheelchair van. Call types by nature (Cardiac, Trauma, Respiratory, IFT, Standby). Priorities Echo/Delta/Charlie/Bravo/Alpha/Omega if you follow MPDS. Certifications: EMT, AEMT, Paramedic, CPR, ACLS, PALS. |
| **SAR** | Unit types: Ground team, K9 team, Technical team, UTV, Drone. Call types: Missing person, Overdue hiker, Rescue, Recovery, Evidence search, Mutual aid, Training. Certifications: SARTECH II, Wilderness first aid, Rope tech. |
| **Emergency management** | Unit types: EOC section, MCV, Trailer. Call types: Activation, Weather event, Resource request, Shelter opening, Exercise. Priorities: Monitoring, Partial activation, Full activation. |
| **CERT** | Unit types: CERT team; call types: Deployment, Training, Community event. |
| **Security** | Unit types: Patrol vehicle, Foot post, Bike; call types: Alarm, Suspicious activity, Escort, Medical, Fire alarm, Access control. Priorities: Routine, Urgent, Emergency. |
| **Delivery / transit** | Unit types: Van, Truck, Bus; call types: Delivery, Pickup, Breakdown, Accident, Passenger incident. Priorities by SLA. |
| **Industrial ERT** | Unit types: Fire brigade, Hazmat, Rescue, Medical; call types: Fire, Spill/release, Confined space, Medical, Evacuation, Drill; certifications for every OSHA/NFPA qualification. |

## Technical reference

`TypesController` (+ `Department/Types` index page); routes `/User/Types/{NewUnitType,EditUnitType,NewCallType,EditCallType,NewCallPriority,EditCallPriority,NewCertificationType,NewDocumentType,NewNoteType,NewContactNoteType,ListOrdering}`; model `UnitType`, `CallType`, `DepartmentCallPriority` (colour, sound, `IsDefault`, `Tone`, `DispatchPersonnel/Units`), `CertificationType`, `DocumentCategory`, `NoteCategory`, `ContactNoteType`.

| Item | Value |
|---|---|
| Classes and meanings | `CallType.BaseType` (a `CallTypeClasses` value), `UnitType.BaseType` (`UnitTypeClasses`), `DepartmentCallPriority.BaseType` (a `CallPriority` value, 0 Low to 3 Emergency; built-in priorities are their own). -1 = none. A posted value that is not in the enum is saved as -1 |
| Suggestions | `BaseTypeSuggestions.SuggestCallTypeClass`, `SuggestUnitTypeClass`, `SuggestPriority`; shown on the edit pages only while the value is -1, never saved on their own |
| Call type link | `Call.CallTypeId`: the call type a call was logged with (`Call.Type` keeps the name). Worked out from the name when a call is saved (`CallTypeLink`); a call already linked keeps its link after a rename. Null when the name matches no call type |
| Rename | Editing a call type's name also renames it in protocol triggers (`IProtocolsService.RenameCallTypeInTriggersAsync`) and call quick templates (`ITemplatesService.RenameCallTypeInTemplatesAsync`) |
| API | v4 `CallTypes` and `CallPriorities` results include `BaseType`; v4 call results include `TypeId` (the linked call type's id, or null) |
| Migration | M0272 (`M0272_AddListBaseTypes`, PostgreSQL `M0272_AddListBaseTypesPg`): adds `BaseType` (default -1) to `CallTypes`, `UnitTypes` and `DepartmentCallPriorities`, adds `Calls.CallTypeId` and links existing calls to their department's call type of the same name |

### Interactions with Other Modules
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
