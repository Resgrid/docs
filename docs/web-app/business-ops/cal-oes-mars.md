---
sidebar_position: 10
title: Cal OES MARS
---

# Cal OES MARS — Mutual-Aid Reimbursement

California fire agencies that respond under the **California Fire Assistance Agreement (CFAA)** are reimbursed through Cal OES's **Mutual Aid Reimbursement System (MARS)**: an annual **Salary Survey**, **Administrative Rate** and **Attachment A** submission, an **F-5 resource inventory**, then an **F-42** and expense claim per resource order, an invoice Cal OES generates, and a payment from the paying entity. This module prepares all of it from the [deployment](deployment-finance)'s roster, daily time reports and expenses, checks it against the portal's rules, and gives you a **side-by-side handoff view** to type into MARS.

:::info Resgrid never touches the portal
Resgrid stores no MARS credentials, MFA tokens or browser sessions and **never writes to MARS**. Submission is a manual, audited step you perform in the portal; afterwards a manager records what the portal shows (*Observed in MARS*). Cal OES determines the allowed amount — the *expected reimbursement* here is an estimate from the rates and agreement in effect at dispatch.
:::

Business Ops add-on with `CostRecovery.CalOesMars`. Menu: **Workforce & Business Ops → Cal OES MARS**. Managers (administrators or *Manage Cal OES MARS reimbursement*) get the readiness dashboard; rostered members get their own **action queue** and can draft an F-42 for a deployment they are on.

![Readiness dashboard](/img/web-app/cal-oes-mars/index.png)

## Readiness dashboard

Pick a **check date** (a dispatch date) and the dashboard lists **blockers** (stop new F-42s from reaching *Ready for portal*) and **warnings**, each with a **Fix** link: no agency profile or an unverified one, no annual submission covering the date, no agreement, F-5 mismatches, an authority profile that no longer covers the date. Below: the **annual submissions in effect**, the **agency** card (*Edit agency*, *Mark verified today*), **at-a-glance counts** (F-5 resources and mismatches, agreements, open work items, returned items, invoices awaiting local approval) and links to the **official sources** and the MARS portal.

## Setting up (once a year)

### 1. Agency profile

**Cal OES MARS → Agency**: agency name, **MACS designator**, category, contact, address, **FEIN**, **SAM UEI**, SAM registration, **FI$Cal supplier**, portal role and a label for the portal account (never a password). These values are copied onto every F-42 and claim. **Mark verified** after comparing with the agency record in MARS; changing an identifier clears the verification and the dashboard warns after a year.

![Agency profile](/img/web-app/cal-oes-mars/agency.png)

### 2. F-5 resource inventory

**Cal OES MARS → Resources**: the crosswalk from your units and assets to their MARS / F-5 identity. **Draft from units** copies each unit's name, plate and VIN; add the **resource type**, kind, designator, serial, **ownership** (local agency, Cal OES, CAL FIRE, private, rental), effective window and, once the portal shows it, the **MARS resource id** via **Record observation**. Review states: *Draft → Reviewed → Observed*, or *Mismatch* when what MARS shows differs. The F-42 flags apparatus that is *Not in the F-5 resource inventory*.

![F-5 resources](/img/web-app/cal-oes-mars/resources.png)

### 3. Annual rates

**Cal OES MARS → Rates**: one **submission** per type and year — *Salary Survey*, *Attachment A (non-suppression)*, *Administrative Rate*, *Cal OES Rate Letter*, *Special Equipment / FEMA codes* — with its effective window, source URL/date/checksum and status **Draft → Reviewed → Signed locally → Submitted in MARS → Accepted** (or *Superseded* by a newer snapshot). An earlier dispatch keeps the submission in effect when it started.

![Annual rate submission](/img/web-app/cal-oes-mars/rate-edit.png)

| Panel | Use |
|---|---|
| **Rate lines** | Salary lines need a **classification**; equipment lines a resource or FEMA code; each has a basis (hourly, daily, per mile, percent, flat), **straight** and **overtime** rate, portal-to-portal and overtime eligibility, and whether workers' comp / unemployment insurance are included. **Build from workforce pay data** (with the [Workforce](workforce) module) fills the straight and overtime rates with the mean of the approved individual hourly rates per classification — aggregates only, a review aid; the authorized representative still signs in MARS. **Cal OES base rate accepted** skips your own survey rows. |
| **Administrative-rate inputs** | Prior-year actuals by function and category, classified *direct / indirect / unallowable*, with a *billed directly to an incident* exclusion and a *possible double count* marker that must be resolved. Budgets never enter here. |
| **Administrative-rate worksheet** | **Build administrative rate**: allowable indirect ÷ allowable direct from the accepted inputs, compared with the **de-minimis** option (10 %); choose the method. |

### 4. Agreements

**Cal OES MARS → Agreements**: the approved **MOU / MOA / GBR** compensation methods — *actual hours* or *portal-to-portal*, overtime after 8 or 12 hours or per agreement — per classification or department-wide, with a window and optionally the signed document uploaded as a deployment attachment. An F-42 selects the agreement in effect at initial dispatch; an agreement referenced by a submitted record is immutable (editing creates a new version).

![Agreements](/img/web-app/cal-oes-mars/agreements.png)

## Per incident

### 5. The action queue

**Cal OES MARS → Queue**: F-42s, expense claims and MARS invoices grouped by deployment with their local state, checklist result, observed status, expected amount and age. **Prepare a record** picks a *cost-recovery* deployment and builds an **F-42** — one per ordered resource / request (give the request or fill id when a Records order has several); a redispatch supersedes the earlier one — or an **expense claim** linked to an F-42 or on the *travel-only* path.

![Action queue](/img/web-app/cal-oes-mars/queue.png)

### 6. The F-42 work item

![F-42 work item](/img/web-app/cal-oes-mars/work-item.png)

The page follows the **official box order**: responding agency (MACS designator), incident (order number, request number, *redispatch of*, resource type, strike team / task force, reporting location, overhead position), **dispatch / commitment** and **return / redispatch** times (*release is not return* — the F-42 needs the return or redispatch time), apparatus / support vehicles / equipment (kind, designator, resource code, hours, miles, odometer), **personnel** (name, rank, classification, committed hours and actual hours from the DTRs), crew rotations with approval attachments, comments / loss-damage / supply numbers, **signatures** (responding agency signer, incident / AREP authorizer, or **Documentation only**) and attachments. Every value links to the immutable deployment facts it came from.

Then, in order:

| Step | What happens |
|---|---|
| **Run checklist** | Validates against the portal rules (missing return time, unsigned F-42 attachment, no agreement, apparatus not in F-5 …). A clean checklist moves the record to **Ready for portal**; errors leave it at *Needs review*. |
| **Calculate** | **Expected reimbursement** from the rates and agreement in effect at initial dispatch; a missing rate becomes an *Excluded* line with the reason, never a silent zero. No internal cost enters these lines. |
| **Open handoff view** | After ticking the attestation (*I am the authorized person entering this record in MARS*), a **side-by-side copy view** — box, value, source, *Copy* — for manual entry in the portal. Not stored, not cached, not a submission; opening it writes an audit entry only. **Evidence packet** downloads the supporting documents as a zip (it is *not* a MARS import file). |
| **Record submission observed in MARS** | The MARS record id and observed status → **Observed in MARS (Cal OES review)**. Later observations move it to *Returned for agency review* (closes the revision and opens a new one with the reviewer's comment), *Approved*, *Pending local agency approval*, *Pending paying entity* or *Paid*. |
| **Close** | Archives a finished item. |

Field crews can draft and validate the F-42 from the [Responder, Unit and Incident Command apps](../../apps/responder#deployments); the handoff and every observation stay on the web.

### 7. Invoices and payments

**Cal OES MARS → Reconciliation**: **Record a MARS invoice** as you see it in the portal — MARS invoice id, date, invoiced total, paying entity, observed status and the submitted records it covers. The invoice page compares **expected versus observed** with the variance, takes the **local decision** (approve, or reject with a comment, by name / title — recorded here, entered in MARS by you), and **Record payment** (paid on, reference, paying-entity status) marks the invoice and its records **Paid** — only ever from an observed payment.

![Reconciliation](/img/web-app/cal-oes-mars/reconciliation.png)

A MARS invoice is a work item, never a customer invoice: no invoice number, no aging, no e-mail or online payment.

## Reminders

The daily reminder digest to administrators covers: annual Salary Survey / Administrative Rate submissions expiring, agreements expiring, resources released without a ready or submitted F-42 (due 14 days after release by default), expense claims missing evidence, records returned for review, and MARS invoices awaiting local approval. It never submits, approves, picks a rate or changes an observed state.

## Setup examples

| Organization | How to use it |
|---|---|
| **California municipal / county fire** | Full cycle: agency profile verified each January, F-5 drafted from units, Salary Survey built from Workforce pay data, agreements per classification, F-42 per strike-team request, expense claims for lodging and meals, reconciliation of every MARS invoice. |
| **California fire district (volunteer)** | Same, with *Cal OES base rate accepted* instead of a survey and *Documentation only* F-42s for non-reimbursable responses. |
| **CAL FIRE cooperator / contract county** | Attachment A (non-suppression) submissions; agreements per MOU. |
| **Out-of-state agency on a California assignment** | Not MARS — use the deployment's DTR PDFs and time CSV for the EMAC reimbursement package. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/CalOesMars/{Index,Agency,Resources,Rates,Rate,Agreements,Queue,WorkItem,Handoff,Print,Packet,Reconciliation,Invoice}` and their POST actions (`SaveAgency`, `VerifyAgency`, `BuildResources`, `ObserveResource`, `SaveRate`, `SaveRateLines`, `SaveAdministrativeInputs`, `BuildAdministrativeRate`, `BuildSalarySurvey`, `SetRateStatus`, `ObserveRate`, `SaveAgreement`, `ObserveAgreement`, `BuildF42`, `BuildExpense`, `SaveF42`, `Validate`, `Calculate`, `ObserveSubmission`, `ObserveStatus`, `RecordInvoice`, `DecideInvoice`, `RecordPayment`, `Close`) |
| Model | `Core/Resgrid.Model/CostRecovery/CalOesMars/` — agency profile, resource profiles (F-5), rate profiles + lines + administrative inputs, agreement snapshots, work items (F-42, expense claim, generated invoice) with revisions; `CalOesMarsAuthorityProfile` (reviewed code/data contract `CFAA-2026-08-21`: box order, request prefixes, status maps, 10 % de-minimis) |
| States | `CalOesMarsLocalStates`: Draft, NeedsReview, ReadyForPortal, SubmittedExternal, ReturnedForAgencyReview, Approved, DocumentationOnly, PendingLocalAgencyApproval, LocalAgencyRejected, PendingPayingEntityApproval, Paid, Closed |
| Permission | *Manage Cal OES MARS reimbursement* (79; claim actions view / update / submit / reconcile); rostered members prepare their own drafts without it |
| Config | `CostRecoveryConfig`: `CalOesMarsPortalUrl`, `F42DueDaysAfterRelease` 14, `AnnualDeadlineLeadDays` 45, `AgreementExpiryLeadDays` 30, `HandoffAttestationRequired` |
| Worker | 32 `DeploymentFinanceReminderLogic` MARS duties (daily) |
| Services | `ICalOesMarsService`, pure `ICalOesMarsReimbursementCalculator`, `ManualCalOesMarsGateway` (zero external writes) |
| API | `api/v4/CalOesMars/*` (queue, F-42 draft/validate for the apps) |
