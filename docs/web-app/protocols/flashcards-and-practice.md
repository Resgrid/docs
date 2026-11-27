---
sidebar_position: 8
title: Practice Cards and AI Drafts
description: "Enhanced AI on protocols: practice cards drafted from a protocol for members to practise, scenario practice, a training and quiz drafted from a protocol, and AI drafts of translations and change summaries."
---

# Practice Cards and AI Drafts

With the **Enhanced AI** add-on, Resgrid can help members learn a protocol and help authors write around it:

- **Practice cards:** short question-and-answer cards drafted from a protocol, checked and kept by an author, and practised by members on the protocol's page.
- **Practice scenarios:** a short scenario written from the protocol, with the member's answers scored against it.
- **Draft a training:** a training with a quiz drafted from the protocol, for an author to review before anything is created.
- **Draft translation with AI** and **Draft change summary:** first drafts for the translation editor and the change summary.

Every draft is reviewed by a person before it is kept. Practice is never graded or recorded on a member's transcript. None of this needs the LMS add-on.

**Where to find it:** on a published protocol's page: **Practice cards** and **Draft a training** in the header (authors and approvers), the **Practice cards** and **Practice** panels on the left (every member who can read it). **Draft translation with AI** is in the [translation editor](./translations-print-and-sharing.md#translations) and **Draft change summary** in the protocol editor's **Submit for review** section.

## What these tools need

| Requirement | Why |
|---|---|
| The **Enhanced AI** add-on, with knowledge answers turned on (`Ai.Knowledge`) | Without it the buttons and panels do not appear (*Practice cards, training drafts and translation drafts need the Enhanced AI add-on with knowledge answers turned on.*) |
| A published version in force | Everything is drafted from the version in force |
| The protocol is not marked **Exclude from AI** or **Licensed content** | *This protocol is marked "no AI" or is licensed content, so it is never sent to AI.* |
| Advanced Data Protection is not on | *Your department uses Advanced Data Protection, so its content stays local and AI drafts are not available.* |
| Authors and approvers for drafting; **Draft a training** also needs the right to create trainings | Members only practise |
| The department's monthly Enhanced AI budget | When it is used up: *It resets at the start of next month.* |

Every item AI drafts must cite a section of the protocol and may only use numbers written there. A draft that breaks this is left out (*3 drafted cards were left out because they did not match the protocol.*) or refused as a whole. Doses are only ever quoted as the protocol writes them; nothing is calculated.

## Practice cards

### Draft and keep cards (authors and approvers)

1. Open a published protocol and select **Practice cards**. *Cards drafted with Enhanced AI from the version in force. Members who can read this protocol practise them on its page; nothing is graded or recorded.*
2. Under **Draft cards with AI**, set the **Number of cards** (1 to 20) and select **Draft cards**. Drafting can take a minute.
3. Read each drafted card (question, answer and the section it cites). Tick the ones to keep and select **Keep the ticked cards**.
4. Under **Cards**, each kept card shows its **Question**, **Answer**, **Section** and **Status**: **Shown** or **Needs review**. Use **Edit** to correct the wording and **Save card**, or **Remove**.

![Practice cards page for SOG-101 Mayday (no AI model set up on this installation, so nothing is drafted)](/img/web-app/protocols/protocol-practice-cards-author.png)

*When a newer version goes into force, its cards are hidden until you check them.* A card marked **Needs review** (*A newer version is in force*, or *Its section can no longer be read*) is not shown to members. Select **Check against the version in force** to show it again.

### Practise cards (members)

On the protocol's page, the **Practice cards** panel appears once the protocol has cards: *Short questions from this protocol. Your progress stays in this browser and is never recorded.*

1. Read the question and select **Show the answer**.
2. Select **I knew it** or **Again**. The panel counts *4 of 10 known* and shows where each card comes from (**From:**).
3. When you know every card, *You know every card for now. Start over to practise again.* Select **Start over** to begin again.

![Practice cards panel on the protocol page with a card turned over](/img/web-app/protocols/protocol-practice-cards-member.png)

## Practice scenarios

The **Practice** panel on a published protocol's page writes a short scenario from the version in force and scores the member's answers against the protocol. *Practise with a short scenario written from this protocol's version in force. Your answers are scored against the protocol only, and nothing is recorded on your transcript.*

1. Open the protocol and select **Start a scenario** in the **Practice** panel.
2. Read the **Scenario** and type **Your answer** to each question.
3. Select **Score my answers**. Each answer gets a score with feedback and links to the sections it was scored against (*Score: 7 of 10*).
4. Select **Another scenario** to practise again.

If the protocol changes in the meantime, *The protocol has changed since this scenario was written. Start a new one.* The panel is not shown for protocols excluded from AI or marked licensed content.

<!-- SHOT: /img/web-app/protocols/protocol-practice-scenario.png | Practice panel with a scenario, two answers and the scores with source links | /User/Protocols/View/101 | not taken: needs practice scenarios drafted with a configured AI model -->

## Draft a training from a protocol

**Draft a training** creates a baseline training with a quiz from the version in force. It can back the protocol's [quiz-gated acknowledgment](./acknowledgments-and-bulletins.md#quiz-gated-acknowledgment).

1. Open a published protocol and select **Draft a training** (authors and approvers who can also create trainings).
2. Set the **Number of quiz questions** (0 to 10) and select **Draft the training**.
3. **Review the draft:** each part shows its key points and the protocol sections it quotes (**Cited:**); each quiz question shows the **Correct answer** and an **Explanation** (explanations help you check; the quiz keeps the questions and answers only). If the protocol is long, *only its first sections were used*.
4. Change the **Training name** if you like and select **Create the draft training**. Select **Draft again** for a new draft instead.
5. The training editor opens: *Draft training created from the protocol. It is not assigned yet: review it, then assign it or use it for the protocol's acknowledgment quiz.* Nobody is assigned and members do not see it until you assign it ([Trainings](/web-app/trainings/)).

![Draft a training page for SOG-101 Mayday (no AI model set up on this installation)](/img/web-app/protocols/protocol-draft-training.png)

## Draft a translation

In the [translation editor](./translations-print-and-sharing.md#translate-a-version) of a draft translation, **Draft translation with AI** *fills the fields still in the source wording. Doses, links and structure stay the source's; you review and save.* The editor then says how many fields were drafted (*AI drafted 24 fields.*), how many were refused because a number, link or markup changed, and how many are left (*draft again to continue*). Review the wording and select **Save translation**; it still needs its approval.

## Draft a change summary

In the protocol editor, while a draft is open, the **Drafting aids** panel under **Change summary** offers **Draft change summary**: a summary drafted from the redline of the draft against the version in force, written into the field for you to edit. *There is no earlier version to compare with, or nothing changed.* when there is nothing to summarize. It is refused while **Exclude from AI** is ticked.

## Setup examples

| Organization | How to use it |
|---|---|
| **Fire** | Practice cards for Mayday, RIT and accountability SOGs; recruits practise them before their acknowledgment quiz; a drafted training per SOG revision |
| **EMS** | Scenario practice on clinical guidelines between shifts; doses are quoted exactly as written; licensed clinical content is marked **Licensed content** and never sent to AI |
| **Search and rescue** | Practice cards for lost-person behavior and search urgency for new members |
| **Industrial / HAZMAT** | A drafted training and quiz for each plant emergency procedure, used as the quiz-gated acknowledgment |
| **Law enforcement / security** | Scenario practice on post orders and use-of-force policy |
| **Business** | A drafted training from the workplace safety rules, assigned to new hires |

## Technical reference

| Item | Value |
|---|---|
| Pages | `ProtocolAiController` (area User, `Protocol_View`): `GET Flashcards/{id}?edit=`, `POST DraftCards` (`count` 1 to 20, JSON), `POST AcceptCards` (`exchangeId`, `indexes`), `POST SaveCard`, `POST ReviewCard`, `POST RemoveCard`, `GET Deck/{id}` (members' practice deck, JSON), `GET/POST DraftTraining/{id}` (`questionCount` 0 to 10), `POST CreateTraining` (also `Training_Create`), `POST DraftTranslation` (`Protocol_Update`) |
| Practice scenarios | `KnowledgePracticeController`: `GET Status`, `POST Start` (`protocolId`), `POST Score` (`exchangeId`, up to 8 answers) |
| Change summary | `AuthoringAidsController`: `GET Status`, `POST Draft` |
| Gates | Enhanced AI add-on, `Ai.Enhanced` and `Ai.Knowledge`; author or approver (cards, training, translation), Training create (training); not "no AI" or licensed; no Advanced Data Protection; the monthly Enhanced AI budget. No LMS add-on needed |
| Audit | Every draft and scoring is logged in the Enhanced AI audit log; members' practice answers are not stored |
| v4 API | `ProtocolFlashcards/GetDeck`; `KnowledgePractice/GetStatus`, `Start`, `Score` |
| Migration | M0399 protocol flashcards |
| Strings | `Resgrid.Localization.Areas.User.ProtocolAi.ProtocolAi`, `Resgrid.Localization.Areas.User.Knowledge.Knowledge`, `Resgrid.Localization.Areas.User.Knowledge.AuthoringAids` |
