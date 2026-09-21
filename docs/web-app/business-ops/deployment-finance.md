---
sidebar_position: 5
title: Deployment Finance
---

# Deployment Finance

A **deployment** is the money-and-time record of the units, personnel and equipment you sent somewhere: a strike team on a wildland assignment, an engine under contract at a film shoot, a crew loaned through EMAC, a medical team at a festival. It carries the **roster**, one **daily time report** (DTR) per day, **expenses** with receipts, **files** and a **manifest**, and it feeds — depending on its *finance mode* — nothing more than the record, a [Cal OES MARS](cal-oes-mars) claim, or a customer invoice through [Contractor Billing](contractor-billing).

Free for every department behind the `Operations.Deployments` flag. Menu: **Workforce & Business Ops → Deployment Finance**. Administrators and holders of *Manage deployments* see every deployment; everyone else sees **My Deployments** — the ones they are rostered on — and can file time on them.

![Deployments](/img/web-app/deployment-finance/index.png)

:::note Two kinds of "deployment"
[Records → Deployments](../records/deployments) tracks the **external resource order** (IROC, EMAC, CIFFC) and its fills. Deployment Finance tracks what it **cost and earned**. Use **Create from external order** to link the two.
:::

## Creating a deployment

Three ways:

| Start from | When |
|---|---|
| **New Deployment** | Anything you organize yourself. |
| **Create from external order** | A Records mutual-aid order is open: pick it, choose the finance mode and contact, optionally **prefill the roster from accepted fills** and **also create a call**. The order stays in Records. |
| **Bid → Schedule deployment call** | Contract work: the [deployment wizard](bids-and-deployment-wizard) creates the call, the deployment and the roster in one step. |

![New deployment](/img/web-app/deployment-finance/new.png)

| Field group | Fields |
|---|---|
| **Deployment** | Name; **Finance mode** — *Operational only* (time and expenses for the record), *Cost recovery* (feeds a reimbursement claim such as Cal OES MARS), *Billable* (feeds a customer invoice); **Contact** (the customer or requesting agency); **Call #** (optional — one deployment per call); **Window** start/end and **Max days**; notes. |
| **Agency identifiers** | Incident number, service request number, **resource order #**, **request #**, **cost code**, **point of hire** — whatever the ordering agency (VIPR, FEMA, BCWS, Cal OES) assigns; printed on time reports and invoices. |
| **Jurisdiction** | Home and host country / state-province, **time zone** (incident-local time for time reports; blank uses the department's), currency, **Out of province / state** and **Travel via air** (drive per-diem and travel rules in the rate schedule). |

Statuses: **Planned → Standby → Active → Demobilizing → Completed** (or **Cancelled**); change them from the deployment page. Workflows fire on *Deployment Created* and *Deployment Status Changed*.

## The deployment page

![Deployment roster](/img/web-app/deployment-finance/view-roster.png)

The header shows the identifiers, window, contact, call and external order; the **Summary** cards count units, personnel, time reports, personnel hours and expenses. Tabs:

### Roster

- **Units** — pick a unit and an optional call sign; the crew column shows how many seats are filled (this is the *crew size* that contract rates key on).
- **Equipment** — free-text items or inventory assets, issued to a unit or on their own, with **Return** when it comes back.
- **Personnel** — pick a member, a **seat** (a unit role; seats marked * require that personnel role and check its [certification requirements](certifications) — expiring certifications are flagged) and a **certification code** (which contract rate entry the person bills under). **Seat even when a requirement fails** overrides a failed check on purpose, audited.

### Time reports

One **daily time report** per day (**New time report** with the report date). Entries are prefilled from the roster with a default window you adjust.

![Time report](/img/web-app/deployment-finance/time-report.png)

| Element | Meaning |
|---|---|
| **Header** | Incident, resource order, request, cost code and point of hire copied from the deployment; **No clear 8** (overtime carries into the next shift) and **Unsafe conditions stand-down** flags for the billing policy. |
| **Time entries** | Subject (person, unit or equipment), **entry type** (*Deployment*, *Standby*, *Travel*), start and end (incident-local), paid and unpaid break minutes, km, notes. A subject cannot appear twice on the same report and only one report exists per day. |
| **Signatures** | **Sign as contractor** and the **customer signer name** — the agency representative who signed the paper DTR. |
| **Expenses** | Expenses attached to this day. |
| **Actions** | **Save**, **Save and submit** (entries lock once approved), **Approve** (needs *Approve time reports*), **Void** with a reason (kept for the record, dropped from billing), **PDF** and **File PDF on deployment** (stores the PDF under Files). |

Report statuses: **Draft → Submitted → Approved → Billed** (set by the billing engine), or **Void**. Crews can create and submit their own DTRs from the [mobile apps](../../apps/responder#deployments); approval happens on the web. **Export time CSV** on the deployment page downloads every entry.

### Expenses

![Expenses](/img/web-app/deployment-finance/view-expenses.png)

Date, **type** (*Per-diem meal, Accommodation, Private accommodation, Ferry, Fuel, Supply restock, Other*), amount and currency, description, city, **meal code** (B/L/D for per-diem windows), **receipt** upload, **Pre-approved** and **Billable**. Billable expenses pass through to the invoice; receipts ride along in the invoice packet and the MARS evidence packet.

### Files

Uploads by type — receipts, signed service request, time-report PDFs, manifest, certifications, external order, signed or paper F-42, ICS-213 approvals, crew rotation approvals, loss/damage, MARS evidence and invoices. **Preview manifest** renders the roster manifest; **File manifest PDF** stores it.

### Billing (billable deployments, Business Ops add-on)

Charge preview, compliance checklist, invoices and **Generate invoice** — see [Contractor Billing](contractor-billing).

![Billing tab](/img/web-app/deployment-finance/view-billing.png)

### Internal cost (Workforce entitlement)

Estimate versus actual internal cost and the cost runs for this deployment — see [Field Costing](field-costing).

![Costs tab](/img/web-app/deployment-finance/view-costs.png)

## Reminders and workflows

The deployment-finance reminder worker sends department administrators one digest a day listing billable deployments whose approved time reports have been unbilled for more than 21 days (or completed deployments with any unbilled report). It never generates or sends an invoice. Workflow triggers: **Deployment Created / Status Changed / Roster Changed / Expense Added / Attachment Added**, **Time Report Created / Submitted / Approved / Voided**.

## Setup examples

| Organization | Finance mode | Notes |
|---|---|---|
| **Municipal fire — strike team** | Cost recovery | Create from the Records external order; prefill roster; DTRs per day; Cal OES F-42 from the deployment (California) or the DTR PDFs for an EMAC / state reimbursement package. |
| **Wildland contractor** | Billable | Wizard from an accepted bid; seats keyed on NWCG codes; DTRs signed by the agency rep each day; generate the invoice and packet weekly. |
| **Private ambulance — event medical** | Billable | Manual deployment linked to the standby call; crews file time in the Responder app; expenses for supplies. |
| **SAR / CERT** | Operational only | Mission deployments for after-action documentation; hours per volunteer for grant reporting via the time CSV export. |
| **Security company — event** | Billable | One deployment per event contract; guard hours per DTR; supervisor premium from the rate schedule. |
| **Industrial ERT — plant turnaround** | Operational only or Cost recovery | Internal chargeback: time CSV plus a cost run. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/Deployments/{Index,New,Edit,View?tab=roster\|time\|expenses\|files\|billing\|costs,FromExternalOrder,TimeReport}`; POST `SetStatus`, `AddUnit/RemoveUnit`, `AddPersonnel/RemovePersonnel`, `AddEquipment/ReturnEquipment`, `NewTimeReport`, `SaveTimeReport`, `SignTimeReport`, `ApproveTimeReport`, `VoidTimeReport`, `SaveExpense`, `UploadAttachment`, `GenerateManifest`, `ExportTimeEntries`, `GenerateInvoice` |
| Model | `Deployment` (finance mode, status, identifiers, jurisdiction, `RmsExternalOrderId`), `DeploymentUnit`, `DeploymentPersonnel`, `DeploymentEquipment`, `DeploymentTimeReport` (pre-numbered per department), `DeploymentTimeEntry`, `DeploymentExpense`, `DeploymentAttachment` |
| Permissions | *Manage deployments* (118), *Approve time reports* (119) — default department administrators; rostered members see their own deployments and file DTRs without either |
| Flag | `Operations.Deployments` (free); `Records.System` needed for *Create from external order* |
| Worker | 32 `DeploymentFinanceReminderLogic`, daily |
| Time zones | DTR times are incident-local (`Deployment.LocalTimeZoneId`, else the department zone) and stored UTC |
| Data protection | `Deployment.Notes` is the only ADP-protected field (reveal on view/edit); DTRs, expenses and attachments are not protected because customers read them |
| API | `api/v4/Deployments/*`, `api/v4/TimeReports/*` (mobile DTR capture) |
