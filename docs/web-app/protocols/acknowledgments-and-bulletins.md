---
sidebar_position: 3
title: Acknowledgments and Bulletins
description: "Read-and-sign acknowledgments per protocol version, quiz-gated acknowledgments, the compliance grid, priority bulletins and the must-read card, and the LMS extras."
---

# Acknowledgments and Bulletins

When a protocol version must be read by everyone it applies to, Resgrid asks each member of its audience to **read and sign** it. The signature records the member's name, the time and the exact version they read. Officers see who has signed in the **Compliance** grid and export it as proof. A **priority bulletin** is a short must-read notice that takes effect at once, for safety notices and interim directives that cannot wait for a review cycle.

Acknowledgments, reminders, the compliance grid with CSV and PDF, priority bulletins and quiz-gated acknowledgments (with a baseline training quiz) are **free**. Question-bank quizzes, weekly scenario questions and the proof-of-compliance report need the **LMS** add-on ([With the LMS add-on](#with-the-lms-add-on)).

**Where to find it:**

- **Protocols → My acknowledgments** (every member), and the **Must read** card at the top of **Home**.
- **Protocols → Compliance**: members with **Manage Protocol Acknowledgments** (130), **Approve Protocols** (129) or department admin.
- **Protocols → Bulletins**: authors, approvers and admins see it; issuing and countersigning need **Approve Protocols** (129).
- **Acknowledgment settings** on a protocol's page: managers of acknowledgments and authors.

## How acknowledgments are assigned

A version asks for acknowledgment when **Members must acknowledge this version** is ticked in the editor (on by default for policies and SOGs).

- **On publish**, every active member of the protocol's [audience](./index.md#audiences) is asked to acknowledge it and gets a push and an e-mail with a link to the read-and-sign page. A version scheduled for a later date can be acknowledged from the moment it is published; it is due on its effective date.
- **When someone joins the audience** later (a new member, a new role or group, a new shift), they are asked to acknowledge every version in force that needs it, due from the day they joined. A new member gets them as one onboarding bundle, in the department's **Onboarding order**.
- **Leaving the audience** withdraws an open request. A signed acknowledgment is always kept.
- **A minor version** (1.0 → 1.1) carries a signed acknowledgment forward; the member is not asked again. **A major version** (1.1 → 2.0) asks everyone again.
- If a newer version comes into force before a member signs, the old request is replaced: they owe the newer one.

Each request is due **30 days** after it was assigned unless the protocol sets its own **Days to acknowledge** (up to 365).

**Reminders:** on the due date, again 3 days after it, and 7 days after it the member's supervisor is told: the admins of their group (and its parent groups), or the department admins when they have none. Deleted, disabled and hidden members are never sent anything.

Every completed acknowledgment is also written to the member's training record ([Trainings](/web-app/trainings/)).

## My acknowledgments

**My acknowledgments** (*Protocols and bulletins you are asked to read and sign.*) shows tiles for **To acknowledge** and **Overdue**, the open requests with their due dates and **Read and sign**, and the acknowledged list (**Show acknowledged** / **Hide acknowledged**) with the version and when it was signed. *Carried forward from the previous minor version* marks one a minor version carried over.

![My acknowledgments with the protocols still to read and sign, and the acknowledged list](/img/web-app/protocols/protocol-ack-mine.png)

## Read and sign a protocol

1. Open the request from the notification, the **Must read** card or **My acknowledgments**, and select **Read and sign**.
2. Read the version. The outline links its sections; a medication block shows the dosing tool link when your department has one.
3. Under **Acknowledge**, read the statement: *I have read protocol SOG-101 "Mayday" version 2.0 (content ...), I understand it and I will follow it.*
4. Select **Sign**. If your department asks for a second verification step, confirm your second factor. The message is *Thank you. Your acknowledgment is recorded.*

![Read and sign page for SOG-101 Mayday with the protocol text and the Acknowledge panel](/img/web-app/protocols/protocol-ack-read-sign.png)

You must open the version before you can sign it. If the version changed since you opened it, or a newer version is in force, you are asked to read again (*A newer version is in force. Read it and sign that one.*). A request for a version you are not asked to acknowledge shows *You are not asked to acknowledge this version.*

Acknowledgments signed in the mobile app while offline show *Signed offline* in the grid. They are accepted only when the version that was read is still in force.

## Quiz-gated acknowledgment

A protocol can require a quiz as well as the signature. The quiz is a department training that has quiz questions ([Trainings](/web-app/trainings/)); this is free.

1. Open the protocol and select **Acknowledgment settings**.
2. Under **Quiz training**, choose a training of your department that has a quiz (**No quiz** turns it off).
3. Select **Save**.

Members who owe the acknowledgment are assigned the training along with it. After they sign, the request shows *Signed; waiting for the quiz in Mayday quiz* with **Take the quiz**, and it completes when they pass the training. With [Practice cards and AI drafts](./flashcards-and-practice.md#draft-a-training-from-a-protocol), Enhanced AI can draft that training for you.

## Acknowledgment settings

**Acknowledgment settings** on a protocol's page:

| Field | What it does |
|---|---|
| **Days to acknowledge** | Days a member has, counted from the day they are assigned or join the audience. Empty for 30 days |
| **Onboarding order** | Where this protocol sits in a new member's onboarding bundle: lower numbers come first |
| **Quiz training** | A training with a quiz; the acknowledgment completes only when it is passed |
| **Question-bank quiz and micro-learning** | LMS add-on ([below](#with-the-lms-add-on)) |
| **Standards** | LMS add-on: standards tags such as `CFAI, CALEA` for the proof-of-compliance report |

![Acknowledgment settings of SOG-101 Mayday with days to acknowledge, onboarding order and the quiz options](/img/web-app/protocols/protocol-ack-settings.png)

## Compliance

**Compliance** (*Who has read and signed each protocol version, by group.*) has two views:

- **All protocols (overview):** each protocol in force with its version, how many acknowledged out of how many assigned (with a percentage that reaches 100% only when everyone has), **Overdue**, and **Acknowledgment settings**.
- **One protocol:** choose it under **Protocols**, optionally a **Version** and a **Group**, and select **Filter**. Each member's **Group**, **State** (*Acknowledged*, *Waiting for quiz*, *Not yet signed*, *Overdue*, *Withdrawn*, *Replaced by a newer version*), **Due** and **Signed**. *Assigned on joining the audience*, *Carried forward from the previous minor version* and *Signed offline* show how a row came about.

**Export CSV** and **Export PDF** download what is shown. **Proof of compliance** opens the standards report ([LMS](#with-the-lms-add-on)). A protocol's page also has a **Compliance** button that opens this grid for it.

![Compliance grid for SOG-101 Mayday v1.0 with signed and not yet signed members](/img/web-app/protocols/protocol-ack-compliance.png)

## Priority bulletins

A **priority bulletin** takes effect at once and is sent by push. Approval follows afterwards: an approver countersigns it or withdraws it. It leaves the library by itself at its expiry.

**Issue a bulletin (Approve Protocols):**

1. Open **Protocols → Bulletins**.
2. Under **New priority bulletin**, enter the **Title** and the **Bulletin** text (up to 4,000 characters; a longer directive belongs in a protocol).
3. Set **Expires** (at most 90 days ahead; a week from now by default).
4. Choose a **Group** and/or **Role** audience, or none to send it to the whole department.
5. Leave **Must read: every member of the audience must acknowledge it** ticked to make everyone in the audience acknowledge it; untick it to send the push only.
6. Select **Issue bulletin** and confirm (*Issue this bulletin now and send it to the audience?*).

![Bulletins page with the New priority bulletin form and the TAC 3 bulletin in force](/img/web-app/protocols/protocol-bulletins.png)

**Countersign or withdraw:** the list shows each bulletin's **Expires**, **Acknowledged** count and **Approval** (*Waiting for countersign*, *Countersigned by Dana Whitlock*, *Withdrawn*). Another approver selects **Countersign** (a signature that asks for your second factor) or enters a **Reason** and selects **Withdraw** (*Withdraw this bulletin? It leaves force now.*). The member who issued a bulletin cannot countersign it unless they are a department admin.

### The must-read card

Every bulletin in force that a member has not acknowledged appears in a red **Must read** card at the top of **Home**, with **Read**. The card stays until they acknowledge it. It is shown only on Home: never on the dispatch console, a call or a status change, so it never stands in front of urgent work. Reading and signing works as for any protocol.

![Home dashboard with the Must read card listing the TAC 3 bulletin](/img/web-app/protocols/protocol-must-read-home.png)

## With the LMS add-on

With the [LMS add-on](/web-app/trainings/lms/), acknowledgments can use the department's question banks. Without it, these settings show *Comes with the LMS add-on.*

- **Question-bank quiz:** in **Acknowledgment settings → Question-bank quiz and micro-learning**, choose a department-shared **Question bank**, tick **Acknowledgment requires passing a quiz drawn from the bank**, and set **Questions per quiz**, **Pass mark (%)** and, optionally, **Only questions tagged**. Members see *Your acknowledgment completes when you pass a quiz of 10 questions (pass mark 80%).* and **Take the quiz**. Answers are scored on the server and the right answers are not shown; a member who does not pass can take a new quiz.
- **Weekly scenario questions (micro-learning):** tick **Include in the weekly micro-learning** on a protocol, or choose the protocols on the **Proof of compliance** page under **Weekly micro-learning** and select **Save selection**. Every Monday at 09:00 department time, each active member with an LMS seat in a selected protocol's audience gets one scenario question from the question banks tagged to it. Members answer it under **My acknowledgments → Weekly questions**, once, then see the right answer and why.
- **Proof of compliance:** **Compliance → Proof of compliance** lists protocols by standard (CFAI, CAAS, CALEA, NFPA, ISO 45001 and your own tags) with acknowledgment and verified approval evidence. Add standards in each protocol's **Acknowledgment settings → Standards**.

## Setup examples

| Organization | How to set it up |
|---|---|
| **Fire** | SOGs with acknowledgment on, **Days to acknowledge** 14, onboarding order so recruits read Mayday and accountability first; bulletins for apparatus out of service and hydrant closures, audience by station group |
| **EMS** | Clinical guidelines with a quiz training per protocol revision (major versions only, so typo fixes do not ask again); compliance grid exported for the medical director |
| **Search and rescue** | Callout and safety procedures acknowledged by every operational member; bulletins for closed trailheads or weather warnings during a search |
| **Industrial / HAZMAT** | Plant emergency procedures acknowledged by the emergency response team; bulletins for a process unit shutdown; standards tag `ISO 45001` with the LMS add-on |
| **Law enforcement / security** | Policies (use of force, pursuits) with step-up signing turned on in [Protocol settings](./index.md#protocol-settings); standards tag `CALEA` and the proof-of-compliance report |
| **Business** | The employee handbook and safety rules acknowledged by every employee, onboarding order for new hires; PDF export for HR files |

## Technical reference

| Item | Value |
|---|---|
| Pages | `ProtocolAcknowledgmentsController` (area User, policy `Protocol_View`): `GET Mine?all=`, `GET Read?versionId=`, `POST Sign` (L1) / `SignWithStepUp` (L2), `GET Compliance?protocolId=&versionId=&groupId=`, `GET ComplianceCsv`, `GET CompliancePdf`, `GET/POST Settings/{id}`, `GET Standards`, `POST MicroLearning`, `GET Bulletins`, `POST IssueBulletin` and `WithdrawBulletin` (`Protocol_Approve`), `POST Countersign` (`Protocol_Approve`, step-up), `GET/POST Quiz` (LMS), `GET Weekly`, `POST AnswerWeekly` (LMS) |
| Home card | View component `ProtocolMustRead` on Home only |
| Permissions | Manage Protocol Acknowledgments 130 (compliance, settings), Approve Protocols 129 (bulletins, compliance), Author Protocols 128 (settings) |
| Rules | Due 30 days by default (max 365); reminder on the due date, overdue reminder 3 days after, escalation 7 days after; bulletins up to 90 days, title 100 and text 4,000 characters, code `BUL-` plus the date and time |
| Notifications | Push and e-mail: event types 57 acknowledgment assigned (push code `PA:` and the version id), 58 bulletin issued (`PB:`), 59 acknowledgment overdue |
| Workers | 83 (members entering or leaving an audience), 86 (quiz completion, reminders and escalation, weekly micro-learning) |
| Workflow triggers | 235 *Priority bulletin issued*, 248 *Priority bulletin withdrawn*, 251 *Protocol acknowledgment assigned*, 252 *Protocol acknowledgment completed*, 253 *Protocol acknowledgment overdue* ([Workflows](../workflows.md)) |
| Setting | Read-and-sign at L2: department setting 134 ([Protocol settings](./index.md#protocol-settings)) |
| Feature flag | `Training.Lms` and the LMS add-on for question-bank quizzes, micro-learning and the standards report |
| v4 API | `ProtocolAcknowledgments/GetMyAcknowledgments`, `GetMustRead`, `Acknowledge` (version id and the content hash read; offline accepted only for the version in force), `GetVersionFile`, `GetBankQuiz`, `SubmitBankQuiz`, `GetWeeklyQuestions`, `AnswerWeeklyQuestion` |
| Migrations | M0348 acknowledgments, M0387 LMS protocol learning |
