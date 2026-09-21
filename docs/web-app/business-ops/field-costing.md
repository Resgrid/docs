---
sidebar_position: 12
title: Field Costing
---

# Field Costing

**Field costing** answers "what did that job actually cost us?" — and, for a bid, "what will it cost?" A **cost run** adds up personnel (from [Workforce](workforce) compensation profiles and the hours on time reports or work entries), resources (from **resource cost profiles** and **usage readings** — depreciation, fuel, maintenance, tires, insurance), consumables, expenses and overhead into a **total loaded cost**, sets it against the revenue you observed (a bid's estimate, a customer invoice, a Cal OES expected / approved / paid amount) and shows the **contribution margin** and **break-even revenue**.

Business Ops add-on with `Workforce.InternalCosting`. Menu: **Workforce & Business Ops → Workforce → Field costing** (administrators or *View internal costs*). Summaries are aggregate categories only; **lines** (who, what rate) need *View workforce compensation* and a Protected Data Grant.

## Resource cost profiles

**Workforce → Resource costs**: what a unit, inventory asset or **external resource class** costs to run. Plain numeric data (no person is priced here).

![Resource costs](/img/web-app/workforce/resource-costs.png)

| Panel | Fields |
|---|---|
| **Profile** | Subject (*Unit*, *Inventory asset*, or an *external resource key* — a rate schedule entry id lets bid estimates price vehicle and equipment lines by class), name, effective / expiry, currency, **allocation basis** (*mile, kilometre, engine hour, operating hour, day*), **expected annual utilization** (spreads fixed annual components and time-based depreciation), approved. |
| **Depreciation** | Acquisition cost and date, salvage value, useful life in allocation units or months: straight-line = (cost − salvage) ÷ life. |
| **Cost components** | *Fuel / energy* (a rate, or consumption × unit price), *Maintenance* (manual, or a **rolling work-order actual** over a meter window from [Work Orders](../work-orders)), tires, insurance / licensing, lease, storage, fixed overhead, consumables, other — per mile / km / engine hour / operating hour / idle hour / day / deployment or fixed annual. |

## Usage readings

**Resource usage** (from a cost run's *Resource usage* button, or **Workforce → Cost runs → Usage** for a deployment or call): odometer, engine meter, operating and idle hours, deployed / standby days and fuel per unit and day, tagged with the **phase** (*mobilization, standby, incident, return*) and the deployment or call. Distance is stored in miles (kilometres are converted). Readings come from the apps (crews record them on the deployment), from DTRs, GPS, hardware trackers or imports; a reading that conflicts with another by more than 10 % is queued for **review**.

![Usage](/img/web-app/workforce/usage.png)

## Cost runs

**Workforce → Cost runs**:

![Cost runs](/img/web-app/workforce/cost-runs.png)

| Run | Inputs | Revenue |
|---|---|---|
| **Calculate deployment cost** (*actual*) | Approved daily time reports, usage readings and expenses through the **through date**. | The customer invoice, or the Cal OES MARS expected / approved / paid amount — your choice of **revenue source**. |
| **Estimate bid cost** (*estimate*) | Bid lines × department-default compensation and class resource profiles. | The bid's estimated total. |
| **Calculate call cost** (*actual*) | Work entries and usage readings recorded against the call. | None. |

![Cost run](/img/web-app/workforce/cost-run.png)

A run shows the **summary** by category (personnel, resources, consumables, expenses, overhead), total loaded cost, revenue, margin, break-even and **missing inputs** (a unit with no cost profile, a person with no compensation profile — priced with the fallback and flagged *estimated* / *fallback profile*), **estimate vs. actual** for deployments that started from a bid, and the **lines**. **Freeze** makes a run immutable; a later recalculation supersedes it. Statuses: *Draft, Needs review, Frozen, Superseded*.

The same numbers appear as a **cost card** on the bid page and on the deployment's **Internal cost** tab.

## Setup examples

| Organization | Profiles | Runs |
|---|---|---|
| **Municipal fire** | Engines and trucks with acquisition cost, 15-year life, fuel per mile, rolling maintenance from work orders; role-default compensation per rank. | Deployment runs after every strike-team assignment to compare with the reimbursement; call runs for cost-recovery ordinance justification. |
| **Wildland contractor** | Engines, water tenders, chainsaws and pumps per engine hour or day; employee compensation with OT multipliers. | Bid estimate before quoting; deployment actual before invoicing to check the margin. |
| **Private ambulance** | Ambulances per mile; paramedic / EMT profiles. | Call cost for contract renewals; event deployment actual vs. bid. |
| **Security company** | Patrol vehicles per mile; officer profiles. | Bid estimate per event; deployment actual per client site per month. |
| **Industrial site** | Plant apparatus per operating hour. | Call cost for internal chargebacks. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/Workforce/{ResourceCosts,Usage,CostRuns,CostRun}`; POST `SaveResourceCost`, `DeleteResourceCost`, `SaveUsage`, `DeleteUsage`, `RunDeploymentCost`, `RunBidEstimate`, `RunCallCost`, `FreezeCostRun`, `DeleteCostRun` |
| Model | `ResourceCostProfile` + components, `ResourceUsageEntry`, `FieldCostRun` + lines (`FieldCostContextTypes` Bid / Call / Deployment, `FieldCostRunTypes` Estimate / Actual, `RevenueSources`, `FieldCostCategories`) |
| Permissions | *View internal costs* (74) for profiles, usage and summaries; *View workforce compensation* (76) + grant for lines |
| Services | `IFieldCostingService`, pure `FieldCostCalculator`; MARS revenue via `ICalOesMarsService` |
| Apps | Usage readings captured in the Responder and Unit apps' deployment screens |
| API | `api/v4/FieldCost/*` (aggregate summaries, rostered usage) |
