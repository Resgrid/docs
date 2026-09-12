---
sidebar_position: 9
title: Permits & Plan Review
---

# Permits & Plan Review

Operational permits (open burning, fireworks, hot work, tents, hazmat storage, special events …) and construction plan review, tracked per [occupancy](occupancies) with applicant details, state transitions, conditions, fees and expiry.

Feature flag: `Records.Prevention.Permits` (requires occupancies). Menu: **Records → Permits**.

![Permits](/img/web-app/prevention/permits.png)

## Permit types

**Permits → Permit types** defines what you issue: name, **code**, **validity (days)** used to compute the expiry from the issue date, whether it **requires plan review**, a **conditions template** pre-filled on new permits and a **fee** (reference only — invoicing is recorded, not collected, here).

![Permit types](/img/web-app/prevention/permit-types.png)

## Issuing a permit

**New permit** (from the list or from an occupancy):

| Field | Notes |
|---|---|
| **Permit type / Occupancy** | What and where. |
| **Applicant, e-mail, phone, contact** | Who applied; can link a [Contact](../contacts). |
| **Conditions** | Starts from the type's template. |
| **Expires on** | Leave blank to use the type's validity from the issue date. |

**Submit application** moves it to *Applied*. From the details page an officer **changes state** — *Under review → Issued* (or *Denied* with a decision reason), later *Expired* or *Revoked* — and can **record a fee** (amount, paid on, invoice reference) and, for types that require it, **record plan review** cycles (cycle number, outcome, reviewer notes, reviewed on).

![Permit details](/img/web-app/prevention/permit-details.png)

The list filters by state, type and **expiring soon**; analytics reports issued / denied / expired / revoked counts and average days from applied to issued.

## Setup examples

| Department | Permit types |
|---|---|
| **Fire marshal** | Open burn (30 days), Fireworks display (1 day, requires plan review), Tent / membrane structure (30 days), Hot work (7 days), Hazmat storage (365 days). |
| **Small volunteer department** | Burn permit only; Quick issue; expiry 3 days. |
| **Industrial / facilities** | Hot-work permit (1 day) and Confined-space entry (1 day) used as an internal permit-to-work log. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/RecordPermits/{Index,Details,Edit,Types}` |
| Model | `RmsPermitType`, `RmsPermit`, `RmsPermitPlanReview`, `RmsPermitFee` |
| Flag / permission | `Records.Prevention.Permits`; `RecordsPreventionAdmin` for types and state changes |
