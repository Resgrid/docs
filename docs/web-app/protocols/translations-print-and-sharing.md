---
sidebar_position: 4
title: Translations, Print and Sharing
description: "Content translations of protocol versions, the print view, QR code posters, the PDF book, public protocol pages, the template library, the open format export and attributions."
---

# Translations, Print and Sharing

This page covers the ways a protocol reaches people outside the library page itself: in another language, on paper or a wall poster, as a PDF book, on a public web page, and as a file another system can import. It also covers the Resgrid **template library** of starter sets. Everything here is free.

**Where to find it:**

- **Translations**, **Print view** and **QR code** on a protocol's page.
- **Protocols → PDF book** (every member, for what they can read).
- **Protocols → Sharing**: **Templates** (everyone browses, authors clone), **Public pages** (approvers and admins) and **Open format** (authors and admins). The community exchange is on its own page: [Community exchange](./community-exchange.md).

## Translations

A protocol is written in one language: the department's **Language protocols are written in** setting ([Protocol settings](./index.md#protocol-settings)). Each version can have one translation per language, approved on its own. The version, its content code and its signatures never change.

Only the wording is translated. Doses, links, attachments and the structure stay exactly as in the source.

### Translate a version

1. Open the protocol, show the version (it must be submitted, approved or published), and select **Translations** (authors, approvers and admins). The page says *This version is written in English. Each translation is approved on its own; the version, its hash and its signatures never change.*
2. Choose a language and select **Start translation** (Author Protocols). The languages are the ten Resgrid languages: Arabic, English, French, German, Greek, Italian, Polish, Spanish, Swedish and Ukrainian.
3. In **Translated wording**, each field of the source is shown next to a box for its **Translation**. Medication doses are marked *Doses are not translated*. With Enhanced AI, **Draft translation with AI** fills the fields still in the source wording for you to check ([AI drafts](./flashcards-and-practice.md#draft-a-translation)).
4. Select **Save translation** and check **The translation as members will read it**.
5. An approver opens the translation and selects **Approve with step-up** under **Approve the translation**: a signature bound to the translation's own content that asks for their second factor.

![Translation editor for EMS-100 in Spanish with source and translation side by side](/img/web-app/protocols/protocol-translation-editor.png)

The **Content translations** list shows each language with **Draft translation**, **Approved translation** or **Withdrawn translation**, the last change and **Open**. Approvers can **Withdraw translation** (members reading in that language then see the source).

### What members see

A member whose Resgrid language has an approved translation of the version reads it, with *Shown in Spanish (an approved translation).* Others read the source, with *There is no approved translation in your language, so this is shown in the department's language.* when they read in another language. The protocol page has a **Content language** switch for any approved translation.

If the source content changes after a translation was made, the translation is marked **Source changed**: *It cannot be approved and is not shown to members; start a new translation of the current version.*

Approved translations are also used by the print view, the public pages and [knowledge answers](./knowledge-answers.md).

## Print view

**Print view** opens the version in a print-ready page in a new tab: the protocol with its **Version**, **Effective** date, **Approved by**, its content (in the reader's language when an approved translation exists), the dosing tool link on medication blocks, and its QR code and **Direct link**. Use the browser's print. A document protocol shows its file details instead of the text.

## QR code poster

**QR code** on a protocol's page shows a poster with the protocol's QR code and its **Direct link** (`/User/Protocols/View/` and the protocol's number). *Print this poster for a vehicle, a station or any workplace wall. Scanning it opens the version in force for members who may read the protocol.* Select **Print** to print it.

The link never changes: after a new version is published, the same poster opens the new version. Members who may not read the protocol (by its [audience](./index.md#audiences)) cannot open it.

![QR code poster of SOG-101 Mayday with the direct link](/img/web-app/protocols/protocol-qr-poster.png)

## PDF book

**PDF book** downloads the whole library, or one category with its sub-categories, as one PDF: a table of contents, then each protocol in force with its version, effective date and approver. Only protocols you may read are included.

1. Open **Protocols → PDF book**. The page shows how many **Protocols you can read** and the **Electronic seal** state.
2. Choose a **Category**, or **Whole library**.
3. Select **Download PDF**.

When document sealing is set up, the book is sealed (**Sealed (L3)**). Otherwise the page says *Sealing is not configured, so the PDF is not sealed. The export is recorded as sealing pending and is sealed once sealing is configured.* See [e-Sign](/web-app/signatures/).

A single version also has a **PDF** button on the protocol page's **Versions** tab.

![PDF book page with the category picker and the seal state](/img/web-app/protocols/protocol-book.png)

## Public pages

A **public page** publishes a protocol, or a category as a set, at an address anyone can open without signing in, and optionally lets your website embed it. It is opt-in per protocol or category and can be revoked at any time. Approvers and department admins manage public pages.

A public page never shows a draft, a protocol limited to an audience, licensed content, a disabled protocol or a document protocol. This is checked every time the page is opened, so a protocol that later gets an audience or the **Licensed content** flag drops off on its own. The page lists the protocols that cannot be public and why (*Limited to an audience, so never public*, *Licensed content is never public*, *Not published (drafts are never public)*, *Uploaded document versions are not shown publicly*, *Disabled*).

### Make a protocol public

1. Open **Protocols → Sharing → Public pages**.
2. Under **Make a protocol public**, choose the **Protocol**.
3. Tick **This version only** to show only the version in force today: when a newer version is published, the page says *This version is no longer in force. Contact the department for the current version.* Leave it unticked to always show the version in force.
4. Tick **Allow embedding on other sites** to let a website show it in a frame. Under **Sites allowed to embed it**, enter https addresses separated by spaces (at most 10), or leave it blank to allow any https site.
5. Select **Make public** and confirm (*Anyone with the address will be able to read this. Continue?*).

To publish a whole category, use **Make a category public as a set**: the page shows every protocol in force in the category and its sub-categories that can be public.

![Public pages with the two forms and the department's public pages with their addresses](/img/web-app/protocols/protocol-public-pages.png)

**The department's public pages** lists each page with its **Title**, what is **On the page**, the **Address**, the **Embed code**, when it was created and **Revoke** (*Revoke this public page? The address stops working at once.*). A department can have up to 500 live public pages.

### What the public sees

The address is `/public/protocols/` followed by a long random code; `/embed` after it is the version for a frame. The page shows the protocol (or the set's **Contents**), its version and *In force from* date, the content code that matches the printed copy, any source and licence, and *Published by Cedar Valley Fire & Rescue. This is the department's own guidance for its members; it is not medical or legal advice for anyone else.* It sets no cookies, is not indexed by search engines and runs no scripts. A revoked or unknown address shows a plain *not found* page.

![The public page of IND-101 Chemical release and shelter in place as an anonymous visitor sees it](/img/web-app/protocols/protocol-public-page.png)

## Template library

**Templates** holds starter sets written by Resgrid. Clone them as drafts in your language, adapt them, then review and publish them as your own. Sets suited to your organization type are shown first under *Suggested for your organization*.

| Set | Protocols | Licence |
|---|---|---|
| **Fire suppression SOG starter set** | Mayday, personnel accountability, rapid intervention crew, two in two out, emergency traffic and evacuation, rehabilitation | CC BY 4.0 |
| **EMS clinical guideline structure (no clinical text)** | Section structure for universal patient care, cardiac arrest, respiratory distress, suspected stroke, trauma triage and destination | CC0 1.0 |
| **Search and rescue starter set** | Missing person intake, search urgency, initial response to a lost person, team check-in and check-out | CC BY 4.0 |
| **Industrial hazard procedures starter set** | Chemical release and shelter in place, confined space rescue standby, lockout/tagout during an emergency, hot work fire watch | CC BY 4.0 |
| **Law enforcement policy starter set** | Use-of-force policy acknowledgment, duty to intervene and report, evidence handling and chain of custody | CC BY 4.0 |
| **Security post orders starter set** | Post orders, incident reporting, access control and visitors | CC BY 4.0 |
| **Business continuity starter set** | Continuity plan activation, loss of communications, facility evacuation and relocation, computer system outage | CC BY 4.0 |
| **Workplace policies starter set** | Employee handbook acknowledgment, workplace safety rules, reporting an injury or near miss | CC BY 4.0 |

1. Open **Protocols → Sharing → Templates**.
2. On a set, tick the protocols under **Items to clone**.
3. Select **Clone as drafts** (Author Protocols). The library opens filtered to drafts (*6 drafts created from the template set.*).
4. Open each draft, adapt it to your department, then submit it for review.

*Templates are starting points. Check every one against your own policies, law, staffing and medical direction before you publish it. The EMS set has no clinical text: your medical director writes it.*

![Template library with the starter sets suggested for a fire and EMS department first](/img/web-app/protocols/protocol-templates.png)

### Attributions

Content that came from outside the department keeps where it came from. A protocol cloned from a template, imported from the [community exchange](./community-exchange.md) or imported from an open-format file that carried its own source shows **Source** and **Licence** on its page. The attribution stays on every later draft, so it survives "import and modify".

## Open format and export

**Open format** (authors and admins) takes your protocols with you.

1. Open **Protocols → Sharing → Open format**.
2. Under **Set**, choose **The whole library** or a category.
3. Select the format:
   - **Open format (JSON):** blocks, version history, decision graph, approved translations and the attachments list (format `resgrid-protocols`, version 2). Files are listed, not included.
   - **HTML:** one self-contained file with the versions in force you can read.
   - **PDF book:** the protocol book, sealed when document sealing is set up.

Any Resgrid department, or another system, can import the JSON file with [Import](./index.md#import-and-export). Files in the older format still import.

## Setup examples

| Organization | How to set it up |
|---|---|
| **Fire** | QR posters inside each apparatus cab for Mayday and RIT; the *Fire SOGs* category as a PDF book for the station binder; a public page for the open burning policy embedded on the department website |
| **EMS** | Approved Spanish translations of patient-facing instructions; the clinical guidelines PDF book sealed for the medical director's records |
| **Search and rescue** | PDF book of field procedures for members to keep offline; a public page with the missing person intake guidance for partner agencies |
| **Industrial / HAZMAT** | QR posters at each process unit opening the shelter-in-place procedure; translations for contractors' languages |
| **Law enforcement / security** | Public pages for the use-of-force and complaints policies (transparency); post orders as a PDF book per client site |
| **Business** | The workplace policies starter set cloned and adapted; the employee handbook exported as HTML for the intranet |
| **Canada / EU** | Write in French or German, set **Language protocols are written in**, and approve English translations; public pages carry no cookies and are not indexed |

## Technical reference

| Item | Value |
|---|---|
| Tools pages | `ProtocolToolsController` (area User): `GET Translations/{id}?versionId=`, `POST StartTranslation` (`Protocol_Update`), `GET Translation/{id}?translationId=`, `POST SaveTranslation` (`Protocol_Update`), `POST ApproveTranslation` (`Protocol_Approve`, step-up), `POST WithdrawTranslation` (`Protocol_Approve`), `GET Print/{id}?versionId=&lang=`, `GET Qr/{id}`, `GET Book`, `GET BookPdf?categoryId=`, `POST PreviewBlocks` |
| Version PDF | `SealedDocumentsController`: `GET ProtocolVersion?protocolId=&versionId=` (sealed at L3 when sealing is configured) |
| Sharing pages | `ProtocolSharingController`: `GET Public`, `POST CreatePublicLink` (`protocolId`, `pinVersion`, `embedEnabled`, `embedOrigins`), `POST CreatePublicSetLink`, `POST RevokePublicLink` (approvers); `GET Templates`, `POST CloneTemplate` (`Protocol_Create`); `GET Export`, `GET ExportJson?categoryId=` (managers), `GET ExportHtml?categoryId=` |
| Public pages | `PublicProtocolsController` (anonymous): `GET /public/protocols/{token}` and `/public/protocols/{token}/embed`, `?lang=`; 32-character token; 120 requests a minute per address; strict content security policy, `noindex`, cached for 60 seconds; 500 live links per department; 10 embed sites per link |
| Deep link | `/User/Protocols/View/{id}` (the version in force when opened) |
| Workflow triggers | 249 *Protocol translation approved*, 250 *Protocol public link created or revoked* ([Workflows](../workflows.md)) |
| Open format | `resgrid-protocols` version 2 (JSON), older version 1 files still import |
| Migrations | M0362 version translations, M0388 public pages and attributions |
| Strings | `Resgrid.Localization.Areas.User.Protocols.Protocols`, `Resgrid.Localization.Areas.User.ProtocolSharing.ProtocolSharing` |
