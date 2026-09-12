---
sidebar_position: 13
title: Quality Review
---

# Quality Review

An optional post-finalization **QA/QI** process: rubrics define scoring criteria, a deterministic sample of finalized records is drawn per rubric and period, reviewers score each record 0–4 per criterion, and trends are charted by author, unit, definition and criterion. Reviews never change the record — a reviewer can only **recommend an amendment**, which flows through the normal amendment path.

Feature flag: `Records.QualityReview`. Menu: **Records → Reports → Quality review**.

![Quality review](/img/web-app/records/quality-index.png)

## Rubrics

**Rubric → New rubric** (department administrators): name, the **definition** it applies to, **sample size** per sampling run, and the **criteria** — one per line as `key | text | weight`. The weighted total becomes a percentage.

![Rubric](/img/web-app/records/quality-rubric.png)

## Sampling and scoring

- **Sample** draws the configured number of finalized records for the rubric and period. Selection is deterministic — re-running for the same period gives the same records.
- **Reviews to score** lists sampled records waiting for a reviewer. Open one, score each criterion 0–4, add a reviewer note and optionally tick **Recommend an amendment**.
- **Trends** shows average score and review counts by author, by unit, by definition and by criterion since a chosen date, and how many reviews recommended amendments.

![Trends](/img/web-app/records/quality-trends.png)

## Setup examples

| Department | Rubric ideas |
|---|---|
| **EMS** | *Run report QA*: chief complaint documented, times complete, narrative matches interventions, protocol cited, signatures present. Sample 10 per month. |
| **Fire** | *NERIS incident QA*: incident type correct, actions/tactics complete, unit times plausible, narrative quality. |
| **Security** | *Incident report QA*: classification, involved persons, evidence attached, supervisor notified. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/RecordsQuality/{Index,Rubric,Review,Trends,Download}` |
| Model | `RmsQualityRubric`, `RmsQualitySample`, `RmsQualityReview` |
| Flag / permission | `Records.QualityReview`; rubric management requires department admin; scoring requires `ReviewRecords` |
