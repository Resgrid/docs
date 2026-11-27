---
sidebar_position: 2
title: Document Protocols
description: "Protocols whose content is an uploaded PDF or Word file, the bulk upload of a binder of SOGs, and moving documents from the Documents module to Protocols."
---

# Document Protocols

Most departments already have their SOGs and policies as PDF or Word files. A **document protocol** uses an uploaded file as its content instead of text written in the editor. It goes through the same review, approval, publish, audience and read-and-sign steps as any other protocol, and its text is read out of the file so it can be searched.

Use a single upload for one file, **Bulk upload** to bring a whole binder in at once, or **Move to Protocols** for files already in the [Documents](../documents.md) module. Document protocols are free.

**Where to find it:** **Protocols → Bulk upload** (and **New protocol from a document** on that page), **Upload new version** on a protocol's page, and **Move to Protocols** in **Documents**. All need **Author Protocols** (128) or department admin ([Who can do what](./index.md#who-can-do-what)).

## How a document protocol reads

Members open a document protocol like any other. The **Protocol Text** area shows:

- the file name, size and content code, with **Download**;
- a PDF inside the page in the browser's own viewer, with **Open in a new tab**. A Word (DOCX) file has no viewer: *Word files open in Word. Download it, or read the text below.*;
- **Text of the document**, page by page, so the protocol can be searched, read with a screen reader, and used by [knowledge answers](./knowledge-answers.md).

The text is read when the file is uploaded; a large file is read in the background shortly after (*The text is being read and will appear here shortly.*). When no text can be read the page says why: the document is protected, has no text layer (it looks scanned), is too large, is not a kind of file text can be read from, could not be read, or took too long.

![Reading page of SOG-201 Vehicle Fires, a document protocol, with the PDF viewer](/img/web-app/protocols/protocol-document-view.png)

## Create a protocol from one file

1. Open **Protocols → Bulk upload** and select **New protocol from a document** in the page header (or go to `/User/ProtocolDocuments/New`).
2. Under **File**, choose a PDF or Word (DOCX) file of up to 30 MB.
3. Enter a **Title**, or leave it empty to take the title from the file name.
4. Choose the **Kind** (Policy by default) and a **Category**.
5. Tick **Members must read and sign it** if members must acknowledge it.
6. Select **Upload**. The protocol is created as a draft and opens (*The protocol was created as a draft from the file.*).
7. Select **Edit** to set the code, owner, review interval, audience and change summary, then **Save and submit for review**. Review and publish it as usual ([Review and approval](./index.md#review-and-approval)).

![New protocol from a document form with the file, title, kind and category fields](/img/web-app/protocols/protocol-document-new.png)

Only PDF and Word (DOCX) files can be a protocol's content. Images, spreadsheets and other files can still be added as [attachments](./index.md#edit-a-protocol).

## Upload a new version

A new file is a new version. The version in force stays until the new one is approved and published.

1. Open the protocol and select **Upload new version**.
2. The page shows the file in force (*In force: SOG-204 Mayday.pdf (version 1.0)*). Choose the new **File** (PDF or DOCX, up to 30 MB).
3. Select **Upload**. The file becomes the content of the next draft (*The file is the content of the new draft version.*) and the editor opens.
4. Write a **Change summary** and select **Save and submit for review**.

While a version of the protocol is in review, no new file can be uploaded: *A version of this protocol is in review. Withdraw it or finish its review before uploading a new file.*

## Bulk upload a binder

**Bulk upload** turns many files into draft protocols at once, for one review-and-publish pass.

1. Open **Protocols → Bulk upload**.
2. Under **Files**, choose PDF and Word (DOCX) files, or a zip of them: up to 200 files in one upload.
3. Choose the **Kind** for all of them (SOP / SOG by default) and, optionally, one **Category**.
4. Leave **Folders in a zip become categories** ticked to file each document under a category named after its folder in the zip (created when it does not exist).
5. Select **Upload as drafts**.
6. The result says *37 of 40 files became draft protocols.* and lists each file with its **Number**, **Title**, **Category** and **Result**: **Draft created** (a link to the protocol), *Same file uploaded twice*, or why it was not created. **Category** is the category the draft was filed in: its folder's category, or the one you chose for files outside a zip folder.

File names give the number and title: `SOG-204 Mayday.pdf` becomes number `SOG-204` and title *Mayday*. A name without a number becomes the title.

![Bulk upload result table after three SOG PDFs became draft protocols](/img/web-app/protocols/protocol-bulk-upload-results.png)

Then work through the drafts: filter the library by **Draft**, open each one, set its owner, audience and review interval, and submit it. Reviewers can approve them one after another from the **Review queue**.

## Move documents to Protocols

*Documents* stays the general file cabinet (forms, rosters, minutes). Anything members are expected to follow or acknowledge belongs in *Protocols*. Members who can author protocols see **Move to Protocols** in Documents.

**One document:**

1. Open the document in **Documents**.
2. Choose **Policy** or **Reference** next to **Move to Protocols**.
3. Select **Move to Protocols** and confirm (*It becomes a draft protocol for review, and the old link opens the protocol.*).

**A whole category:**

1. In **Documents**, select the category.
2. Under **Move this category to Protocols as**, choose **Policy** or **Reference**.
3. Select **Move to Protocols** and confirm. Each document becomes a draft protocol.

Only PDF and Word (DOCX) files up to 30 MB can move. A protected document stays in Documents (*A protected document stays in Documents.*), and an admins-only document can be moved only by an administrator.

![Documents page with the Move this category to Protocols as control](/img/web-app/protocols/protocol-documents-move.png)

## What a document protocol cannot do

- It has no [case flow](./decision-engine.md#case-flows) and no block content (the text is the file).
- Its versions are never shown on a [public page](./translations-print-and-sharing.md#public-pages) and it cannot be shared on the [community exchange](./community-exchange.md).
- It is not translated ([Translations](./translations-print-and-sharing.md#translations) are for written content).
- In the [PDF book](./translations-print-and-sharing.md#pdf-book) it is listed with *This protocol is a document; open it in Resgrid to read the file.*

Triggers and questions still work on a document protocol of the Dispatch or Procedure kind.

## Setup examples

| Organization | How to set it up |
|---|---|
| **Fire** | Zip the SOG binder by section (Operations, Safety, Admin), bulk upload with **Folders in a zip become categories**, kind SOP / SOG, then approve them in one pass. Acknowledgment on for the safety SOGs |
| **EMS** | Upload the regional treatment protocols PDF as **Clinical guideline**, owner the EMS lieutenant; upload each year's revision as a new version so calls cite the right one |
| **Search and rescue** | Bulk upload the team's operating guidelines as **Procedure or checklist**; members read the PDF on their phones in the field |
| **Industrial / HAZMAT** | Move the plant's emergency procedures from Documents to Protocols as **Policy**, then set the audience to the emergency response team |
| **Law enforcement / security** | Upload the policy manual chapter by chapter as **Policy** with acknowledgment on; use the compliance grid as proof each officer read the current version |
| **Business** | Move the employee handbook and safety rules from Documents as **Policy**; every employee acknowledges them |

## Technical reference

| Item | Value |
|---|---|
| Pages | `ProtocolDocumentsController` (area User): `GET/POST New` (`Protocol_Create`), `GET/POST Upload/{id}` (`Protocol_Update`), `GET/POST BulkUpload` (`Protocol_Create`), `GET Document?versionId=&download=` (`Protocol_View`, the only path the file leaves through, after the per-version read rule; PDFs inline, framed by this site only) |
| From Documents | `DocumentsController`: `POST MoveToProtocols` (`documentId`, `kind`), `POST MoveCategoryToProtocols` (`category`, `kind`), both `Protocol_Create` |
| Limits | One file: PDF or DOCX, 30 MB. Bulk: 200 files, a 300 MB request; zip folders become categories. File names: number then title, `SOG-204 Mayday.pdf` |
| Text extraction | PDF and DOCX, page by page, at upload; worker 86 reads queued files and attachments without text |
| Permissions | Author Protocols 128 (upload, bulk upload, move) |
| v4 API | `Protocols/GetFile`, `ProtocolAcknowledgments/GetVersionFile`, `ProtocolContent/GetVersionContent` |
| Migration | M0347 protocol documents and file text |
