---
sidebar_position: 7
title: Settings
---

# Settings

**Incident Back Office → Department setup → Settings** (department administrators) holds the module's department policies. Each policy is saved on its own; empty values use the defaults below. Every number is yours to set — nothing in the module hard-codes a threshold.

![Incident Back Office settings](/img/web-app/incident-back-office/settings.png)

| Policy | Settings (default) |
|---|---|
| General defaults | Snapshot staleness (15 minutes), default currency and measurement system for new incidents (from your country), operational period length (12 hours), exercises may notify external people (off). |
| Enrollment | Mode — off, suggest or auto-draft (suggest); count unenrolled people in a separate forecast band (on); backlog limits (25 people or 120 minutes). |
| Notice routing | The position codes that receive each notice (assignment, situation report, resources assigned, arrival update, lodging, demobilization, approvals, finance exceptions, claims, closeout, timeouts). The people holding those positions at send time are notified; with no holder, the section chief, then the administrators. |
| Forecasts and thresholds | Meal contingency (10 %), drinking water per person per day (7.5 L), water contingency (15 %), bed reserve (5 %), predicted timeouts reduce forecasts (off), replacement lead (3 days), arrival lead (120 minutes), timeout lead (3 days), meal cutoff lead (180 minutes), facility threshold (90 %), water days of supply (2). |
| Assignment length and work/rest | Rule pack, maximum assignment (14 days), travel days (2), maximum extension (7 days), maximum work hours per shift (16), rest per work hour (0.5). |
| Vendors and capacity holds | Verification interval (365 days), hold expiry (24 hours), compliance lead (30 days), hold lead (6 hours). |
| Self-service links | Link lifetime after the assignment (14 days), one-time code before lodging or travel is shown (on), vendor links only for verified vendor contacts (off). |
| Finance controls | Single-person operation (off; records who turned it on and when), extra intake sender domains, budget threshold (80 %), agreement ceiling threshold (85 %), daily burn threshold (none), intake backlog (50 items or 24 hours), claim deadline lead (7 days), recovery deadline lead (14 days), split-purchase window (3 days), micro-purchase threshold (10,000). |
| Retention | Snapshots after close (90 days), ledgers after close (7 years), self-service links after expiry (30 days). |
| Coordination boards | Default lane staleness (60 minutes), alarm on road closures (on), alarm on shelter capacity (on), share grant length (14 days), item due lead (60 minutes). |

## Module switches

**Department → Module Settings** has three switches: **Incident Back Office**, **Incident finance desks** and **Coordination boards**. They are on by default; turning one off hides its pages and stops its workers for your department without deleting anything.

![Module settings](/img/web-app/incident-back-office/module-settings.png)

## Background work

| Worker | What it does | How often |
|---|---|---|
| 74 | Incremental snapshot of every open incident's numbers | Every minute |
| 75 | Full rebuild snapshot (flags drift) | Every 30 minutes |
| 52 | Meal demand forecasts for the next three days | Every 15 minutes |
| 53 | Vendor compliance expiry | Hourly |
| 54 | Capacity hold and lodging block expiry | Every 5 minutes |
| 55 | Evaluated triggers (arrivals, capacity, lodging, meals, water, budgets, time, timeouts, coordination items, backlogs, deadlines) | Every 2 minutes |
| 57 | Daily cost, accruals, projections and cost share | Daily |
| 58 | Snapshot retention after close | Daily |

Workers never call billing; they skip departments whose module switch is off.
