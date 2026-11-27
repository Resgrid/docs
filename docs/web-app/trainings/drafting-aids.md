---
sidebar_position: 13
title: Drafting aids and AI in training
slug: /web-app/trainings/drafting-aids/
---

# Drafting aids and AI in training

With the **Enhanced AI** add-on, training authors can have AI draft quiz questions, course outlines, change summaries, whole draft trainings and courses, and flashcards **from your own content**: the training text you are writing, a published protocol, or an SOP document you upload. A person always reviews the draft. Nothing is assigned, published or shown to members until the author accepts it, edits it and sends it through the normal approval.

The [LMS add-on](/web-app/trainings/lms/) adds course drafts, course flashcards and *Ask this course* on top. The LMS also has a library of **starter courses** that need no AI at all.

<AcademyVideo id="21-ai" />

**Where to find it:**

| Aid | Where | Needs |
|---|---|---|
| **Drafting aids** panel: **Draft quiz questions**, **Draft course outline** | Training editor (**Trainings → Manage Trainings → New** or edit) | Enhanced AI with knowledge answers (`Ai.Knowledge`); Create Training |
| **Drafting aids** panel: quiz questions, course outline, **Draft change summary** | Course builder (**Trainings → Course library →** a course draft) | Enhanced AI with knowledge answers and the LMS add-on; Manage Courses or the course's edit right |
| **Draft a training** from a protocol | A protocol's page (**Protocols →** a protocol → **Draft a training**) | Enhanced AI with knowledge answers; author or approve protocols, and Create Training. No LMS needed. |
| **Starter courses** | **Trainings → Course library → Starter courses** | The LMS add-on and Manage Courses. No AI. |
| **Draft with AI** (a whole course) | **Trainings → Course library → Draft with AI** | Enhanced AI with knowledge answers, the LMS add-on and Manage Courses |
| Course **Flashcards** | A course's page → **Flashcards** | Enhanced AI with knowledge answers, the LMS add-on and the course's edit right |
| **Practice cards** and **Ask this course** for learners | The course player | Enhanced AI with knowledge answers and the LMS add-on |

The drafting aids panel stays hidden when your department does not have knowledge answers, so the free tier never sees it. Protocol flashcards and translation drafts are on the protocol pages; see [Protocols](/web-app/protocols/).

## How drafting stays grounded

Every aid follows the same rules, and the page says so (**How drafting works**):

- **The result is a draft.** *You edit it and submit it through the normal approval; nothing is published.*
- **Citations.** *Every lesson cites the sections it was written from and shows their text as the source wrote it.*
- **Numbers come from the source.** *Any number the AI writes must appear in the sections it cites; no dose or rate is ever calculated.* Drafted items that cite nothing or hold a number the source does not are left out, and the page says how many.
- **Content that must not leave Resgrid never does.** *Protocols marked "no AI", licensed content and departments using Advanced Data Protection are never sent to a model.* In the training editor, **Do not use for AI knowledge answers** (*For licensed material whose license forbids processing*) also turns the aids off for that training.
- **Logged.** *Every draft is logged with the model and prompt version.*
- **Allowance.** Drafts use your department's monthly Enhanced AI allowance. When it is used up: *Your department's Enhanced AI allowance for this month is used up.*

## Draft quiz questions or an outline in the training editor

1. Open **Trainings → Manage Trainings** and create or edit a training. Write the training text first.
2. In the **Drafting aids** panel (*Draft from this content with AI, then review. Nothing is saved until you accept it, and every number must come from the content.*), choose 3, 5 or 10 questions and select **Draft quiz questions**, or select **Draft course outline**.
3. Review each drafted item: questions show the **Correct** answer and an **Explanation**, outline modules their **Objective**. Tick **Keep** on the ones you want.
4. Select **Accept selected**. The questions go into the quiz builder and the outline into the training text: *… added to the editor. Save to keep them.*
5. Edit as needed and **Save** the training. Nothing is assigned until you assign it.

![The drafting aids section in the training editor (no AI model set up on this installation)](/img/web-app/lms/lms-drafting-aids-training.png)

In the **course builder** the same panel adds **Draft change summary**, which fills the change summary before you submit a new version. Accepted questions go into a question bank (*Drafted questions: …*, with **Open the bank**), and an accepted outline becomes modules and lessons of the draft.

## Draft a training from a protocol

1. Open a published protocol and select **Draft a training**.
2. Choose the number of quiz questions and select **Draft the training**. *Enhanced AI drafts a training and a quiz from the version in force. You review it before anything is created.*
3. **Review the draft**: **Key points** and **From the protocol** sections quote the protocol as written, each part marked **Cited:**. Drafted items that did not match the protocol are left out.
4. Set the **Training name** and select **Create the draft training**. *The training is created as a draft: nobody is assigned and members do not see it until you assign it.*
5. The training opens in the editor. Review it, then assign it, or use it for the protocol's quiz-gated acknowledgment (*choose it in the protocol's acknowledgment settings*).

![Drafting a training from a protocol (no AI model set up on this installation)](/img/web-app/lms/lms-protocol-draft-training.png)

## Starter courses

Starter courses are courses written by Resgrid to start from. *Copy one into your department as a draft, adapt it, and publish it through your normal approval.* They are free to use and adapt and carry no accreditation (*Starters are Resgrid's own plain-language text: no standard's text and no accreditation. Your copy keeps its attribution.*).

| Starter | What it covers |
|---|---|
| **Getting started with Resgrid** | A new member's first course: account, status and staffing, responding to calls, messages, calendar and training. |
| **Incident safety basics** | Situational awareness, protective equipment, accountability and rehab. |
| **Hazardous materials awareness (outline)** | An outline to fill with your procedures: recognize, isolate and deny entry, notify, protect yourself. |
| **Driver and emergency vehicle operation basics** | Vehicle inspection, emergency driving, intersections and backing with a spotter. Pair it with a practical session. |

1. Open **Trainings → Course library → Starter courses**. Starters suggested for your organization type come first (**Suggested for your organization**). Each card shows its modules, lessons, hours and revision.
2. Select **Copy as a draft**. *Starter course copied as a draft: 6 lessons and 9 questions. Adapt it, then submit it for approval.*
3. The copy opens in the course builder. Replace the generic text with your own procedures, then submit it for approval. See [Courses](/web-app/trainings/courses).

The **Partner content** cards (*Accredited continuing education stays with the partner who holds the accreditation. Resgrid launches it and records the completion.*) point to partner CE over LTI 1.3 and partner SCORM or cmi5 packages. Register those under [Content standards](/web-app/trainings/standards).

![Starter courses](/img/web-app/lms/lms-studio-starters.png)

## Draft a course with AI

1. Open **Trainings → Course library → Draft with AI**. *Turn a published protocol or an SOP document into a draft course. Every lesson cites its source; nothing is published.*
2. Under **Draft from** choose:
   - **A published protocol**, then the **Protocol**. *The version in force is used. Protocols marked "no AI" and licensed content are not listed.*
   - **An SOP document (PDF, DOCX or TXT)**, then the file. *Up to 10 MB. Only the text is read; the file is not kept.* A scanned PDF with no text layer cannot be used.
3. Optionally set the **Course title** (*Leave blank to use the drafted title.*) and the number of **Quiz questions to draft** (0 to 10).
4. Select **Draft the course** and wait (*this can take a minute*).
5. The new draft opens in the course builder: *Draft course created with 3 modules, 7 lessons and 5 questions. Check every lesson against its cited section, then submit it for approval.* Each lesson has **Key points** and **From the source** with the cited text; the questions are in a bank named after the course (*… drafted questions*); the course carries the tag `ai-draft` and the note *Drafted with AI from …*. A long source uses only its first sections, and the message says so.
6. Check every lesson against the section it cites, edit, then submit it for approval.

![Drafting a course with AI (no AI model set up on this installation)](/img/web-app/lms/lms-studio-draft.png)

## Flashcards

Flashcards are practice cards learners see in the course player. *Cards are flagged for review when their source changes.*

1. Open the course's page and select **Flashcards**.
2. Under **Draft flashcards with AI** pick the **Source** (**This course**, or a protocol the course uses) and the number of **Cards** (up to 20), then select **Draft cards**.
3. Tick the cards to keep and select **Add the ticked cards**. *Each card cites one section, and every number on it must appear in that section. Practice is never graded or recorded.*
4. The **Cards** list shows each card's **Front**, **Back** and **Source**, **Active** or **Needs review**. Use **Edit**, **Save card** or **Remove**.
5. When a card's source changes (*A newer version of its source is in force.* or *Its source can no longer be read.*), the card is hidden from learners until you check it and select **Mark reviewed**.

![Flashcards for a course](/img/web-app/lms/lms-studio-flashcards.png)

## What learners see

In the course player, on lessons that are not an assessment or a survey:

- **Practice cards**: *Practice only: nothing here is graded or recorded on your transcript.* Learners use **Show answer**, **Again** and **I knew it**, and **Start again** when they know every card.
- **Ask this course**: questions answered only from the version of the course the learner is taking, each part linked to its lesson. It is never shown beside a test.

Both need Enhanced AI with knowledge answers and an active LMS add-on, and neither is offered on Academy lessons.

## When drafting is not available

| Message | Why |
|---|---|
| *Drafting courses and flashcards needs Enhanced AI with knowledge answers and the LMS add-on.* | One of the add-ons or the knowledge answers flag is missing. |
| *You need Manage Courses (or the course's edit right) and access to the source to do this.* | Missing permission. |
| *This protocol is marked "no AI" or is licensed content, so it is never sent to a model.* | The source is excluded. |
| *Advanced Data Protection keeps your department's content local, so nothing can be drafted.* | Your department uses Advanced Data Protection. |
| *No readable text was found in the source (a scanned PDF has no text layer).* | The document has no text. |
| *The AI model is not configured for this system. Ask your Resgrid operator.* | Self-hosted server without an AI model. |
| *The AI model is busy. Try again in a minute.* / *… not available right now.* | Temporary. |
| *The draft was refused: nothing it wrote could be checked against the cited sections.* | Every drafted item failed the citation and number checks; nothing was kept. |

## Setup examples

| Organization | How they use the aids |
|---|---|
| **Fire department** | Draft a training from each new SOG protocol and use it for the protocol's quiz-gated acknowledgment. |
| **EMS agency** | Draft a course from the medical director's published protocol; doses appear only as the protocol states them, never calculated. Licensed protocol content stays excluded. |
| **Search and rescue** | Upload the team's navigation SOP (DOCX) and get a draft course with a five-question check. |
| **Industrial / HAZMAT** | Copy the *Hazardous materials awareness (outline)* starter and fill it with the site's procedures; flashcards for the response checklist. |
| **Law enforcement / security** | Draft quiz questions for policy trainings in the training editor; no LMS needed. |
| **EU / ADP departments** | Departments using Advanced Data Protection keep all content local, so the aids stay off; starter courses still work. |

## Technical reference

| Item | Value |
|---|---|
| Drafting aids panel | `Shared/_AuthoringAids.cshtml` (+ `resgrid.authoring.aids.js`), hosted in `Trainings/_EditorAids.cshtml`, `Courses/Builder.cshtml` and `Protocols/Edit.cshtml`; endpoints `AuthoringAids/Status` and `AuthoringAids/Draft`; course builder accept: `POST /User/Courses/AcceptAidQuestions/{versionId}`, `POST /User/Courses/AcceptAidOutline/{versionId}` |
| Course studio | `LmsStudioController`: `GET Starters`, `POST CloneStarter`, `GET/POST Draft`, `GET Flashcards/{courseId}`, `POST DraftCards`, `AcceptCards`, `SaveCard`, `ReviewCard`, `RemoveCard`, `GET Deck/{enrollmentId}` (learner practice deck) under `/User/LmsStudio/` |
| Protocol training draft | `ProtocolAiController`: `GET/POST /User/ProtocolAi/DraftTraining/{protocolId}`, `POST CreateTraining` (also protocol `Flashcards`, `DraftTranslation`) |
| Services | `LmsCourseDraftService`, `LmsFlashcardService`, `LmsStarterCourseService`, `LmsStudioSources`, `LmsCourseAuthoringAidSource` |
| Gates | Enhanced AI add-on with `Ai.Enhanced` and `Ai.Knowledge`; course studio also `Training.Lms`, the LMS add-on and Manage Courses 132; Advanced Data Protection keeps content local |
| Limits | SOP upload 10 MB (PDF, DOCX, TXT); up to 10 course quiz questions; up to 20 flashcards per draft; panel quiz 3, 5 or 10 questions |
| Training exclusion | `ExcludeFromAi` on trainings (M0355) |
| Migrations | M0398 (course studio), M0399 (protocol flashcards) |
| v4 API | `GET api/v4/LmsFlashcards/GetDeck?enrollmentId=` |
| Admin Assist | features `ai-authoring-aids` (`Catalog/ai.yaml`, DocsPath `/web-app/trainings/drafting-aids/`), `ai-course-drafts`, `ai-flashcards`, `lms-starter-courses` |
