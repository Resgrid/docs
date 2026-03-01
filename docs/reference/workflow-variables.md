---
sidebar_position: 7
title: Workflow Template Variables
---

# Workflow Template Variable Reference

This page provides the complete reference for all template variables available in Resgrid Workflows. Variables use [Scriban](https://github.com/scriban/scriban) syntax: `{{ variable.property }}`.

Every workflow template has access to **common variables** (department, timestamp, user) plus **event-specific variables** that depend on the trigger event type.

## Common Variables

These variables are available in **every** workflow regardless of trigger event type.

### Department Variables

| Variable | Type | Description |
|----------|------|-------------|
| `{{ department.id }}` | int | Department ID |
| `{{ department.name }}` | string | Department name |
| `{{ department.code }}` | string | 4-character department code |
| `{{ department.type }}` | string | Department type (Fire, EMS, etc.) |
| `{{ department.time_zone }}` | string | Department time zone ID |
| `{{ department.use_24_hour_time }}` | bool | 24-hour time preference |
| `{{ department.created_on }}` | datetime | Department creation date |
| `{{ department.address.street }}` | string | Street address |
| `{{ department.address.city }}` | string | City |
| `{{ department.address.state }}` | string | State/Province |
| `{{ department.address.postal_code }}` | string | Postal/ZIP code |
| `{{ department.address.country }}` | string | Country |
| `{{ department.address.full }}` | string | Full formatted address |
| `{{ department.phone_number }}` | string | Department phone number (from settings) |

### Timestamp Variables

| Variable | Type | Description |
|----------|------|-------------|
| `{{ timestamp.utc_now }}` | datetime | Current UTC timestamp |
| `{{ timestamp.department_now }}` | datetime | Current time in department's time zone |
| `{{ timestamp.date }}` | string | Current date (department TZ) as `yyyy-MM-dd` |
| `{{ timestamp.time }}` | string | Current time (department TZ) as `HH:mm:ss` or `hh:mm tt` |
| `{{ timestamp.day_of_week }}` | string | Day name (e.g., "Monday") |

### User Variables (Triggering User)

Populated from the user who triggered the event. If no specific user is associated with the event (e.g., Unit Added, Shift Created), these variables are empty/null.

| Variable | Type | Description |
|----------|------|-------------|
| `{{ user.id }}` | string | User ID |
| `{{ user.first_name }}` | string | First name |
| `{{ user.last_name }}` | string | Last name |
| `{{ user.full_name }}` | string | Full name ("First Last") |
| `{{ user.email }}` | string | Email address |
| `{{ user.mobile_number }}` | string | Mobile phone number |
| `{{ user.home_number }}` | string | Home phone number |
| `{{ user.identification_number }}` | string | ID/badge number |
| `{{ user.username }}` | string | Login username |
| `{{ user.time_zone }}` | string | User's personal time zone |

---

## Event-Specific Variables

### Call Added / Call Updated / Call Closed

**Triggering user:** The reporting user (`Call.ReportingUserId`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ call.id }}` | int | Call ID |
| `{{ call.number }}` | string | Call number |
| `{{ call.name }}` | string | Call name |
| `{{ call.nature }}` | string | Nature of call |
| `{{ call.notes }}` | string | Call notes |
| `{{ call.address }}` | string | Call address |
| `{{ call.geo_location }}` | string | GPS coordinates |
| `{{ call.type }}` | string | Call type |
| `{{ call.incident_number }}` | string | Incident number |
| `{{ call.reference_number }}` | string | Reference number |
| `{{ call.map_page }}` | string | Map page reference |
| `{{ call.priority }}` | int | Priority level |
| `{{ call.priority_text }}` | string | Priority as text (Low, Medium, High, Emergency) |
| `{{ call.is_critical }}` | bool | Whether the call is critical |
| `{{ call.state }}` | int | Call state code |
| `{{ call.state_text }}` | string | Call state as text (Active, Closed, etc.) |
| `{{ call.source }}` | int | Call source code |
| `{{ call.external_id }}` | string | External identifier |
| `{{ call.logged_on }}` | datetime | When the call was logged |
| `{{ call.closed_on }}` | datetime | When the call was closed (null if open) |
| `{{ call.completed_notes }}` | string | Closure/completion notes |
| `{{ call.contact_name }}` | string | Contact person name |
| `{{ call.contact_number }}` | string | Contact phone number |
| `{{ call.w3w }}` | string | What3Words location |
| `{{ call.dispatch_count }}` | int | Number of dispatched resources |
| `{{ call.dispatch_on }}` | datetime | When dispatch occurred |
| `{{ call.form_data }}` | string | Custom form data |
| `{{ call.is_deleted }}` | bool | Whether the call is deleted |
| `{{ call.deleted_reason }}` | string | Deletion reason |

#### Call Collection Variables

The following array variables are available on call events. Use Scriban `for` loops to iterate over them.

##### Dispatched Personnel (`call.dispatches`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ call.dispatches }}` | array | List of dispatched personnel |
| `{{ call.dispatches[n].user_id }}` | string | Dispatched user ID |
| `{{ call.dispatches[n].dispatch_count }}` | int | Dispatch count |
| `{{ call.dispatches[n].dispatched_on }}` | datetime | Dispatch timestamp |

##### Dispatched Units (`call.unit_dispatches`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ call.unit_dispatches }}` | array | List of dispatched units |
| `{{ call.unit_dispatches[n].unit_id }}` | int | Unit ID |
| `{{ call.unit_dispatches[n].unit_name }}` | string | Unit name |
| `{{ call.unit_dispatches[n].dispatch_count }}` | int | Dispatch count |
| `{{ call.unit_dispatches[n].dispatched_on }}` | datetime | Dispatch timestamp |

##### Dispatched Groups (`call.group_dispatches`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ call.group_dispatches }}` | array | List of dispatched groups |
| `{{ call.group_dispatches[n].group_id }}` | int | Group ID |
| `{{ call.group_dispatches[n].group_name }}` | string | Group name |
| `{{ call.group_dispatches[n].dispatch_count }}` | int | Dispatch count |
| `{{ call.group_dispatches[n].dispatched_on }}` | datetime | Dispatch timestamp |

##### Dispatched Roles (`call.role_dispatches`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ call.role_dispatches }}` | array | List of dispatched roles |
| `{{ call.role_dispatches[n].role_id }}` | int | Role ID |
| `{{ call.role_dispatches[n].role_name }}` | string | Role name |
| `{{ call.role_dispatches[n].dispatch_count }}` | int | Dispatch count |
| `{{ call.role_dispatches[n].dispatched_on }}` | datetime | Dispatch timestamp |

##### Call Notes (`call.notes_list`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ call.notes_list }}` | array | List of call notes |
| `{{ call.notes_list[n].note }}` | string | Note text |
| `{{ call.notes_list[n].source }}` | string | Note source |
| `{{ call.notes_list[n].timestamp }}` | datetime | Note timestamp |
| `{{ call.notes_list[n].user_id }}` | string | Note author user ID |

##### Call Contacts (`call.contacts`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ call.contacts }}` | array | List of call contacts |
| `{{ call.contacts[n].name }}` | string | Contact name |
| `{{ call.contacts[n].number }}` | string | Contact number |
| `{{ call.contacts[n].type }}` | string | Contact type |

##### Example: Iterating Over Dispatched Units

```
{{ for unit in call.unit_dispatches }}
  - {{ unit.unit_name }} (dispatched {{ unit.dispatched_on | date.to_string "%H:%M" }})
{{ end }}
```

---

### Unit Status Changed

**Triggering user:** None (unit-based event; `user.*` variables will be empty)

#### Current Status

| Variable | Type | Description |
|----------|------|-------------|
| `{{ unit_status.id }}` | int | Unit state record ID |
| `{{ unit_status.state }}` | int | Current state code |
| `{{ unit_status.state_text }}` | string | Current state as text |
| `{{ unit_status.timestamp }}` | datetime | When the status changed |
| `{{ unit_status.note }}` | string | Status change note |
| `{{ unit_status.latitude }}` | decimal | Latitude at time of change |
| `{{ unit_status.longitude }}` | decimal | Longitude at time of change |
| `{{ unit_status.destination_id }}` | int | Destination ID (if applicable) |

#### Unit Details

| Variable | Type | Description |
|----------|------|-------------|
| `{{ unit.id }}` | int | Unit ID |
| `{{ unit.name }}` | string | Unit name |
| `{{ unit.type }}` | string | Unit type |
| `{{ unit.vin }}` | string | Vehicle Identification Number |
| `{{ unit.plate_number }}` | string | License plate number |
| `{{ unit.station_group_id }}` | int | Assigned station group ID |

#### Previous Status

| Variable | Type | Description |
|----------|------|-------------|
| `{{ previous_unit_status.state }}` | int | Previous state code |
| `{{ previous_unit_status.state_text }}` | string | Previous state as text |
| `{{ previous_unit_status.timestamp }}` | datetime | Previous status timestamp |

---

### Personnel Staffing Changed

**Triggering user:** The user whose staffing changed (`UserState.UserId`)

#### Current Staffing

| Variable | Type | Description |
|----------|------|-------------|
| `{{ staffing.id }}` | int | Staffing record ID |
| `{{ staffing.state }}` | int | Current staffing state code |
| `{{ staffing.state_text }}` | string | Staffing state as text (Available, Delayed, etc.) |
| `{{ staffing.timestamp }}` | datetime | When the staffing changed |
| `{{ staffing.note }}` | string | Staffing change note |

#### Previous Staffing

| Variable | Type | Description |
|----------|------|-------------|
| `{{ previous_staffing.state }}` | int | Previous staffing state code |
| `{{ previous_staffing.state_text }}` | string | Previous staffing state as text |
| `{{ previous_staffing.timestamp }}` | datetime | Previous staffing timestamp |

---

### Personnel Status Changed

**Triggering user:** The user whose status changed (`ActionLog.UserId`)

#### Current Status

| Variable | Type | Description |
|----------|------|-------------|
| `{{ status.id }}` | int | Action log record ID |
| `{{ status.action_type }}` | int | Action type code |
| `{{ status.action_text }}` | string | Action as text (Standing By, Responding, etc.) |
| `{{ status.timestamp }}` | datetime | When the status changed |
| `{{ status.geo_location }}` | string | GPS coordinates at time of change |
| `{{ status.destination_id }}` | int | Destination ID (if applicable) |
| `{{ status.note }}` | string | Status change note |

#### Previous Status

| Variable | Type | Description |
|----------|------|-------------|
| `{{ previous_status.action_type }}` | int | Previous action type code |
| `{{ previous_status.action_text }}` | string | Previous action as text |
| `{{ previous_status.timestamp }}` | datetime | Previous status timestamp |

---

### User Created

**Triggering user:** The newly created user

| Variable | Type | Description |
|----------|------|-------------|
| `{{ new_user.id }}` | string | New user's ID |
| `{{ new_user.username }}` | string | New user's username |
| `{{ new_user.email }}` | string | New user's email |
| `{{ new_user.name }}` | string | New user's display name |

---

### User Assigned to Group

**Triggering user:** The user being assigned (`UserAssignedToGroupEvent.UserId`)

#### Assigned User

| Variable | Type | Description |
|----------|------|-------------|
| `{{ assigned_user.id }}` | string | User ID |
| `{{ assigned_user.name }}` | string | User name |

#### New Group

| Variable | Type | Description |
|----------|------|-------------|
| `{{ group.id }}` | int | Group ID |
| `{{ group.name }}` | string | Group name |
| `{{ group.type }}` | int | Group type |
| `{{ group.dispatch_email }}` | string | Group dispatch email |
| `{{ group.latitude }}` | string | Group latitude |
| `{{ group.longitude }}` | string | Group longitude |

#### Previous Group

| Variable | Type | Description |
|----------|------|-------------|
| `{{ previous_group.id }}` | int | Previous group ID |
| `{{ previous_group.name }}` | string | Previous group name |

---

### Document Added

**Triggering user:** The user who uploaded the document (`Document.UserId`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ document.id }}` | int | Document ID |
| `{{ document.name }}` | string | Document name |
| `{{ document.category }}` | string | Document category |
| `{{ document.description }}` | string | Document description |
| `{{ document.type }}` | string | Document type |
| `{{ document.filename }}` | string | Original filename |
| `{{ document.admins_only }}` | bool | Whether restricted to admins |
| `{{ document.added_on }}` | datetime | Upload timestamp |

---

### Note Added

**Triggering user:** The user who created the note (`Note.UserId`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ note.id }}` | int | Note ID |
| `{{ note.title }}` | string | Note title |
| `{{ note.body }}` | string | Note body text |
| `{{ note.color }}` | string | Note color |
| `{{ note.category }}` | string | Note category |
| `{{ note.is_admin_only }}` | bool | Whether restricted to admins |
| `{{ note.added_on }}` | datetime | Creation timestamp |
| `{{ note.expires_on }}` | datetime | Expiration date (if set) |

---

### Unit Added

**Triggering user:** None

| Variable | Type | Description |
|----------|------|-------------|
| `{{ unit.id }}` | int | Unit ID |
| `{{ unit.name }}` | string | Unit name |
| `{{ unit.type }}` | string | Unit type |
| `{{ unit.vin }}` | string | Vehicle Identification Number |
| `{{ unit.plate_number }}` | string | License plate number |
| `{{ unit.station_group_id }}` | int | Assigned station group ID |
| `{{ unit.four_wheel }}` | bool | Four-wheel drive capability |
| `{{ unit.special_permit }}` | bool | Special permit status |

---

### Log Added

**Triggering user:** The user who created the log (`Log.LoggedByUserId`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ log.id }}` | int | Log ID |
| `{{ log.narrative }}` | string | Log narrative |
| `{{ log.type }}` | string | Log type name |
| `{{ log.log_type }}` | int | Log type code |
| `{{ log.external_id }}` | string | External identifier |
| `{{ log.initial_report }}` | string | Initial report text |
| `{{ log.course }}` | string | Training course name |
| `{{ log.course_code }}` | string | Training course code |
| `{{ log.instructors }}` | string | Instructor names |
| `{{ log.cause }}` | string | Incident cause |
| `{{ log.contact_name }}` | string | Contact person name |
| `{{ log.contact_number }}` | string | Contact phone number |
| `{{ log.location }}` | string | Log location |
| `{{ log.started_on }}` | datetime | Activity start time |
| `{{ log.ended_on }}` | datetime | Activity end time |
| `{{ log.logged_on }}` | datetime | When the log was created |
| `{{ log.other_agencies }}` | string | Other agencies involved |
| `{{ log.other_units }}` | string | Other units involved |
| `{{ log.other_personnel }}` | string | Other personnel involved |
| `{{ log.call_id }}` | int | Associated call ID (if linked) |

#### Log Collection Variables

| Variable | Type | Description |
|----------|------|-------------|
| `{{ log.entries }}` | array | List of log entries |
| `{{ log.entries[n].narrative }}` | string | Entry narrative |
| `{{ log.entries[n].timestamp }}` | datetime | Entry timestamp |
| `{{ log.entries[n].user_id }}` | string | Entry author user ID |

---

### Calendar Event Added / Calendar Event Updated

**Triggering user:** The event creator (`CalendarItem.CreatorUserId`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ calendar.id }}` | int | Calendar item ID |
| `{{ calendar.title }}` | string | Event title |
| `{{ calendar.description }}` | string | Event description |
| `{{ calendar.location }}` | string | Event location |
| `{{ calendar.start }}` | datetime | Start date/time |
| `{{ calendar.end }}` | datetime | End date/time |
| `{{ calendar.is_all_day }}` | bool | Whether it's an all-day event |
| `{{ calendar.item_type }}` | int | Calendar item type code |
| `{{ calendar.signup_type }}` | int | Signup type code |
| `{{ calendar.is_public }}` | bool | Whether the event is public |

---

### Shift Created / Shift Updated

**Triggering user:** None

| Variable | Type | Description |
|----------|------|-------------|
| `{{ shift.id }}` | int | Shift ID |
| `{{ shift.name }}` | string | Shift name |
| `{{ shift.code }}` | string | Shift code |
| `{{ shift.schedule_type }}` | int | Schedule type code |
| `{{ shift.assignment_type }}` | int | Assignment type code |
| `{{ shift.color }}` | string | Display color |
| `{{ shift.start_day }}` | datetime | Shift start day |
| `{{ shift.start_time }}` | string | Shift start time |
| `{{ shift.end_time }}` | string | Shift end time |
| `{{ shift.hours }}` | int | Shift duration in hours |
| `{{ shift.department_number }}` | string | Department number |

#### Shift Collection Variables

| Variable | Type | Description |
|----------|------|-------------|
| `{{ shift.groups }}` | array | List of shift group assignments |
| `{{ shift.groups[n].group_id }}` | int | Group ID |
| `{{ shift.groups[n].group_name }}` | string | Group name |

---

### Resource Order Added

**Triggering user:** None (department-level event)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ order.id }}` | int | Resource order ID |
| `{{ order.title }}` | string | Order title |
| `{{ order.incident_number }}` | string | Incident number |
| `{{ order.incident_name }}` | string | Incident name |
| `{{ order.incident_address }}` | string | Incident address |
| `{{ order.summary }}` | string | Order summary |
| `{{ order.open_date }}` | datetime | Order open date |
| `{{ order.needed_by }}` | datetime | Resources needed by date |
| `{{ order.contact_name }}` | string | Contact person name |
| `{{ order.contact_number }}` | string | Contact phone number |
| `{{ order.special_instructions }}` | string | Special instructions |
| `{{ order.meetup_location }}` | string | Meetup location |
| `{{ order.financial_code }}` | string | Financial/billing code |

#### Resource Order Collection Variables

| Variable | Type | Description |
|----------|------|-------------|
| `{{ order.items }}` | array | List of order line items |
| `{{ order.items[n].resource }}` | string | Requested resource |
| `{{ order.items[n].quantity }}` | int | Requested quantity |
| `{{ order.items[n].status }}` | string | Item status |

---

### Shift Trade Requested

**Triggering user:** None

| Variable | Type | Description |
|----------|------|-------------|
| `{{ shift_trade.id }}` | int | Shift trade ID |
| `{{ shift_trade.department_number }}` | string | Department number |

---

### Shift Trade Filled

**Triggering user:** The user who filled the trade (`ShiftTradeFilledEvent.UserId`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ shift_trade.id }}` | int | Shift trade ID |
| `{{ shift_trade.filled_by_user_id }}` | string | User who filled the trade |
| `{{ shift_trade.department_number }}` | string | Department number |

---

### Message Sent

**Triggering user:** The user who sent the message (`Message.SendingUserId`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ message.id }}` | int | Message ID |
| `{{ message.subject }}` | string | Message subject |
| `{{ message.body }}` | string | Message body |
| `{{ message.is_broadcast }}` | bool | Whether it's a broadcast message |
| `{{ message.sent_on }}` | datetime | When the message was sent |
| `{{ message.type }}` | int | Message type code |
| `{{ message.recipients }}` | string | Message recipients |
| `{{ message.expire_on }}` | datetime | Message expiration date (if set) |

---

### Training Added / Training Updated

**Triggering user:** The user who created the training (`Training.CreatedByUserId`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ training.id }}` | int | Training ID |
| `{{ training.name }}` | string | Training name |
| `{{ training.description }}` | string | Training description |
| `{{ training.training_text }}` | string | Training content text |
| `{{ training.minimum_score }}` | double | Minimum passing score |
| `{{ training.created_on }}` | datetime | Creation date |
| `{{ training.to_be_completed_by }}` | datetime | Completion deadline (if set) |

#### Training Collection Variables

| Variable | Type | Description |
|----------|------|-------------|
| `{{ training.questions }}` | array | List of training quiz questions |
| `{{ training.questions[n].question }}` | string | Question text |
| `{{ training.questions[n].answer }}` | string | Correct answer |

---

### Inventory Adjusted

**Triggering user:** The user who made the adjustment (`Inventory.AddedByUserId`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ inventory.id }}` | int | Inventory record ID |
| `{{ inventory.type_name }}` | string | Inventory type name |
| `{{ inventory.type_description }}` | string | Inventory type description |
| `{{ inventory.unit_of_measure }}` | string | Unit of measure |
| `{{ inventory.batch }}` | string | Batch identifier |
| `{{ inventory.note }}` | string | Adjustment note |
| `{{ inventory.location }}` | string | Storage location |
| `{{ inventory.amount }}` | double | Current amount |
| `{{ inventory.previous_amount }}` | double | Amount before adjustment |
| `{{ inventory.timestamp }}` | datetime | Adjustment timestamp |
| `{{ inventory.group_id }}` | int | Group/station ID |

---

### Certification Expiring

**Triggering user:** The user whose certification is expiring (`PersonnelCertification.UserId`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ certification.id }}` | int | Certification record ID |
| `{{ certification.name }}` | string | Certification name |
| `{{ certification.number }}` | string | Certification number |
| `{{ certification.type }}` | string | Certification type |
| `{{ certification.area }}` | string | Certification area/specialty |
| `{{ certification.issued_by }}` | string | Issuing authority |
| `{{ certification.expires_on }}` | datetime | Expiration date |
| `{{ certification.received_on }}` | datetime | Date received |
| `{{ certification.days_until_expiry }}` | int | Days until expiration |

---

### Form Submitted

**Triggering user:** The user who submitted the form (`FormSubmittedEvent.SubmittedByUserId`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ form.id }}` | string | Form ID |
| `{{ form.name }}` | string | Form name |
| `{{ form.type }}` | int | Form type code |
| `{{ form.submitted_data }}` | string | Submitted form data (JSON) |
| `{{ form.submitted_by_user_id }}` | string | Submitting user ID |
| `{{ form.submitted_on }}` | datetime | Submission timestamp |

---

### Personnel Role Changed

**Triggering user:** The user whose role changed (`PersonnelRoleChangedEvent.UserId`)

| Variable | Type | Description |
|----------|------|-------------|
| `{{ role_change.user_id }}` | string | Affected user ID |
| `{{ role_change.role_id }}` | int | Personnel role ID |
| `{{ role_change.role_name }}` | string | Role name |
| `{{ role_change.role_description }}` | string | Role description |
| `{{ role_change.action }}` | string | "Added" or "Removed" |

---

### Group Added / Group Updated

**Triggering user:** None

| Variable | Type | Description |
|----------|------|-------------|
| `{{ group.id }}` | int | Group ID |
| `{{ group.name }}` | string | Group name |
| `{{ group.type }}` | int | Group type code |
| `{{ group.dispatch_email }}` | string | Dispatch email address |
| `{{ group.message_email }}` | string | Message email address |
| `{{ group.latitude }}` | string | Latitude |
| `{{ group.longitude }}` | string | Longitude |
| `{{ group.what3words }}` | string | What3Words location |
| `{{ group.address.street }}` | string | Street address |
| `{{ group.address.city }}` | string | City |
| `{{ group.address.state }}` | string | State/Province |
| `{{ group.address.postal_code }}` | string | Postal/ZIP code |
| `{{ group.address.country }}` | string | Country |
