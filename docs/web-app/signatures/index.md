---
sidebar_position: 1
title: e-Sign
---

# e-Sign

e-Sign is the one signing layer Resgrid uses everywhere a document needs a signature: a protocol approval, a checklist witness, a skill evaluation, a customer's acceptance of a time report, an equipment receipt, an approval chain on a purchase. Every signature records **who** signed, the **exact statement** they agreed to, a **content code** (a short form of the SHA-256 hash of what was signed), the **level** of the signature, **how** the signer proved who they were, and when.

A signature binds to the content, never to the live record. If the document changes after it was signed, nothing is overwritten: the signature still stands for the content it covered, and Resgrid shows **Content changed** next to it. The changed document needs a new signature.

:::info What it costs
- Signatures by members (levels 1 and 2) and document sealing (level 3) are part of whichever module uses them, and free where that module is free. The [checklist witness signature](/web-app/checklists/witness-signature/) is included with Checklists.
- **In person** signing by someone without a Resgrid login ("Hand device to signer") is free wherever the module offers it. Work order and equipment receipt signatures are part of Readiness Pro either way.
- **Signing by link** (an e-mail or text message with a one-time code) comes with the paid add-on that owns the document — Business Operations, Readiness Pro or the LMS — and needs the department's [e-sign settings](./external.md#set-up-signing-by-link). Records inspections and custody transfers are signed in person only.
:::

**Where to find it:** there is no menu entry. Signatures are asked for on the page of the document that needs one, and what is waiting for you shows on your **Home** page (**Waiting for your signature**, **Waiting for your approval**) and on **My Training**. The signature pages share one set of tabs: **My signatures**, **Approvals**, **Verify a document**, and, for department admins, **E-sign settings**. You can bookmark `/User/Signatures/Mine`, `/User/Approvals/Index` and `/User/SealedDocuments/Verify`. Every signed-in member can open My signatures, Approvals and Verify a document; what each member may sign or request follows the rules of the module that owns the document.

The e-Sign screens are available in all 10 Resgrid languages; the non-English text is a first machine-translated pass.

## Signature levels

Every signature shows its level as a badge, for example **Level 2: identity re-checked**.

| Level | Badge | What it proves | How the signer signs | Used for |
|---|---|---|---|---|
| **L1** | signed-in session | This signed-in member agreed to this statement about this exact content. | **Sign** in their Resgrid session. | Protocol read-and-sign acknowledgments, and member steps a module sets at level 1. |
| **L2** | identity re-checked | As L1, and the member proved who they are again for this signature. | **Sign** after a fresh second-factor check, or **Sign with passkey** (the passkey's challenge carries the content's hash). | Approvals, protocol approvals and review stamps, certification verification, checklist witnesses, evaluators, certifying officials, equipment recipients. |
| **L3** | Sealed document | The PDF has not changed since it was sealed, and when it was sealed. | Resgrid seals the PDF (PAdES with an RFC 3161 timestamp) and adds an audit page. Not a signer's level. | Certificates, transcripts, protocol PDFs, Records copies, completed signature requests and approval chains. See [Sealing and verification](./verify.md). |
| **L4** | External signer | A named person without a Resgrid login signed this document. | In person on a member's device, or by a Resgrid link with a one-time code. See [External signers](./external.md). | Customers, occupants, vendors, outside parties, outside evaluators. |

A use has a minimum level that a department can raise (for example, protocols can require a passkey) but never lower. Steps for evaluators, certifying officials, witnesses and equipment recipients are always at least level 2.

## Where Resgrid asks for a signature

| Where | Who signs | Level | Needs | Page |
|---|---|---|---|---|
| **Protocols** — approval steps and "reviewed, no change" stamps | Approvers, the protocol's owner | L2 (passkey if the department requires it) | Protocols | [Protocols](/web-app/protocols/) |
| **Protocols** — read-and-sign acknowledgments | Every member a protocol is assigned to | L1 (L2 if the department requires a step-up) | Protocols | [Protocols](/web-app/protocols/) |
| **Certifications** — **Verify record** | The officer verifying a member's certification | L2 | Certifications | [Certifications](/web-app/business-ops/certifications/) |
| **Checklists** — witness signature on a completed run | An independent witness | L2 | Checklists (free) | [Checklist witness signature](/web-app/checklists/witness-signature/) |
| **Skill evaluations and task books** | Evaluator, then certifying official; or an outside evaluator | L2; outside evaluator L4 | LMS | [Multi-signer requests](./multi-signer.md) |
| **Deployments** — daily time report | The customer's representative | L4 | Business Operations (Deployments) | [External signers](./external.md) |
| **Bids** — customer acceptance | The customer | L4 | Business Operations | [External signers](./external.md) |
| **Contracts** — counterparty signature | The other party | L4 | Business Operations | [External signers](./external.md) |
| **Records inspections** — occupant representative | The occupant's representative | L4, in person only | Records | [External signers](./external.md) |
| **Evidence custody** — transfer to an outside party | The lab, court or outside agency | L4, in person only | Records | [External signers](./external.md) |
| **Work orders** — vendor acceptance of completed work | The vendor | L4 | Readiness Pro | [Work order signatures](/web-app/work-orders/signatures/) |
| **Inventory** — equipment issue receipt | The member who received it (L2), or the recipient in person (L4) | L2 or L4 | Readiness Pro | [Work order signatures](/web-app/work-orders/signatures/) |
| **Approval chains** — purchase requisitions, Incident Action Plans, invoices, Cal OES MARS packages, mutual-aid agreements | The chain's approvers | L2 | The module that owns the item | [Approval chains](./approval-chains.md) |

## The signature panel

Everywhere you sign, Resgrid shows the same panel:

- the panel's title and the level badge, for example **Your signature** with **Level 2: identity re-checked**;
- **You are signing this statement:** followed by the exact statement, for example *I witnessed the Ambulance start-of-shift checklist for Medic 7 and confirm that the results shown are what was recorded (content code 3F2A-91C0).* That text is stored with your signature;
- the **Content code** (for example `3F2A-91C0`) and the note *The signature covers exactly this text. If the text changes, it no longer matches and a new signature is needed.*;
- **Still to sign after you:** when other people must sign the same document;
- the action: **Sign** (or a module's own label such as **Approve** or **Sign as witness**), **Sign with passkey** where a passkey can be used, or **Hand device to signer** for someone without a login.

When the document is signed, the panel shows **Signed**, who signed and when, and a **Sealed PDF** button — or *sealing pending* while the seal is being produced.

![The signature panel on a signing page, showing the statement, content code, level 2 badge and the Sign and Sign with passkey buttons](/img/web-app/signatures/esign-signature-panel.png)

### Signing at level 2

1. Read the statement and check that the content code matches the document you are signing.
2. Choose **Sign**. If you have not just confirmed your identity, Resgrid asks for your second factor first, then records the signature. (*Sign asks you to confirm your identity with your second factor if you have not just done so.*) Your account needs two-factor authentication or a passkey — see [Account Security](/web-app/account-security/).
3. Or choose **Sign with passkey** and complete your browser's passkey prompt. The passkey's challenge contains the document's hash, so the passkey itself proves which content you signed. If you close the prompt, nothing is signed. If your browser cannot use passkeys, use **Sign** instead.

Where a department requires a passkey for a use, the panel says *A passkey is required.* and only offers **Sign with passkey**.

### Drawing or typing a signature (in person)

Members sign by choosing **Sign**; they never draw. A drawn signature is only used when someone without a Resgrid login signs on a member's device (**Hand device to signer**, page **Sign in person**):

1. The member opens the document and chooses **Hand device to signer**, then hands over the phone, tablet or laptop.
2. The signer reads the statement and the consent text and ticks **I agree to sign this document electronically.**
3. They type their **Printed name**, and optionally the **Witness (optional)** name.
4. Under **Signature** they sign with a finger, pen or mouse. **Clear** starts again. Without a pointer, **Use printed name as signature** turns the typed name into the signature.
5. They choose **Sign**. The capture is bound to the content code shown on the page; if the document changed meanwhile, it is refused and the member starts again.

See [External signers](./external.md#sign-in-person) for the details.

## My signatures

**My signatures** lists the steps whose turn it is for you, across every module: the **Document** (with its content code), **Your step**, the **Level** and when it **Expires**. **Review and sign** opens the signing page. With nothing waiting, the page says *Nothing is waiting for your signature.*

The same items appear as **Waiting for your signature** on your Home page and on My Training (the first three, with **All my signatures** when there are more). Approvals have their own list, **My approvals** — see [Approval chains](./approval-chains.md#approve-or-reject).

![My signatures with nothing waiting](/img/web-app/signatures/esign-my-signatures.png)

## A request's pages

### The signing page

Opening an item from My signatures (or **Signing page** on a document) shows the request as you see it:

- tiles for **Status**, **Signed** (for example *1 / 2*) and **Expires**;
- your signature panel — or the statement and content code when you are not a signer;
- **Signers**: every step in signing order with **Step**, **Signer**, **Level**, **Status** (*Waiting*, *Opened*, *Code verified*, *Signed*, *Declined*) and **Signed**;
- **Decline** for your own step, **Details** and **Open the document** for members who may act on the document, and **Back**.

When it is not your turn yet, your panel says *It is not your turn yet: earlier signers have not all signed.* If the document changed after the request was sent, the page warns *The document changed after it was shown for signing.* and the request can no longer be signed. See [Multi-signer requests](./multi-signer.md).

### Request details

**Details** (on the document's panel or the signing page) is for members who may act on the document. It shows the **Status**, **How** (*By link* or *In person*), **Expires**, the statement, the content code, and each signer with their **Role**, **Level**, **Status** and time. Outside signers' contact details are masked (for example `j***@cedarvalley.example`). From here you can:

- download the **Sealed PDF** (Resgrid's sealed evidence) and, for a link request, the **Completed document** (the e-sign platform's own completed PDF);
- **Send a new link** to an outside signer (the earlier link stops working);
- **Withdraw request** while it is still open.

<!-- SHOT: /img/web-app/signatures/esign-request-detail.png | A completed external signature request with its status, signer, Sealed PDF and Completed document buttons | /User/Signatures/Detail/(request id) | Cedar Valley Fire & Rescue; a completed By link request on time report DTR-2026-0412 signed by Harold Benton (customer, contact h***@pineridge.example); sealed -->

### The document's subject page

Equipment issue receipts have no page of their own in Inventory, so **Receipt** on an issued item opens a signature page for it (**Equipment issue receipt**). See [Work order signatures](/web-app/work-orders/signatures/#equipment-issue-receipts).

## Signatures on a document

A document's signatures are listed under **Signatures** on its page, with **Signer** (and their roles when they signed), **Meaning** (*Approval*, *Attestation*, *Review*, *Witness*, *Verification*, *Evaluate*, *Certify*, *Accept*) with the statement, **Level** with the method (*Signed-in session*, *Second-factor check*, *Passkey*, *In person*, *Signing link and code*), **Signed**, and **Check**:

| Check | Meaning |
|---|---|
| **Matches** | The document still hashes to what was signed. |
| **Content changed** | The document changed after it was signed. The signature still stands for the old content; a new one is needed for the new content. |
| **Voided** | The signature was voided (the reason is shown). |
| **Content not found** | The document no longer exists, so nothing can be checked. |

## Audit trail

For every signature Resgrid keeps the signer (or the outside signer's printed name and masked contact), their name and roles at the time, the meaning, the statement version and text, the level and method, the content hash, the time, the IP address and browser, the passkey used or the second-factor evidence, and — for outside signers — the consent text version and time, the one-time code channel and when it was verified, and the member whose device captured an in-person signature.

- Department admins see each step in **Security → Audit Logs** (types such as `SignatureRecorded`, `SignatureRequestCreated`, `ExternalSignatureCaptured`, `SignatureStepSigned`, `DocumentSealed`, `ApprovalGranted`). See [Audit logs](/web-app/security-permissions/#audit-logs).
- When a request completes, its evidence is sealed with a **Resgrid audit page** listing the subject, the content hash, every signer with level, method, time and evidence. The audit page is part of the sealed PDF, so it cannot be changed without breaking the seal.

## Walkthrough: get a customer's signature and find it later

Cedar Valley Fire & Rescue runs a contract deployment for Pine Ridge Timber Co. Captain Marcus Ellery needs the customer's representative, Harold Benton, to sign the daily time report.

**Send the request by link** (needs the Business Operations add-on and the department's e-sign settings):

1. Open the deployment's time report (**Deployments → the deployment → the time report**). Under **External signature**, choose **Request signature by link**.
2. Enter **Signer's name** *Harold Benton*, **E-mail** `harold.benton@pineridge.example`, and leave **Send the one-time code by** on **E-mail**. Choose **Send request**.
3. Resgrid says *The signing link was sent to h\*\*\*@pineridge.example.* The panel now shows *Signature request: Waiting for signature (By link), expires …* with **Details**.

![The Request signature by link form on a time report, with signer name, e-mail, phone and one-time code channel](/img/web-app/signatures/esign-request-by-link-form.png)

**The customer signs:**

1. Harold opens the e-mail *Cedar Valley Fire & Rescue: a document for you to sign* and its link, then chooses **Continue**.
2. He reads **Consent to sign electronically**, ticks the box and chooses **Agree and send my code**.
3. He enters the **Six-digit code** from the second e-mail and chooses **Confirm code**.
4. He reads the statement, signs in the embedded signing frame and chooses **I have finished signing**. The page says *Thank you. Your signature has been recorded.*

If Harold is standing next to Marcus, Marcus can instead choose **Hand device to signer** and let him sign on the tablet — no add-on or link needed. See [Sign in person](./external.md#sign-in-person).

**Find it later:**

1. Open the time report again. The **External signature** panel shows **Signed** with Harold's name and the time, and a **Sealed PDF** button (or *sealing pending*). The signer's name and time are also written to the report's customer signature fields.
2. **Details** shows the request, its signer and both documents.
3. Under **Signatures**, the **Check** column says **Matches** as long as the report is unchanged.
4. To check a PDF someone sends back later, open **Verify a document** and upload it — see [Sealing and verification](./verify.md).

## Setup examples

| Organization | How they use e-Sign |
|---|---|
| **Volunteer / career fire** | Protocol approvals at level 2; SCBA and apparatus checklists with a witness signature; task books certified by the training officer; vendor acceptance when the pump shop finishes a repair. |
| **EMS** | Controlled-substance checklists witnessed by a second paramedic with a passkey; skill evaluations signed by the evaluator and certifying official; equipment issue receipts for monitors and drug boxes. |
| **Search and rescue** | Issue receipts for radios and rope kits signed by the member; outside evaluators sign skill sheets in person at a joint exercise. |
| **Industrial / HAZMAT** | Occupant representatives sign inspection results in person; approval chains for purchase requisitions with an amount threshold. |
| **Law enforcement / security** | Evidence custody transfers signed in person by the lab or court clerk; sealed copies for disclosure. |
| **Contractors (business)** | Customers sign daily time reports and bids by link; counterparties sign service contracts; invoices pass an approval chain before they are sent. |
| **Canada / EU** | Signatures are simple electronic signatures with a sealed (PAdES) document; Resgrid does not provide qualified electronic signatures (QES). Check with your counsel which documents need a handwritten or qualified signature. |

## Technical reference

| Item | Value |
|---|---|
| Signature pages | `SignaturesController` (Areas/User): `Mine`, `Step/{id}`, `Detail/{id}`, `HandDevice/{id}`, `Subject?kind=&subjectId=`, `ESign`, `SealedPdf/{id}`; posts `RequestSignature`, `RequestMemberSignature`, `Resend`, `Void`, `SignStep` (L1), `SignStepUp` (L2, fresh step-up), `StepPasskeyOptions`, `SignStepWithPasskey`, `DeclineStep`, `WitnessChecklist` |
| Shared UI | `Shared/_SignaturePanel`, `Shared/_SignaturesList`, `Shared/_PendingSignatures`, `Shared/_ChecklistWitnessSignature`; view components `SignatureRequests`, `PendingSignatures`, `ChecklistWitnessSignature` |
| Pages that host a panel | Protocols `Review` and `View`; ProtocolAcknowledgments `Read`; Certifications `Record` (**Verify record**); Checklists `CompletionDetail`; LmsSkills `Evaluation`, `TaskBook`; Deployments `TimeReport`; Bids `View`; Contracts `View`; RecordInspections `Details`; RecordInvestigations `Custody`; WorkOrders `Detail`; Inventory `Workspace` (**Receipt**); Invoicing `View` and CalOesMars `WorkItem` (approval panel); Home `Dashboard`/`DashboardModern` and Trainings `Index` (pending lists) |
| Levels | `SignatureLevels`: 1 Attest, 2 StepUp, 3 Sealed, 4 External |
| Methods | `SignatureMethods`: Session, StepUp, Passkey, InPersonOnline, InPersonOffline, ExternalLink |
| Meanings | `SignatureIntents`: Attest, Approve, Review, Witness, Verify, Evaluate, Certify, Accept |
| Tables | `SignatureRecords` (M0341), `SealedDocuments` + `SealedDocumentInputs` (M0356), `SignatureRequests` + `SignatureRequestSigners` (M0357), `SignatureCaptures` and external columns (M0358), `ESignProviderAccounts` + `ESignWebhookEvents` (M0359), multi-signer step columns (M0371), approval chains (M0385), mutual-aid agreements (M0386); SQL Server and PostgreSQL |
| Permissions | No e-Sign permission of its own: each document uses its module's rule (see each page). **E-sign settings** is for department admins. |
| Department settings | None for e-Sign. Protocols' passkey requirement is **Protocol Library Settings** (setting 134). |
| Workers | 90 **Signatures** (every 5 minutes: webhook hints, envelope reconcile, expiry, reminders, pending seals, re-timestamps); 97 **Approvals** (every 5 minutes) |
| Workflow triggers | 218 `DocumentSealed`, 219 `DocumentSealingFailed`, 220 `SignatureRequested`, 221 `SignatureCompleted`, 222 `SignatureDeclined`, 223 `SignatureExpired`, 270 `SignatureStepAssigned`; approvals 236–239 — see [Workflows](/web-app/workflows/) |
| Notifications | Direct push + e-mail: 66 `SignatureStepAssigned` (also reminders), 67 `SignatureRequestClosed` (push code `SG:` + request id); approvals 73/74 (`AP:`) |
| Audit log types | `SignatureRecorded`, `SignatureVoided`, `SignatureRequestCreated`, `SignatureRequestResent`, `SignatureRequestVoided`, `SignatureRequestCompleted`, `SignatureRequestDeclined`, `SignatureRequestExpired`, `ExternalSignatureCaptured`, `SignatureStepSigned`, `SignatureStepDeclined`, `ChecklistWitnessSigned`, `DocumentSealed`, `DocumentSealingFailed`, `ESignAccountChanged`, approval types |
| v4 API | `GET /api/v4/Signatures/GetMyPendingSignatures`, `GetSignatureStep?requestId=`, `GetSubjectSignatures?kind=&subjectId=`, `GetSigningArtifact?kind=&subjectId=`; `POST SignStep` (L2 needs a step-up recorded for the session; no passkey on v4), `DeclineStep`, `CaptureOffline` |
| Admin Assist | Security features `document-sealing`, `external-signatures`, `multi-signer-signatures`, `approval-chains`; Checklists `checklist-witness-signature`; Maintenance `readiness-signatures` |
