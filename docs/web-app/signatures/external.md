---
sidebar_position: 3
title: External Signers
slug: /web-app/signatures/external
---

# External signers

An external signer is someone without a Resgrid login: a customer's representative signing a shift ticket, an occupant acknowledging inspection results, a lab clerk receiving evidence, a vendor accepting completed repairs. Resgrid records their signature at **level 4** in one of two ways:

- **In person** — a member chooses **Hand device to signer** and the person signs on the member's phone, tablet or laptop: consent, printed name and a drawn signature, with an optional witness. This is **free** wherever the document offers it and needs no e-sign platform.
- **By link** — Resgrid sends the person a single-use link by e-mail or text message. Before signing they consent to sign electronically and enter a one-time code Resgrid sends them; only then does the signing frame load. Signing by link comes with the **paid add-on that owns the document** and needs the department's **E-sign settings** (a Documenso team) on an installation where the e-sign platform is set up.

Either way the signature binds to the document's content code, and the completed request is sealed with a Resgrid audit page.

**Where to find it:** on the document's own page, in the **External signature** panel (below). Department admins set up signing by link under **E-sign settings** (`/User/Signatures/ESign`), a tab of the signature pages. Who may ask for a signature is decided by the document's module, as listed below.

## Documents an outside person can sign

| Document | Where | Signer | Who may request | By link comes with |
|---|---|---|---|---|
| **Daily time report** | Deployments → the time report (not void or billed) | Customer | Members who may act on the report on the Deployments page; needs Deployments turned on | Business Operations |
| **Bid** | Bids → a **Submitted** bid | Customer | **Manage Bids** (116) or department admin, with contractor billing available | Business Operations |
| **Service contract** | Contracts → a contract that is not terminated | Counterparty | **Manage Contracts** (117) or department admin, with contractor billing available | Business Operations |
| **Records inspection** | Records → Inspections → the inspection | Occupant | **Records Prevention Admin** (69), with Records inspections turned on | Not offered (in person only) |
| **Evidence custody transfer** to an outside party | Records → Investigations → the evidence's custody | External party | **View Restricted Records** (59) and a member of the case, with investigations turned on | Not offered (in person only) |
| **Work order vendor acceptance** | Work Orders → a completed or closed order | Vendor | **Manage Work Orders** (114) for the order's group | Readiness Pro (Readiness Pro is also needed in person) |
| **Equipment issue receipt** | Inventory → Issuances → **Receipt** | Recipient | **Issue Inventory** (48) | Readiness Pro (Readiness Pro is also needed in person) |
| **Skill evaluation** by an outside evaluator | Trainings → the skill sheet | Evaluator | Whoever submits the evaluation | LMS |

Work order and receipt signatures are described on [Work order signatures](/web-app/work-orders/signatures/), skill evaluations under [Multi-signer requests](./multi-signer.md).

## The External signature panel

On each of those pages the **External signature** panel shows:

- with nothing signed yet: *A customer, occupant or outside party can sign this document in person on this device, or by a Resgrid signing link where available.*, the content code and **Hand device to signer**;
- **Request signature by link** when signing by link is available, otherwise one line saying why (for example *Signing by link is not set up (e-sign settings); in-person signing is available.*);
- an open request's status, for example *Signature request: Waiting for signature (By link), expires 2026-12-09 14:00 UTC.* with the masked contact, **Details**, and **Continue in person** for an unfinished in-person request;
- once signed: **Signed**, who signed and when, and **Sealed PDF** (or *sealing pending*);
- the document's **Signatures** list.

If you may not request a signature on the item, the panel says *You cannot request signatures on this item.*

![The External signature panel on a time report with Hand device to signer and the Request signature by link button](/img/web-app/signatures/esign-external-panel.png)

## Sign in person

1. Open the document and, in the **External signature** panel, choose **Hand device to signer**. The **Sign in person** page opens, headed with your department's name and the document.
2. Hand the device to the signer. They read **You are signing this statement:** (for example *I confirm that the time recorded on DTR-2026-0412 is correct (content code 7C1D-04AB).*) and the consent text.
3. They tick **I agree to sign this document electronically.**
4. They type their **Printed name** and, if someone witnesses it, the **Witness (optional)** name.
5. Under **Signature** they sign with a finger, pen or mouse (*Sign with a finger, pen or mouse. Without a pointer, type the printed name and use it as the signature.*). **Clear** starts again; **Use printed name as signature** adopts the typed name.
6. They choose **Sign**. Resgrid returns to the document: *Signed in person. The signed document is sealed when sealing is available.*

- An in-person request stays open for **24 hours**. If the signer stops halfway, **Continue in person** on the panel reopens the page; **Cancel** leaves it.
- The page is bound to the content code it shows. If the document changed meanwhile, the signature is refused (*The document changed after it was shown for signing. Please start again.*).
- Resgrid records the member whose device captured the signature, the printed name, the drawn signature (encrypted, with its hash), the witness name and the consent.

![The Sign in person page with the statement, consent box, printed name, witness and signature drawing area](/img/web-app/signatures/esign-hand-device.png)

## Set up signing by link

Signing by link needs three things:

1. **The e-sign platform on the installation.** The operator of the Resgrid installation runs a Documenso instance and points Resgrid at it. On a self-hosted installation without it, signing by link is simply not offered; in-person signing keeps working. See [Self-hosted configuration](#self-hosted-configuration).
2. **The owning add-on** active for the department (table above).
3. **The department's Documenso team**, entered by a department admin:
   1. Open **E-sign settings** (`/User/Signatures/ESign`). **Signing services on this installation** shows whether the **E-sign platform (Documenso)**, **Sealing service (EU DSS)**, **Timestamp authority**, **Signing certificate** and **Sealed document storage** are set up (*Yes* / *No*). These are set by the operator, not by the department.
   2. Under **Documenso team for this department**, enter the **Team ID** and the team's **API token** — a team-scoped token from the Documenso instance (on a self-hosted installation, create a team for the department in your Documenso and a token for it; otherwise ask the operator of your installation). The token is stored encrypted with the department's key and only its last four characters are shown afterwards; leave the field empty to keep the current token.
   3. Keep **Use this account for signing links** ticked and choose **Save**. Saving asks for a recent second-factor check. *The e-sign settings were saved.*
   4. **Remove token** removes the token; signing by link stops for the department.

Department users never sign in to Documenso; Resgrid is its only client.

![E-sign settings showing which signing services this installation has](/img/web-app/signatures/esign-settings.png)

## Request a signature by link

1. On the document, choose **Request signature by link**.
2. Enter the **Signer's name** (required), their **E-mail** and/or **Mobile phone** (international format, for example `+15551234567`), and choose **Send the one-time code by** **E-mail** or **Text message**. The address for the chosen channel is required. (*Resgrid sends the signer a single-use link. Before signing they consent to sign electronically and enter a one-time code sent to the e-mail address or phone number above.*)
3. Choose **Send request**. Resgrid prepares the document in the e-sign platform and sends the link:
   - *The signing link was sent to j\*\*\*@cedarvalley.example.* — done; or
   - *The request was created but the link could not be delivered.* — **Details** then shows the link once (*The signing link could not be delivered. You can pass it to the signer yourself; it is shown only now and can be used once.*); or
   - *The e-sign platform could not prepare the document. Please try again later.* — nothing was sent and the request was withdrawn.

The statement, the link message and the document the signer sees are written in your language (the one you use Resgrid in). The link expires after **14 days**.

**Send a new link** (on **Details**) issues a fresh link and the old one, and any signing session it opened, stops working. **Withdraw request** closes the request and the link.

## What the signer sees

The signer receives an e-mail *(Department): a document for you to sign* — *(Department) asks you to review and sign "(document)". … The link can be used once and expires on (date). Before signing you will confirm a one-time code.* — or a text message *(Department) asks you to sign "(document)": (link)*.

1. **Landing.** The page shows the department's name and the document, *(Name), (Department) asks you to review and sign a document.* and when the link expires. **Continue** exchanges the single-use link for a signing session (opening the link alone does not use it up, so mail scanners that open links do no harm).
2. **Consent.** **Consent to sign electronically** shows the consent text: they consent to do business electronically for this document, their electronic signature is as valid as a handwritten one, they can ask the sender for a paper copy, and they can withdraw by not signing. They tick **I agree to sign this document electronically.** and choose **Agree and send my code**. *Next, we will send a one-time code to j\*\*\*@… to confirm it is you.*
3. **Code.** *We sent a six-digit code to …* They enter the **Six-digit code** and choose **Confirm code**. The page shows how many attempts are left; **Send a new code** sends another.
4. **Sign.** The page shows the statement and content code and loads the e-sign platform's signing frame, where they review the document and sign. Then they choose **I have finished signing**. If the platform has not confirmed it yet: *Your signature is being confirmed. This can take a minute; you can close this page.*
5. **Done.** *Thank you. Your signature has been recorded. You can close this page.*

A used, withdrawn or expired link shows *This signing link is no longer valid. It may have been used already, withdrawn or expired. Please ask the sender for a new link.*

<!-- SHOT: /img/web-app/signatures/esign-signing-page-consent.png | The public signing page at the consent step, with the consent text and the Agree and send my code button | /Sign/(link token), after Continue | not taken: needs a live signing link (Documenso is not configured on the docs installation) -->

<!-- SHOT: /img/web-app/signatures/esign-signing-page-code.png | The public signing page asking for the six-digit code, with attempts left and Send a new code | /Sign/Session/Step | not taken: needs a live signing link (Documenso is not configured on the docs installation) -->

### Limits on the signing page

| Limit | Default |
|---|---|
| Link lifetime | 14 days (`ESignConfig.LinkExpiryDays`) |
| Link use | Once: **Continue** turns it into a signing session |
| Signing session | 60 minutes (`SessionMinutes`); after that the signer needs a new link |
| One-time code | 6 digits, valid 10 minutes |
| Codes sent | At most 5 per signer per hour (`MaxCodesPerHour`), and not more than one a minute |
| Wrong codes | 5 (`MaxCodeAttempts`), then the code is wiped and a new one is needed |
| Page requests | 30 per address per minute (`SigningPageRateLimitPerMinute`), then *Too many requests. Please wait a minute and try again.* |

## Identity checks: what is and is not proved

| | By link | In person |
|---|---|---|
| **Who the signer is** | Whoever controls the e-mail address or phone number the requester entered: the one-time code goes there. | Whoever stood at the member's device; the member's signed-in session and device are recorded. |
| **Consent** | Recorded with its text version (`esign-consent/1`), time and IP address. | The consent box must be ticked; recorded with the capture. |
| **Evidence kept** | Masked contact, the code channel and when the code was verified, the platform's completed PDF and audit certificate. | Printed name, drawn signature image and its hash, witness name, capturing member. |
| **Not checked** | No identity document is checked; the name is the one the requester typed. | No identity document is checked; the name is the one the signer typed. |

Contact details are encrypted at rest and only ever shown masked. Link tokens, sessions and codes are stored only as hashes. For a department using [Advanced Data Protection](/web-app/data-protection/), the outside signer's name on a Records inspection or custody transfer is protected: screens show it as *REDACTED* and the sealed evidence names the signer by role.

## After the document is signed

When every signer has signed, the request is **Completed** and:

- **Time report:** the signer's name and time are written to the report's customer signature fields (the typed customer name remains the fallback when neither signing method is used).
- **Bid:** a submitted bid is accepted.
- **Service contract:** the signature is recorded; activating the contract stays a separate step on the contract.
- **Records inspection and custody transfer:** the signature is recorded alongside the Records entry; the typed occupant name in the inspection form is unchanged.
- **Work order and issue receipt:** see [Work order signatures](/web-app/work-orders/signatures/).
- Resgrid seals the **signature evidence** (the document as signed, each signer's statement, drawn signature or printed name, witness, and the hash of the platform's completed PDF, plus the audit page) — **Sealed PDF**. For a link request, the platform's own completed PDF is kept as delivered — **Completed document**. See [Sealing and verification](./verify.md).

The request can also end **Declined** (the signer rejected it in the platform), **Expired** or **Withdrawn**.

## Self-hosted configuration

Signing by link is optional on a self-hosted installation. With `ESignConfig.DocumensoBaseUrl` blank, **E-sign platform (Documenso)** shows *No*, no **Request signature by link** form is offered, and in-person signing works for every department.

| Setting (`RESGRID__ESignConfig__…`) | Default | Meaning |
|---|---|---|
| `DocumensoBaseUrl` | blank | Documenso API base reachable from the cluster, for example `http://documenso:3000`. Blank = signing by link unavailable. |
| `DocumensoPublicUrl` | blank (= base URL) | The public origin the signing page embeds; the page's content security policy allows only this origin in its frame. |
| `DocumensoTimeoutSeconds` | 60 | API timeout. |
| `PlaceholderEmailDomain` | `signers.resgrid.invalid` | Recipients without an e-mail get a placeholder at this domain (Documenso needs one; it sends no mail — Resgrid sends the links and codes). |
| `WebhookAllowedNetworks` | blank | Comma-separated CIDRs the Documenso webhook may come from. Blank = every webhook is refused. |
| `WebhookSecret` | blank | Must match the secret Documenso sends in `X-Documenso-Secret`. Blank = every webhook is refused. |
| `LinkExpiryDays` | 14 | Link lifetime (a request may ask for 1–60 days). |
| `SessionMinutes` | 60 | Signing session after **Continue** (5–240). |
| `MaxCodesPerHour` | 5 | One-time codes per signer per hour. |
| `MaxCodeAttempts` | 5 | Wrong codes before the code is wiped. |
| `SigningPageRateLimitPerMinute` | 30 | Signing page requests per address per minute. |
| `ReconcileIntervalMinutes` | 30 | Worker 90 re-checks an open link request at most this often without a webhook. |

Point Documenso's webhook at `https://<events host>/webhooks/esign/documenso`. Webhooks are only hints: Resgrid re-reads the envelope from Documenso and trusts only that, and worker 90 re-checks open requests on its own schedule, so a missed webhook only delays completion. Links are built from `SystemBehaviorConfig.ResgridBaseUrl`, and e-mails and texts go through the installation's normal outbound e-mail and text messaging. Sealing is configured separately — see [Sealing and verification](./verify.md#self-hosted-configuration).

## Setup examples

| Organization | External signatures |
|---|---|
| **Volunteer / career fire** | Occupant representatives sign fire inspection results in person on the inspector's tablet (no add-on needed). |
| **EMS** | Equipment issued to a partner agency's crew is signed for in person (Readiness Pro). |
| **Search and rescue** | An outside evaluator signs a skill sheet by link after a joint exercise (LMS). |
| **Industrial / HAZMAT** | The contractor that serviced the foam system accepts the work order in person before leaving (Readiness Pro). |
| **Law enforcement / security** | Evidence handed to the state lab is signed for by the lab clerk on the officer's device. |
| **Contractors (business)** | The incident's finance unit signs daily time reports by link; customers accept bids and counterparties sign contracts by link (Business Operations). |
| **Canada / EU** | The consent step and one-time code give an electronic signature with a sealed document; Resgrid does not issue qualified electronic signatures. Text messages need an international-format number. |

## Technical reference

| Item | Value |
|---|---|
| Member pages | `SignaturesController`: `POST RequestSignature` (kind, subjectId, channel Remote 0 / InPerson 1, signer name, e-mail, phone, code channel), `GET/POST HandDevice/{id}` (2 MB request limit; drawn image up to 512 KB), `GET Detail/{id}`, `POST Resend/{id}`, `POST Void/{id}`, `GET SealedPdf/{id}`, `GET/POST ESign` (department admins; save needs a recent step-up) |
| Panel | View component `SignatureRequests` (`Shared/Components/SignatureRequests/Default.cshtml`) on Deployments `TimeReport`, Bids `View`, Contracts `View`, RecordInspections `Details`, RecordInvestigations `Custody`, WorkOrders `Detail`, Signatures `Subject` |
| Public signing page | `SignController` (anonymous, no-store, never framed, rate limited): `GET /Sign/{token}` (landing), `POST /Sign/{token}` (start session, HttpOnly cookie `rg-esign` on `/Sign`), `GET /Sign/Session/Step`, `POST /Sign/Session/Consent`, `POST /Sign/Session/Code`, `POST /Sign/Session/Verify`, `POST /Sign/Session/Done`; view `Views/Sign/Index` |
| Webhook | Eventing `POST /webhooks/esign/documenso` (allowed networks + shared secret; idempotent by event id; kept 7 days) |
| Uses | `ExternalSignatureUse`: TimeReport (customer, Business Operations), Bid (customer, Business Operations), ServiceContract (counterparty, Business Operations), RecordsInspection (occupant, no add-on: in person only), CustodyTransfer (external party, no add-on: in person only), WorkOrderVendorAcceptance (vendor, Readiness Pro), InventoryIssueReceipt (recipient, Readiness Pro), SkillEvaluation (evaluator, LMS) |
| Feature flags | `Operations.Deployments` (time reports), `Records.Prevention.Inspections`, `Records.Investigations` |
| Permissions | Manage Bids 116, Manage Contracts 117, Manage Deployments 118, Records Prevention Admin 69, View Restricted Records 59, Manage Work Orders 114, Issue Inventory 48 |
| Tables | `SignatureRequests`, `SignatureRequestSigners` (M0357), `SignatureCaptures` and external columns on `SignatureRecords` (M0358), `ESignProviderAccounts`, `ESignWebhookEvents` (M0359) |
| Config | `ESignConfig` (above); `SystemBehaviorConfig.ResgridBaseUrl` for link URLs |
| Worker | 90 **Signatures** (every 5 minutes): webhook hints, envelope reconcile, expiry, sealing of completed requests |
| Workflow triggers | 220 `SignatureRequested`, 221 `SignatureCompleted`, 222 `SignatureDeclined`, 223 `SignatureExpired` (subject and counts only; never a signer's name, e-mail or phone) |
| Audit log types | `SignatureRequestCreated`, `SignatureRequestResent`, `SignatureRequestVoided`, `SignatureRequestCompleted`, `SignatureRequestDeclined`, `SignatureRequestExpired`, `ExternalSignatureCaptured`, `ESignAccountChanged` |
| v4 API | `GET /api/v4/Signatures/GetSubjectSignatures?kind=&subjectId=` (contacts masked), `GET GetSigningArtifact?kind=&subjectId=` (what an in-person capture binds to), `POST CaptureOffline` (an in-person capture made offline; accepted only if the document is still at the bound content code; 409 otherwise) |
| Admin Assist | Security feature `external-signatures` (location `Signatures/ESign`) → this page |
