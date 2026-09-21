---
sidebar_position: 7
title: Contracts & Compliance
---

# Contracts & Compliance Documents

A **service contract** fixes, for one customer, the [rate schedule](rate-schedules), discount, payment terms, where invoices are submitted and which **documents** the customer expects at each stage — so every bid, deployment and invoice under it inherits the same rules. **Compliance documents** are your own certificate of insurance, workers' compensation clearance, SAM registration, business licence, CAGE code, tax registration and bonds, kept with expiry alerts so a contract requirement is satisfied automatically and the right papers ride along in the invoice packet.

Business Ops add-on with `Invoicing.ContractorBilling`. Menu: **Workforce & Business Ops → Contracts** (administrators and holders of *Manage contracts*).

![Contracts](/img/web-app/contracts/index.png)

## Contracts

**New contract**:

![Edit contract](/img/web-app/contracts/edit.png)

| Field | Use |
|---|---|
| **Customer** | The contact (its billing profile receives the invoices). |
| **Name**, **Contract number**, **Contract type** | *Standing arrangement* (call-when-needed / VIPR-style), *Project*, *Master services*, *Other*. |
| **Start** / **End** | The contract window; a contract past its end is swept to *Expired* and *Contract Expiring* fires 30 days before. |
| **Rate schedule** | Fixed for every bid and deployment under the contract, or *Use the default schedule* (contact profile default → first active). |
| **Discount %**, **Terms (net days)** | Override the billing profile for contract invoices. |
| **Invoice submission e-mail** | Where deployment invoices and their packet are sent by default (an agency's AP mailbox or portal address). |
| **Max deployment days**, **Response time (minutes)**, **Point of hire** | Commercial terms copied onto deployments created under the contract. |
| **Document template** | A free-text key naming the document layout the customer expects (leave empty for *Generic*); stored with the contract for your own reference and for integrations — the built-in bid and invoice PDFs use one layout in this release. |
| **Activate now** | Save as *Active* instead of *Draft*. |

**Document requirements** (bottom of the form): one row per document the customer expects, with the **stage** (*Bid submission*, *Deployment start*, *Daily time report*, *Invoice submission*), the **document type** and **Mandatory**. A compliance-document type is satisfied by a current department document; any other type is checked per deployment as an attachment.

### Contract statuses

**Draft → Active → Suspended / Expired / Terminated.** Change them from the contract page; only *Active* contracts can be picked for bids and deployments. *Contract Status Changed* and *Contract Expiring* are workflow triggers.

### The contract page

![Contract](/img/web-app/contracts/view.png)

Shows the terms, the **document requirements** with their live state (*Satisfied* with expiry, *Missing*, or *checked per deployment*), and the linked **bids**, **deployments** and **invoices**. **New bid** starts a bid under the contract.

## Compliance documents

**Contracts → Compliance documents.**

![Compliance documents](/img/web-app/contracts/compliance.png)

| Field | Use |
|---|---|
| **Document type** | *Insurance certificate, Workers' comp clearance, SAM registration, Business licence, CAGE code, Tax registration, Bond, Other*. |
| **Name**, **Document number**, **Issuer** | Printed on the compliance checklist and in packets. |
| **Effective on** / **Expires** | Only a current document satisfies a requirement. |
| **Alert lead (days)** | Department administrators are notified when the document enters the window and again when it lapses (daily sweep). |
| **File** | PDF or image up to 30 MB; leave empty on edit to keep the stored file. |

The contracts list shows a banner when any document is expiring or expired. Documents are attached to the invoice packet when the contract requires them at *Invoice submission*.

## Setup examples

| Organization | Contracts | Compliance documents |
|---|---|---|
| **Wildland contractor** | One *Standing arrangement* per agency (BCWS, USFS VIPR region, state forestry) with the season schedule, agency AP mailbox, max 14 deployment days, response time 120 min; requirements: COI + WCB at *Deployment start*, signed DTR at *Daily time report*, invoice packet at *Invoice submission*. | COI (annual, 30-day alert), WCB clearance (quarterly), SAM registration, CAGE code. |
| **Fire protection company** | *Master services* per municipality, 5-year window, net 45, discount 0. | COI, business licence, state fire-protection licence (as *Other*). |
| **Security company** | *Project* per event and *Standing arrangement* per client site; requirement guard-licence roster at *Deployment start*. | Security company licence, COI, bond. |
| **Private ambulance** | *Standing arrangement* per hospital group with PO required on the billing profile. | State ambulance service licence, COI. |
| **Municipal fire (cost recovery)** | Usually none — MARS and mutual-aid claims use agreements, not contracts. | COI where a neighbouring jurisdiction requires it. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/Contracts/{Index,New,Edit,View,Compliance}`; POST `Save`, `SetStatus`, `Delete`, `SaveComplianceDocument`, `DeleteComplianceDocument`; `ComplianceFile` download |
| Model | `ServiceContract` (type, status, schedule, terms, submission e-mail, `DocumentTemplateKey`, requirements JSON), `ServiceContractDocumentRequirement`, `DepartmentComplianceDocument` |
| Enums | `ServiceContractTypes`, `ServiceContractStatuses`, `DocumentRequirementStages`, `ComplianceDocumentTypes` |
| Permission | *Manage contracts* (117) — grants view and edit; department administrators always |
| Worker | 33 compliance expiry (daily): lapsed contracts → Expired, *Contract Expiring* ≤ 30 days once per day, compliance-document lead-window digest to administrators |
| Workflow triggers | 79 Contract Status Changed, 80 Contract Expiring |
| API | `api/v4/ServiceContracts/*` |
