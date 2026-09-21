---
sidebar_position: 12
title: Contract Services Provider
---

# Setting Up a Contract Services Provider

For companies that send people and equipment out **under contract and get paid for it**: wildland fire contractors (engines, hand crews, water tenders, dozers), private fire-protection and standby companies, private ambulance and event-medical providers, and specialized rescue or safety contractors. The operational side (calls, units, personnel, statuses, checklists, records) follows the [fire](fire-department), [EMS](ems-agency) or [security](security-and-facilities) guide; this guide covers the **business** side that runs on the [Workforce & Business Ops](../web-app/business-ops/overview) modules.

In Resgrid a **customer or agency is a contact with a billing profile**, a **resource order or event is a bid**, the work is a **deployment with a call**, each day is a **daily time report**, and payment is an **invoice with a packet**.

## What you will end up with

| Piece | You will have |
|---|---|
| Certifications | Every crew member's qualifications with expiry, enforced on the roles that seat them. |
| Rate schedules | Your rate tables per season / customer, explicit dollars per band. |
| Contracts | One per agency or client, with document requirements and compliance documents kept current. |
| Bids → deployments | A quote that becomes the call, the deployment and the roster in one step. |
| Time and expenses | Crews file daily time reports and receipts from the apps; an approver signs them off. |
| Invoices | Generated from approved time, sent with the packet, paid by cheque, ACH or online. |
| Costs | What each job cost you and the margin it made. |

## 1 — Department settings and add-on

| Setting | Value |
|---|---|
| Time zone | Your home base; deployments carry their own incident time zone. |
| Modules | Shifts, Checklists, Inventory, Records on; **Business Operations on**. |
| Add-on | **Subscription and Billing → Business Operations → Buy** (managing member). Certifications and Deployment Finance are free; everything else here needs it. |
| Flags | `Operations.Deployments`, `Business.Operations`, `Invoicing.CustomerInvoicing`, `Invoicing.ContractorBilling` (and `Invoicing.OnlinePayments` if you want pay links) — hosted customers ask support; self-hosted operators use `Resgrid.Console --FeatureFlags`. |
| Permissions | *Manage deployments* and *Approve time reports* → operations managers; *Manage bids* / *Manage contracts* / *Manage invoicing* → the office; *View invoicing* → owners. |
| Billing settings | Invoicing → Billing settings: legal name, remit-to address, tax registration(s), SAM UEI / CAGE / workers' comp account, invoice footer. |

## 2 — Certifications

- **Types** from the template gallery: wildland — NWCG FFT2/FFT1/CRWB/ENGB/DIVS, Red Card, RT-130, WCT, First Aid/CPR; private fire — FF1/FF2, DO-Pumper, Hazmat Ops; ambulance — NREMT + state licences, BLS/ACLS; all — CDL where drivers need it, DOT medical, MVR review. Units: DOT inspection, registration, insurance, pump test.
- **Role requirements**: *Crew member* = FFT2 + RT-130 + WCT; *Crew boss* = CRWB; *Engine boss* = ENGB; *Paramedic* = NREMT-P + state licence. **Enforce** with a short grace — an agency will refuse an unqualified seat and the deployment wizard flags it in red.
- Settings: notify holders 60/30/14/7 days and the office with the nightly digest; *Certification Expiring* workflow → training coordinator.

## 3 — Customers, contracts and compliance

- **Contacts**: each agency or client as a *Location or Company* contact with the AP e-mail; **billing profile** with terms (net 30–45), tax treatment (GST + PST components for Canadian agencies), the default rate card for ad-hoc work and the **default rate schedule**.
- **Compliance documents**: COI (annual, 30-day alert), workers' comp clearance, SAM registration and CAGE code, business licence, bonds — the contracts list warns before they lapse.
- **Contracts**: one *Standing arrangement* per agency (VIPR region, BCWS, state forestry, municipality) with the season's rate schedule, terms, **invoice submission e-mail**, max deployment days, response time and point of hire; document requirements: COI + WCB at *Deployment start*, signed DTR at *Daily time report*, packet at *Invoice submission*. Activate it.

## 4 — Rate schedules

One schedule per season or per agency rate agreement (**clone** last season's and change *effective on*):

- **Policy**: 30-minute rounding, overtime basis *consecutive hours*, 4-hour cancellation minimum, unsafe stand-down 8 h, travel cap 12 h/day, no-clear-8 carry-over on, portal-to-portal only where the contract says so, fuel deduction per litre if the agency supplies fuel.
- **Premiums**: *Night*, *Hazard*, *Lead* as flat hourly adders per band.
- **Entries**: personnel per certification code (FFT2, FFT1, CRWB, ENGB, EMT, PARAMEDIC) with deployment 0–8 h, OT1 8–14 h, OT2 14 h+; crew family `type2-crew` sizes 4/6/8 with daily tiers and required certifications; vehicles (engine, tender, dozer, ambulance) daily + mileage with free km; equipment (chainsaw, pump, monitor) daily; service lines (mobilization fee).

## 5 — Bids and deployments

1. **Bid** per resource order or event: customer, contract, lines from the schedule (crew × hours/day × days, engine, mileage), valid until, requested window, delivery location; **Send bid** as PDF.
2. **Mark as accepted** → **Schedule deployment call**: the wizard sets the call, ticks the units, seats the crew (certification colours and overlapping deployments visible), equipment, rates & premiums, and creates the call + deployment + roster + calendar item.
3. Agency-ordered work without a bid: **Deployment Finance → New Deployment** (*Billable*, contact, contract, identifiers) or **Create from external order** when the order came through Records.

## 6 — Time, expenses and approval

- Crews use the **Responder** app (own row) or the **Unit** app (whole crew) to file the **daily time report** each day — deployment / standby / travel entries, breaks, km, no-clear-8 and stand-down flags — and to log **usage** (odometer, engine hours, fuel) and **expenses** with receipts (per diems with meal codes, accommodation, fuel, ferry).
- The crew boss **signs as contractor** and records the **customer signer name** from the paper DTR.
- An operations manager with *Approve time reports* approves each report (or voids it with a reason); *Time Report Submitted* workflow → approver channel.
- Files: signed service requests, agency forms and manifests on the deployment's **Files** tab; **File manifest PDF** at mobilization.

## 7 — Invoicing and collection

- **Billing tab → Charge preview** weekly (or at demobilization): fix anything listed as unpriced, then **Generate invoice**; review the draft, **Send with packet** to the contract's submission e-mail.
- Ad-hoc jobs: **Invoicing → New invoice → Add call** with the rate card.
- **Record payment** for cheques / ACH; connect **Stripe** under Billing settings → Online payments so private clients pay from the link.
- **Aging** weekly; workflow *Invoice Overdue* → owner; the deployment-finance digest lists approved time unbilled for 21 days.

## 8 — Costs and margin

- **Workforce**: employee compensation profiles (hourly base, OT multipliers, per-OT-hour components, employer costs) or a department default for estimates; **resource cost profiles** for every engine and tender (acquisition cost, life, fuel per mile, maintenance from work orders).
- **Cost runs**: *Estimate bid cost* before quoting; *Calculate deployment cost* with revenue source *Customer invoice* before sending the invoice — the **Internal cost** tab on the deployment shows estimate vs. actual.

## First-week checklist

- [ ] Business Ops add-on active; billing settings filled in
- [ ] Certification types added; role requirements enforced; every crew member's cards entered
- [ ] Compliance documents uploaded with alert leads
- [ ] One contract active with its rate schedule; a second schedule cloned for the next season
- [ ] Bid → accept → wizard → deployment tested; crew filed a DTR from the app; report approved
- [ ] Charge preview checked; invoice generated and sent with packet to yourself
- [ ] Stripe connected (if collecting online); a test pay link opened
