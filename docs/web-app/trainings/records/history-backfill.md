---
sidebar_position: 6
title: History backfill
slug: /web-app/trainings/history-backfill
---

# History backfill

The transcript started recording when your department moved to this version of Resgrid. Your department's older training is already in Resgrid, though: completed trainings, training logs, and finalized Records training records. The **history backfill** brings that history onto members' transcripts, with the original dates, so a transcript does not start empty.

Backfilled records are **verified** and marked **From history**. They **never credit a certification by themselves**: many departments have already typed those hours onto certifications as manual credits, and crediting them again would count them twice. Use [Apply history to credits](./credit-mappings.md#apply-history-to-credits) per certification type to choose which become credits.

The backfill is free for every department.

**Where to find it:** **Trainings → Records → Backfill** (department administrators and the roles named on **Assign Training**, permission 126, held department-wide).

![The history backfill page with its rules and the dry-run option](/img/web-app/trainings/rec-backfill.png)

## What it brings over

| Source | Becomes | Notes |
|---|---|---|
| Completed trainings (current assignments and the earlier completion history of recurring trainings) | *Course completion* records | Category from the training, when it has one |
| Training log participants | *Training record* records | Hours from the log's start and end; no category (use [Categorize](./categories.md#categorize-history-in-bulk)) |
| Finalized Records (RMS) training records | *Training record* records | One per participant |
| Calendar check-ins | Not backfilled | No existing event type was marked as training |

How the backfill works, as the page says:

- *Backfilled records are verified and keep their original dates.*
- *They never credit a certification by themselves: use Apply history to credits for that.*
- *Calendar check-ins are not backfilled.*
- *It runs in the background and can run again safely: records already written are skipped.*

## Run the backfill

1. Open **Trainings → Records → Backfill**.
2. Select **Count only (dry run)**. *The dry run is queued: it only counts.* It starts within a few minutes.
3. Reload the page. **Latest run** shows the status, **Completions found** and **Training records found**.
4. When the numbers look right, select **Run backfill** and confirm *Write history records for every member now?* *The backfill is queued.*
5. While it runs the page says *The backfill is running in the background. Reload the page to see its progress.* **Records written**, **Skipped** (already on the transcript), **Attempts** and any **Error** update as it goes.
6. Afterwards, [categorize](./categories.md#categorize-history-in-bulk) the uncategorized groups and, for each certification that counts training hours, [apply history to credits](./credit-mappings.md#apply-history-to-credits).

Only one backfill runs at a time per department; asking again while one is queued or running shows that one. A run works through about 2,000 source items every five minutes and resumes where it stopped, so a large department finishes over several runs. A job whose worker stopped is picked up again after 30 minutes.

| Status | Meaning |
|---|---|
| **Queued** | Waiting for the worker |
| **Running** | Writing (or counting); progress updates on reload |
| **Completed** | Done; a dry run only counted |
| **Failed** | Stopped with an error shown under **Error**; run it again |
| **Cancelled** | Stopped without finishing |

## Walkthrough: bring the last ten years onto transcripts

1. Dana Whitlock runs **Count only (dry run)**. The next morning **Latest run** says *Completed* with 1,284 completions and 3,906 training records found.
2. She selects **Run backfill**. Over the next quarter of an hour **Records written** climbs to 5,190; **Skipped** stays 0.
3. On **Categorize** she gives *Monday night drill*, *SCBA confidence course* and *EVOC refresher* their categories.
4. On **Credits** she selects **Apply history to credits** for *Fire con-ed (24 h)*, unticks the drill nights members already typed in as manual credits, and applies the rest.
5. Tomas Okafor's transcript now starts in 2016, with the backfilled rows marked **From history**.

## Setup examples

| Organization | When to backfill |
|---|---|
| **Volunteer fire** | Once, right after the upgrade: years of drill-night logs become transcript rows, then one bulk categorize |
| **Career fire / ISO** | Dry run first; categorize company, officer and driver logs into the ISO FSRS categories before the next ISO review |
| **EMS agency** | Backfill, then apply history only for cycles where CE was not typed in by hand |
| **Search and rescue** | Backfill the team's training logs; nothing to credit if certifications are tracked outside Resgrid |
| **Industrial ERT / law enforcement / security** | Backfill, then review the result in the hours report with **Include former members** for audits |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/TrainingRecords/Backfill`, POST `RequestBackfill?dryRun=` |
| Permissions | Department-wide record managers (Assign Training 126, or department admin) |
| Worker | 85 *Training Records*, every 5 minutes: up to 3 jobs per run, about 2,000 sources per job per run, stages trainings → logs → records, resumable; stale claims retried after 30 minutes |
| Model | `LearningRecordBackfills` (state, dry run, requested/started/completed, resume point, found/written/skipped counts, attempts, error); records written with `IsBackfill = true`, status Verified; migration M0344 |
| States | 0 Queued, 1 Running, 2 Completed, 3 Failed, 4 Cancelled |
| Credits | Never automatic for backfilled records; only through Apply history to credits |
| Audit log | Training history backfill requested |
