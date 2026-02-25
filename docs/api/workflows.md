---
sidebar_position: 3
---

# Workflows API

The Workflows API provides full CRUD operations for workflows, workflow steps, credentials, and access to execution history and health metrics. All endpoints are scoped to the authenticated user's department and require Department Admin permissions.

**Base URL:** `/api/v4/workflows`

## Authentication

All Workflows API endpoints require a valid JWT token. See [API Authentication](authentication) for details.

## Workflows

### List Workflows

Returns all workflows for the authenticated user's department.

```
GET /api/v4/workflows
```

**Response:** Array of `WorkflowResult` objects.

### Get Workflow

Returns a specific workflow by ID, including its steps.

```
GET /api/v4/workflows/{id}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | int | Workflow ID |

**Response:** `WorkflowResult` object with steps.

### Create Workflow

Creates a new workflow.

```
POST /api/v4/workflows
```

**Request Body:** `WorkflowInput`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `Name` | string | Yes | Workflow name (max 250 characters) |
| `Description` | string | No | Description (max 1000 characters) |
| `TriggerEventType` | int | Yes | Event type enum value (see [Event Types](#event-types)) |
| `IsEnabled` | bool | No | Enabled state (default: true) |
| `MaxRetryCount` | int | No | Max retry attempts (default: 3) |
| `RetryBackoffBaseSeconds` | int | No | Backoff base in seconds (default: 5) |

**Response:** Created `WorkflowResult` object.

### Update Workflow

Updates an existing workflow.

```
PUT /api/v4/workflows/{id}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | int | Workflow ID |

**Request Body:** `WorkflowInput` (same as create).

**Response:** Updated `WorkflowResult` object.

### Delete Workflow

Deletes a workflow and all its steps.

```
DELETE /api/v4/workflows/{id}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | int | Workflow ID |

**Response:** `200 OK` on success.

## Workflow Steps

### Add Step

Adds a step to a workflow.

```
POST /api/v4/workflows/{id}/steps
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | int | Workflow ID |

**Request Body:** `WorkflowStepInput`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ActionType` | int | Yes | Action type enum value (see [Action Types](#action-types)) |
| `StepOrder` | int | Yes | Execution order |
| `OutputTemplate` | string | Yes | Scriban template text |
| `ActionConfig` | string | No | JSON action-specific settings |
| `WorkflowCredentialId` | int | No | Credential ID to use |
| `IsEnabled` | bool | No | Enabled state (default: true) |

**Response:** Created `WorkflowStepResult` object.

### Update Step

Updates an existing workflow step.

```
PUT /api/v4/workflows/{id}/steps/{stepId}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | int | Workflow ID |
| `stepId` | int | Step ID |

**Request Body:** `WorkflowStepInput` (same as add).

**Response:** Updated `WorkflowStepResult` object.

### Delete Step

Deletes a workflow step.

```
DELETE /api/v4/workflows/{id}/steps/{stepId}
```

**Response:** `200 OK` on success.

## Workflow Credentials

### List Credentials

Returns all credentials for the department. Secret values are masked.

```
GET /api/v4/workflows/credentials
```

**Response:** Array of `WorkflowCredentialResult` objects (secrets shown as `••••••`).

### Get Credential

Returns a specific credential by ID. Secret values are masked.

```
GET /api/v4/workflows/credentials/{id}
```

**Response:** `WorkflowCredentialResult` object.

### Create Credential

Creates a new credential. Accepts plaintext secret values which are encrypted before storage.

```
POST /api/v4/workflows/credentials
```

**Request Body:** `WorkflowCredentialInput`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `Name` | string | Yes | Friendly name (max 250 characters) |
| `CredentialType` | int | Yes | Credential type enum value (see [Credential Types](#credential-types)) |
| `Data` | object | Yes | Plaintext credential data (type-specific fields) |

**Response:** Created `WorkflowCredentialResult` object (secrets masked).

:::warning Write-Only Secrets
Credential secret values are encrypted at rest and never returned in API responses. You can only set them when creating or updating a credential.
:::

### Update Credential

Updates an existing credential. Existing secrets are preserved unless new values are provided.

```
PUT /api/v4/workflows/credentials/{id}
```

**Response:** Updated `WorkflowCredentialResult` object.

### Delete Credential

Deletes a credential. Workflows referencing this credential will fail on next execution.

```
DELETE /api/v4/workflows/credentials/{id}
```

**Response:** `200 OK` on success.

## Workflow Testing

### Test Workflow

Manually triggers a workflow with a sample event payload for testing purposes.

```
POST /api/v4/workflows/{id}/test
```

**Request Body:** `WorkflowTestInput`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `EventPayloadJson` | string | No | Custom JSON payload (uses sample data if omitted) |

**Response:** `WorkflowRunResult` object with execution details.

## Workflow Runs

### List Runs by Workflow

Returns paginated runs for a specific workflow.

```
GET /api/v4/workflows/{id}/runs?page={page}&pageSize={pageSize}
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | int | — | Workflow ID |
| `page` | int | 1 | Page number |
| `pageSize` | int | 20 | Results per page |

**Response:** Array of `WorkflowRunResult` objects.

### List All Runs

Returns paginated runs for the entire department.

```
GET /api/v4/workflows/runs?page={page}&pageSize={pageSize}
```

**Response:** Array of `WorkflowRunResult` objects.

### List Pending Runs

Returns all pending and in-progress runs for the department.

```
GET /api/v4/workflows/runs/pending
```

**Response:** Array of `WorkflowRunResult` objects.

### Get Run Logs

Returns detailed step-by-step logs for a specific run.

```
GET /api/v4/workflows/runs/{runId}/logs
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `runId` | long | Workflow Run ID |

**Response:** Array of `WorkflowRunLogResult` objects.

| Field | Type | Description |
|-------|------|-------------|
| `WorkflowRunLogId` | long | Log entry ID |
| `WorkflowStepId` | int | Step that was executed |
| `Status` | int | Step execution status |
| `RenderedOutput` | string | The Scriban-rendered content |
| `ActionResult` | string | HTTP status, SMTP response, etc. |
| `ErrorMessage` | string | Error details (if failed) |
| `StartedOn` | datetime | Step start time |
| `CompletedOn` | datetime | Step completion time |
| `DurationMs` | long | Step execution time in milliseconds |

### Cancel Run

Cancels a pending workflow run.

```
POST /api/v4/workflows/runs/{runId}/cancel
```

**Response:** `200 OK` on success. Returns error if the run is already completed.

### Clear Pending Runs

Cancels all pending runs for the department.

```
POST /api/v4/workflows/runs/clear
```

**Response:** `200 OK` with count of cancelled runs.

## Workflow Health

Returns health metrics for a specific workflow.

```
GET /api/v4/workflows/{id}/health
```

**Response:** `WorkflowHealthResult`

| Field | Type | Description |
|-------|------|-------------|
| `TotalRuns24h` | int | Total runs in last 24 hours |
| `SuccessRuns24h` | int | Successful runs in last 24 hours |
| `FailedRuns24h` | int | Failed runs in last 24 hours |
| `TotalRuns7d` | int | Total runs in last 7 days |
| `SuccessRuns7d` | int | Successful runs in last 7 days |
| `FailedRuns7d` | int | Failed runs in last 7 days |
| `TotalRuns30d` | int | Total runs in last 30 days |
| `SuccessRuns30d` | int | Successful runs in last 30 days |
| `FailedRuns30d` | int | Failed runs in last 30 days |
| `SuccessRatePercent` | double | Overall success rate percentage |
| `AverageDurationMs` | long | Average run duration in milliseconds |
| `LastRunOn` | datetime | Timestamp of last execution |
| `LastError` | string | Most recent error message |

## Event Types

Returns the list of available trigger event types with display names and descriptions.

```
GET /api/v4/workflows/eventtypes
```

**Response:** Array of event type descriptors with available template variables for each.

### Event Type Enum Values

| Value | Name | Description |
|-------|------|-------------|
| 0 | CallAdded | New call/dispatch created |
| 1 | CallUpdated | Existing call updated |
| 2 | CallClosed | Call closed |
| 3 | UnitStatusChanged | Unit status changed |
| 4 | PersonnelStaffingChanged | Personnel staffing level changed |
| 5 | PersonnelStatusChanged | Personnel action status changed |
| 6 | UserCreated | New user added to department |
| 7 | UserAssignedToGroup | User assigned to a group |
| 8 | DocumentAdded | Document uploaded |
| 9 | NoteAdded | Note created |
| 10 | UnitAdded | Unit created |
| 11 | LogAdded | Log entry created |
| 12 | CalendarEventAdded | Calendar event created |
| 13 | CalendarEventUpdated | Calendar event updated |
| 14 | ShiftCreated | Shift created |
| 15 | ShiftUpdated | Shift updated |
| 16 | ResourceOrderAdded | Resource order created |
| 17 | ShiftTradeRequested | Shift trade requested |
| 18 | ShiftTradeFilled | Shift trade filled |
| 19 | MessageSent | New message sent |
| 20 | TrainingAdded | Training created |
| 21 | TrainingUpdated | Training updated |
| 22 | InventoryAdjusted | Inventory quantity changed |
| 23 | CertificationExpiring | Certification nearing expiry |
| 24 | FormSubmitted | Form submitted |
| 25 | PersonnelRoleChanged | User role assignment changed |
| 26 | GroupAdded | Department group created |
| 27 | GroupUpdated | Department group updated |

## Action Types

### Action Type Enum Values

| Value | Name | Description |
|-------|------|-------------|
| 0 | SendEmail | Send email via SMTP |
| 1 | SendSms | Send SMS via Twilio |
| 2 | CallApiGet | HTTP GET request |
| 3 | CallApiPost | HTTP POST request |
| 4 | CallApiPut | HTTP PUT request |
| 5 | CallApiDelete | HTTP DELETE request |
| 6 | UploadFileFtp | Upload file via FTP |
| 7 | UploadFileSftp | Upload file via SFTP |
| 8 | UploadFileS3 | Upload file to Amazon S3 |
| 9 | SendTeamsMessage | Post message to Microsoft Teams |
| 10 | SendSlackMessage | Post message to Slack |
| 11 | SendDiscordMessage | Post message to Discord |
| 12 | UploadFileAzureBlob | Upload file to Azure Blob Storage |
| 13 | UploadFileBox | Upload file to Box |
| 14 | UploadFileDropbox | Upload file to Dropbox |

## Credential Types

### Credential Type Enum Values

| Value | Name | Description |
|-------|------|-------------|
| 0 | Smtp | SMTP email server |
| 1 | Twilio | Twilio SMS service |
| 2 | Ftp | FTP server |
| 3 | Sftp | SFTP server |
| 4 | AwsS3 | Amazon S3 |
| 5 | HttpBearer | HTTP Bearer token authentication |
| 6 | HttpBasic | HTTP Basic authentication |
| 7 | HttpApiKey | HTTP API Key authentication |
| 8 | MicrosoftTeams | Microsoft Teams Incoming Webhook |
| 9 | Slack | Slack Incoming Webhook |
| 10 | Discord | Discord Webhook |
| 11 | AzureBlobStorage | Azure Blob Storage |
| 12 | Box | Box cloud storage |
| 13 | Dropbox | Dropbox cloud storage |

## Run Status Values

| Value | Name | Description |
|-------|------|-------------|
| 0 | Pending | Queued for processing |
| 1 | Running | Currently executing |
| 2 | Completed | Finished successfully |
| 3 | Failed | Failed after all retries |
| 4 | Cancelled | Cancelled by user |
| 5 | Retrying | Failed, waiting for retry |
