---
sidebar_position: 15
title: Deployments & Connectors
---

# Deployments & External Connectors

**Deployments** track the external resource orders your department fills — a strike team sent on a wildland assignment through IROC, a crew loaned under EMAC, a Canadian request through CIFFC — from the order through mobilization, release and close-out. The ordering system stays authoritative: the order document is stored as an **immutable, checksummed snapshot** and nothing is ever written back.

:::note Preview feature
Deployments and connectors are a **Preview** feature. Fixtures were built from published IROC, CIFFC and EMAC documentation, not live integrations. Verify against your ordering system.
:::

Menu: **Records → Manage → Deployments**.

![Deployments](/img/web-app/records/deployments.png)

## Recording a deployment

**New deployment**:

| Field group | Contents |
|---|---|
| **Order** | Order number, incident, country / subdivision, ordering and dispatch offices. |
| **Agencies** | Requesting, receiving and sending agency; the **department role** — *Filling the order*, *Requesting resources* or *Hosting incident*. |
| **Cost** | Cost code, agreement reference, currency / units / time zone. |
| **Order artifact** | Upload the order document (PDF, JSON or CSV) from the source system; stored as a snapshot with source system and version. |
| **First fill (optional)** | Request number, resource, position, trainee, assigned person, home unit, host agency, needed on. |

From the deployment page add further **fills**, update their status (requested → assigned → mobilized → released → returned, or declined with a reason), **record a new snapshot** when the order changes (the previous snapshot is kept and superseded) and finally **close out** (every accepted fill must be *Returned* first).

## External connectors

**Records → Manage → Deployments → External connectors** reads orders automatically from a source that serves the **Resgrid Mutual-Aid Order Feed v1** (JSON). Screen-scraping is not supported.

| Setting | Notes |
|---|---|
| **Connector name / Feed provider / Source system / Feed root (https)** | Where to read. |
| **Credential kind / header name / credential** | Encrypted at rest, never shown again. |
| **Read authority granted** | Write authority is never granted in this release. |
| **Poll interval (minutes) / Requests per hour** | Request limits. |
| **Source terms** | Acknowledge the source's terms before the connector can be enabled. |
| **Inbound push endpoint / Inbound token** | For sources that push; the token is shown once. |

Every read lands as a new snapshot; **Reconciliation** lists where the source and your record disagree (source released but a fill not returned, request exists in the source but not locally …) and a coordinator decides — nothing is applied automatically. The **Run log** shows each poll's outcome and counts.

## Setup examples

| Department | Use |
|---|---|
| **Wildland / type 3 IMT** | One deployment per resource order; fills per crew member; snapshots when IROC updates the order. |
| **State EMA** | Role *Requesting resources* for EMAC missions received; *Hosting incident* for incoming teams. |
| **Municipal fire** | Mutual-aid strike team deployments with cost codes for FEMA reimbursement. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/RecordDeployments/{Index,New,Details,Artifact}`, `/User/RecordDeploymentConnectors/{Index,New,Edit}` |
| Model | `RmsExternalOrder`, `RmsExternalOrderFill`, `RmsExternalOrderSnapshot`, `RmsExternalOrderConnector` |
| Feed contract | `docs/architecture/rms-mutual-aid-order-feed-v1.md` (Core repository) |
| Config | Connectors can be switched off per installation (*External connectors are switched off*). |
