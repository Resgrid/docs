---
sidebar_position: 3
title: Training reviews
slug: /web-app/trainings/training-reviews
---

# Training reviews

**Training reviews** is the inbox where training captains, instructors and training officers check the [CE / CPD hours and outside training](./external-submissions.md) members submit with evidence. Submissions wait oldest first; the reviewer opens one, looks at the certificate or photo right on the page, and **approves** it, **denies** it with a reason, or **asks the member for more information**. Several can be approved at once. The member is told at every step.

Review is optional. A department can have every submission reviewed (the default), only some (selected categories, or more than a number of hours), or none, in which case submissions count at once and show as *Self-reported* on the transcript. Training reviews are free for every department.

**Where to find it:** **Trainings → Training reviews** (shown to reviewers only), also reachable from **Trainings → Records** in the officers' strip. Reviewers also see *Training submissions to review* with a count and the three oldest on the home page and on **My Training**. A member who reviews nobody is taken to **My submissions** instead.

![The Training reviews inbox with waiting submissions, filters and bulk approve](/img/web-app/trainings/rec-reviews-inbox.png)

## Who reviews {#who-reviews}

| Reviewer | Reviews the submissions of |
|---|---|
| Department administrators | Every member |
| Members of the roles named on **Record Training Completions** (permission 135, the training captain and instructor right) | Every member |
| Members of the roles named on **Assign Training** (permission 126, when set to *Department admins and select roles*) | Every member |
| Group admins, when either permission is set to *Department and group admins* | The members of the group they administer |

- Nobody reviews their own submission; it goes to another reviewer.
- **Reviewers named by role review only the members of their own group** (in the [training record settings](./settings.md#review-of-member-submissions)) narrows role reviewers to the group they belong to. Department admins still review everyone and group admins their own group.
- With no saved rule, Record Training Completions is held by department admins only, and Assign Training follows the Create Training permission.

Set the permissions under **Department menu → Security and Permissions** ([Security & Permissions](/web-app/security-permissions)). Permission changes take effect at the member's next login.

## Work the inbox

1. Open **Trainings → Training reviews**. The tiles show **Waiting for your review**, **Waiting for the member's answer** and **Oldest waiting since**.
2. **Waiting for review** lists the submissions waiting for you; **Waiting for the member** lists the ones where a reviewer asked for more information.
3. Narrow the list by **Category** (or *Uncategorized*), **Member**, or **Search title, provider or number**, then **Filter**.
4. Each row shows the **Member** (former members are marked), the **Training** with its date, category, provider and CE number, the **Hours**, the **Evidence** (*N files* or *No evidence attached*) and **Waiting since** (the time it was submitted or last resubmitted).
5. Select **Review** (or the title) to open it.

### Review one submission

The submission page shows the member, **Completed on**, **Hours**, **CE / CPD hours**, **Category**, **Provider**, **Course or CE / CPD number**, method, **Submitted** and the **Member's notes**. Under **Evidence** every file shows its kind, size and upload time with **Open** and **Download**; images and PDFs display on the page, other files download (*No preview for this type of file; download it to view it.*). **History** lists each step: *Submitted for review*, *More information asked for*, *Resubmitted*, *Approved*, *Not accepted*, with who and when, files added, and the notes.

Choose one of three actions:

| Action | Fields | Result |
|---|---|---|
| **Approve** | **Hours that count** (pre-filled with what the member entered; 0.25–999), **Note to the member (optional)** | Verified, counts at once, shows *Reviewed* on the transcript; certification credits and requirement sets follow |
| **Ask for more information** | **What is needed** (required) → **Ask the member** | *More information needed*; moves to **Waiting for the member** until the member resubmits |
| **Deny** | **Reason (the member reads it)** (required) | *Not accepted*; never counts; the reason shows to the member |

Once someone has decided, the page says *This submission is no longer waiting for a decision.*

![Reviewing one submission with the certificate PDF inline and the approve, ask and deny panels](/img/web-app/trainings/rec-review-submission.png)

### Approve several at once

On **Waiting for review**, tick the rows (or **Select all**), optionally enter a **Note to the members (optional)**, and select **Approve selected**, then confirm. Up to 100 are approved in one go with the hours the members entered; the page says how many were approved and how many could not be (for example one that another reviewer decided a moment earlier).

## Walkthrough: approve a submission {#walkthrough-approve-a-submission}

1. Rosa Delgado gets *Training submission to review: Priya Raman submitted "12-lead ECG interpretation refresher" (4 h) for your review.*
2. She opens **Trainings → Training reviews** and selects **Review** on Priya's row.
3. She reads the certificate PDF on the page: provider, course number and 4 contact hours match.
4. Under **Approve** she leaves **Hours that count** at *4*, adds the note *Thanks, logged for NREMT*, and selects **Approve**.
5. The inbox shows *Submission approved.* Priya gets *Training submission approved: … 4 h now count.* The record is verified on her transcript and, because *EMS continuing education* counts toward her EMT certification, a credit is added to her current cycle.

## Walkthrough: ask for more information, then approve

1. Marcus Ellery opens Jules Fontaine's *Wildland refresher RT-130* (8 h). The photo is cut off at the bottom.
2. Under **Ask for more information** he enters *The photo is cut off at the bottom. Please add the full sign-in sheet.* and selects **Ask the member**. The submission moves to **Waiting for the member**.
3. Jules adds the full photo and resubmits (see [answer a request](./external-submissions.md#walkthrough-answer-a-request-for-more-information)). It returns to **Waiting for review** with *Resubmitted* in its history.
4. Marcus opens it again, sees both photos, and selects **Approve**.

## What the member is told

Notices go by push and email in the member's language; their own notification settings apply.

| When | Notice |
|---|---|
| Submitted, waiting for review | *Training submission received* |
| Accepted on submit (no review) | *Training hours recorded* (as self-reported) |
| Approved | *Training submission approved* with the hours that now count |
| Denied | *Training submission not accepted* with the reason |
| More information asked for | *More information needed* with the reviewer's question |

## What reviewers are told

**Reviewer notices** in the training record settings:

| Option | Behavior |
|---|---|
| **A notice for each submission** (default) | *Training submission to review* for each new submission, and *Training submission resubmitted* when a member answers |
| **One summary a day** | One notice a day, from 07:00 department time, with the number waiting for that reviewer; only on days something waits |
| **No notices (inbox and home page only)** | Nothing is sent; reviewers use the inbox and the home page item |

## Turn review on, off or for selected submissions

**Trainings → Records → Settings → Review of member submissions** (department-wide record managers):

1. Choose **Review**:
   - **Every submission waits for a reviewer** (default);
   - **No review: accepted on submit and shown as self-reported**;
   - **Only the categories below, or above an hours threshold**: then pick **Categories that need review** and/or set **Review submissions of more than (hours)** (0 means no threshold). At least one is required.
2. Choose **Reviewer notices**, and tick **Reviewers named by role review only the members of their own group** if your crews or stations review their own people.
3. **Save settings**.

The choice applies to new submissions. Submissions already waiting stay in the inbox until someone decides them.

![The review section of the training record settings with selected categories and an hours threshold](/img/web-app/trainings/rec-review-settings.png)

## Setup examples

| Organization | Review | Reviewers | Notices |
|---|---|---|---|
| **EMS agency** | Every submission | EMS lieutenants (role on Record Training Completions) | Each submission |
| **Combination fire** | Selected: *Hazardous materials* and *Officer training*, above 8 h | Station captains, limited to their own group | Daily summary |
| **Volunteer fire, few submissions** | Every submission | Training officer (department admin) | Each submission |
| **Search and rescue** | Selected: *Technical rescue* | Team leaders as group admins | Daily summary |
| **Industrial ERT** | Every submission | Site safety coordinator | Each submission |
| **Security company** | Selected: above 4 h (licence renewal courses) | Operations managers | No notices; they check the inbox weekly |
| **Business / CPD** | No review | — | — |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/TrainingReviews` (`Index?info=&categoryId=&memberId=&q=`), `Review?id=`, `Submission?id=`, `Mine`, `Evidence?id=&download=`; POST `Approve`, `Deny`, `RequestInfo`, `BulkApprove`, `Respond` |
| Dashboard item | `PendingTrainingReviews` view component on the home dashboard (classic and modern) and **My Training** |
| Permissions | Record Training Completions (135), Assign Training (126), Create Training (3) as the no-row fallback of 126; department admins always |
| Setting | 135 `TrainingRecordSettings`: `SubmissionReviewMode` (0 Always, 1 Off, 2 Selected), `ReviewCategoryIds`, `ReviewAboveHours`, `RoleReviewersOwnGroupOnly`, `ReviewerNotices` (0 Immediate, 1 Daily digest, 2 None) |
| Review states | 0 Waiting for review, 1 More information needed, 2 Approved, 3 Not accepted, 4 Self-reported |
| Limits | Bulk approve 100 per action; notes and reasons 1,000 characters |
| Notifications | Event type 79 (member; push code `LS:`), 80 (reviewer, each submission or digest; push code `LV:`) |
| Worker | 85 *Training Records* (every 5 minutes): sends the daily reviewer digest from 07:00 department time, one per department per day (`TrainingReviewDigests`) |
| Workflow triggers | 280 Training submission received, 281 approved, 282 denied, 283 more information requested, 284 resubmitted |
| Audit log | Learning record verified / rejected, Training submission info requested, Training submission resubmitted |
| Migrations | M0408 (review state, evidence columns), M0409 (`LearningRecordReviewEvents`), M0410 (`TrainingReviewDigests`) |
| v4 API | `GET api/v4/TrainingReviews/GetReviewInbox`, `GetSubmission?id=`, `GetEvidenceFile?fileId=`, `GetMySubmissions`; `POST ApproveSubmission`, `DenySubmission`, `RequestSubmissionInfo`, `BulkApproveSubmissions`, `RespondToSubmission` |
