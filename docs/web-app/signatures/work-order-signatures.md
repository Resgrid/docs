---
sidebar_position: 7
title: Work Order Signatures
slug: /web-app/work-orders/signatures
---

# Work order signatures

Two Readiness Pro hand-offs carry a signature instead of a verbal "all good":

- **Vendor acceptance** — the outside shop or technician who did the work accepts the completed work order, in person on a member's device or by a Resgrid link with a one-time code.
- **Equipment issue receipts** — the member who received issued equipment signs the receipt in Resgrid at level 2, or the recipient signs in person on the issuing member's device.

Each signature binds to a content code over the operational facts of the order or the issue, and the completed request is sealed with a Resgrid audit page.

:::info Readiness Pro add-on
Both are part of the paid **Readiness Pro** add-on, for in-person signing as well as signing by link. They are offered only while Readiness Pro is active and the Maintenance module is turned on (**Department Settings → Module Settings**). Without it the pages say *Work-order vendor acceptance and equipment issue receipts are part of Readiness Pro.* Signing by link also needs the department's [e-sign settings](/web-app/signatures/external/#set-up-signing-by-link). Signatures already recorded stay readable.
:::

**Where to find it:** **Work Orders → a completed or closed work order → Vendor acceptance**, and **Inventory → Issuances** (or the personnel gear list) **→ Receipt** on an issued item. Requesting a vendor's acceptance needs **Manage Work Orders** (114) for the order's group (or department admin); requesting an issue receipt needs **Issue Inventory** (48). See [Work Orders & Maintenance](/web-app/work-orders/) and [Inventory](/web-app/inventory/).

## Vendor acceptance

The **Vendor acceptance** section appears at the bottom of a work order once its status is **Completed** or **Closed**. It holds the standard [External signature panel](/web-app/signatures/external/#the-external-signature-panel).

**In person** (the vendor is at the station):

1. Open the work order and scroll to **Vendor acceptance**.
2. Choose **Hand device to signer** and hand the tablet to the vendor's technician.
3. The technician reads the statement — *I accept the work completed on (work order) (content code …).* — ticks **I agree to sign this document electronically.**, types their **Printed name**, optionally a **Witness (optional)**, signs in the **Signature** box and chooses **Sign**.
4. Back on the work order: *Signed in person. The signed document is sealed when sealing is available.*

**By link** (the vendor has left):

1. In **Vendor acceptance**, choose **Request signature by link**.
2. Enter the **Signer's name**, **E-mail** and/or **Mobile phone**, choose **Send the one-time code by**, and choose **Send request**.
3. The vendor opens the link, consents, enters the one-time code and signs. See [What the signer sees](/web-app/signatures/external/#what-the-signer-sees).

When it is signed, the section shows **Signed** with the vendor's name and time and the **Sealed PDF**.

**What the acceptance covers.** The content code is built from the order's operational content only: its number, type, priority, target, title, completion, labor hours and the parts used. Descriptions, causes, resolutions, vendor details and anyone's rates are not part of it (they can be protected data). Status, closing and verification are not part of it either, so **closing the order after acceptance does not invalidate the signature** — but re-completing the work does, and then a new acceptance is needed.

![The Vendor acceptance section of a completed work order with Hand device to signer, on an installation where signing by link is not set up](/img/web-app/signatures/esign-work-order-vendor-acceptance.png)

## Equipment issue receipts

On **Inventory → Issuances**, each issued item has a **Receipt** button for members with **Issue Inventory**. It opens **Equipment issue receipt** — the item, the content code (*The signature covers exactly this text. If the text changes, it no longer matches and a new signature is needed.*) and the signature panel.

**The member signs in Resgrid** (level 2):

1. On the receipt page, choose **Ask (member) to sign** (*The member signs in Resgrid with a fresh step-up (level 2); the request appears under My signatures and on their home page.*). The request always goes to the member the equipment was issued to. *The signature request was sent.*
2. The member gets a *Signature needed* notice, opens **My signatures → Review and sign** and reads *I confirm that I received (item) (content code …).*
3. They choose **Sign** and confirm their identity, or **Sign with passkey**. The receipt shows **Signed**.

**The recipient signs in person** (level 4) — for a recipient without a login, or at the counter:

1. On the receipt page, choose **Hand device to signer** and let the recipient sign as described above.

**By link** is also offered when the department's e-sign settings are in place.

**What the receipt covers.** The issue itself: item, asset, lot, quantity, recipient, location and time — not the issue note, and not the return. **Returning the equipment later does not invalidate the receipt.**

![The Equipment issue receipt page for an SCBA issued to a member, with Ask to sign and Hand device to signer](/img/web-app/signatures/esign-issue-receipt.png)

## Find a signature later

- The work order's **Vendor acceptance** section and the receipt page show **Signed**, who signed and when, the **Sealed PDF**, and the **Signatures** list with **Check** (**Matches** while the content is unchanged).
- **Details** on the panel shows the request, its signer (contact masked) and both documents.
- Department admins see `SignatureRequestCompleted`, `ExternalSignatureCaptured` and `SignatureStepSigned` in **Security → Audit Logs**.

## Setup examples

| Organization | Readiness Pro signatures |
|---|---|
| **Volunteer / career fire** | The pump shop's technician accepts a completed pump repair on the station tablet before driving away; turnout gear issued to each new member is signed for at level 2. |
| **EMS** | Monitors and drug boxes issued to a crew are signed for by the paramedic; the biomedical vendor accepts preventive maintenance by link. |
| **Search and rescue** | Radios and rope kits issued for a deployment are signed for; the gear returns without voiding the receipt. |
| **Industrial / HAZMAT** | The contractor that serviced the fixed foam system accepts the work order in person. |
| **Law enforcement / security** | Radios, body cameras and keys issued to officers, each with a signed receipt. |
| **Business** | Facility contractors (HVAC, doors, cameras) accept completed work orders by link. |

## Technical reference

| Item | Value |
|---|---|
| Work order | WorkOrders `Detail` hosts view component `SignatureRequests` (kind 17 `WorkOrderVendorAcceptance`) when status is Completed or Closed; `canRequest` = may manage the order's group |
| Issue receipt | Inventory `Workspace` (Issuances / personnel gear tabs) → `GET /User/Signatures/Subject?kind=18&subjectId=(issuance id)`; `POST /User/Signatures/RequestMemberSignature` (one member step, role Recipient, level 2, the issued-to member only, expires in 14 days) |
| Signature uses | `ExternalSignatureUse.WorkOrderVendorAcceptance` (role Vendor, meaning Accept, statement version `work-order-vendor-acceptance/1`); `ExternalSignatureUse.InventoryIssueReceipt` (role Recipient, `inventory-issue-receipt/1`); owning add-on Readiness Pro |
| Gate | `IReadinessAccessService.CanUseMaintenanceAsync`: feature flag `Maintenance.WorkOrders`, Maintenance module not disabled, active Readiness Pro add-on |
| Permissions | Manage Work Orders 114 (vendor acceptance), Issue Inventory 48 (issue receipts) |
| Content | `ReadinessSignatureSources`: the order's operational content (no descriptions, causes, resolutions, vendor details or rates; not status, closing or verification); the issue's item, asset, lot, quantity, recipient, location and time (not the note or return) |
| Worker / events | Worker 90; workflow triggers 220–223 and 270; notifications 66/67 — see [Multi-signer requests](/web-app/signatures/multi-signer/) |
| Admin Assist | Maintenance feature `readiness-signatures` (requires add-on ReadinessPro) → this page |
