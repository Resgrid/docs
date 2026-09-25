---
sidebar_position: 48.5
title: Protected Workflows
---

# Protected Workflows (ADP)

With [Advanced Data Protection](data-protection) enabled, every [workflow](workflows) gets **`REDACTED`** in place of protected values. That stays true for any workflow you don't explicitly approve.

A **Protected Workflow** is an exception you approve. One specific workflow may send a selected set of protected call fields to **one pinned HTTPS destination**, using **one pinned credential**. Every send, whatever its outcome, is recorded in a tamper-evident **disclosure log**.

Typical use: a behavioral health agency writes crisis-call outcomes back to its own case system when a call closes, for example the completion notes and the call form written to a Microsoft Dynamics 365 / Dataverse case record.

:::caution Read before enabling
Protected Workflows send decrypted protected data, which may include protected health information, to external systems you configure. Resgrid cannot control how the receiving system stores or uses this data. Only enable a workflow if the recipient is your organization or a party covered by a business associate agreement with your organization, and only release the fields the recipient needs.
:::

## Before you start

- ADP must be **Enabled** (or Rotating) for your department.
- You need the **Configure Protected Data Delivery** permission. By default only department administrators have it (see [Security & Permissions](security-permissions)).
- Your account needs an [authenticator app](account-security). Turning the feature on or off, approving and renewing all require a fresh verification.

## 1. Turn on Protected Workflows

Go to **Department dropdown → Security & Permissions → Data Protection → Protected Workflows**.

1. Tick **Enable Protected Workflows**.
2. Read the warning and tick the acknowledgement. It is recorded with its version.
3. Optionally tick **Require a second administrator to approve protected workflows** to turn on the two-person rule.
4. Click **Save Protected Workflow settings** and verify your second factor.

Turning the feature off suspends every protected workflow in the department immediately.

## 2. Build the workflow

A protected workflow can contain only **API POST** or **API PUT** steps:

- Every step sends to the **same `https://` host**. The host must be written out in the URL, not built from a template. The path and query may still use ordinary `call.*` values such as `{{ call.number }}`.
- Every step uses the **same credential**, of type **HTTP Bearer**, **HTTP API Key** or **OAuth2 Client Credentials**. HTTP Basic is off unless your Resgrid operator enables it.
- Only **Call Added**, **Call Updated** and **Call Closed** triggers are supported in this version.

In the **output template**, released values appear under `protected.call.*`, using the same names as [`call.*`](../reference/workflow-variables):

| Field | Template variable |
|---|---|
| Completion notes | `protected.call.completed_notes` |
| Call form data (raw JSON) | `protected.call.form_data` |
| Call form data (parsed) | `protected.call.form`, e.g. `protected.call.form.outcome` |
| Nature, notes, address | `protected.call.nature`, `protected.call.notes`, `protected.call.address` |
| Contact name and number | `protected.call.contact_name`, `protected.call.contact_number` |
| Name, type, geolocation, what3words | `protected.call.name`, `protected.call.type`, `protected.call.geo_location`, `protected.call.w3w` |
| Incident, reference, external, source identifiers | `protected.call.incident_number`, `protected.call.reference_number`, `protected.call.external_id`, `protected.call.source_identifier` |
| Deletion reason | `protected.call.deleted_reason` |
| Subject identifiers | `protected.call.subject_ids.<key>`, e.g. `protected.call.subject_ids.ehr_client_id` |
| Call custom fields | `protected.call.udf.<field name>`, e.g. `protected.call.udf.disposition` |

`call.*` keeps showing `REDACTED`. A field you did not release is simply absent from `protected.call` and renders as an empty string.

`protected.*` is **not** available in step conditions, URLs or headers, and the editor refuses to save a step that uses it there. This means plaintext can never end up in a URL or decide which way a workflow branches. In a workflow with no protected release, `protected.*` renders as an empty string and the editor flags it when you save.

Pass every protected value through an escape helper, so that a quote or line break in free text can't break the payload's structure:

| Helper | Use it for |
|---|---|
| `json_escape` | a value inside a JSON string: `"{{ protected.call.completed_notes \| json_escape }}"` |
| `xml_escape` | XML or SOAP text and attributes |
| `hl7_escape` | HL7 v2 fields: escapes `\| ^ ~ \ &` and turns line breaks into `\X0D\` / `\X0A\` |
| `fhir_datetime`, `hl7_ts` | a date as a FHIR `dateTime` or an HL7 `TS`, in UTC |

The editor warns (but doesn't block) when a protected value is placed without one of them. The helpers are available in every workflow, not only protected ones.

### Delivery options

An API step in a protected workflow has extra **Protected delivery options**. All of them are part of the approval, so changing any of them sends the release back for approval.

- **Content type.** One of `application/json`, `application/fhir+json`, `application/xml`, `text/xml`, `application/soap+xml`, `x-application/hl7-v2+er7` or `text/plain`. The payload is checked before it's sent: JSON must parse, a FHIR body needs a `resourceType`, XML must be well formed (DTDs are refused), and HL7 v2 must start with `MSH|^~\&` and have valid segment IDs. A payload that fails is never sent. The log records the failed rule and position, never the content.
- **Success rule.** How the destination confirms it accepted the payload: any 2xx (the default), a JSON path or XPath that must equal a value, an HL7 acknowledgement (`MSA-1` must be `AA` or `CA`), or no FHIR `OperationOutcome` error.
- **Save response values.** Up to 5 values from the response, saved **encrypted** into the call's subject identifiers, for example the EHR's new encounter ID. Sources: `json_path`, `xpath`, `hl7_field` (such as `MSA-2`), `header` (such as `Location`), and `fhir_location_id` (the ID of the created resource). The run log shows only the keys written, as `captured=[ehr_encounter_id]`. A step that saves response values needs a release that includes the subject identifiers.
- **Idempotency header** and **FHIR If-None-Exist.** `run.idempotency_key` is the same on every retry of a delivery and different for every event. Send it as a header such as `Idempotency-Key`, use it in a FHIR conditional create, or put it in HL7 `MSH-10`, so a retried delivery doesn't create a duplicate record.

The response body is read only when a success rule or saved value needs it, and never beyond 1 MB.

## 3. Approve the protected release

Open the workflow. The **Protected release** panel appears below the steps.

1. **Fields to release.** Nothing is ticked by default. Tick only what the recipient needs:
   - call fields, including **Subject identifiers (every key)**;
   - or individual subject identifier **keys**, such as `ehr_client_id` (you can't tick both the whole field and some of its keys);
   - individual **call custom fields**. Each one is decrypted on its own, so only the ticked fields are ever opened.
2. **Destination.** Shows the pinned host, the credential and, for OAuth2, the token host, all read from your steps. It also lists anything that blocks protection, such as a non-API step, two different hosts or an `http://` URL.
3. **Recipient.** Choose **Covered entity** or **Business associate**, then enter the recipient's name and the purpose of the disclosure.
4. **Attestation.** Tick the attestation for the current warning version. Two more attestations appear when you release a custom field tagged **Restricted** or **42 CFR Part 2** (see below). The approver makes them too.
5. Click **Approve and activate**. With the two-person rule on, the button reads **Request approval**, and a *different* administrator opens the same panel and clicks **Approve** after their own verification. Whoever requested a release can never approve it.

### Restricted and 42 CFR Part 2 fields

In **Custom Fields → Call**, each field has a **Protected Workflows release sensitivity**:

- **None**: no extra step.
- **Restricted**: releasing it needs the attestation that the recipient is authorized to receive restricted fields.
- **42 CFR Part 2**: releasing it needs the Part 2 redisclosure attestation, and a call is only sent when **Part 2 consent on file** is set on it (a checkbox on the call, also settable through the API). Otherwise the step is blocked with the outcome `blocked_consent` and nothing is decrypted.

Changing a field's sensitivity, disabling it or removing it sends every release that uses it back for approval.

**Send test with sample data** sends synthetic values, never real data, through the same protected path to the pinned host. Nothing is decrypted, and the attempt appears in the disclosure log labelled **test**.

## What happens on every send

Each attempt, including every retry, checks everything again from scratch:

- ADP is Enabled and the department toggle is on.
- The release is Active and has not expired.
- The workflow is **exactly** the configuration that was approved.
- The step is POST or PUT and uses the pinned credential.
- The URL, as rendered, is `https://` on the pinned host.

If any check fails, nothing is sent and the attempt is logged with a `blocked_*` outcome.

Before the request leaves, an **attempted** record is written to the disclosure log. If it can't be written, nothing is sent.

When the checks pass, Resgrid decrypts **only** the released fields for that one call, renders the payload, and makes sure no ciphertext is left in it. It then sends the request:

- Redirects are never followed; a 3xx response counts as a blocked host.
- TLS 1.2 or later is required.
- The request times out after 30 seconds.

For each attempt, the run log records a SHA-256 hash, a byte count and the field IDs, **never the values**. It also records the HTTP status line, **never the response body**.

Only failures another attempt could fix are retried: a connection error, a timeout, a 5xx or a 429. A 4xx, a rejected acknowledgement (including HL7 `AE` and `AR`), an invalid payload, a missing Part 2 consent or an oversized response stop the run at once. When a run fails for good, department administrators get a generic notice with the workflow name, run ID and error code.

## Changes, expiry and revocation

| Event | Result |
|---|---|
| Any change to a step, template, condition, URL, header, credential, trigger or released field, by anyone who can edit workflows | **Pending approval** (*configuration changed*) until an administrator approves the current configuration |
| A delivery option changes (content type, success rule, saved values, idempotency header, If-None-Exist) | **Pending approval** (*configuration changed*) |
| A released custom field's sensitivity changes, or the field is disabled or removed | **Pending approval** (*configuration changed*) |
| The credential is deleted, its type changes, its OAuth2 token host changes, or it switches between client secret and private key JWT | **Suspended** (*credential changed*) |
| The credential's secret is rotated, or its private_key_jwt signing key is rotated | Stays **Active**; the rotation is written to the audit log |
| Protected Workflows turned off for the department | Every release **Suspended** |
| ADP offboarding scheduled, or ADP disabled | Every release **Revoked** |
| 12 months after approval | **Expired**. Administrators are emailed 30 and 7 days before |
| The workflow is deleted | The release is **Revoked** and its disclosure records are kept |

A workflow whose release is anything other than **Active** is **skipped**. It never runs with `REDACTED` in place of the protected values, because that would overwrite the real values in the destination system.

To renew, open the workflow and click **Renew**, then verify and attest again. The two-person rule applies to renewals too. While a renewal waits for its second approval, the release keeps sending until its current expiry date. If the configuration changed in the meantime, it goes back through a full approval instead.

The workflow list shows each protected workflow's status: **Protected: Active**, **Pending approval**, **Suspended** (with the reason), **Expiring** (within 30 days), or **Expired**.

## Protected workflows page and disclosure log

Go to **Workflows → Protected workflows** to see every release with its fields, host, recipient, approver, expiry date and number of sends in the last 30 days. From this page you can **suspend** or **revoke** a release. **Renew** takes you to the workflow editor, where the attestation is shown.

The **Disclosure log** has one record per send attempt and one per administrative action: enabled, disabled, requested, approved, suspended, revoked, expired and credential rotated. You can filter it by workflow, call ID and date, and **export it to CSV**. Records hold metadata only:

- the fields released and the destination host
- the HTTP status
- the SHA-256 hash and byte length of the exact payload
- the broker request ID
- who acted and the outcome

Records are **hash-chained per department**, and the page shows whether the chain verifies. Changing, removing or reordering any record breaks the verification.

## Example: Microsoft Dataverse (Dynamics 365)

1. In Microsoft Entra ID, register an application and add it as an application user in your Dataverse environment, with a security role that can update cases.
2. In Resgrid, add a workflow credential of type **OAuth2 Client Credentials**:
   - Token URL: `https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token`
   - Client ID and client secret: from the app registration
   - Scope: `https://<org>.crm.dynamics.com/.default`
3. In Dataverse, give the case table an alternate key on a text column that holds the Resgrid call number, for example `new_resgridcallnumber`. The call number is not protected, so it can appear in a URL. `protected.*` values never can.
4. Create a **Call Closed** workflow that uses that credential. Dataverse updates a whole record with PATCH, which workflows do not offer, but it accepts a **PUT** for a single column, so add one **API PUT** step per column:

   | Step | URL | Output template |
   |---|---|---|
   | 1 | `https://<org>.crm.dynamics.com/api/data/v9.2/incidents(new_resgridcallnumber='{{ call.number }}')/description` | `{ "value": "{{ protected.call.completed_notes \| json_escape }}" }` |
   | 2 | `https://<org>.crm.dynamics.com/api/data/v9.2/incidents(new_resgridcallnumber='{{ call.number }}')/new_resgridoutcome` | `{ "value": "{{ protected.call.udf.outcome \| json_escape }}" }` |

   To write the whole record in one request instead, send a single **API POST** to an Entra-protected Azure Function or Logic App that you own and that performs the PATCH.
5. In the **Protected release** panel, tick **Completion notes** and the **outcome** custom field. Enter the recipient, for example *County DMH, Dynamics 365 case management*, and the purpose, then attest and approve.

The token endpoint host (`login.microsoftonline.com`) is pinned along with the Dataverse host. If the credential's token URL moves to another host, the release is suspended.

## EHR integration

Protected Workflows can send call outcomes into an electronic health record, either directly (FHIR REST, or a vendor REST or SOAP API) or through an interface engine such as Mirth or Rhapsody that accepts HTTPS and forwards HL7 v2 to the EHR.

:::note No MLLP
Resgrid sends over HTTPS only. There is no HL7 v2 MLLP (raw TCP) action: to reach an EHR that only takes MLLP, send HL7 over HTTPS to an interface engine and let it forward the message.
:::

**Subject identifiers.** Integrations put the EHR's IDs on a call as **subject identifiers**, a small set of keys and values kept apart from the call's external ID, for example `{ "ehr_client_id": "123456" }`. Send them as `SubjectIdentifiers` when creating or editing a call through the v4 API. Keys are lower-case letters, digits and underscores (up to 64 characters), values are up to 256 characters, with at most 20 keys. In an ADP department they are encrypted like any other protected call field. The call page shows them behind the usual reveal.

**SMART Backend Services.** Most FHIR EHRs authenticate system clients with a signed JWT instead of a client secret. In the credential editor, choose **OAuth2 Client Credentials**, set **Client authentication** to **Private key JWT**, and pick RS384 (the default) or ES384. Resgrid generates the key pair when you save; the private key is encrypted and never shown. Register the credential's **JWKS URL** (`/api/v4/workflow-credentials/<credential id>/jwks.json`) with the EHR, or download the public JWK and upload it. **Rotate key** creates a new key; the old one stays in the JWKS for 7 days so the EHR can move over.

**Templates.** **Workflows → New** has a template gallery. With Protected Workflows on, it offers two EHR samples:

- **FHIR R4 Encounter and Observations**: a transaction Bundle with an Encounter (class `FLD`, `finished`, dispatch to close) for `Patient/{subject_ids.ehr_client_id}` and one Observation per released custom field. It uses conditional create on the call's identifier and saves the new Encounter ID as `ehr_encounter_id`.
- **HL7 v2.5.1 MDM^T02**: a "Crisis Field Response" document with the EHR client ID in `PID-3`, `run.idempotency_key` in `MSH-10` and one `OBX` per released custom field. It succeeds only on an `AA` acknowledgement.

A template creates a disabled workflow with a placeholder destination, no credential and a draft protected release. Set the URL and credential, choose the fields, then request approval.

Each release pins one destination, so use one workflow per destination. Several workflows can share a trigger: when a call closes, one workflow can write the case back to Dynamics 365 while another sends the encounter to the EHR, each with its own release, fields and disclosure records.

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/ProtectedWorkflows/{Index,Disclosures,DisclosuresCsv,Panel,StepUp}` and the JSON commands `SaveDepartmentSettings`, `SaveDraft`, `RequestApproval`, `Approve`, `Renew`, `Suspend`, `Revoke`, `DiscardDraft`, `SendTest` |
| API | `api/v4/ProtectedWorkflows/*`. Approve, renew, request and the department toggle refuse API keys and client-credentials tokens, and need a valid Protected Data Grant for the calling user in `X-Resgrid-Protected-Grant` |
| Permission | `ConfigureProtectedDataEgress` (38). A missing row resolves to Department Admins |
| Broker purpose | `protected-workflow` (workload decrypt lane; fresh request ID per attempt) |
| Tables | `WorkflowProtectedReleases`, `ProtectedWorkflowDisclosures` (append-only, hash-chained); toggle columns on `DepartmentProtectedDataEgressPolicies`; `Calls.SubjectIdentifiers` (ADP catalog 29, field `calls.subjectidentifiers`), `Calls.Part2ConsentOnFile`, `UdfFields.Sensitivity`, `WorkflowCredentials.PublicJwks` |
| Release field IDs | catalog IDs such as `calls.completednotes`; `calls.subjectidentifiers#<key>` for one identifier; `calls.udf#<field name>` for one custom field |
| JWKS | `GET /api/v4/workflow-credentials/{credentialId}/jwks.json` (anonymous, public keys only) |
| Worker | ID 71, daily: expiry, ADP-offboarding revocation, toggle-off suspension, 30- and 7-day notices |
| Config | `DataProtectionConfig.ProtectedWorkflowReleaseLifetimeDays` (365), `ProtectedWorkflowHttpTimeoutSeconds` (30), `ProtectedWorkflowMaxFieldsPerRelease` (16), `ProtectedWorkflowStepUpFreshnessMinutes` (10), `ProtectedWorkflowAllowHttpBasicCredentials` (false), `ProtectedWorkflowExpiryNoticeDays` ("30,7"), `ProtectedWorkflowMaxResponseBytes` (1048576), `ProtectedWorkflowMaxCaptureKeys` (5), `WorkflowJwksOverlapDays` (7) |
