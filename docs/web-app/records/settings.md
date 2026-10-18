---
sidebar_position: 17
title: Records Settings
---

# Records Settings

**Records → Manage → Settings** (department administrators). Changes apply prospectively and are audited.

![Records settings](/img/web-app/records/settings.png)

## Lifecycle and review

| Setting | Meaning |
|---|---|
| **Default lifecycle preset for department definitions** | Quick entry, Review required or Approval / acknowledgement — the default new definitions start with. Locked types keep their own preset unless changed on the definition. |
| **Review due (hours)** | How long a reviewer has before the record shows as overdue on the dashboard and accountability report. |

## Numbering

A record gets its number when it is finalized, so abandoned drafts leave no gaps. One department **number pattern** numbers every built-in record type (Run, Training, Work, Meeting, Coroner, Callback, Unit Activity) and NERIS incident reports. Department definitions have their own prefix, sequence width and per-station or per-incident sequences, set on the [definition](definitions).

![Record numbering settings](/img/web-app/records/settings-numbering.png)

| Setting | Meaning |
|---|---|
| **Number pattern** | Literal text around tokens, up to 40 characters. Letters, digits, `-`, `_` and `.` are kept as written. The example next to the box shows a sample number as you type. Default `{PREFIX}-{YYYY}-{SEQ}`, which gives `RUN-2026-0123`. |
| **Sequence digits** | Zero-padding width of the sequence, 3 to 8. `4` gives `0123`. |
| **Numbering year starts** | The month and day your numbering year starts, and which year names it. January 1 (the default) is the calendar year. See [Fiscal year numbering](#fiscal-year-numbering). |
| **Record type prefixes** | What `{PREFIX}` writes for each record type. Leave a box blank to keep the default. See [Record type prefixes](#record-type-prefixes). |
| **Next numbers for *year*** | Each sequence the pattern produces in the current numbering year (with its dates when it is a fiscal year), with the number it issues next. See [Next numbers](#next-numbers). |

### Pattern tokens

| Token | Writes |
|---|---|
| `{PREFIX}` | The record type's prefix: the default, or your own from **Record type prefixes**. |
| `{YYYY}` or `{YY}` | The year, `2026` or `26`: the year the record started (an incident report's call was logged), in your department's time zone. With a fiscal year start, the fiscal year's name. |
| `{GROUP}` | The record's station or group as `G` followed by its ID, such as `G12`. Must be followed by `-`, `_` or `.`. A record with no group leaves it out, along with the separator after it. |
| `{SEQ}` | The sequence number. Required, exactly once. |

Each token can be used once. The sequence restarts whenever the text around `{SEQ}` changes:

- Including the year restarts the sequence every numbering year: the calendar year, or your fiscal year when you set one.
- Including `{GROUP}` gives each station or group its own sequence.
- Leaving out `{PREFIX}` gives every record type one shared sequence.

Changing the pattern never renumbers existing records. A pattern that is not valid is not saved, and nothing else under Numbering changes in that save (prefixes and next numbers included). The other settings on the page still save.

### Fiscal year numbering

Incident reports often have to match an outside agency's fiscal year, such as a county's or state's, rather than the calendar year. Set **Numbering year starts** to the month and day that year begins. Sequences whose pattern includes `{YYYY}` or `{YY}` then start again at 1 on that day, at midnight in your department's time zone, and the year tokens write the fiscal year's name. Department definitions set to restart yearly follow the same year.

Choose which year names it:

- **Named by the year it ends in** (the default, and the usual fiscal-year convention). A year starting November 1, 2026 is 2027.
- **Named by the year it starts in.** The same year is 2026.

| Year starts | Named by | Incident logged | `{PREFIX}{YY}-{SEQ}` with prefix `EZKT` |
|---|---|---|---|
| January 1 (default) | Calendar year | November 1, 2026 | `EZKT26-…` (2026 continues) |
| November 1 | Year it ends in | October 31, 2026 | `EZKT26-…` (FY2026 continues) |
| November 1 | Year it ends in | November 1, 2026 | `EZKT27-0001` |
| November 1 | Year it ends in | January 15, 2027 | `EZKT27-…` (no restart on January 1) |
| November 1 | Year it starts in | November 1, 2026 | `EZKT26-0001` |

- The year comes from when the record started, not when it was finalized: an October report finalized in November keeps the old fiscal year's number.
- Records request numbers (`PRR-2027-0001`) and prevention numbers follow the same year: occupancies `OCC-`, inspections `INSP-`, permits `PRM-`, investigations `INV-` and evidence `EV-`, each with its own sequence. A request takes the year it was received; the others take the year they were created. Their formats can be changed under [Other record numbers](#other-record-numbers).
- Record numbering and [call numbering](../department-settings#fiscal-year-numbering) each have their own year start, so dispatch can follow the calendar year while reports follow a fiscal year.
- February 29 can't be used as a start day, since not every year has one. A year start that isn't valid is not saved, and nothing else under Numbering changes in that save.
- Changing the year start never renumbers records. If the new year's name matches numbers already issued, the sequence continues after the highest of them instead of starting again, so no number is issued twice.
- Next numbers typed in the same save as a year start change are not applied, because they belonged to the old year's sequences. Save the year start first, then raise the numbers on the new rows.

### Other record numbers

The **Other record numbers** table sets the numbers Records issues outside the record pattern: **records requests** (`PRR-2026-0001`), **occupancies** (`OCC-`), **inspections** (`INSP-`), **permits** (`PRM-`), **investigations** (`INV-`) and **evidence** (`EV-`). Each row shows its built-in numbers; type a pattern to replace them.

- Patterns use `{YYYY}` or `{YY}`, `{MM}`, `{DD}` and `{SEQ}`, as call numbers do (not `{PREFIX}` or `{GROUP}`), and follow the numbering year start above.
- Occupancy, inspection, permit, investigation and evidence numbers must fit 32 characters; records request numbers 50. A longer pattern is refused and named in the message.
- A new pattern carries on after any number it would repeat, so `PRM-{YYYY}-{SEQ}` with 5 digits continues after `PRM-2027-0041` as `PRM-2027-00042`.
- For a custom pattern, **Raise next to** carries on numbering from another system. Raises typed in a save that also changes the pattern or the year start are not applied.

### Record type prefixes

Each built-in record type has its own prefix, which `{PREFIX}` writes into its numbers. Replace a default to match your department's numbering, for example `FIRE` for Run records and `IR` for incident reports.

| Record type | Default prefix |
|---|---|
| Run | `RUN` |
| Training | `TRN` |
| Work | `WRK` |
| Meeting | `MTG` |
| Coroner | `COR` |
| Callback | `CBK` |
| Unit Activity | `UNT` |
| Incident reports (NERIS) | `INC` |

- A prefix is **2 to 6 letters or digits**. Lower case is saved as upper case. Separators such as `-` belong in the pattern, not the prefix.
- Leave a box blank, or enter the default, to go back to the default prefix.
- A new prefix **starts its own sequence**. Records already numbered keep their numbers. Going back to an earlier prefix carries on after the highest number issued with it.
- Record types given the **same prefix share one sequence**. The **Next numbers** table lists them on one row.
- A prefix that is not valid is not saved. That record type keeps the prefix it had, the message names it, and the rest of the settings still save.
- Prefixes are only used when the pattern includes `{PREFIX}`.

Numbers are not reused: each new number comes after the highest one already issued in its sequence, counting both records and incident reports.

### Next numbers

The **Next numbers** table lists every sequence the current pattern and prefixes produce for this year, with the number each will issue next. A department moving to Resgrid part way through a year can carry on its existing numbering: after issuing `2026-0001` through `2026-0152` elsewhere, enter `153` for that sequence.

- A next number can only be **raised**, never lowered. Saving asks for confirmation first.
- A number below the one the sequence would already issue is refused, and the message lists that sequence.
- If you change the pattern or a prefix in the same save, the next numbers you entered are not applied, because they belonged to the old sequences. Save the new pattern or prefix first, then raise the numbers on the new rows.

### Setup examples

| Goal | Pattern | Prefixes | Numbers |
|---|---|---|---|
| Keep the defaults | `{PREFIX}-{YYYY}-{SEQ}` | Defaults | `RUN-2026-0001`, `TRN-2026-0001`, `INC-2026-0001` |
| Different prefixes for Run records and incident reports | `{PREFIX}-{YYYY}-{SEQ}` | Run `FIRE`, Incident reports `IR` | `FIRE-2026-0001`, `IR-2026-0001` |
| Run records and incident reports share one count | `{PREFIX}{YY}-{SEQ}` | Run `FD`, Incident reports `FD` | `FD26-0001`, `FD26-0002` |
| Each station numbers its own records | `{PREFIX}-{GROUP}-{YYYY}-{SEQ}` | Defaults | `RUN-G12-2026-0001` |
| One number series for everything | `{YYYY}-{SEQ}` | Not used | `2026-0001`, `2026-0002` |
| Never restart the sequence | `{PREFIX}-{SEQ}` | Defaults | `RUN-000001` (with 6 sequence digits) |
| Incident reports follow a November fiscal year named by the year it ends in | `{PREFIX}{YY}-{SEQ}`, year starting November 1 | Incident reports `EZKT` | `EZKT27-0001` from November 1, 2026 |

## Retention

Shipped defaults: **7 years** for standard records; **permanent** for Coroner and other restricted classes. Retention is your department's responsibility under your jurisdiction's rules.

| Setting | Meaning |
|---|---|
| **Department default (years)** | Blank = system default. |
| **Per-definition overrides** | `0` = permanent. Setting a period on a restricted class asks for confirmation because it enables automatic purge. |

Records under a [legal hold](legal-holds-and-disclosures) are never purged.

## Cross-group visibility

| Setting | Meaning |
|---|---|
| **Department-wide (default)** | Every member with record view sees every record. |
| **Group-scoped** | Members see records anchored to their own station/group. Also requires the *See other groups' Records* permission to be locked to group. Authors, owners, reviewers, named participants, responding unit crews and department administrators always see a record. |

Turning on group scoping shows an **impact preview** — records that would be hidden from members of no group, records with no group anchor (which stay department-wide), members in no group — and requires confirmation.

## Search

Shows whether the search index is **online**, the number of indexed records and whether **narrative text** is included. The worker rebuilds the index when the protection policy or catalog version changes. Narrative search is withdrawn when the department is enrolled in [Advanced Data Protection](../data-protection).

## Print layout

How the letterhead renders on record prints. Identity and logo come from the [Department Profile](../department-settings#department-profile).

| Setting | Meaning |
|---|---|
| **Show logo / Use the short name / Show address / phone / website** | Letterhead content. |
| **Letterhead line 1 / 2, Footer text, Watermark label** | Free text (e.g. `CONFIDENTIAL`). |
| **Page size, Date and time format** | Optional .NET format string such as `yyyy-MM-dd HH:mm`. |

Every save is a new layout version stamped in the provenance footer of every print. Per-definition layouts can override this.

## NERIS reporting

| Setting | Meaning |
|---|---|
| **Use NERIS workflows** | On by default. Turn it off if your department does not report to NERIS. |

Turning NERIS workflows off affects only NERIS:

- Incident reports finalize without the NERIS rules. Required custom fields and evidence checks still apply. Conditional sections show as suggestions.
- Nothing is validated with or submitted to NERIS. Queued submissions wait, and submission recovery is paused.
- The NERIS settings screen, the NERIS figures on the dashboard and analytics, and the health alert for failed submissions are hidden.

Everything else in Records keeps working: incident reports and analyses, review, numbering, retention, disclosures, search and printing. The NERIS profile, credential, call-type crosswalk and submission history are kept. When NERIS is turned back on, submission continues from where it stopped.

While NERIS workflows are on, the NERIS profile itself is covered in [NERIS incident reports](incident-reports#neris-settings): entity ID, environment, credentials, enable / auto-submit, protected egress acknowledgement and the call-type crosswalk.

## Public-records disclosure

| Setting | Meaning |
|---|---|
| **Statutory response clock (days)** | 1–365; the default due date for a new request. |
| **Default redaction profile** | Standard, No personal identifiers, Full disclosure. |
| **Release approver** | A member, or any department administrator. |

## Technical reference

| Item | Value |
|---|---|
| Route | `/User/Records/Settings` |
| Model | `RecordsDepartmentSettings` (department setting 74 holds retention overrides; settings 70–77 and 111 `RecordsNerisWorkflowsEnabled` belong to the Records settings screen) |
| Numbering | Department setting 72 `RecordsNumberingConfig`: `Pattern`, `SequenceWidth`, `Floors` (raised next numbers, keyed by sequence), `Prefixes` (per record type, keyed by definition key such as `system.run` or `system.neris-incident`) the numbering year start `YearStartMonth` / `YearStartDay` / `YearLabel` (0 = named by the year it ends in, 1 = the year it starts in; unset = January 1) and `DocumentPatterns` (records request and prevention number patterns; their sequences in `DocumentNumberSequences`, M0268) |
| API | `GET api/v4/Records/Capabilities` lists each record type's `NumberPrefix` with the department's own prefixes applied |
| Related | `/User/IncidentReports/Settings` (NERIS), `/User/Department/Profile` (letterhead identity) |
