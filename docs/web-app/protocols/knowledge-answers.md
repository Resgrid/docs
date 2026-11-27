---
sidebar_position: 9
title: Knowledge Answers
slug: /web-app/protocols/knowledge-answers
description: "Enhanced AI knowledge answers: members ask a question and get an answer taken only from the department's published protocols and training and the Resgrid Academy, each part linked to its source; knowledge gaps and settings."
---

# Knowledge Answers

**Knowledge answers** let a member ask a question in plain words, such as *When do we call a Mayday?* or *What is the rehab interval in hot weather?*, and get a short answer taken **only** from your department's published protocols and training and the Resgrid Academy. Every part of the answer links to the exact section, version and effective date it came from, so the member can check the source before acting. Questions your content does not answer are collected as **knowledge gaps** for training officers and protocol owners.

Knowledge answers are part of the **Enhanced AI** add-on ([Plan add-ons](../subscription-billing.md#plan-addons)). Without it, members still find protocols and training with [Search](../search.md) (keyword results); the **Ask** panels are not shown.

**Where to find it:** the **Ask** panel on the protocol library, a protocol's page, a training's page and **View Call → Protocols**; **Help menu → Search help** for product questions; the Assistant chat. **Knowledge gaps** and **Knowledge settings** are at `/User/Knowledge/Gaps` and `/User/Knowledge/Settings`, linked from the **Ask** panel for members who may see them.

## What it needs

- The department has the **Enhanced AI** add-on, and knowledge answers are turned on for it (feature flags `Ai.Enhanced` and `Ai.Knowledge`; Resgrid turns them on for departments in stages, and on a self-hosted installation the operator does, see [Feature flags](../../reference/feature-flags.md)).
- Something to answer from: published protocols and started trainings. The index is built in the background after the first question, and kept up to date whenever a protocol is published or retired or its audience or AI setting changes.
- The member can read protocols (and trainings, for training sources).

## Where members ask

| Panel | Where | Answers from |
|---|---|---|
| **Ask your department's knowledge** | Protocol library | Everything the member can read |
| **Ask about this protocol** | A published protocol's page | That protocol |
| **Ask about this training** | A training's page | That training |
| **Ask about this call** | **View Call → Protocols** | *Only the protocols this call cites and its type, priority, determinant and location type. Patient and caller details are never used.* |
| **Ask about this call's protocol** | Each protocol on **View Call → Protocols** | The exact version that call cites, even an older one |
| **Ask this course** | The LMS course player | The version of the course the learner takes (LMS add-on) |
| *How do I...?* | **Help menu → Search help** | The Resgrid Academy only (product questions) |
| Assistant | The Assistant chat (web, Omni and the chatbot channels) | A question no command matched goes to knowledge answers; the reply is plain text with numbered sources |

### Ask a question

1. Open the protocol library (or a protocol, a training or a call) and find the **Ask** panel. *Answers come only from your department's published protocols and training and the Resgrid Academy, and every answer links to its sources. Check the source before you act.*
2. Type your question under **Your question**. Do not include names, phone numbers, addresses, patient details or incident narratives: what you type may be sent to an AI model.
3. Select **Ask**. *Looking through your department's protocols and training...*
4. Read the answer. Each part refers to its **Sources**, listed below it with the kind (*Protocol*, *Protocol file*, *Training*, *Course*, *Document*, *Resgrid Academy*), title, section, *version 2.0*, *in effect since ...* and an excerpt. Select **Open** to go to the exact section.
5. Select **Helpful** or **Not helpful**. *Not helpful* adds the question to the knowledge gaps report.

<!-- SHOT: /img/web-app/protocols/protocol-knowledge-ask.png | Ask panel on the protocol library with an answer citing two protocol sections | /User/Protocols | not taken: needs Enhanced AI knowledge answers with a configured AI model -->

When two sources disagree, both are shown under *These sources disagree*. Other notices you may see:

- *Doses are quoted exactly as the source writes them. Nothing was calculated. Check the source and your dosing tool.* with **Open the department's dosing tool** when the department has set one;
- *The search service did not answer in time, so the sources were found by keywords only.*;
- *Your offline copy of a cited item is older than the version cited.*;
- *Answered for this call: its protocols, type, priority, determinant and location type.*

<!-- SHOT: /img/web-app/protocols/protocol-knowledge-call.png | Ask about this call panel on View Call answering from the call's cited protocol | /User/Dispatch/ViewCall?callId=5201 | Call 26-341 with CP-10 Chest pain v2.0 cited, determinant CP-E; question "What do we tell the caller while the ambulance is on the way?"; answer citing the After dispatch section; the call context notice below -->

## What it will not do

Knowledge answers are built to be checked, not trusted blindly:

- **Only your sources.** With no adequate source, the answer is *Your department's protocols and training don't cover this.*, with the closest items, and the question is recorded as a knowledge gap. There is no general-knowledge fallback.
- **No calculated numbers.** Every part must cite a shown source, and no number may appear that the cited sources do not contain. An answer that breaks this is replaced by the sources alone. Doses are quoted, never computed.
- **Only what the member can open.** Each source's own read rule applies before anything is searched: protocol audiences, training assignment, admins-only documents for administrators only. A member never gets an answer built on content they cannot open.
- **Only published content in force.** Drafts, versions in review or approved but not published, retired and deleted protocols are never used. Approved translations are used as the same source in another language.
- **Never these:** protocols marked **Exclude from AI** or **Licensed content**, trainings marked not to be used for AI, quiz questions and answer keys, attempts, transcripts, certifications and learning records, and member wellness records.
- **Advanced Data Protection keeps it local.** On a department with [Advanced Data Protection](../data-protection.md), the question stays in Resgrid and the member gets the matching sources, without a generated answer (*Your department uses Advanced Data Protection, so your question stays in Resgrid. These sources match it.*). Documents are not used while it is on.
- **Within the budget.** When the department's monthly Enhanced AI allowance is used up, or the service is busy, the member gets the matching sources instead of an answer.

Every exchange is logged in the Enhanced AI audit log with the sources it used.

## Knowledge gaps

**Knowledge gaps** lists *Questions your protocols and training did not answer, and answers members marked not helpful. Turn a gap into a draft protocol change or a new training.* Protocol authors, approvers, department admins and members who create or assign trainings can open it from the **Knowledge gaps** link in the **Ask** panel.

1. Open **Knowledge gaps**. The tiles show **Open**, **Resolved** and **Dismissed**; filter by **Status**.
2. Each row shows the **Question** (or *Question not kept (Advanced Data Protection)*), when it was **Asked**, by whom with their role and where (*Protocol library*, *Call*, *Mobile app* ...), the **Reason** (*Not covered* or *Marked not helpful*) and the **Closest sources**.
3. Act on it:
   - **Draft protocol change** (authors): opens the closest protocol's draft (starting one from the version in force if needed) with the question added as a suggestion (*Knowledge gap: members asked "..." and the protocols did not answer it.*). Write the change and submit it.
   - **New training** (training creators): opens a new training with the question filled in.
   - **Resolve** with a **Note**, **Dismiss**, or **Reopen**.

![Knowledge gaps report (no open gaps yet)](/img/web-app/protocols/protocol-knowledge-gaps.png)

A new gap raises the **Knowledge gap recorded** workflow trigger.

## Knowledge settings

**Knowledge settings** (department administrators; the **Settings** tab on the knowledge pages) set *What the department's knowledge answers may use.*

| Setting | What it does |
|---|---|
| **Include the Documents module** | *Documents join the sources answers use. Admins-only documents are used only for administrators. Not used while Advanced Data Protection is on.* Off by default |
| **Dosing tool link** | *An https link to your department's dosing tool. Answers that quote a dose link to it. Resgrid never calculates a dose.* The same link appears on medication blocks in protocols ([Content blocks](./index.md#content-blocks)) |
| **Index** | How many sections are indexed and how many have embeddings, and when it was last updated. **Rebuild the index** rebuilds it in the background within a few minutes |

*Published protocols and started trainings are always included, except items marked not to be used for AI. Drafts, quizzes, transcripts and learning records are never used.*

![Knowledge settings with the sources, the dosing tool link and the index](/img/web-app/protocols/protocol-knowledge-settings.png)

## Setup examples

| Organization | How to set it up |
|---|---|
| **Fire** | Publish the SOGs first; members ask from the library on station tablets; the training officer works the knowledge gaps report monthly |
| **EMS** | Clinical guidelines in blocks with medication blocks; set the **Dosing tool link** to the agency's dosing app; crews use **Ask about this call's protocol** after a call |
| **Search and rescue** | Field procedures and trainings as the corpus; members ask from the mobile app between callouts |
| **Industrial / HAZMAT** | Plant emergency procedures; turn on **Include the Documents module** for safety data sheets kept in Documents |
| **Law enforcement / security** | Policies and post orders; mark third-party licensed policy manuals **Licensed content** so they are never sent to AI |
| **Business** | The employee handbook and safety rules; HR reviews the knowledge gaps to find policy questions nobody wrote down |
| **EU / ADP departments** | With Advanced Data Protection on, members still get the matching sources for every question, without generated answers |

## Technical reference

| Item | Value |
|---|---|
| Pages | `KnowledgeController` (area User): `GET Status`, `POST Ask` (question, surface, scope, call id, call protocol id), `POST Feedback`; `GET Gaps?status=&page=`, `POST SetGapStatus`, `POST DraftProtocol`, `POST NewTraining`; `GET/POST Settings`, `POST Rebuild` (department admins). Everything returns *not found* without the entitlement |
| Panel | Partial `_KnowledgeAsk` (library, protocol, training, call, call protocol, course, Help search) |
| Gate | Enhanced AI add-on and feature flags `Ai.Enhanced` and `Ai.Knowledge` (seeded off); self-hosted departments listed by the operator need the flags only |
| Department setting | 139 `KnowledgeSettings` (include Documents, dosing tool link) |
| Gaps visible to | Department admins, Author Protocols 128, Approve Protocols 129, and members who create or assign trainings |
| Corpus | Published protocol versions in force by section, their files by page, approved translations; started, unarchived trainings and their files (never the quiz); LMS course versions; Documents (opt-in); Resgrid Academy |
| Worker | 89 knowledge index (reindex on publish, retire, audience and AI flag changes; nightly repair) |
| Workflow trigger | 258 *Knowledge gap recorded* ([Workflows](../workflows.md)) |
| Surfaces | `KnowledgeAskSurfaces` 0 Library, 1 Protocol, 2 Training, 3 Assistant, 4 Call, 5 Api (mobile app), 6 Help, 7 Course |
| v4 API | `Knowledge/GetStatus`, `Knowledge/Ask`, `Knowledge/Feedback`; `KnowledgePractice/GetStatus`, `Start`, `Score` |
| Migrations | M0353 knowledge index, M0354 knowledge gaps |
| Strings | `Resgrid.Localization.Areas.User.Knowledge.Knowledge` |
