---
sidebar_position: 4
title: Approval Chains
slug: /web-app/signatures/approval-chains
---

# Approval chains

An approval chain decides **who approves what, in which order, above which amounts, and when a stalled step escalates**. A department admin defines one chain per kind of item — purchase requisitions, Incident Action Plans, invoices, Cal OES MARS packages, mutual-aid agreements. When a member submits an item, Resgrid turns the chain into a [multi-signer request](./multi-signer.md): each step is a level 2 signature bound to the item's content code. A change to the item voids the approval, a rejection needs a reason, and the completed chain seals the item's document.

A kind without a chain needs no approval. Chains are part of the module that owns the item; they cost nothing extra.

**Where to find it:** the **Approvals** pages (`/User/Approvals/Index`, also the **Approvals** tab of the signature pages). Tabs: **My approvals** and **Delegates** for every member; **Requests**, **Chains** and **Mutual-aid agreements** for department admins. Items you can submit also show an **Approvals** panel on their own page (invoices, Cal OES MARS work items, mutual-aid agreements). Approvals waiting for you show on your Home page as **Waiting for your approval**.

## What can have a chain

| Kind | Available when | Submittable when | What the approval unlocks | Amount thresholds |
|---|---|---|---|---|
| **Purchase requisitions** | The Incident Back Office add-on is active | The requisition is **Submitted** | Moving the requisition to **Approved** needs the chain's approval of it as it is now | Yes |
| **Incident Action Plans** | The Incident Back Office add-on is active | The plan version is **Assembled** | Approving the plan version needs the chain's approval | No |
| **Invoices** | Business Operations invoicing is available | The invoice is a **Draft** | **Sending** the invoice needs the approval ("approve before send") | Yes |
| **Cal OES MARS packages** | Cal OES MARS cost recovery is available | An F-42 or expense claim work item is a draft, needs review or is ready for the portal | Opening the **portal hand-off** needs the approval | Yes |
| **Mutual-aid agreements** | Always | The agreement is a **Draft** or **In approval** | The agreement becomes **Approved** and is sealed | No |

Payroll runs will get a chain when payroll runs exist in Resgrid (the Chains page says so). Where a kind's module or add-on is not active, the Chains page shows *This module or its add-on is not active for your department.*

The chain adds to the module's own rules; it does not replace them (for example, the Incident Back Office's separation of duties and spending limits still apply). See [Incident Back Office logistics](/web-app/incident-back-office/logistics/), [Planning](/web-app/incident-back-office/planning/), [Invoicing](/web-app/business-ops/invoicing/) and [Cal OES MARS](/web-app/business-ops/cal-oes-mars/).

## Build a chain

Department admins only.

1. Open **Approvals → Chains**. Each kind has a card with its active chain's steps, or *No chain: these need no approval.*
2. Choose **Define chain** (or **Edit chain**).
3. Fill in the chain:
   - **Chain name**.
   - **Expires after (days)** — 1 to 90 (default 14). An undecided request expires after this many days.
   - **Active**.
   - **Allow the submitter to approve** — off by default: the member who submitted an item is never one of its approvers (separation of duties).
4. Under **Steps**, tick **Use** for each step you need (up to 12) and set:
   - **#** — the step number. Steps run in order; steps with the **same number** run in parallel and **all** must approve.
   - **Approver** — who can approve the step (see below), with the **Role**, **Member**, **Group** or **Certification type** it needs.
   - **Step name (optional)** — the label approvers see, for example *Finance chief*.
   - **Only above amount** (kinds with amounts) — the step applies only when the item's amount is above this. Blank = always.
   - **Escalation** — **Hours (blank: never)** after the step's turn starts, and **Escalate to department admins**, **Escalate to a role** (pick the role) or **Escalate to a member** (pick the member).
5. Choose **Save chain**. *The approval chain was saved.*

Saving creates a **new version** of the chain; requests already submitted keep the steps they started with. **Turn off** on the Chains page deactivates the chain (*The chain was turned off.*), after which the kind needs no approval.

![The approval chain editor for purchase requisitions with two steps, an amount threshold and escalation after 24 hours](/img/web-app/signatures/esign-approval-chain-editor.png)

### Approver kinds

| Approver | Who can approve the step |
|---|---|
| **Anyone in a role** | Any active member holding the chosen personnel role. |
| **A named member** | The chosen member — and their delegate while they are away (see [Delegates](#delegates)). |
| **Group admins** | The admins of the chosen group, or of **The subject's own group** when no group is picked. |
| **Certifying official** | Any active member holding a valid certification of the chosen type (or the role), who signs as certifying official. |
| **Department admins** | Any active department admin. |

When an item is submitted, each step's approvers are worked out at that moment (at most 15 named or group approvers per step). If a step would have nobody who can approve it — for example a named member who has left — the submission is refused: *A step names nobody who can approve it. Check the chain's roles and members.* If no step applies to the item's amount, it needs no approval: *No step of the chain applies to this amount: it needs no approval.*

## Delegates

While a member is on leave, their **named** approval steps also go to their delegate.

1. Open **Approvals → Delegates**.
2. Under **Add a delegate**, choose the **Delegate** (department admins also choose the **Member** they are setting it for).
3. Optionally set **Starts** and **Ends**: with dates, the delegate also stands in between them, not only during leave.
4. Choose **Save**.

The list shows each **Member**, their **Delegate** and **When** (*While on leave*, or the dates); **Remove** deletes one. Members manage their own delegate; department admins anyone's. Leave periods come from **Trainings → Leave of Absence**.

When a named approver is away at the moment their step's turn starts, their delegates are added to the step (shown as *Delegated: the named approver is away*). If they have no delegate, the step escalates at once.

## Submit an item

The submitter must be the member who owns the item (the requisition's requester, or the member who added the plan, invoice, work item or agreement) or a department admin.

From the item's page (invoices, Cal OES MARS work items, mutual-aid agreements):

1. In the **Approvals** panel, choose **Submit for approval**. The panel shows the latest request's status, its content code, and a warning if the item changed after it was submitted or approved.

From the Approvals pages (every kind):

1. Open **Approvals → My approvals**. Under **Submit for approval**, choose the kind (only kinds with an active chain are listed).
2. **Ready to submit** lists the items you may submit now. Choose **Review** on one.
3. Check the document (shown read-only with its amount and content code) and choose **Submit for approval**.

*Submitted for approval. The approvers were told.* The request page opens.

Resgrid refuses a submission that is already waiting (*This is already waiting for approval.*), one that is unchanged since it was approved or rejected (*Nothing changed since it was approved or rejected. Change it before submitting it again.*), and one in the wrong state (*This cannot be submitted in its current state.*).

## Approve or reject

**When it is your step**, Resgrid sends *Approval needed: Your approval is needed on (item) (content code …)* by push and e-mail; an escalated step sends *Approval escalated*. The request appears under **My approvals** (escalated ones first) with its **Subject**, **Amount**, **Step** and **Due** date, and on your Home page. Approval steps are signature steps, so the [multi-signer reminders](./multi-signer.md#reminders-and-expiry) apply too.

1. Open **My approvals** and choose **Review**.
2. The request page shows tiles for **Status**, **Amount**, **Steps approved** and **Content code**, **What is being approved** (the item's document as submitted, with **Open** to see it in its module), and **Steps** with each step's status (*Approved*, *Rejected*, *Waiting*, *Not yet*), who approved it and when.
3. To approve, use **Your approval**: read the statement (*I approve the purchase requisition … (content code …).*) and choose **Approve** — Resgrid asks for your second factor if you have not just confirmed it — or **Sign with passkey**. *Your approval was recorded.*
4. To reject, write the **Reason** under **Reject** and choose **Reject**. *The request was rejected and the submitter was told.* A reason is required.

The submitter, or a department admin, can **Withdraw** a pending request.

![An approval request page with the requisition document, the Your approval panel and the steps table with step 1 approved and step 2 waiting](/img/web-app/signatures/esign-approval-detail.png)

![My approvals with nothing waiting and the Submit for approval kinds](/img/web-app/signatures/esign-my-approvals.png)

### What happens next

- **Approved:** when every step has approved, the request is **Approved**, the submitter gets *Your approval request for … was approved.*, the module applies the decision (the requisition moves to Approved, the plan is approved, the invoice can be sent, the MARS hand-off opens, the agreement is approved), and the item's document is sealed: *Approved and sealed.* with **Download the sealed document**, or *Approved. Sealing pending: the sealed document is produced as soon as the sealing service is available.* If the module's own rules refuse to apply it, the page says so and you finish the step in the module; the approval stands.
- **Rejected:** the request is **Rejected** with the reason; the submitter is told. Change the item and submit it again.
- **Expired:** nobody finished in time; the submitter gets *Your approval request for … expired before it was approved.*

### When the item changes

The approval covers the item's content code, not the live item. Status, approval stamps and edit times are not part of the content, but amounts, lines and text are.

- Changed while pending: the request page warns *This was changed after it was submitted. The earlier approvals do not carry over; submit it again.* and approving is blocked.
- Changed after approval: *This was changed after it was approved. The approval no longer counts; submit it again.* — and actions that need the approval (sending an invoice, the MARS hand-off) are refused again.
- Submitting the changed item **supersedes** the earlier request (status **Superseded**); its signatures stand only for the old content.

## The department's requests

Department admins see every request under **Approvals → Requests**, filtered by status (**Pending**, **Approved**, **Rejected**, **Withdrawn**, **Superseded**, **Expired**), with the subject, content code, amount, who submitted it and when it was decided. Members see their own pending submissions under **My approvals** (**My pending submissions**); admins see **Pending in the department**.

## Mutual-aid agreements

Department admins can keep mutual-aid agreement documents and approve them with the department's own chain.

1. Open **Approvals → Mutual-aid agreements** and choose **New agreement**.
2. Enter the **Agreement** title, optionally a **Department link** (one of your [Department Links](/web-app/department-links/)) and/or the **Partner** name, the **Effective** and **Ends** dates, and the **Terms** (plain text, up to 20,000 characters). Choose **Save agreement**.
3. Submit it with **Submit for approval** in the **Approvals** panel at the top (a chain for **Mutual-aid agreements** must be active).
4. When approved, the agreement is **Approved**, sealed, and can no longer be edited. **Delete agreement** is available until then.

The agreement's statuses are **Draft**, **In approval**, **Approved** and **Withdrawn**. The page notes: *Your department's chain approves and seals this agreement. The partner department's countersignature over the department link is not available yet.*

## Setup examples

| Organization | Chains |
|---|---|
| **Volunteer / career fire** | Purchase requisitions: step 1 *Anyone in a role* Logistics Section Chief; step 2 the finance chief only above 5,000, escalating to department admins after 24 hours. |
| **EMS** | Invoices for standby coverage approved by the operations manager before they are sent. |
| **Search and rescue** | Incident Action Plans approved by the Incident Commander role and the agency representative in parallel (both step 1). |
| **Industrial / HAZMAT** | Purchases over a threshold need a *Certifying official* holding the site's procurement certification. |
| **Law enforcement / security** | Mutual-aid agreements approved by the chief and the department admins before signing on paper with the partner. |
| **Contractors (business)** | Invoices: the crew boss, then the owner above 10,000; Cal OES MARS F-42 packages approved before the portal hand-off. |
| **Canada / EU** | A threshold has no currency: the item's amount is compared as a number. Keep one currency per kind (for example invoices in CAD or EUR) so thresholds mean what you expect. |

## Technical reference

| Item | Value |
|---|---|
| Pages | `ApprovalsController` (Areas/User): `Index`, `Requests?status=`, `Detail/{id}`, `Submit?kind=&subjectId=`, `Chains`, `EditChain?kind=&id=`, `Delegates`, `Agreements`, `EditAgreement/{id}`; posts `Approve` (fresh step-up required, form held and replayed), `Reject`, `Withdraw`, `Submit`, `EditChain`, `DeactivateChain`, `SaveDelegate`, `RemoveDelegate`, `EditAgreement`, `DeleteAgreement`. Passkey approval uses the signing page's `SignStepWithPasskey`. |
| Shared UI | `Shared/_ApprovalPanel` (view component `ApprovalPanel` on Invoicing `View`, CalOesMars `WorkItem`; partial on Approvals `Submit` and `EditAgreement`), `Shared/_PendingApprovals` (Home) |
| Permissions | **Chains**, **Requests** and **Mutual-aid agreements**: department admins. Submitting: the item's owner or a department admin. Approving: whoever the chain step names. |
| Kinds | `SignatureSubjectKinds` 20 PurchaseRequisitionApproval, 21 IncidentPlanApproval, 22 InvoiceApproval, 23 PayrollRunApproval (reserved, no source), 24 CalOesMarsPackageApproval, 25 MutualAidAgreementApproval |
| Approver kinds | `ApprovalApproverKinds`: Role, NamedMember, GroupAdmin, CertifyingOfficial, DepartmentAdmins; escalation `ApprovalEscalationTargets`: DepartmentAdmins, Role, NamedMember |
| Statuses | `ApprovalRequestStatuses`: Pending, Approved, Rejected, Withdrawn, Superseded, Expired; agreements: Draft, InApproval, Approved, Withdrawn |
| Limits | 12 steps per chain; 15 approvers per step; expiry 1–90 days (default 14); escalation 0–2,160 hours; statement version `approval/1` |
| Tables | `ApprovalChains`, `ApprovalChainSteps`, `ApprovalRequests`, `ApprovalRequestSteps`, `ApprovalDelegates` (M0385); `MutualAidAgreements` (M0386) |
| Services | `IApprovalChainService`, `IApprovalGateService` (modules ask before acting), `IApprovalSubjectSource` per kind, `IMutualAidAgreementService`, `IApprovalNotificationService` |
| Worker | 97 **Approvals** (every 5 minutes): announces steps whose turn started (adds delegates first), escalates steps past their hours, syncs approvals whose signature request closed. Expiry and reminders run in worker 90. |
| Notifications | 73 `ApprovalAwaiting` (turn started, delegated or escalated), 74 `ApprovalDecided` (approved, rejected with reason, expired); push + e-mail, push code `AP:` + request id |
| Workflow triggers | 236 `ApprovalRequested`, 237 `ApprovalGranted`, 238 `ApprovalRejected`, 239 `ApprovalEscalated` |
| Audit log types | `ApprovalChainChanged`, `ApprovalDelegateChanged`, `ApprovalSubmitted`, `ApprovalGranted`, `ApprovalRejected`, `ApprovalWithdrawn`, `ApprovalEscalated`, `ApprovalSuperseded` |
| v4 API | `GET /api/v4/Approvals/GetMyApprovals`, `GET GetApproval?approvalRequestId=`, `POST Approve` (needs the session's step-up evidence), `POST Reject` (reason required), `POST Withdraw`, `POST Submit` |
| Admin Assist | Security feature `approval-chains` (location `Approvals/Chains`) → this page |
