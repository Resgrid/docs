---
sidebar_position: 6
title: Rate Schedules
---

# Rate Schedules

A **rate schedule** is a contractor's rate table: what a firefighter with a given certification, a 4-person versus an 8-person crew, an engine, a water tender or a chainsaw earns per **band** — standby, deployment, overtime 1, overtime 2, daily tiers, out-of-province per diems, mileage — plus the **billing policy** (rounding, minimums, overtime basis, travel caps) the [contractor billing engine](contractor-billing) applies to every daily time report. It is the contract-work counterpart of the simple per-call [rate card](invoicing#2-rate-cards).

Rates are always **explicit dollars per band** — never a formula — because an 8-person crew is not twice a 4-person crew and an overtime premium is a flat adder, not a multiplier. Business Ops add-on with `Invoicing.ContractorBilling`. Menu: **Workforce & Business Ops → Contracts → Rate schedules**.

![Rate schedules](/img/web-app/rate-schedules/index.png)

## Which schedule applies

For a bid or deployment the engine picks, in order: the **contract's** schedule → the customer billing profile's **default rate schedule** → the first active schedule current on the date (by *effective on*). **Clone** a schedule for the next season and give it a new *effective on* date; the old one keeps billing earlier deployments.

## Building a schedule

**New rate schedule**: name, description, currency, active, **effective on** / **expires**. Save, then fill in the three panels.

![Edit rate schedule](/img/web-app/rate-schedules/edit.png)

### Billing policy

| Policy | Meaning |
|---|---|
| **Round up to (minutes)** | Each entry's daily time is rounded up to this increment (30 is common). |
| **Overtime basis** | *Consecutive hours* (overtime starts after N hours on the shift) or *Daily total hours*. |
| **Cancellation minimum (hours)** | Hours billed when a resource is ordered and stood down (4 h is typical). |
| **Daily guarantee (hours)** | Minimum hours per deployment day (VIPR / CFAA portal-to-portal guarantees). |
| **Unsafe stand-down (hours)** | Hours billed on a day flagged *Unsafe conditions stand-down*. |
| **Travel cap per day (hours)** | Travel above the cap is not billed (or comes off the day under portal-to-portal). |
| **Fuel deduction per litre** | Deducted per litre of agency-supplied fuel recorded on the DTR. |
| **Continuous-run gap (minutes)** | Entries closer than this are joined into one run for overtime purposes. |
| **Vehicles bill a full day on a cancellation day** | Whether apparatus, like people, gets the full day when cancelled after mobilizing. |
| **Portal to portal** | Travel bills as deployment time and earns overtime. |
| **No-clear-8 carry-over** | A DTR flagged *No clear 8* starts the next day in the overtime band. |
| **Meal eligibility** | JSON windows per meal code (e.g. `[{"MealCode":"B","StartsBeforeMinutes":420}]`); a per diem outside its window is warned, not blocked. |

### Premiums

Flat **hourly adders** by code (night, hazard, lead, out-of-region) with a separate amount for the *Standby*, *Deployment*, *Overtime 1* and *Overtime 2* bands. Premiums **stack and never multiply**; they are assigned per person on the roster or in the wizard.

### Rate entries

One entry per thing you charge for:

| Entry type | Matched by | Typical bands |
|---|---|---|
| **Personnel certification** | The person's **certification code** on the roster (FFT1, ENGB, EMT-P, GUARD …). | Hourly standby / deployment / OT1 / OT2 with **From (h)** / **To (h)** thresholds (e.g. deployment 0–8, OT1 8–14, OT2 14+). |
| **Crew** | **Group key** (`type6-crew`) + **crew size** — one entry per size in the family. The unit bills at the crew size **actually filled that day**; a partial crew takes the nearest lower size. **Required certifications** JSON lists code + minimum count the crew must carry. | Daily standby / daily deployment tiers (**Tier min/max (h)**), hourly bands. |
| **Vehicle** | Unit type; pinned to the roster unit. | Daily deployment / standby, **mileage per km** with **free units per day**, fuel. |
| **Equipment** | Inventory item, pinned to the roster row. | Daily rate. |
| **Service** | Free-form line (mobilization fee, admin). | Fixed. |

Every entry has a **billing basis** (*Hourly, Daily, Per person per day, Per kilometre, Fixed*) and a list of **bands**: band type, rate, thresholds or tier bounds, free units, **Air** (applies only when the deployment travels by air), **meal code** and label. **Multiplier prefill** drafts the hourly bands from a base rate plus standby and overtime multipliers — the stored values are still plain dollars you can edit.

### Export, import, clone

**Export JSON** downloads the schedule without ids; **Import JSON** on the list page creates a new schedule from a file or pasted JSON — the way to share a schedule between departments or keep it under version control. **Clone** copies every entry, band and premium into a new schedule.

## Setup examples

| Organization | Schedule |
|---|---|
| **Wildland contractor (BC / western US)** | *Season 2026*: personnel entries FFT2, FFT1, CRWB, ENGB with deployment 0–8 h, OT1 8–14 h (rate + adder), OT2 14 h+; crew family `type2-crew` sizes 4/6/8 with daily tiers; engine (Vehicle) daily + mileage after 250 free km; night and hazard premiums; policy 30-min rounding, 4-h cancellation, unsafe 8 h, no-clear-8 on, portal-to-portal off. |
| **Fire protection company (municipal contract)** | *Standing contract 2026*: engine + 3-person crew as a crew family with daily deployment tiers; personnel entries by FF1/FO1; policy daily guarantee 12 h, portal-to-portal on. |
| **Security company** | *Client rates*: personnel entries GUARD (hourly, OT1 after 8 h), SUPERVISOR; vehicle patrol (Vehicle, hourly); premiums *Night* and *Holiday*; 15-min rounding, 4-h minimum call-out. |
| **Private ambulance (event standby)** | *Events*: crew family `als-unit` size 2 hourly; personnel EMT / Paramedic hourly; service line *Set-up fee*. |
| **Industrial standby (fire watch / confined space)** | *Plant rates*: personnel FIRE-WATCH hourly with OT after 10 h; equipment entries for gas monitors and rescue tripods per day. |

## Technical reference

| Item | Value |
|---|---|
| Routes | `/User/RateSchedules/{Index?all=true,New,Edit}`; POST `Save`, `Delete`, `Clone`, `SaveEntry`, `DeleteEntry`, `SavePremium`, `DeletePremium`, `Export`, `Import` |
| Model | `RateSchedule` (+ `PolicyJson` = `RateSchedulePolicy`), `RateScheduleEntry` (type, basis, group key, crew size, certification code, unit type, inventory item, `RequiredCertificationsJson`, `BandsJson`), `RateScheduleEntryBand`, `RatePremium` |
| Enums | `RateEntryTypes`, `BillingBases`, `RateBandTypes` (Standby, Deployment, Overtime1, Overtime2, DailyStandby, DailyDeployment, OutOfProvincePerPersonDaily, MileagePerKm, PerDiemMeal, PrivateAccommodationDaily, Custom), `OvertimeBases` |
| Service | `IRateScheduleService` (`ResolveForContactAsync` cascade, `Clone`, `Export/Import`, `PrefillHourlyBands`) |
| Permission | *Manage contracts* (117) or department administrator |
| API | `api/v4/RateSchedules/*` |
