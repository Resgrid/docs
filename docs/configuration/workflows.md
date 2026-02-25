---
sidebar_position: 22
---

# Workflows

Workflows in Resgrid provide an event-driven automation engine that connects system events to external actions. When something happens in the system — a call is created, a unit changes status, a personnel staffing level changes — workflows can automatically send emails, post messages to Slack or Teams, call external APIs, upload files to cloud storage, and more. Each workflow uses Scriban templates to transform event data into the exact output format your external systems require.

## Why Workflows Matter

Departments increasingly need to integrate Resgrid with external systems — CAD platforms, records management systems, alerting services, analytics dashboards, communication channels, and cloud storage. Without workflows, these integrations require custom development or manual processes. Workflows let department admins create these integrations through the web interface without writing code, using a visual template editor with preview capabilities.

## Scope

Workflows are department-wide. Each workflow subscribes to a specific system event type and runs for every occurrence of that event within the department. Multiple workflows can subscribe to the same event type. Workflow management is restricted to **Department Admins** by default.

## How Workflows Work

1. A system event occurs (e.g., a new call is dispatched)
2. Resgrid checks for active workflows that subscribe to that event type
3. For each matching workflow, the event data is enqueued for background processing
4. Each workflow's steps are executed in order:
   - The event data is merged with department and user context
   - The step's Scriban template transforms the data into the desired output
   - The configured action executes (send email, call API, etc.)
5. Results are recorded — every execution and every step is fully logged

:::info Asynchronous Processing
Workflow execution happens asynchronously in the background via a message queue. This ensures workflows never slow down the core system — a new call is dispatched immediately, and the workflow processing happens separately.
:::

## Setting Up Your First Workflow

### Step 1: Create Credentials (if needed)

If your workflow needs to send emails, SMS messages, or connect to external services, you'll need to store the authentication credentials first.

Navigate to **Department → Workflows → Credentials** and click **New Credential**.

Select the credential type and fill in the required fields:

| Credential Type | Required Fields |
|----------------|-----------------|
| SMTP | Host, Port, Username, Password, Use SSL, From Address |
| Twilio | Account SID, Auth Token, From Number |
| HTTP Bearer | Bearer Token |
| HTTP Basic | Username, Password |
| HTTP API Key | Header Name, API Key Value |
| FTP | Host, Port, Username, Password |
| SFTP | Host, Port, Username, Password or Private Key |
| AWS S3 | Access Key, Secret Key, Region, Bucket |
| Microsoft Teams | Incoming Webhook URL |
| Slack | Incoming Webhook URL |
| Discord | Webhook URL |
| Azure Blob Storage | Connection String (or Account Name + Account Key), Container Name |
| Box | Developer Token or JWT credentials (Client ID, Client Secret, Enterprise ID, Private Key) |
| Dropbox | App Key, App Secret, OAuth2 Refresh Token |

:::tip Credential Security
All credential secret values are encrypted at rest using AES-256 encryption with department-specific key derivation. Each department's secrets are cryptographically isolated. Secret values are **write-only** — they are never displayed in the UI or returned via the API after creation.
:::

### Step 2: Create a Workflow

Navigate to **Department → Workflows** and click **New Workflow**.

| Field | Required | Description |
|-------|----------|-------------|
| Name | Yes | A descriptive name (e.g., "Send call alerts to Slack") |
| Description | No | Optional description of the workflow's purpose |
| Trigger Event Type | Yes | The system event that triggers this workflow |
| Enabled | Yes | Whether the workflow is active (default: enabled) |
| Max Retry Count | No | Number of retry attempts on failure (default: 3) |
| Retry Backoff Base | No | Base delay in seconds for exponential backoff (default: 5) |

### Step 3: Add Steps

After creating the workflow, add one or more steps. Each step defines a specific action to take with the event data.

| Field | Required | Description |
|-------|----------|-------------|
| Action Type | Yes | What to do (send email, call API, etc.) |
| Credential | Conditional | The stored credential to use for authentication |
| Output Template | Yes | A Scriban template that transforms the event data |
| Action Configuration | Conditional | Action-specific settings (recipients, URLs, etc.) |
| Step Order | Yes | Execution order when multiple steps exist |
| Enabled | Yes | Whether this step is active |

### Step 4: Write a Template

The template editor provides:

- **Scriban syntax highlighting** via the embedded Ace Editor
- **Variable side panel** showing all available variables for the selected event type
- **Preview** to render the template with sample data
- **Test** to execute the workflow with sample data and see real results

#### Example: Slack Notification for New Calls

```
🚨 *New Call: {{ call.name }}*

*Nature:* {{ call.nature }}
*Priority:* {{ call.priority_text }}
*Address:* {{ call.address }}
*Logged:* {{ call.logged_on | date.to_string "%Y-%m-%d %H:%M" }}
*Reported By:* {{ user.full_name }}

Department: {{ department.name }}
```

#### Example: JSON Payload for an API POST

```json
{
  "event": "call_added",
  "department": "{{ department.name }}",
  "call": {
    "id": {{ call.id }},
    "name": "{{ call.name }}",
    "nature": "{{ call.nature }}",
    "priority": {{ call.priority }},
    "address": "{{ call.address }}",
    "loggedOn": "{{ call.logged_on | date.to_string "%Y-%m-%dT%H:%M:%SZ" }}"
  },
  "reportedBy": "{{ user.full_name }}"
}
```

#### Example: Email Body for Unit Status Changes

```html
<h2>Unit Status Change</h2>
<p><strong>Unit:</strong> {{ unit.name }} ({{ unit.type }})</p>
<p><strong>New Status:</strong> {{ unit_status.state_text }}</p>
<p><strong>Previous Status:</strong> {{ previous_unit_status.state_text }}</p>
<p><strong>Time:</strong> {{ unit_status.timestamp | date.to_string "%H:%M:%S" }}</p>
{% if unit_status.note != "" %}
<p><strong>Note:</strong> {{ unit_status.note }}</p>
{% end %}
<hr>
<p><em>{{ department.name }} — {{ timestamp.department_now | date.to_string "%Y-%m-%d %H:%M" }}</em></p>
```

#### Example: Conditional Template for Certification Expiration

```
{% if certification.days_until_expiry <= 7 %}
⚠️ URGENT: {{ user.full_name }}'s certification "{{ certification.name }}" expires in {{ certification.days_until_expiry }} days!
{% else %}
📋 Reminder: {{ user.full_name }}'s certification "{{ certification.name }}" expires on {{ certification.expires_on | date.to_string "%Y-%m-%d" }} ({{ certification.days_until_expiry }} days remaining).
{% end %}
```

## Trigger Event Types

The following system events can trigger workflows:

### Call Events

| Event | Description | Key Variables |
|-------|-------------|---------------|
| Call Added | New call/dispatch created | `call.*`, `user.*` (reporting user) |
| Call Updated | Existing call updated | `call.*`, `user.*` (reporting user) |
| Call Closed | Call closed | `call.*`, `user.*` (reporting user) |

### Personnel Events

| Event | Description | Key Variables |
|-------|-------------|---------------|
| Personnel Staffing Changed | Staffing level changed | `staffing.*`, `previous_staffing.*`, `user.*` |
| Personnel Status Changed | Action status changed | `status.*`, `previous_status.*`, `user.*` |
| User Created | New user added to department | `new_user.*` |
| User Assigned to Group | User assigned to a group | `assigned_user.*`, `group.*`, `previous_group.*` |
| Personnel Role Changed | Role assignment changed | `role_change.*`, `user.*` |

### Unit Events

| Event | Description | Key Variables |
|-------|-------------|---------------|
| Unit Status Changed | Unit status changed | `unit_status.*`, `unit.*`, `previous_unit_status.*` |
| Unit Added | New unit created | `unit.*` |

### Group Events

| Event | Description | Key Variables |
|-------|-------------|---------------|
| Group Added | Department group created | `group.*` |
| Group Updated | Department group updated | `group.*` |

### Scheduling Events

| Event | Description | Key Variables |
|-------|-------------|---------------|
| Shift Created | Shift created | `shift.*` |
| Shift Updated | Shift updated | `shift.*` |
| Shift Trade Requested | Trade requested | `shift_trade.*` |
| Shift Trade Filled | Trade completed | `shift_trade.*`, `user.*` |
| Calendar Event Added | Calendar event created | `calendar.*`, `user.*` |
| Calendar Event Updated | Calendar event updated | `calendar.*`, `user.*` |

### Content Events

| Event | Description | Key Variables |
|-------|-------------|---------------|
| Document Added | Document uploaded | `document.*`, `user.*` |
| Note Added | Note created | `note.*`, `user.*` |
| Log Added | Log entry created | `log.*`, `user.*` |
| Message Sent | Message sent | `message.*`, `user.*` |
| Training Added | Training created | `training.*`, `user.*` |
| Training Updated | Training updated | `training.*`, `user.*` |
| Form Submitted | Form submitted | `form.*`, `user.*` |

### Operational Events

| Event | Description | Key Variables |
|-------|-------------|---------------|
| Resource Order Added | Resource order created | `order.*` |
| Inventory Adjusted | Inventory changed | `inventory.*`, `user.*` |
| Certification Expiring | Certification nearing expiry | `certification.*`, `user.*` |

## Template Variables

Every workflow template has access to three categories of variables:

### Common Variables (Always Available)

These are available in every workflow regardless of trigger event type:

#### Department Variables

| Variable | Description |
|----------|-------------|
| `{{ department.id }}` | Department ID |
| `{{ department.name }}` | Department name |
| `{{ department.code }}` | 4-character department code |
| `{{ department.type }}` | Department type (Fire, EMS, etc.) |
| `{{ department.time_zone }}` | Department time zone |
| `{{ department.use_24_hour_time }}` | 24-hour time preference (true/false) |
| `{{ department.address.street }}` | Street address |
| `{{ department.address.city }}` | City |
| `{{ department.address.state }}` | State/Province |
| `{{ department.address.postal_code }}` | Postal/ZIP code |
| `{{ department.address.country }}` | Country |
| `{{ department.address.full }}` | Full formatted address |
| `{{ department.phone_number }}` | Department phone number |

#### Timestamp Variables

| Variable | Description |
|----------|-------------|
| `{{ timestamp.utc_now }}` | Current UTC timestamp |
| `{{ timestamp.department_now }}` | Current time in department's time zone |
| `{{ timestamp.date }}` | Current date (department TZ) as `yyyy-MM-dd` |
| `{{ timestamp.time }}` | Current time (department TZ) |
| `{{ timestamp.day_of_week }}` | Day name (e.g., "Monday") |

#### User Variables (Triggering User)

Populated from the user who triggered the event. Empty if no specific user is associated with the event.

| Variable | Description |
|----------|-------------|
| `{{ user.id }}` | User ID |
| `{{ user.first_name }}` | First name |
| `{{ user.last_name }}` | Last name |
| `{{ user.full_name }}` | Full name ("First Last") |
| `{{ user.email }}` | Email address |
| `{{ user.mobile_number }}` | Mobile phone number |
| `{{ user.home_number }}` | Home phone number |
| `{{ user.identification_number }}` | ID/badge number |
| `{{ user.username }}` | Login username |
| `{{ user.time_zone }}` | User's personal time zone |

### Event-Specific Variables

Each trigger event type adds its own set of variables. For the complete reference of all event-specific variables, see the [Workflow Template Variable Reference](../reference/workflow-variables) page.

## Action Types

### Send Email

Sends an email via a department-supplied SMTP server. The Scriban template renders the **HTML email body**.

**Credential:** SMTP  
**Action Config:** To, CC (optional), Subject

### Send SMS

Sends an SMS via Twilio. The Scriban template renders the **message body**.

**Credential:** Twilio  
**Action Config:** To number(s)

### Send Teams Message

Posts a message to Microsoft Teams via an Incoming Webhook URL. The Scriban template renders the **message body** — either plain text or an Adaptive Card JSON payload.

**Credential:** Microsoft Teams (webhook URL)  
**Action Config:** Title (optional), Theme Color (optional)

### Send Slack Message

Posts a message to Slack via an Incoming Webhook URL. The Scriban template renders the **message text** (supports Slack mrkdwn formatting).

**Credential:** Slack (webhook URL)  
**Action Config:** Channel override (optional), Username (optional), Icon Emoji (optional)

### Send Discord Message

Posts a message to Discord via a Webhook URL. The Scriban template renders the **message content**. If the rendered content is valid embed JSON, it is sent as a rich embed.

**Credential:** Discord (webhook URL)  
**Action Config:** Username override (optional), Avatar URL (optional)

### Call API (GET / POST / PUT / DELETE)

Sends an HTTP request to an external API endpoint. For POST and PUT, the Scriban template renders the **request body**. For GET and DELETE, the template is not used as a body.

**Credential:** Optional — HTTP Bearer, HTTP Basic, or HTTP API Key  
**Action Config:** URL, Headers (optional), Content Type (optional, default: `application/json`)

### Upload File (FTP / SFTP)

Uploads a file to an FTP or SFTP server. The Scriban template renders the **file content**.

**Credential:** FTP or SFTP  
**Action Config:** Remote Path, Filename template

### Upload File (S3)

Uploads a file to Amazon S3. The Scriban template renders the **file content**.

**Credential:** AWS S3  
**Action Config:** S3 key/path

### Upload File (Azure Blob)

Uploads a file to Azure Blob Storage. The Scriban template renders the **file content**.

**Credential:** Azure Blob Storage  
**Action Config:** Blob name/path template, Content Type (optional)

### Upload File (Box)

Uploads a file to Box cloud storage. The Scriban template renders the **file content**.

**Credential:** Box (JWT or Developer Token)  
**Action Config:** Folder ID, Filename template

### Upload File (Dropbox)

Uploads a file to Dropbox. The Scriban template renders the **file content**.

**Credential:** Dropbox (OAuth2)  
**Action Config:** Target path, Filename template, Write Mode (optional, default: add)

## Retry Behavior

When a workflow step fails, automatic retries are attempted with exponential backoff:

| Attempt | Delay |
|---------|-------|
| 1st retry | `base × 2⁰` = 5 seconds (default) |
| 2nd retry | `base × 2¹` = 10 seconds |
| 3rd retry | `base × 2²` = 20 seconds |

- If retries are exhausted, the run is marked as **Failed** with the final error message.
- All attempts are recorded in the run logs for auditing.
- You can configure `Max Retry Count` and `Retry Backoff Base` per workflow.

## Rate Limiting

Workflow execution is rate-limited to **60 executions per minute per department** by default. If a department exceeds this limit, additional workflow events are skipped and a warning is logged. This prevents a single department from overwhelming the system.

## Monitoring Workflow Runs

### Viewing Run History

Navigate to **Department → Workflows → Runs** to see a paginated list of all workflow executions. Each run shows:

- Timestamp, workflow name, status (color-coded), duration, attempt number, and error summary
- Click to expand and see per-step details (rendered output, action result, errors, duration)

### Health Dashboard

Navigate to **Department → Workflows** and click **Health** on a workflow to see:

- Success/failure counts over 24h, 7d, and 30d
- Success rate percentage
- Average execution duration
- Last run timestamp and last error
- Recent run timeline

### Managing Pending Runs

Navigate to **Department → Workflows → Pending** to see all currently queued or in-progress executions. You can:

- **Cancel** a specific pending run
- **Clear All** pending runs for the entire department

:::warning Clearing Pending Runs
Clearing all pending runs is a destructive action. Cancelled runs are not retried and the associated events will not trigger the workflow again.
:::

## Scriban Template Syntax Reference

Workflows use [Scriban](https://github.com/scriban/scriban) as the template engine. Here is a quick syntax reference:

### Variable Output

```
{{ variable_name }}
{{ object.property }}
```

### Conditionals

```
{% if call.is_critical %}
CRITICAL ALERT
{% else %}
Standard notification
{% end %}
```

### Loops

```
{% for item in collection %}
- {{ item.name }}
{% end %}
```

### Date Formatting

```
{{ call.logged_on | date.to_string "%Y-%m-%d %H:%M:%S" }}
```

### String Functions

```
{{ call.name | string.upcase }}
{{ call.nature | string.truncate 100 }}
{{ call.address | string.replace " " "+" }}
```

### Default Values

```
{{ call.notes | object.default "No notes provided" }}
```

For full Scriban documentation, see the [Scriban Language Reference](https://github.com/scriban/scriban/blob/master/doc/language.md).

## Common Workflow Recipes

### Send a Slack Alert for High-Priority Calls

**Trigger:** Call Added  
**Action:** Send Slack Message  

```
{% if call.priority <= 1 %}
🚨 *HIGH PRIORITY CALL*

*{{ call.name }}*
Priority: {{ call.priority_text }}
Nature: {{ call.nature }}
Address: {{ call.address }}
Reported by: {{ user.full_name }}
Time: {{ call.logged_on | date.to_string "%H:%M" }}
{% end %}
```

### Post Call Data to an External CAD System

**Trigger:** Call Added  
**Action:** Call API (POST)  

```json
{
  "incidentId": "{{ call.incident_number }}",
  "name": "{{ call.name }}",
  "nature": "{{ call.nature }}",
  "priority": {{ call.priority }},
  "address": "{{ call.address }}",
  "coordinates": "{{ call.geo_location }}",
  "reportedBy": "{{ user.full_name }}",
  "department": "{{ department.name }}",
  "timestamp": "{{ call.logged_on | date.to_string "%Y-%m-%dT%H:%M:%SZ" }}"
}
```

### Email Alert When Certification Is Expiring

**Trigger:** Certification Expiring  
**Action:** Send Email  
**Subject:** `Certification Expiring: {{ certification.name }}`

```html
<h2>Certification Expiration Notice</h2>
<p>The following certification is expiring soon:</p>
<table>
  <tr><td><strong>Person:</strong></td><td>{{ user.full_name }}</td></tr>
  <tr><td><strong>Certification:</strong></td><td>{{ certification.name }}</td></tr>
  <tr><td><strong>Number:</strong></td><td>{{ certification.number }}</td></tr>
  <tr><td><strong>Expires:</strong></td><td>{{ certification.expires_on | date.to_string "%Y-%m-%d" }}</td></tr>
  <tr><td><strong>Days Remaining:</strong></td><td>{{ certification.days_until_expiry }}</td></tr>
</table>
<p><em>This is an automated alert from {{ department.name }}.</em></p>
```

### Upload Call Report to S3

**Trigger:** Call Closed  
**Action:** Upload File (S3)  
**S3 Key:** `reports/calls/{{ call.id }}-{{ call.logged_on | date.to_string "%Y%m%d" }}.json`

```json
{
  "callId": {{ call.id }},
  "name": "{{ call.name }}",
  "nature": "{{ call.nature }}",
  "address": "{{ call.address }}",
  "priority": "{{ call.priority_text }}",
  "loggedOn": "{{ call.logged_on | date.to_string "%Y-%m-%dT%H:%M:%SZ" }}",
  "closedOn": "{{ call.closed_on | date.to_string "%Y-%m-%dT%H:%M:%SZ" }}",
  "completedNotes": "{{ call.completed_notes }}",
  "department": "{{ department.name }}"
}
```

### Notify Discord When Inventory Runs Low

**Trigger:** Inventory Adjusted  
**Action:** Send Discord Message  

```
{% if inventory.amount < 10 %}
⚠️ **Low Inventory Alert**

**Item:** {{ inventory.type_name }}
**Current Amount:** {{ inventory.amount }} {{ inventory.unit_of_measure }}
**Previous Amount:** {{ inventory.previous_amount }}
**Location:** {{ inventory.location }}
**Adjusted by:** {{ user.full_name }}

_{{ department.name }} — {{ timestamp.department_now | date.to_string "%Y-%m-%d %H:%M" }}_
{% end %}
```
