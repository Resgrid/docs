---
sidebar_position: 2
title: CE / CPD hours submissions
slug: /web-app/trainings/external-submissions
---

# CE / CPD hours and outside training submissions

Members record training they did outside the department themselves: an online CE course, a conference session, a state class, a CPD activity, a refresher taken with another agency. They enter the course, the date and the hours, add evidence (a certificate, a photo, a document or a receipt) and send it. Depending on the department's [review settings](./settings.md#review-of-member-submissions), the submission either waits for a reviewer in [Training reviews](./training-reviews.md) or counts at once and is shown as self-reported. Either way it lands on the member's [transcript](./transcript.md) with its evidence.

Submissions, evidence and their review are free for every department.

**Where to find it:** **Trainings → Transcript → Submit outside training**, or **Trainings → Transcript → My submissions → Submit training hours**. Every member can submit unless the department switched submissions off. Apps and integrations can submit through the v4 API with the same rules.

![The Submit outside training form with the course, continuing education and evidence sections](/img/web-app/trainings/rec-submit-form.png)

## What the member enters

The notice at the top of the form says what happens next: *A reviewer checks your submission before the hours count*, *Your hours count as soon as you submit them and are shown as self-reported*, or that only some submissions (by category or number of hours) are checked.

| Section | Field | Rules |
|---|---|---|
| **Course** | **Course** | Required, up to 250 characters |
| | **Completed on** | Required; not in the future (department time zone) |
| | **Hours** | Required, in quarter hours, more than 0 and at most 999 |
| | **Category** | Optional; one of the department's [training categories](./categories.md). Decides whether it needs review (when review covers selected categories) and which certification it can credit |
| | **Method** | Optional: Classroom, Online, Drill or field, Virtual (live), Self-study, On the job |
| **Continuing education** | **CE provider**, **CE course number**, **CE hours** | Optional; printed on the transcript, the certificate and the [CE / CPD files](/web-app/trainings/exports-and-currency#ce-cpd-reporting) |
| **Evidence** | **Evidence files** | Optional; see the rules below |
| | **These files are** | A certificate (default), A photo, A document, A receipt, Other evidence. Applies to every file in this upload |
| | **Notes** | Optional, up to 4,000 characters; the reviewer reads them |

**Send for review** sends it. The member lands on the submission's own page with *Your submission was received and is waiting for review* or *Your training hours were recorded as self-reported*.

## Evidence files

| Rule | Detail |
|---|---|
| Accepted types | PDF, JPG / JPEG, PNG, GIF, WebP, DOC, DOCX and ODT, by file extension |
| Content check | The file must start the way its type does. A renamed file (for example an `.exe` saved as `.pdf`) is refused: *A file's contents do not match its type.* |
| Photos | JPEG, PNG, GIF and WebP are decoded and saved again before they are stored, so location (GPS), camera and device data never reach Resgrid |
| Documents | PDF and office documents are stored as uploaded |
| HEIC / HEIF | **Refused.** Nothing on the server can decode these iPhone photos to remove their location and device data. On an iPhone, pick the photo through the browser's file picker (it hands over a JPEG) or save it as JPEG first |
| Size | Each file up to 10 MB. One upload up to 5 files. A submission holds at most 10 files over all its uploads |
| The Submit page | The form accepts about 12 MB of files in one go. Larger sets are refused before they arrive; send the main certificate first and add the rest from the submission page while it waits for review (one upload there can be up to 30 MB) |
| Virus scan | When the installation runs an attachment scanner, a file it rejects is never stored: *A file was rejected by the virus scanner.* |
| Empty files | Refused: *A file is empty.* |

Each stored file keeps its name, type, size, kind, upload date and a SHA-256 fingerprint. Images and PDFs open inside the review page; other types download. Evidence is visible only to the member, the reviewers of that member and the officers who review their records.

## What happens next

| Department setting | The submission | The member is told | Counts |
|---|---|---|---|
| **Every submission waits for a reviewer** (default) | **Waiting for review** in the reviewers' inbox | *Training submission received* | After approval |
| **Only the categories below, or above an hours threshold**, and this one matches | **Waiting for review** | *Training submission received* | After approval |
| The same, and this one does not match | **Self-reported**, verified at once | *Training hours recorded* | At once |
| **No review: accepted on submit and shown as self-reported** | **Self-reported**, verified at once | *Training hours recorded* | At once |

When a submission waits, its reviewers are told according to **Reviewer notices** (each submission, a daily summary, or none) and it appears in their inbox and on their home page. A reviewer then:

- **approves** it, optionally correcting the hours. It becomes *Approved*, counts, shows *Reviewed* on the transcript, and the member reads *Training submission approved*;
- **denies** it with a reason. It becomes *Not accepted* and never counts; the member reads the reason;
- **asks for more information**. It becomes *More information needed*; the member reads what is needed, adds evidence or corrects the hours or category, and **Resubmits**.

A counted submission in a category that a certification counts becomes a [certification credit](./credit-mappings.md) in the certification cycle that contains its completion date, and can complete a [certification requirement set](/web-app/trainings/certifications-from-training#requirement-sets) (LMS).

### Where a submission stands

**Trainings → Transcript → My submissions** lists every submission with its **Training**, **Hours**, **Review** state and **Submitted** date.

| Review state | Meaning |
|---|---|
| **Waiting for review** | With the reviewers. The member can still add evidence; it keeps its place in line |
| **More information needed** | A reviewer asked something. **Open** shows the question under *The reviewer asked:* |
| **Approved** | Reviewed and counted |
| **Not accepted** | Denied; the reason shows under *Not accepted:* |
| **Self-reported** | Counted without review under the department's settings |

The home page and **My Training** also show *A reviewer needs more information* with the submissions waiting for the member.

![My training submissions with a waiting and a not accepted submission](/img/web-app/trainings/rec-my-submissions.png)

## Walkthrough: submit 4 hours of CE with a certificate PDF

Priya Raman (EMT) finished a 4-hour online ECG refresher from Mountain States EMS Academy and has the certificate as a PDF.

1. She opens **Trainings → Transcript** and selects **Submit outside training**.
2. Under **Course** she enters *12-lead ECG interpretation refresher*, **Completed on** yesterday, **Hours** *4*, **Category** *EMS continuing education* and **Method** *Online*.
3. Under **Continuing education** she enters **CE provider** *Mountain States EMS Academy*, **CE course number** *22-CV-1047* and **CE hours** *4*.
4. Under **Evidence** she chooses `ecg-refresher-certificate.pdf`, leaves **These files are** on *A certificate*, and adds the note *Online, self-paced; CAPCE accredited.*
5. She selects **Send for review**. The submission page opens with *Your submission was received and is waiting for review*, and she gets the *Training submission received* notice.
6. Rosa Delgado (EMS lieutenant, holds Record Training Completions) gets *Training submission to review*, opens it in [Training reviews](./training-reviews.md#walkthrough-approve-a-submission), checks the PDF inline and approves it. Priya reads *Training submission approved*, and the 4 hours count toward her EMT renewal through the credit mapping.

![The member's view of a submitted training with its evidence and history](/img/web-app/trainings/rec-submission-member.png)

## Walkthrough: answer a request for more information

Jules Fontaine (volunteer) submitted *Wildland refresher RT-130, 8 hours* with a photo that cuts off the instructor's signature.

1. Marcus Ellery (captain) asks for more information: *The photo is cut off at the bottom. Please add the full sign-in sheet.*
2. Jules gets *More information needed* by push and email. He opens the notice (or **My submissions → Open**) and reads *The reviewer asked:*.
3. Under **Add information and resubmit** he enters **Your answer** *Full sheet attached*, adds the new photo under **More evidence**, leaves **Corrected hours** empty and **Corrected category** on *Keep the category*, and selects **Resubmit**.
4. The submission is back in line (*Your submission is back with the reviewers*), and with reviewer notices on, Marcus is told it was resubmitted.

## Switching submissions off

**Trainings → Records → Settings → Outside training → Members may not submit outside training**. Members then see *Outside training submissions are switched off* and the **Submit outside training** button disappears from the transcript. Officers can still record outside training through a [history import](./history-import.md) or a certification credit. Submissions already made keep their state.

## Setup examples

| Organization | How they set it up |
|---|---|
| **EMS agency** | Every submission waits for a reviewer; EMS lieutenants hold Record Training Completions. CE provider and CE number are filled in so the CE / CPD files carry them. |
| **Volunteer fire** | Review only the *Hazardous materials* category and anything above 8 hours; small items (a 1-hour online module) count at once as self-reported. |
| **Career fire** | Members submit state fire academy classes with the certificate; the training division reviews; hours count toward ISO officer and driver categories. |
| **Search and rescue** | Members submit outside avalanche or swiftwater courses with a photo of the card; reviewers are named by role, limited to their own team (group). |
| **Industrial ERT / HAZMAT** | The site does not take submissions from employees (switched off); the safety coordinator imports contractor training records instead. |
| **Law enforcement / security** | Officers submit licensing renewal hours with the course receipt; review above 4 hours; denied submissions show the reason for the licensing file. |
| **Business / CPD (UK, EU, Canada)** | Staff log CPD activities (structured, self-directed, practice) with evidence; review off, everything shown as self-reported for the professional body. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/TrainingRecords/Submit` (GET, POST multipart), `/User/TrainingReviews/Mine`, `/User/TrainingReviews/Submission?id=`, POST `/User/TrainingReviews/Respond`, `/User/TrainingReviews/Evidence?id=&download=` |
| Permissions | Every member (Training view). Reviewers: see [Training reviews](./training-reviews.md#who-reviews) |
| Setting | 135 `TrainingRecordSettings`: `MemberSubmissionsDisabled`, `SubmissionReviewMode` (0 Always, 1 Off, 2 Selected), `ReviewCategoryIds`, `ReviewAboveHours` (0–999), `ReviewerNotices`, `RoleReviewersOwnGroupOnly` |
| Limits | 5 files per upload, 10 files per submission, 10 MB per file, 30 MB per upload (12 MB request on the Submit page, 44 MB on Respond); hours 0.25–999; title 250, notes 4,000 characters |
| Refusal codes | `learning_record_file_type`, `learning_record_file_content`, `learning_record_file_too_large`, `learning_record_too_many_files`, `learning_record_file_rejected`, `learning_record_file_empty`, `learning_record_submissions_disabled`, `learning_record_resubmit_empty` |
| Model | `LearningRecords` (source kind 3, `ReviewState`, `SubmittedOn`), `LearningRecordFiles` (`EvidenceKind` 0 Other, 1 Certificate, 2 Photo, 3 Document, 4 Receipt; size, SHA-256, scan state), `LearningRecordReviewEvents`; migrations M0408, M0409 |
| Notifications | Event type 79 *Training submission notice* to the member (push + email; push code `LS:`); 80 to reviewers |
| Workflow triggers | 280 Training submission received, 284 Training submission resubmitted (also 281–283, see [Training reviews](./training-reviews.md#technical-reference)); payload carries ids, title, category, hours, states and counts, never notes, file names or names |
| Audit log | External training submitted, Training submission resubmitted |
| GDPR export | `training_submissions.json`: the member's submissions, review history and evidence metadata (not the file bytes) |
| v4 API | `POST api/v4/Trainings/SubmitExternalTraining` (base64 `Data` and/or `Files`, up to 5), `GET api/v4/TrainingReviews/GetMySubmissions`, `POST api/v4/TrainingReviews/RespondToSubmission`, `GET api/v4/TrainingReviews/GetEvidenceFile?fileId=` |
