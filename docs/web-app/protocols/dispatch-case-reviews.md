---
sidebar_position: 7
title: Dispatch Case Reviews
description: "Quality review of dispatch cases: sample calls by protocol, version, determinant and dispatcher, score each recorded case question by question with a rubric, send it to the dispatcher, and report compliance."
---

# Dispatch Case Reviews

**Dispatch case review** is quality assurance for the [case flows](./decision-engine.md#case-flows) dispatchers walk on calls. A reviewer draws a random sample of calls, opens each recorded case beside the protocol's case flow, scores every question and instruction and the rubric's criteria, and sends the review to the dispatcher. The dispatcher reads it under **My case reviews**, acknowledges it and may reply once. Reports show compliance by protocol, version, dispatcher and month.

Dispatch case review is **free** with Protocols. It needs no add-on and does not need the Records module; the rubrics are Records quality review rubrics ([Quality Review](../records/quality-review.md)).

**Where to find it:**

- **Protocols → Case reviews** (links **Queue**, **Sample**, **Reports**, **Rubrics**): members with **Review Dispatch Cases** (134) and department admins. Creating and editing rubrics: department admins.
- **Protocols → My case reviews**: every member (the dispatcher of the reviewed calls).

**Nobody reviews their own calls.** A reviewer's own calls are left out of their samples, and a case of their own shows *This is your own call: another reviewer must score it.*

Only calls where a protocol's case flow was recorded can be reviewed. The *dispatcher* of a case is the member who attached the protocol, or else the member who reported the call.

## Set up a rubric

A review scores the case against a **dispatch case rubric**. Department admins set it up once.

1. Open **Protocols → Case reviews → Rubrics**.
2. Select **Create the standard rubric** to start from Resgrid's template (*Dispatch case review*), or create your own under **New rubric**. The template's criteria are:
   - *Case entry: address, call-back number and chief complaint confirmed*
   - *Questions asked as written, in order*
   - *The right determinant (an override has a sound reason)*
   - *Instructions given as written*
   - *Calm, clear and courteous with the caller*
3. Each criterion has a **Key**, a name and a **Weight** (1 to 10). *The keys "questions" and "instructions" take their score from the questions and instructions; the other criteria are scored by hand.*
4. Tick **Active** and select **Save rubric**.

Each review keeps the criteria it was sampled with, so a later rubric change never alters a sent review.

![Dispatch case rubrics page with the New rubric form](/img/web-app/protocols/protocol-case-review-rubrics.png)

## Draw a sample

1. Open **Protocols → Case reviews → Sample** (*Pick calls at random for review by protocol, version, determinant, dispatcher and dates.*).
2. Under **Which calls**, set **From** and **To** (up to a year), and optionally a **Protocol**, **Version**, **Determinant** (*A determinant or its beginning, for example 09-E.*) and **Dispatcher**.
3. Under **How many**, choose **Number of cases** or **Percentage of eligible cases** and the size (at most 100 cases per sample; a percentage is rounded up).
4. Choose the **Rubric** and, optionally, **Assign to** a reviewer (*Their own calls are left out of the sample.*).
5. Select **Count** to see the **Sample preview**: **Matching cases**, **Already reviewed**, **Left out**, **Eligible** and **Would be sampled**.
6. Select **Draw sample**. *12 cases queued for review (48 eligible, 6 already reviewed).*

Calls already reviewed are never sampled again. The draw is random and cannot be steered by the person running it.

![Sample calls for review form with the date, protocol, dispatcher and sample size fields](/img/web-app/protocols/protocol-case-review-sample.png)

## Review a case

The **Queue** lists sampled cases waiting for review, oldest first, with the **Call**, **Protocol**, **Dispatcher**, who it is **Assigned to**, and its **Status** (**Queued**, **Draft**, **Sent**, **Acknowledged**). Tiles show **In the queue**, **Drafts**, **Assigned to me** and **Waiting for the dispatcher**; switch between **Whole queue** and **Assigned to me**. **Take** puts an unassigned case in your queue; **Remove** takes a case out (it can be sampled again later).

1. Select **Review** on a case. The page is titled *Case review: call 26-341*.
2. Read **The case as recorded**: the determinant (*Computed CP-C; overridden by Lena Hartwell on ...* with the reason), the suggested priority and the source, and the **Timeline** (call logged, protocol attached, case flow completed or not, overrides, texts to the caller, step-through, sampling).
3. **Protocol case flow** beside it shows the cited version's case flow with *Steps on the path this call took* highlighted.
4. Under **Questions and instructions**, set the **Compliance** of each one (**Compliant**, **Partly**, **Not compliant**, **Not applicable**) and add a **Note (optional)**.
5. Under **Rubric criteria**, score each criterion by hand (**100 - fully met** to **0 - not met**); the questions and instructions criteria are filled in from step 4.
6. Write **Comments for the dispatcher**.
7. Select **Save draft** to finish later, or **Send to dispatcher**. Every question, instruction and criterion must be scored before sending, and a sent review can no longer change.

The header shows the **Score**, the **Question compliance** and the **Instruction compliance** as you go.

![Case review page with the recorded case, timeline, case flow path and the scoring form](/img/web-app/protocols/protocol-case-review-scoring.png)

On a department with [Advanced Data Protection](../data-protection.md), the case answers and reasons are withheld until the reviewer reveals them with a fresh identity check; the score is then saved against what the reviewer could read.

## My case reviews

When a review is sent, the dispatcher gets a push and an e-mail naming the call and the protocol (never the score or the comments). **My case reviews** (*Reviews of calls you dispatched. Read each one and acknowledge it; you can reply once.*) lists them with **To acknowledge**.

1. Open **Protocols → My case reviews** and select **Read and acknowledge**.
2. Read the case, the scores per question and instruction, the rubric scores and the reviewer's comments.
3. Optionally write a **Reply (optional)** (*You can reply once; the reviewer is notified.*).
4. Select **Acknowledge**. A reply can also be sent afterwards with **Send reply**, once.

![My case reviews for a dispatcher (none yet)](/img/web-app/protocols/protocol-case-review-mine.png)

## Reports

**Reports** (*Compliance of reviewed dispatch cases by protocol, version, dispatcher and month.*) covers sent reviews of calls in the period you choose (**Apply**):

- tiles **Reviews**, **Average score**, **Overrides** and **Acknowledged**;
- tables **By month**, **By protocol**, **By version**, **By dispatcher** and **By question and instruction**;
- **Export CSV**: one row per review with the call, call date, protocol, version, determinant, overridden, dispatcher, reviewer, score, question and instruction compliance %, sent and acknowledged.

![Case review reports with the filters and summary tiles](/img/web-app/protocols/protocol-case-review-reports.png)

## Setup examples

| Organization | How to set it up |
|---|---|
| **Fire / EMS dispatch** | Monthly sample of 10% of calls with a case flow per dispatcher; the standard rubric; the training officer reviews, the dispatchers acknowledge; export the CSV for the medical director |
| **EMS** | Sample every case with an `-E` determinant override; use the reports by version to check a new protocol version is being followed |
| **Search and rescue** | Review the missing-person intake case flow after each callout to improve the questions |
| **Industrial / HAZMAT** | Review the plant control room's handling of release calls quarterly; add a criterion for notifying the shift supervisor |
| **Law enforcement / security** | Review alarm-response cases; a custom rubric criterion for officer safety information passed on |
| **Multi-agency dispatch center** | Give **Review Dispatch Cases** to the QA supervisors only; supervisors' own calls are reviewed by a peer |

## Technical reference

| Item | Value |
|---|---|
| Pages | `DispatchCaseReviewsController` (area User, policy `Protocol_View`): `GET Index?mine=`, `POST Take`, `POST Remove`, `GET/POST Sample` (Count = preview), `GET Review/{id}`, `POST ReviewRevealed` (ADP reveal), `POST Score` (`send` to send), `GET Mine`, `POST Acknowledge`, `POST Reply`, `GET Reports`, `GET ReportCsv`, `GET Rubrics?edit=`, `POST SaveRubric`, `POST CreateTemplateRubric` (admins) |
| Permission | Review Dispatch Cases 134 (sample, score, reports); department admins also manage rubrics |
| Rules | At most 100 cases per sample, a date range up to 366 days, 20,000 candidates counted; a case already reviewed is never sampled again; never the reviewer's own calls; only calls with a recorded case flow |
| Rubrics | Records QA rubrics (`RmsQualityRubrics`) for dispatch cases; criterion keys `questions` and `instructions` are scored from the items; weights 1 to 10; up to 50 criteria |
| Notifications | Push and e-mail to the dispatcher when a review is sent (push code `PQ:` and the review id); the reviewer is told of a reply |
| Workflow triggers | 255 *Dispatch case review sent*, 256 *Dispatch case review acknowledged* ([Workflows](../workflows.md)) |
| v4 API | `DispatchCaseReviews/GetMyReviews`, `GetMyReview`, `Acknowledge`, `Reply` |
| Migration | M0391 dispatch case reviews |
| Strings | `Resgrid.Localization.Areas.User.DispatchCaseReviews.DispatchCaseReviews` |
