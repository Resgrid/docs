---
sidebar_position: 37
title: Workflows
---

# Workflows

The Workflows module provides a powerful event-driven automation engine that lets departments subscribe to system events, transform event data using templates, and execute configurable actions such as sending emails, SMS messages, calling APIs, posting to chat platforms, or uploading files to cloud storage. It is managed by the `WorkflowsController`.

**Authorization:** Department Admins only. Access is controlled via `ClaimsAuthorizationHelper.IsUserDepartmentAdmin()`.

**Navigation:** Department Menu → Workflows

## Overview

Workflows follow an **Event → Transform → Action** pipeline:

```
System Event Occurs → Match Active Workflows → Render Scriban Templates → Execute Action Steps → Log Results
```

1. A system event fires (e.g., a new call is created, a unit changes status)
2. Resgrid evaluates all active workflows for the department that subscribe to that event type
3. For each matching workflow, the event data is transformed using user-defined [Scriban](https://github.com/scriban/scriban) templates
4. The rendered output is passed to the configured action (send email, call API, etc.)
5. Every execution is fully audited with run logs and per-step details

Workflow execution is **asynchronous** — events are enqueued to a message queue and processed in the background, ensuring no impact on the responsiveness of the core system.

## Workflow List (Index)

Displays all workflows configured for the department with:

- **Status indicators** — Enabled/disabled toggle
- **Last run status** — Color-coded badge (green = success, yellow = retrying, red = failed)
- **Success rate** — Percentage badge based on recent runs
- Quick links to create, edit, view runs, and enable/disable workflows

## Creating a Workflow

Navigate to **Department → Workflows** and click **New Workflow**.

### Workflow Fields

| Field | Required | Description |
|-------|----------|-------------|
| Name | Yes | A descriptive name for the workflow (max 250 characters) |
| Description | No | Optional description of the workflow's purpose (max 1000 characters) |
| Trigger Event Type | Yes | The system event that triggers this workflow (see [Trigger Event Types](#trigger-event-types)) |
| Enabled | Yes | Whether the workflow is active (default: enabled) |
| Max Retry Count | No | Number of retry attempts on failure (default: 3) |
| Retry Backoff Base (seconds) | No | Base delay for exponential backoff between retries (default: 5) |

## Editing a Workflow

The edit view allows you to modify the workflow settings and manage its steps inline.

### Workflow Steps

Each workflow can have one or more **steps** that execute in sequence. Each step defines:

| Field | Required | Description |
|-------|----------|-------------|
| Action Type | Yes | The action to perform (see [Action Types](#action-types)) |
| Credential | Conditional | The stored credential to use (filtered by compatible credential types) |
| Output Template | Yes | A [Scriban template](#template-editor) that transforms event data into the action's input |
| Action Config | Conditional | Action-specific settings (e.g., email subject/recipients, API URL, S3 bucket) |
| Enabled | Yes | Whether this step is active (default: enabled) |
| Step Order | Yes | Execution order when multiple steps exist |

Steps are executed sequentially in `Step Order`. If a step fails, subsequent steps still execute (failures are logged per-step). Disabled steps are skipped.

### Template Editor

The workflow editor embeds an **Ace Editor** with Scriban syntax highlighting for editing output templates. Features include:

- **Syntax highlighting** for Scriban template syntax (`{{ variable }}`, `{% if %}`, loops, etc.)
- **Variable side panel** — Lists all available template variables for the selected trigger event type (e.g., for `CallAdded`: `{{ call.name }}`, `{{ call.nature }}`, `{{ call.address }}`, etc.)
- **Preview button** — Renders the template with sample data and shows the output inline
- **Test button** — Triggers a real execution with sample data and shows the run result

See the [Workflows Configuration](../configuration/workflows) page for the full template variable reference.

## Trigger Event Types

Workflows can subscribe to any of the following system events:

| Event | Description |
|-------|-------------|
| **Call Added** | New call/dispatch created |
| **Call Updated** | Existing call updated |
| **Call Closed** | Call closed |
| **Unit Status Changed** | Unit status changed |
| **Personnel Staffing Changed** | Personnel staffing level changed |
| **Personnel Status Changed** | Personnel action status changed |
| **User Created** | New user added to department |
| **User Assigned to Group** | User assigned to a group |
| **Document Added** | Document uploaded |
| **Note Added** | Note created |
| **Unit Added** | Unit created |
| **Log Added** | Log entry created |
| **Calendar Event Added** | Calendar event created |
| **Calendar Event Updated** | Calendar event updated |
| **Shift Created** | Shift created |
| **Shift Updated** | Shift updated |
| **Resource Order Added** | Resource order created |
| **Shift Trade Requested** | Shift trade requested |
| **Shift Trade Filled** | Shift trade filled |
| **Message Sent** | New message sent |
| **Training Added** | Training created |
| **Training Updated** | Training updated |
| **Inventory Adjusted** | Inventory quantity changed |
| **Certification Expiring** | Personnel certification nearing expiry |
| **Form Submitted** | Form submitted |
| **Personnel Role Changed** | User role assignment changed |
| **Group Added** | Department group created |
| **Group Updated** | Department group updated |

## Action Types

Each workflow step supports one of the following action types:

### Communication Actions

| Action | Description | Credential Required |
|--------|-------------|---------------------|
| **Send Email** | Sends an email via SMTP. Template renders the HTML email body. | SMTP (host, port, username, password, from address) |
| **Send SMS** | Sends an SMS message via Twilio. Template renders the message body. | Twilio (Account SID, Auth Token, from number) |
| **Send Teams Message** | Posts a message to Microsoft Teams via Incoming Webhook. Template renders the message body (plain text or Adaptive Card JSON). | Microsoft Teams (webhook URL) |
| **Send Slack Message** | Posts a message to Slack via Incoming Webhook. Template renders the message text (supports Slack mrkdwn). | Slack (webhook URL) |
| **Send Discord Message** | Posts a message to Discord via Webhook. Template renders the message content (supports embed JSON). | Discord (webhook URL) |

### API Actions

| Action | Description | Credential Required |
|--------|-------------|---------------------|
| **Call API (GET)** | Sends an HTTP GET request to a URL. | Optional (Bearer, Basic, or API Key) |
| **Call API (POST)** | Sends an HTTP POST request. Template renders the request body. | Optional |
| **Call API (PUT)** | Sends an HTTP PUT request. Template renders the request body. | Optional |
| **Call API (DELETE)** | Sends an HTTP DELETE request. | Optional |

### File Upload Actions

| Action | Description | Credential Required |
|--------|-------------|---------------------|
| **Upload File (FTP)** | Uploads a file via FTP. Template renders the file content. | FTP (host, port, username, password) |
| **Upload File (SFTP)** | Uploads a file via SFTP. Template renders the file content. | SFTP (host, port, username, password/key) |
| **Upload File (S3)** | Uploads a file to Amazon S3. Template renders the file content. | AWS S3 (Access Key, Secret Key, Region, Bucket) |
| **Upload File (Azure Blob)** | Uploads a file to Azure Blob Storage. Template renders the file content. | Azure Blob Storage (Connection String, Container Name) |
| **Upload File (Box)** | Uploads a file to Box. Template renders the file content. | Box (JWT credentials or Developer Token) |
| **Upload File (Dropbox)** | Uploads a file to Dropbox. Template renders the file content. | Dropbox (OAuth2 refresh token, app key/secret) |

### Action Configuration

Each action type has specific configuration fields set via `Action Config`:

#### Email Action Config

| Field | Required | Description |
|-------|----------|-------------|
| To | Yes | Recipient email address(es) |
| CC | No | CC email address(es) |
| Subject | Yes | Email subject line |

#### SMS Action Config

| Field | Required | Description |
|-------|----------|-------------|
| To | Yes | Recipient phone number(s) |

#### API Action Config

| Field | Required | Description |
|-------|----------|-------------|
| URL | Yes | The API endpoint URL |
| Headers | No | Custom HTTP headers (key-value pairs) |
| Content Type | No | Request content type (default: `application/json`) |

#### Teams Action Config

| Field | Required | Description |
|-------|----------|-------------|
| Title | No | Optional message title |
| Theme Color | No | Optional theme color (hex) |

#### Slack Action Config

| Field | Required | Description |
|-------|----------|-------------|
| Channel | No | Channel override |
| Username | No | Bot username override |
| Icon Emoji | No | Bot icon emoji |

#### Discord Action Config

| Field | Required | Description |
|-------|----------|-------------|
| Username | No | Username override |
| Avatar URL | No | Avatar URL override |

#### File Upload Action Config (FTP/SFTP)

| Field | Required | Description |
|-------|----------|-------------|
| Remote Path | Yes | Destination directory on the server |
| Filename | Yes | Filename template for the uploaded file |

#### S3 Action Config

| Field | Required | Description |
|-------|----------|-------------|
| Key/Path | Yes | S3 object key/path |

#### Azure Blob Action Config

| Field | Required | Description |
|-------|----------|-------------|
| Blob Name/Path | Yes | Blob name or path template |
| Content Type | No | Blob content type |

#### Box Action Config

| Field | Required | Description |
|-------|----------|-------------|
| Folder ID | Yes | Target Box folder ID |
| Filename | Yes | Filename template |

#### Dropbox Action Config

| Field | Required | Description |
|-------|----------|-------------|
| Target Path | Yes | Destination path in Dropbox |
| Filename | Yes | Filename template |
| Write Mode | No | Overwrite or add (default: add) |

## Workflow Credentials

Credentials store the authentication details needed by workflow actions (SMTP passwords, API keys, webhook URLs, etc.). All credentials are **encrypted at rest** using AES-256 encryption with department-specific key derivation, ensuring each department's secrets are isolated.

### Managing Credentials

Navigate to **Department → Workflows → Credentials** to manage stored credentials.

- Credentials are grouped by type for easy browsing
- Secret values are always displayed as `••••••` — they are **write-only** and never returned in responses
- When editing a credential, existing secret values are preserved unless you explicitly provide new values

### Credential Types

| Type | Fields |
|------|--------|
| **SMTP** | Host, Port, Username, Password, Use SSL, From Address |
| **Twilio** | Account SID, Auth Token, From Number |
| **FTP** | Host, Port, Username, Password |
| **SFTP** | Host, Port, Username, Password/Private Key |
| **AWS S3** | Access Key, Secret Key, Region, Bucket |
| **HTTP Bearer** | Bearer Token |
| **HTTP Basic** | Username, Password |
| **HTTP API Key** | Header Name, API Key Value |
| **Microsoft Teams** | Webhook URL |
| **Slack** | Webhook URL |
| **Discord** | Webhook URL |
| **Azure Blob Storage** | Connection String (or Account Name + Account Key), Container Name |
| **Box** | Developer Token or JWT credentials (Client ID, Client Secret, Enterprise ID, Private Key) |
| **Dropbox** | App Key, App Secret, OAuth2 Refresh Token |

### Creating a Credential

Click **New Credential** and select the credential type. Fill in the type-specific fields — all secret fields are encrypted before storage.

## Workflow Runs (Execution History)

The **Runs** view provides a paginated audit trail of all workflow executions:

| Column | Description |
|--------|-------------|
| Timestamp | When the workflow execution started |
| Workflow Name | The workflow that was triggered |
| Status | Color-coded badge: Pending, Running, Completed, Failed, Cancelled, Retrying |
| Duration | Total execution time |
| Attempt | Current attempt number (if retrying) |
| Error Summary | Brief error description (if failed) |

Click a run to expand and see per-step `WorkflowRunLog` detail, including:
- Rendered template output
- Action result (HTTP status, SMTP response, etc.)
- Error messages
- Duration per step

### Filtering Runs

Filter runs by:
- **Status** — Pending, Running, Completed, Failed, Cancelled, Retrying
- **Date range** — Start and end date
- **Workflow** — Specific workflow

## Workflow Health

The **Health** view provides per-workflow health metrics:

| Metric | Description |
|--------|-------------|
| Success/Failure counts | Broken down by 24h, 7d, and 30d windows |
| Success rate | Percentage of successful runs |
| Average duration | Mean execution time |
| Last run timestamp | When the workflow last executed |
| Last error | Most recent error message |
| Recent run timeline | Visual timeline of recent executions |

## Pending Runs

The **Pending** view lists all currently pending and in-progress workflow runs for the department. Actions available:

- **Cancel** — Cancel an individual pending run
- **Clear All** — Cancel all pending runs for the department (with confirmation dialog)

## Retry Behavior

When a workflow step fails:

1. If `Attempt Number < Max Retry Count`, the run is re-enqueued with exponential backoff delay (`Retry Backoff Base × 2^(attempt - 1)` seconds)
2. Status is set to **Retrying** during the delay
3. If max retries are exceeded, status is set to **Failed** with the final error message
4. All retry attempts are visible in the run logs for auditing

## Rate Limiting

Workflow execution is rate-limited per department to prevent a single department from flooding the system. The default limit is **60 workflow executions per minute per department**. If the limit is exceeded, workflow events are skipped and a warning is logged.

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Dispatch & Calls** | Call Added, Call Updated, Call Closed events trigger workflows |
| **Units** | Unit Status Changed, Unit Added events trigger workflows |
| **Personnel** | Personnel Staffing/Status Changed, User Created, Role Changed events |
| **Groups & Stations** | User Assigned to Group, Group Added/Updated events |
| **Documents** | Document Added events trigger workflows |
| **Notes** | Note Added events trigger workflows |
| **Logs** | Log Added events trigger workflows |
| **Calendar** | Calendar Event Added/Updated events trigger workflows |
| **Shifts** | Shift Created/Updated, Trade Requested/Filled events |
| **Messages** | Message Sent events trigger workflows |
| **Trainings** | Training Added/Updated events trigger workflows |
| **Inventory** | Inventory Adjusted events trigger workflows |
| **Forms** | Form Submitted events trigger workflows |
| **Notifications** | Workflows complement notifications — notifications handle push/SMS to personnel, while workflows enable external integrations |
| **Resource Orders** | Resource Order Added events trigger workflows |
| **Certifications** | Certification Expiring events trigger workflows (via daily scheduled check) |
