---
sidebar_position: 11
title: Investigations
---

# Investigations

Fire and arson investigations, cause-and-origin work and any other case that needs **restricted, need-to-know access**. A case is visible only to its **members**, every read is written to an **access audit**, evidence items carry an append-only **chain of custody**, and findings must be **approved by someone other than their author** before they can be recommended as an amendment to the incident report.

Feature flag: `Records.Investigations`; requires the *View restricted records* permission **and** case membership. Menu: **Records → Investigations**.

![Investigations](/img/web-app/prevention/investigations.png)

## Opening a case

**Open case** — you become the **lead investigator**. Give the case a title, kind (fire cause & origin, arson, explosion, fatality, hazmat, other), an optional linked **occupancy** and **call**, jurisdiction and reference number. Add **members** afterwards; only members can read the case.

![Open case](/img/web-app/prevention/investigation-open.png)

## Working a case

![Investigation details](/img/web-app/prevention/investigation-details.png)

| Panel | What it does |
|---|---|
| **Case members** | Add / remove members and their role. |
| **Linked incidents** | Link an incident report; linking **pins the incident revision** at that moment — findings never change the incident report. |
| **Evidence** | Evidence number, kind, collected from / on, storage location, current custodian. **Transfer custody** records who gave, who received, why, when and the resulting state (including transfer to an external party such as a lab). |
| **Case notes** | Dated notes with subject and body. |
| **Referrals** | Referrals to law enforcement, insurers, prosecutors, with agency and status. |
| **Findings** | Cause classification (accidental, natural, incendiary, undetermined), cause detail, origin description, incident summary, **recommends amendment**. **Record findings** sends them for approval; a reviewer or the lead (other than the author) **approves** or **returns** them. |
| **Access audit** | Who opened the case and when. |
| **Export packet** | A packet of the case for the prosecutor or insurer. |

**Close case** makes notes read-only (a closure reason is required); **Reopen case** is available to the lead.

## Setup examples

| Department | Notes |
|---|---|
| **Fire department with investigators** | Investigators role granted *View restricted records*; every fire with loss opens a case linked to the NERIS report; findings drive the NERIS incident analysis. |
| **Small department** | Open a case only for suspicious fires; add the county fire marshal as a member when handing over. |
| **Security / industrial** | Internal incident investigations (theft, process-safety events) with HSE as lead. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/RecordInvestigations/{Index,Details,Open,Custody,Export}` |
| Model | `RmsInvestigationCase`, `RmsInvestigationMember`, `RmsInvestigationEvidence`, `RmsCustodyTransfer`, `RmsInvestigationNote`, `RmsInvestigationReferral`, `RmsInvestigationFindings`, `RmsAccessAudit` |
| Flag / permission | `Records.Investigations`; `ViewRestrictedRecords` (59) + case membership; `RecordsPreventionAdmin` is **not** sufficient |
| Protected data | Case content is always protected-classified; under ADP it is encrypted at rest. |
