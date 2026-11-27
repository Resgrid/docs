---
sidebar_position: 9
title: Training record settings
---

# Training record settings

**Training record settings** decide how calendar check-in hours are rounded, whether members may submit outside training and CE / CPD hours, whether those submissions are reviewed, how reviewers are told, and how long records are kept after a member leaves. They are free for every department.

**Where to find it:** **Trainings → Records → Settings** (department administrators and the roles named on **Assign Training**, permission 126, held department-wide). Select **Save settings** after a change.

![The training record settings page with all four sections](/img/web-app/trainings/rec-settings.png)

## Calendar check-in hours

*Hours from check-in to check-out on events that count as training are rounded to this step.* An event counts as training when its calendar event type has **Counts as training** ticked (calendar event types, see [Calendar](/web-app/calendar)); the type's **Training category** goes on the record.

| Field | Options | Default |
|---|---|---|
| **Round to** | *The minute (no rounding)*, 5, 6, 10, 15, 30 or 60 minutes | The minute |
| **Rounding** | *To the nearest step*, *Down*, *Up* | To the nearest step |

A check-in without a check-out is never guessed: it waits in the [records queue](./transcript.md#the-records-queue) for an officer to enter the hours.

## Outside training

| Field | Meaning | Default |
|---|---|---|
| **Members may not submit outside training** | Hides **Submit outside training** and refuses new submissions. *Officers can still record outside training through an import or a certification credit.* | Off (members may submit) |

## Review of member submissions {#review-of-member-submissions}

*Choose whether training hours members submit wait for a reviewer before they count.* Who reviews is explained in [Training reviews](./training-reviews.md#who-reviews).

| Field | Options | Default |
|---|---|---|
| **Review** | *Every submission waits for a reviewer*; *No review: accepted on submit and shown as self-reported*; *Only the categories below, or above an hours threshold* | Every submission |
| **Categories that need review** | With the third option: submissions in these categories wait for a reviewer | None |
| **Review submissions of more than (hours)** | With the third option: larger submissions wait for a reviewer; 0 = no threshold (up to 999) | 0 |
| **Reviewer notices** | *A notice for each submission*; *One summary a day*; *No notices (inbox and home page only)* | A notice for each submission |
| **Reviewers named by role review only the members of their own group** | Role reviewers (Record Training Completions or Assign Training) cover only the group they are in. *Department admins still review everyone; group admins review their own group.* | Off |

With *Only the categories below, or above an hours threshold*, pick at least one category or set a threshold (*Choose at least one category or an hours threshold.*). A change applies to new submissions; those already waiting stay in the inbox.

## Record retention

| Field | Meaning | Default |
|---|---|---|
| **Keep records after a member leaves (years)** | Minimum years training records are kept after a member leaves, used when a [category](./categories.md) sets none. 0 sets no minimum (0–75) | 0 |

Resgrid does not delete a former member's training records; the transcript stays readable for audits. The retention years are recorded with the settings and categories, and exported with the [training data export](/web-app/trainings/exports-and-currency#data-export); no automatic purge uses them.

## Setup examples

| Organization | Settings |
|---|---|
| **Volunteer fire** | Round to 15 minutes, nearest; submissions on, every submission reviewed; keep 7 years |
| **Career fire** | Round to 6 minutes (tenths of an hour), down; review above 8 hours and the *Officer training* category; daily summary |
| **EMS agency** | Exact minutes; every submission reviewed; reviewers limited to their own group (station) |
| **Search and rescue** | Round to 30 minutes, up; review *Technical rescue* only |
| **Industrial ERT** | Members may not submit outside training; OSHA bloodborne pathogens category keeps 3 years, department default 5 |
| **Business / CPD** | Submissions on, no review (self-reported CPD) |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/TrainingRecords/Settings` (GET, POST) |
| Setting | 135 `TrainingRecordSettings` (ProtoBuf): `HoursRoundingMinutes` (0, 5, 6, 10, 15, 30, 60), `HoursRoundingMode` (0 Nearest, 1 Down, 2 Up), `MemberSubmissionsDisabled`, `DefaultRetentionYears` (0–75), `SubmissionReviewMode` (0 Always, 1 Off, 2 Selected), `ReviewCategoryIds` (up to 200), `ReviewAboveHours` (0–999), `RoleReviewersOwnGroupOnly`, `ReviewerNotices` (0 Immediate, 1 Daily digest, 2 None) |
| Permissions | Department-wide record managers (Assign Training 126, or department admin) |
| Calendar | `CalendarItemTypes.CountsAsTraining` and `DefaultCategoryId` (M0345) |
| Admin Assist | Setting id `setting.TrainingRecordSettings` |
