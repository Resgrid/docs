---
sidebar_position: 5
title: Sealing and Verification
slug: /web-app/signatures/verify
---

# Sealing and verification

Documents that leave Resgrid — a training certificate, a protocol PDF, a signed time report, an approved purchase — are **sealed** (signature level 3). Resgrid renders the PDF, adds a **Resgrid audit page** when it builds the document itself, signs the file with the installation's document-signing certificate (**PAdES**) and adds an **RFC 3161 timestamp** from a timestamp authority. Anyone can then check that the file has not changed since, and when it was sealed. **Verify a document** lets members upload any PDF and see what its signatures say and whether Resgrid issued exactly that file.

Sealing is part of the modules that produce the documents and costs nothing extra. It must be set up by the operator of the installation; until it is, documents are recorded as **sealing pending** and are sealed later.

**Where to find it:** **Verify a document** is a tab of the signature pages (`/User/SealedDocuments/Verify`) and is open to every signed-in member. Sealed PDFs are downloaded from the document's own page (**Sealed PDF**, **PDF**, **Download the sealed document**). Department admins see the installation's sealing status under **E-sign settings**.

## What Resgrid seals

| Document | Where you get it | Audit page |
|---|---|---|
| Protocol version | Protocols → a version → **PDF** | Yes |
| Protocol PDF book | Protocols → the PDF book | Yes |
| Training certificate of completion and transcript | The member's training records | Yes |
| Records revision export (optional sealed copy) | Records → the record's export | No — the Records PDF is sealed as it was produced |
| Records disclosure copy as released | Records → the disclosure's production, as a sealed copy | No |
| Signature evidence of a completed external or multi-signer request | The document's **Sealed PDF**, or **Details → Sealed PDF** | Yes |
| The item of a completed approval chain | Approvals → the request → **Download the sealed document** | Yes |
| The e-sign platform's completed PDF and audit certificate | **Details → Completed document** | Stored exactly as the platform delivered it (its own seal), not re-sealed by Resgrid |

See [Protocols](/web-app/protocols/), [Trainings](/web-app/trainings/), [Saved Reports & Exports](/web-app/records/reports-and-exports/) and [Legal Holds & Records Requests](/web-app/records/legal-holds-and-disclosures/) for where each is downloaded.

### Seal levels

| Level | When | What it adds |
|---|---|---|
| **PAdES-BASELINE-T** | Documents without long retention | Signature + timestamp |
| **PAdES-BASELINE-LT** | Anything kept long-term: Records, training, inspection and custody signatures, any document with a retention period | T + the validation material (certificates, revocation data) embedded in the file |
| **PAdES-BASELINE-LTA** | Retention over 10 years | LT + a document timestamp; worker 90 re-timestamps the archive every two years |

Resgrid never seals with its own clock: a result without a timestamp from the timestamp authority is refused.

### The Resgrid audit page

A document Resgrid renders itself gets a last page titled **Resgrid audit page**: the **Department**, the **Document**, the **Subject**, the **Content hash (SHA-256)** and when it was **Prepared**, then the **Signers** with each one's **Role**, level, **Method**, time and **Evidence** (for example the one-time code channel and masked address, the consent version, the witness). A document without signatures says *No signatures are recorded on this document; it is sealed as issued.* The page ends with *This page is part of the sealed document. The seal (PAdES with an RFC 3161 timestamp) shows the file has not changed since it was sealed; check it under Verify a document in Resgrid or in any PDF reader.*

<!-- SHOT: /img/web-app/signatures/esign-audit-page.png | The Resgrid audit page at the end of a sealed time report, listing the customer signer with level 4, the one-time code evidence and the content hash | Sealed PDF from /User/Signatures/SealedPdf/(sealed document id) | Cedar Valley Fire & Rescue; sealed evidence of time report DTR-2026-0412 signed by Harold Benton by link (e-mail code to h***@pineridge.example); open in a PDF viewer, scrolled to the last page -->

### Sealing pending

Sealing fails closed. While any part of sealing is not configured or not reachable, the document is signed and recorded but shows *sealing pending*; downloading it gives the unsealed rendering. Worker 90 retries with a growing wait (2, 4, 8 … minutes, at most 12 hours apart) and gives up after 40 attempts (about two weeks), when the document is marked failed. Inputs over 25 MB are not queued.

For a department using [Advanced Data Protection](/web-app/data-protection/), sealed copies of Records exports and disclosures are handed to the member but not kept in the sealed-document store; Resgrid keeps the file's hash, so the copy still verifies as issued.

## Verify a document

1. Open **Verify a document**.
2. Under **Document**, choose the **PDF document** (up to 25 MB) and choose **Verify**.
3. Read the **Result**:

| Shown | Meaning |
|---|---|
| **Issued by Resgrid: Yes** — *Resgrid issued exactly this file for this department.* | Resgrid's store holds a sealed (or stored as-is) document with exactly these bytes, for your department. The title, the kind of document and *timestamped …* are shown. |
| **Issued by Resgrid: Yes** — *Resgrid issued exactly this file, for another department.* | Resgrid issued it, but it belongs to another department, so nothing about its content is shown. |
| **Issued by Resgrid: No** — *Resgrid has no record of issuing this exact file. A changed file, even by one byte, does not match.* | Not issued by Resgrid, or changed since. A printout, a scan or a re-saved copy never matches. |
| **Valid signatures** — for example *1 / 1* | How many of the file's signatures the validation service accepted. |
| **SHA-256** | The hash of the file you uploaded. |
| Signature table | One row per signature: **Result** (`TOTAL_PASSED`, `INDETERMINATE` or `TOTAL_FAILED`, with a sub-indication), **Format** (for example `PAdES-BASELINE-LT`), **Signer**, and **Timestamp** with the timestamp authority. |

Other messages: *The document carries no signatures.*, *The validation service did not answer.*, *The file is not a PDF.*, and — when the installation has no validation service — *The validation service is not configured on this installation, so only Resgrid's own records are checked.*

![Verify a document with the PDF upload field and Verify button](/img/web-app/signatures/esign-verify-upload.png)

<!-- SHOT: /img/web-app/signatures/esign-verify-result.png | Verify a document result: issued by Resgrid for this department, one valid PAdES-BASELINE-LT signature with its timestamp | /User/SealedDocuments/Verify (after uploading) | Cedar Valley Fire & Rescue; uploaded the sealed training certificate of Priya Raman for "EMT Refresher 2026"; result TOTAL_PASSED, timestamped -->

Outside parties — a court, an auditor, another agency — do not need a Resgrid login: they can open the sealed PDF in any PDF reader and check its signature and timestamp there. Whether a reader shows a green check depends on whether the installation's certificate is on that reader's trust list; if not, the reader shows the signature's validity as unknown, but still detects a changed file. (Where the LMS add-on is enabled, course certificates can also carry a verification code with its own public page — see [Trainings](/web-app/trainings/).)

## What a seal proves — and what it does not

| A seal proves | A seal does not prove |
|---|---|
| The file is byte-for-byte what was sealed: any change breaks the seal. | That the content is true, complete or correct. |
| When it was sealed, from the timestamp authority's time (not Resgrid's clock). | Who an outside signer really is beyond the recorded evidence (a code sent to an e-mail address or phone, a printed name and drawn signature). |
| Which certificate sealed it (the installation's). | That the record in Resgrid still matches today — check the document's **Signatures** list, which shows **Content changed** when it no longer does. |
| With **Issued by Resgrid: Yes**, that Resgrid issued exactly this file. | Anything about a printout, a scan or a re-saved copy. |
| What the audit page lists: the signatures, levels and evidence when it was sealed. | A qualified electronic signature or seal under eIDAS (QES/QSeal). Resgrid's signatures are simple electronic signatures with an organization seal. |

## Self-hosted configuration

Sealing needs four parts, all blank by default. **E-sign settings** shows each as *Yes* or *No*: **Sealing service (EU DSS)**, **Timestamp authority**, **Signing certificate**, **Sealed document storage**. With any one missing, nothing is sealed and documents wait as *sealing pending*.

| Setting (`RESGRID__SealingConfig__…`) | Default | Meaning |
|---|---|---|
| `SidecarBaseUrl` | blank | The EU DSS REST service (the `resgrid-sealing` sidecar), for example `http://resgrid-sealing:8080/services/rest`. Blank = sealing not configured. **Verify a document** uses the same service to validate uploads. |
| `SidecarApiKey` | blank | Optional key sent as `X-Resgrid-Sealing-Key` to a proxy in front of the sidecar. |
| `SidecarTimeoutSeconds` | 60 | Timeout for sealing and validation calls. |
| `TsaUrl` | blank | The RFC 3161 timestamp authority. The sidecar takes its timestamp source from its own configuration — set the same TSA there; Resgrid requires this field and refuses any sealed result without a timestamp. |
| `CertificateSource` | blank | `pkcs12` (a .p12/.pfx file: development and self-hosting) or `remote` (an HSM or CA remote signer integration). Blank = nothing is sealed. |
| `Pkcs12Path` / `Pkcs12Base64` / `Pkcs12Password` | blank | For `pkcs12`: the file path, or the file as base64 (for a Kubernetes secret), and its password. The file holds the key, the certificate and its chain. |
| `S3Endpoint`, `S3AccessKey`, `S3SecretKey` | blank | An S3-compatible store (for example the bundled RustFS). Blank = no store: sealing stays pending, because a sealed file must be kept to be served again. |
| `S3Bucket` | `resgrid-sealed` | A bucket of its own, so its retention is independent of imports, search and map packs. |
| `S3Region`, `S3UseSsl`, `S3ForcePathStyle` | `us-east-1`, true, true | Store connection options. |
| `S3Prefix` | `sealed` | Objects are stored under `sealed/(department id)/(subject kind)/(id)-(hash prefix).pdf`. |

Use a document-signing certificate your recipients' PDF readers trust if outside parties must see a green check; a self-issued certificate still seals and still detects changes. Restart the web and worker containers after changing configuration. Signing by link is configured separately — see [External signers](./external.md#self-hosted-configuration) — and [Features and upgrades](/self-hosted/features-and-upgrades/) for optional components in general.

## Setup examples

| Organization | Sealed documents |
|---|---|
| **Volunteer / career fire** | Members hand sealed training transcripts to a new department or the state; the receiving officer checks them under **Verify a document**. |
| **EMS** | The medical director's approved protocol versions are downloaded as sealed PDFs for the binder in each ambulance. |
| **Search and rescue** | Task book certifications sealed with the evaluator's and certifying official's signatures on the audit page. |
| **Industrial / HAZMAT** | Inspection results signed by the occupant are sealed at B-LT and kept with the site's records. |
| **Law enforcement / security** | Disclosure copies released under a records request are sealed, so the department can show exactly what it handed over. |
| **Contractors (business)** | The customer's accounts-payable team receives sealed time reports and can check them in their PDF reader. |
| **Canada / EU** | Seals are PAdES baseline signatures (AdES) with an organization certificate and a timestamp; where a qualified seal or signature is legally required, Resgrid's seal is not one. |

## Technical reference

| Item | Value |
|---|---|
| Pages | `SealedDocumentsController` (Areas/User): `GET Verify`, `POST Verify` (PDF up to 25 MB), `GET Download/{id}` (department admins, the member who produced it, or — for protocol versions — the version's readers), `GET ProtocolVersion?protocolId=&versionId=`; `SignaturesController.SealedPdf/{id}` (members who may act on the request's document). Responses carry `X-Resgrid-Seal: sealed` or `pending`. |
| Public route | None for sealed documents (Verify a document needs sign-in). LMS certificate codes: `/verify/certificate/(code)` (`CertificateVerifyController`, LMS). |
| Tables | `SealedDocuments`, `SealedDocumentInputs` (M0356) |
| Statuses | `SealedDocumentStatuses`: Pending, Sealed, Failed, StoredAsIs; roles: Sealed, ProviderCompleted, ProviderAuditCertificate, SealedExternalPdf |
| Levels | `PadesLevels`: BaselineT, BaselineLT, BaselineLTA (`SealingPolicy.LevelFor`: LTA above 10 years' retention; LT for long-term subjects or any retention) |
| Policy | `SealingPolicy`: 40 attempts, backoff 2^n minutes capped at 12 hours, 25 MB input limit, re-timestamp every 2 years |
| Services | `IDocumentSealingService` (`SealHtmlAsync`, `SealPdfAsync`, `VerifyAsync`, `GetAvailability`), EU DSS sidecar client, signing key provider |
| Config | `SealingConfig` (above) |
| Worker | 90 **Signatures**: pending seals with backoff, B-LTA re-timestamps |
| Workflow triggers | 218 `DocumentSealed`, 219 `DocumentSealingFailed` (not raised for Records documents and disclosures, which have their own events) |
| Audit log types | `DocumentSealed`, `DocumentSealingFailed` |
| Admin Assist | Security feature `document-sealing` (location `SealedDocuments/Verify`) → this page |
