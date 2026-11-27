---
sidebar_position: 5
title: Community Exchange
description: "Share published protocols and trainings with every Resgrid department, reviewed by Resgrid before they are listed; browse, rate, comment on and import what others share."
---

# Community Exchange

The **community exchange** is where departments share protocols and trainings with each other. A department contributes a published protocol or a training; Resgrid takes the department's own data out of it, refuses licensed content, and a Resgrid reviewer checks it before it is listed. Every department can then browse the listings, rate them, comment and import a copy, with the contributor's credit kept.

The exchange is **free** for every department. Imported LMS items (skill sheets and lesson plans) need the LMS add-on to use.

**Where to find it:** **Protocols → Sharing → Community exchange** (every member browses). The **Sharing** strip also has **Contribute** (members who may contribute) and **Our submissions**. Linking protocols directly between two departments is not available yet; the exchange shares copies.

| Action | Who |
|---|---|
| Browse, read listings, comment | Every member |
| Rate a listing | Every member, but not for their own department's contribution |
| Import a protocol | **Author Protocols** (128) or department admin |
| Import a training | Members who can create trainings |
| Import a skill sheet or lesson plan | As above, and the department needs the LMS add-on |
| Contribute a protocol | **Approve Protocols** (129) or department admin (sharing is a publish outside the department) |
| Contribute a training | Members who can create trainings |
| Withdraw a contribution | The member who submitted it, a department admin, or anyone who may contribute that kind |
| List, decline or take down | Resgrid's reviewers |

## Browse the exchange

1. Open **Protocols → Sharing → Community exchange**.
2. Under **Search the exchange**, type words from titles, summaries and tags, choose a **Kind** (**Protocol**, **Training**, **Skill sheet**, **Lesson plan**, or **All kinds**) and a **Sort** (**Newest**, **Best rated**, **Most imported**), and select **Search**.
3. The list shows each listing's **Title**, **Kind**, **Contributor**, **Rating** (*4.5 of 5 (12)* or *Not rated*), **Imports** and when it was **Listed**. Select a title to open it.

![Community exchange list with search, kind and sort filters (no listings yet on a new installation)](/img/web-app/protocols/protocol-exchange-browse.png)

## Import a listing

A listing's page shows its **Status**, **Rating**, **Imports**, **Licence**, the version, *Contributed by Northfield Volunteer Fire on ...*, **What an import creates** (a preview of the content) and the **Comments**.

1. Open the listing.
2. Read the preview under **What an import creates** and the licence.
3. Select **Import a copy**. *Creates a copy in your department as a draft (or a new training) that you can change, with the contributor's attribution kept.*
4. The copy opens: a protocol as a draft in your library, a training in **Trainings**, a skill sheet or lesson plan in the LMS. The message is *Imported. Review it, adapt it and publish it as your own.*
5. For a protocol, edit it (add your triggers, audience, numbers and local contacts), then submit it for review and publish it as usual ([Review and approval](./index.md#review-and-approval)).

![A listing page with the preview, licence, rating form, comments and Import a copy](/img/web-app/protocols/protocol-exchange-listing.png)

The import keeps the attribution (the exchange, the contributor's credit name, the licence and the listing's version) on the protocol version and every later draft of it ([Attributions](./translations-print-and-sharing.md#attributions)). The page says *Your department has imported this before.* when it has.

**LMS items:** a **Skill sheet** or **Lesson plan** can be imported only when your department has the [LMS add-on](/web-app/trainings/lms/). Without it the listing says *This is an LMS item: importing it needs the LMS add-on.* and an attempt is refused (*This item is an LMS type; importing it needs the LMS add-on.*). Nothing is created. Protocols and trainings never need the add-on.

If a listing's content no longer matches what Resgrid reviewed, it cannot be imported (*The item no longer matches what was reviewed; it cannot be imported.*).

## Rate and comment

- **Rate it:** choose **Your rating** (1 to 5) and select **Rate**. You can change your rating later. A department cannot rate its own contribution.
- **Add a comment:** plain text; select **Comment**. *Comments show your department's name, not yours.* You can **Hide** your own comment; Resgrid's reviewers can hide any.

## Contribute

1. Open **Protocols → Sharing → Contribute**.
2. **1. Choose what to share:** pick the **Kind** and the **Item**, then select **Preview**. *Licensed content, drafts and uploaded-document protocols cannot be shared and are greyed out.*
3. **2. What will be shared:** check the preview and **What was taken out or flagged**. Before sharing, Resgrid removes the department's own data, and lists what it removed:
   - triggers, audience and number; the department name (replaced with *[Department]*); e-mail addresses; medical control contacts; links to the department's own records; inventory links on medications; attachments and uploaded images.
   - Phone numbers are left in place and flagged for the reviewer.
   If something should not be shared, change the item in your library and preview again.
4. **3. Licence and submit:** write a **Summary**, choose the **Licence** (**CC0 1.0 (public domain)**, **CC BY 4.0 (credit the contributor)** or **CC BY-SA 4.0 (credit, share alike)**), set **Credit as** (the name every import credits; your department's name by default), and tick *I confirm we have the right to share this, it holds no licensed content (such as MPDS or IntelliComm) and no personal information.*
5. Select **Submit for review**. *Thank you. Your contribution is waiting for review.*

![Contribute page for SOG-101 Mayday with the preview, the flags list and the licence form](/img/web-app/protocols/protocol-exchange-submit.png)

Only a published version in force can be shared. Protocols marked **Licensed content** (or excluded from AI because they are licensed) and document protocols are refused.

## Our submissions

**Our submissions** lists what your department has contributed with its **Status**: **Waiting for review**, **Listed**, **Not accepted** (the reviewer's note is shown to your department), **Withdrawn** or **Taken down**, the imports and any findings. **Withdraw from the exchange** takes a listing down; departments that already imported it keep their copies.

## Setup examples

| Organization | How to use it |
|---|---|
| **Fire** | Import a neighboring department's rehab SOG, adapt the local hospital contacts and publish it; contribute your own Mayday SOG under CC BY 4.0 |
| **EMS** | Import trainings and adapt them; share non-clinical operational procedures. Licensed clinical content is never shared |
| **Search and rescue** | Share callout and lost-person procedures between volunteer teams; rate the ones you use |
| **Industrial / HAZMAT** | Import confined space and lockout/tagout procedures from other site teams and adapt them to your plant |
| **Law enforcement / security** | Import post order and incident reporting templates; keep agency-specific policies in your own library only |
| **Business** | Import workplace safety policies and adapt them to your sites |

## Technical reference

| Item | Value |
|---|---|
| Pages | `ProtocolSharingController` (area User, `Protocol_View`): `GET Exchange?q=&kind=&sort=&page=`, `GET Listing/{id}`, `GET/POST Submit?kind=&item=`, `GET MySubmissions`, `POST Withdraw`, `POST Rate` (`stars`), `POST Comment`, `POST HideComment`, `POST Import`; Resgrid reviewers (`SystemAdmin`): `GET ExchangeReview`, `POST Decide`, `POST RemoveListing` |
| Item kinds | `ExchangeItemKinds`: Protocol, Training, Skill sheet, Lesson plan (the last two need the LMS add-on to import) |
| Licences | CC0 1.0, CC BY 4.0, CC BY-SA 4.0 (SPDX codes `CC0-1.0`, `CC-BY-4.0`, `CC-BY-SA-4.0`) |
| Rules | Published, authored (not document-backed), not licensed protocols only; a reviewed payload is checked on import; ratings 1 to 5, one per member, never for your own department's listing |
| Workflow trigger | 257 *Community exchange submission reviewed* ([Workflows](../workflows.md)) |
| Feature flag | `Training.Lms` and the LMS add-on for importing skill sheets and lesson plans |
| Migration | M0389 community exchange |
| Strings | `Resgrid.Localization.Areas.User.ProtocolSharing.ProtocolSharing` |
