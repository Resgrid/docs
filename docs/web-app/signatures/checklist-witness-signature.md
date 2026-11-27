---
sidebar_position: 6
title: Checklist Witness Signature
slug: /web-app/checklists/witness-signature
---

# Checklist witness signature

A checklist can require an **independent witness** — a second member who checks the submitted answers and evidence before the run counts as complete. By default the witness attests with a written statement. Turn on the **witness signature** and the witness signs at **level 2** instead: a fresh second-factor check, bound to the run's recorded results by a content code. Use it for controlled-substance counts, drug box seals, SCBA checks and anything with regulatory weight.

The witness signature is **included with Checklists** for every department; it does not need Readiness Pro.

**Where to find it:** turn it on in the checklist's draft (**Checklists → the checklist → Edit draft**). The witness signs on the run detail page (`/User/Checklists/CompletionDetail/(run id)`). Any member who can open the run can witness it, except the person who completed it. See [Checklists](/web-app/checklists/) for building and running checklists.

## Turn it on

1. Open the checklist and choose **Edit draft**.
2. Tick **Require a different authenticated member to witness the submission**.
3. Tick **The witness signs at L2 (a fresh step-up or a passkey), bound to the content of the completion**.
4. Publish the draft. Runs of the new version are witnessed with a signature instead of **Attest and complete**.

## What the witness signs

When a run of the checklist is submitted, it moves to **Awaiting witness** and its page says *This run needs a different authenticated member to independently verify the submitted answers and evidence. Share this page link with that member.* The page then shows the **Witness signature** panel:

- the statement, for example *I witnessed the Ambulance start-of-shift checklist for Medic 7 and confirm that the results shown are what was recorded (content code 3F2A-91C0).*;
- the content code and the **Level 2: identity re-checked** badge;
- the note *Write what you witnessed in the box. Your signature binds to the results shown (not to notes or free text), and the checklist is complete when you sign.*;
- a text box for the witness statement and **Sign as witness**.

The content code covers the run's **operational content** — the checklist and version, the target, the answers, item results and evidence — but **not** private notes, the attestation or other free text. A later change to that content shows the signature as **Content changed**.

![A checklist run awaiting its witness, with the Witness signature panel, statement, content code and Sign as witness button](/img/web-app/signatures/esign-checklist-witness-panel.png)

## Sign as witness

1. Open the run detail page (the link the member who completed it shared, or the run in the checklist's history).
2. Review the answers, item results and evidence.
3. Write what you witnessed in the box under the statement. The box is labelled **Comment (optional)**, but a witness statement is required (up to 2,000 characters).
4. Choose **Sign as witness**. If you have not just confirmed your identity, Resgrid asks for your second factor (an authenticator code, a passkey or your sign-in provider, as your department allows), then records the signature. Your account needs two-factor authentication or a passkey — see [Account Security](/web-app/account-security/).
5. *Your witness signature was recorded and the checklist is complete.*

The signature is recorded in the same step that completes the run: if it is refused, the run stays **Awaiting witness** (*The witness signature was not recorded, so the checklist still awaits its witness.*). Other messages:

| Message | Meaning |
|---|---|
| *The person who completed the checklist cannot witness it.* | Shown instead of the button to the member who submitted the run. |
| *Confirm your identity with your second factor, then sign again.* | The second-factor check did not complete. |
| *This checklist must be witnessed with a signature. Open the run and sign as witness.* | The plain **Attest and complete** path is not available for this checklist. |
| *The witness signature could not be recorded.* | Something else failed; reload the page and try again. |

## After signing

Under **Signatures** the run lists the witness with **Witness** as the meaning, the statement, **L2** with the method (*Second-factor check*), the time, and the **Check** (**Matches** while the run's results are unchanged). Admins see `ChecklistWitnessSigned` and `SignatureRecorded` in **Security → Audit Logs**.

## Setup examples

| Organization | Checklists with a witness signature |
|---|---|
| **Volunteer / career fire** | *SCBA weekly* per pack: the second firefighter signs as witness. |
| **EMS** | *Controlled substance count* and drug box seal checks at shift change: the oncoming paramedic signs as witness with their passkey. |
| **Search and rescue** | Rope and harness inspections before a technical rescue season, witnessed by the equipment officer. |
| **Industrial / HAZMAT** | Gas detector bump tests and emergency shower checks, witnessed by the shift supervisor. |
| **Law enforcement / security** | Armory and evidence-room audits, witnessed by a second officer. |
| **Business** | Facility safety audits where a manager must countersign the findings. |
| **Canada / EU** | Narcotics counts where provincial or national rules ask for two signatures. |

## Technical reference

| Item | Value |
|---|---|
| Checklist option | `RequireWitnessSignature` on the checklist definition (with `RequiresIndependentWitness`) |
| Page | Checklists `CompletionDetail` hosts view component `ChecklistWitnessSignature` → `Shared/_ChecklistWitnessSignature` (signature panel + signatures list) |
| Action | `POST /User/Signatures/WitnessChecklist` (id, submissionHash, attestation; requires a fresh step-up even when the department's 2FA setting is off), then back to `CompletionDetail` |
| Signature use | `SignatureUse.ChecklistWitness`: subject kind 16 `ChecklistWitness`, meaning Witness, minimum level 2, statement version `checklist-witness/1`, bound to `ChecklistWitnessArtifact` (the completion's operational content hash) |
| Services | `IChecklistWitnessSignatureService`, `ChecklistsService.WitnessWithSignatureAsync` |
| Permissions | The Checklists witness rule: a different authenticated member of the department; Checklists must be enabled |
| Audit log types | `ChecklistWitnessSigned`, `SignatureRecorded` |
| Admin Assist | Checklists feature `checklist-witness-signature` → this page |
