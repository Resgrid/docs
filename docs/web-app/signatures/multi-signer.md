---
sidebar_position: 2
title: Multi-signer Requests
slug: /web-app/signatures/multi-signer
---

# Multi-signer requests

Some documents need more than one signature, in a set order: an evaluator signs a skill sheet and then the certifying official confirms it; a member receives equipment and signs the receipt; a purchase passes the logistics chief and then the finance chief. Resgrid handles these as one **signature request with steps**. Each step is one signer, every signature binds to the same content code, and when the last step signs, the request is **Completed** and its evidence is sealed with an audit page.

Multi-signer requests are part of the modules that use them; there is nothing extra to buy for member steps. Outside signers in a request follow the [external signer](./external.md) rules (in person free, by link with the owning add-on).

**Where to find it:** you do not create a multi-signer request by hand — the module creates it when you submit the document (see the table below). What is waiting for you is under **My signatures** (`/User/Signatures/Mine`), on your Home page and on My Training as **Waiting for your signature**, and in the push and e-mail notice Resgrid sends when it is your turn. Every member can open My signatures; who may sign a step is set by the step (a named member, or any member who qualifies).

## How steps work

| Rule | What it means |
|---|---|
| **Ordered** | Signers sign in order of the step number. Steps with the **same number** sign at the same time (a parallel group), and the next number starts only when every step before it has signed. The signing page says *Signers sign in order of the step number; steps with the same number can sign at the same time.* |
| **All at once** | Every signer can sign at any time (*Every signer can sign at any time.*). |
| **Member steps** | Signed in Resgrid at level 1 or level 2. Evaluators, certifying officials, witnesses and equipment recipients always sign at level 2. A step names one member, or lets **any eligible member** sign — someone holding a listed certification type or personnel role. |
| **Outside steps** | A person without a login signs at level 4, in person or by link. A link is sent only when it is that signer's turn. |
| **One step each** | A member signs at most one step of a request, so an evaluator cannot also certify their own evaluation. |
| **Content** | Every step signs the same content code. If the document changes while the request is open, the request can no longer be signed and must be started again. |
| **Size** | Up to 20 steps. |

## Where requests come from

| Module | Steps | Level | Expires |
|---|---|---|---|
| **Skill evaluations** (LMS) — submitting a graded skill sheet | 1 Evaluator (a named member, any member eligible by certification or role, or an outside evaluator); 2 Certifying official, when the sheet needs one | L2; outside evaluator L4 | 30 days |
| **Task books** (LMS) — sending a completed task book for certification | 1 **Final evaluator recommendation**; 2 **Certifying official** | L2 | 30 days |
| **Equipment issue receipts** (Readiness Pro) — **Ask … to sign** on the receipt | 1 Recipient (the member the equipment was issued to) | L2 | 14 days |
| **Approval chains** — **Submit for approval** | One step per chain step, in the chain's order and parallel groups | L2 | The chain's **Expires after (days)** |

See [Trainings](/web-app/trainings/) for skill sheets and task books, [Work order signatures](/web-app/work-orders/signatures/) for issue receipts, and [Approval chains](./approval-chains.md).

## What each signer sees

**When it is your turn**, Resgrid sends a push notification and an e-mail, *Signature needed: Your signature is needed on (document) (content code …)*, with a link to the signing page. You are not told about your step until the steps before it have signed. The same item appears under **My signatures** and **Waiting for your signature** on your Home page and My Training.

**On the signing page** (**Review and sign**) you see:

- **Status**, **Signed** (for example *1 / 2*) and **Expires**;
- **Your signature**: the statement, the content code, your level and *Your step: …*, and **Still to sign after you:** with the other steps (an outside signer shows as *outside signer*, an open step as *any eligible member*);
- **Signers**: every step in order with its level, status (*Waiting*, *Opened*, *Code verified*, *Signed*, *Declined*) and signing time.

![A multi-signer signing page with the member's step, the statement, and the Signers table showing step 1 signed and step 2 waiting](/img/web-app/signatures/esign-step-page.png)

**Before it is your turn**, you can open the page (from the document) and read it, but your panel says *It is not your turn yet: earlier signers have not all signed.*

**If you cannot sign**, the panel tells you why:

| Message | What to do |
|---|---|
| *You do not hold a certification or role this step requires.* | The step is for members with a certification type or role you do not hold. Ask the requester. |
| *This step needs level 2: confirm your identity with your second factor or a passkey, then sign.* | Choose **Sign** again and complete the second-factor check, or **Sign with passkey**. |
| *This step must be signed with a passkey.* | Add a passkey under your account and sign with it. |
| *The document changed after it was shown for signing. Please start again.* | The document was edited after the request was sent; the requester must start a new request. |
| *You are not a signer of this step.* | The step belongs to someone else. Open your own item from **My signatures**. |

## Sign your step

1. Open **My signatures** and choose **Review and sign** (or follow the link in the notice).
2. Read the statement and check the content code against the document (**Open the document** opens it for members who may act on it).
3. Choose **Sign**. For a level 2 step, confirm your identity when asked — or choose **Sign with passkey**.
4. Resgrid says *Your signature was recorded.* and the next step's signers are told it is their turn. When yours was the last step, the request is **Completed**.

## Decline a step

Declining ends the whole request, not only your step.

1. On the signing page, choose **Decline**.
2. Under **Why are you declining?** write the reason. (*Declining ends the request for everyone; the requester is told your reason.*)
3. Choose **Decline to sign**. Resgrid says *You declined to sign. The request is closed.*

The request becomes **Declined**, your reason is shown next to your step, and the requester and the member signers get a *Signature request closed* notice. An outside signer who rejects the document in the e-sign platform declines the same way, with the platform's reason. To try again, the module starts a new request (for example by submitting the evaluation again).

## Reminders and expiry

- **Reminders.** A signer whose turn it still is gets a *Signature reminder* (push and e-mail) **24 hours** after their turn started, then every **48 hours**, at most **three** times, and never after the request expires. Worker 90 sends them.
- **Expiry.** A request that is not completed by its **Expires** time becomes **Expired**. The requester and the member signers are told *The signature request for … expired before everyone signed.*
- **Withdraw.** A member who may act on the document can open **Details** and choose **Withdraw request**; everyone is told it was withdrawn.

## When the request completes

- The request is **Completed** and every signer is listed with their time and level.
- The owning module applies the result (for example, a skill evaluation or task book moves on to its signed state, or an approval is granted).
- Resgrid seals the signature evidence — the document, every signer's statement and level, and the Resgrid audit page — as a PDF. Until sealing is available, the request shows *sealing pending*. See [Sealing and verification](./verify.md).
- The requester and the member signers get *The signature request for … was signed by everyone.*

## Setup examples

| Organization | Multi-signer use |
|---|---|
| **Volunteer / career fire** | Probationary firefighter task books: the company officer recommends, the training officer certifies. |
| **EMS** | Skill evaluations signed by any member holding the *Paramedic preceptor* certification, then the EMS lieutenant as certifying official. |
| **Search and rescue** | An outside evaluator from a neighboring team signs a rope-rescue skill sheet in person at a joint exercise. |
| **Industrial / HAZMAT** | Gas meters and SCBA issued to each shift member, each receipt signed by the recipient at level 2. |
| **Law enforcement / security** | Radios and body cameras issued to officers with a signed receipt; purchase approvals through a chain. |
| **Business (contractors)** | Invoices approved by the operations manager and then the owner before they are sent. |

## Technical reference

| Item | Value |
|---|---|
| Pages | `/User/Signatures/Mine`, `/User/Signatures/Step/{id}`, `/User/Signatures/Detail/{id}` (managers); posts `SignStep` (L1), `SignStepUp` (L2, fresh step-up, form held and replayed), `StepPasskeyOptions` + `SignStepWithPasskey` (passkey bound to the request's hash), `DeclineStep`, `RequestMemberSignature` |
| Models | `SignatureRequestSigners` columns from M0371: `SignerKind` (External 0, Member 1), `RequiredLevel`, `EligibilityJson` (certification type ids, personnel role ids, named members, department admins, excluded members), `StepLabel`, `DeclineReason`, `TurnStartedOn`, `NextReminderOn`, `LastRemindedOn`, `ReminderCount` |
| Roles | `SignatureSignerRoles`: Customer, Occupant, ExternalParty, Witness, Counterparty, Member, CertifyingOfficial, Evaluator, Vendor, Recipient |
| Request statuses | Draft, Sent (*Waiting for signature*), PartiallySigned (*Partly signed*), Completed, Declined, Expired, Voided (*Withdrawn*) |
| Limits | 20 steps; reminders after 24 h, then every 48 h, at most 3 (`SignatureReminderPolicy`); default expiry 14 days |
| Services | `ISignatureRequestService` (`CreateMultiSignerAsync`, `CreateEvaluationAsync`, `GetStepViewAsync`, `SignStepAsync`, `DeclineStepAsync`, `GetPendingForUserAsync`), `ISignerEligibilityService`, `ISignatureNotificationService` |
| Worker | 90 **Signatures**: reminders, expiry, sealing of completed requests |
| Notifications | 66 `SignatureStepAssigned` (turn started, and reminders), 67 `SignatureRequestClosed` (completed, declined, expired, withdrawn); push + e-mail, push code `SG:` + request id, active members only, in each member's language |
| Workflow triggers | 220 `SignatureRequested`, 221 `SignatureCompleted`, 222 `SignatureDeclined`, 223 `SignatureExpired`, 270 `SignatureStepAssigned` (ids and roles only; no outside signer's name or contact) |
| Audit log types | `SignatureStepSigned`, `SignatureStepDeclined`, `SignatureRequestCompleted`, `SignatureRequestDeclined`, `SignatureRequestExpired`, `SignatureRequestVoided` |
| v4 API | `GET /api/v4/Signatures/GetMyPendingSignatures`, `GET GetSignatureStep?requestId=`, `POST SignStep` (L2 needs the session's step-up evidence; passkeys are web only), `POST DeclineStep` |
| Admin Assist | Security feature `multi-signer-signatures` → this page |
