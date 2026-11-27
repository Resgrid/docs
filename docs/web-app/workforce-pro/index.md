---
sidebar_position: 1
title: Workforce Pro add-on
slug: /web-app/workforce-pro/
---

# Workforce Pro add-on

**Workforce Pro** is a paid add-on for the people side of your organization. Today it holds **member wellness and workplace exposure**: the exposure log, exposure cases, injuries with duty status and return to duty, medical clearance and the OSHA log. See [Wellness & Exposures](./wellness.md) for how each part works.

You pay per **pack of 25 members** and choose which members it covers, by switching Workforce Pro on for them ([Workforce Pro seats](./seats.md)). A combination department that keeps health records for its 30 career staff but not its 60 volunteers pays for two packs, not four.

Wellness and exposure tracking is not free, and it is not part of Training or the [LMS add-on](/web-app/trainings/lms/).

**Where to find it:**

- **Subscription and Billing → Workforce Pro** (*Member wellness and workplace exposure records, for the members you choose*) opens the add-on's billing page. Only the department's **managing member** can buy, change packs or cancel. Members who can manage the subscription see the prices and quantities.
- **Workforce Pro seats** (the **Manage Workforce Pro seats** link on the billing page): department admins switch Workforce Pro on per member.
- The wellness pages themselves: **Personnel → My exposures**, **Wellness follow-up** on a call, and the **Duty status board** on the Personnel page.

![Workforce Pro billing page showing the add-on active with 2 packs, 50 seats and 6 in use](/img/web-app/workforce-pro/billing.png)

## What it includes

- An exposure log for carcinogens, bloodborne pathogens, hazardous substances and critical incidents, with entries suggested after a flagged call.
- Exposure cases with a designated officer workflow and post-exposure follow-up.
- Injuries with duty status, return to duty and the OSHA injury log exports.
- Medical clearances with restriction status, and wellness roles your organization names.
- Seats only for the members you switch on. Records stay readable if you stop.

Scheduling, time and pay features for Workforce Pro are planned. They are not built yet.

## Prices

Workforce Pro is billed **monthly** per department, with no setup fee and no annual term. It is sold only with a **paid Resgrid plan**; on a free plan the page says *Workforce Pro is sold with a paid Resgrid plan. Choose a plan on the subscription page first.*

Packs are priced in tiers. Each pack is billed at the price of its own tier, so adding packs never makes earlier packs cheaper or dearer.

| Packs | Per pack per month (Stripe, USD) | Per pack per month (Paddle, EUR) |
|---|---|---|
| 1–4 | $119 | €139 |
| 5–20 | $79 | €95 |
| 21 and up | $49 | €59 |

For example, 6 packs (150 members) cost 4 × $119 + 2 × $79 = **$634** a month. The billing page sells up to 400 packs (10,000 members) online; a larger organization is quoted by hand.

## Buy Workforce Pro

1. Open **Subscription and Billing** and select the **Workforce Pro** card.
2. As the managing member, choose the number of packs and select **Buy**. Checkout runs on Stripe Checkout or Paddle, never on this page.
3. Back in Resgrid, select **Manage Workforce Pro seats** and switch Workforce Pro on for the members whose records you keep. See [Workforce Pro seats](./seats.md).

## Change packs or cancel

- **Preview first.** The billing page shows the price of a new pack count against the packs you have before anything changes.
- **Adding packs** is charged at once, prorated to your billing date.
- **Removing packs** takes effect at the next billing date, and only down to the packs that seat the members who have Workforce Pro switched on. Switch members off first if you want fewer packs.
- **Cancel renewal** stops the add-on at the end of the paid month.

Every pack change is in the [audit log](../security-permissions.md#audit-logs) (*Workforce Pro Packs Changed*).

## What works when

| State | What members and officers can do |
|---|---|
| **Not available** (the `Workforce.Pro` flag is off for your department) | Wellness is hidden. There is no **My exposures** button, no **Wellness follow-up** on calls and no duty status board, and the wellness pages and API answer *not found*. Nothing is deleted. |
| **Not licensed** (never bought, cancelled, or lapsed) | **Read-only.** Every member can still see and export their own records, and officers can still see and export what their wellness role opens. Nothing new can be recorded and nothing can be changed, including **Wellness settings** and call flags. No suggestions, reminders, due notices or alerts are sent. The pages show *Workforce Pro required.* |
| **Payment failed** (a renewal payment failed and is being retried) | **Full, for 7 days** after the end of the paid month, with the packs last paid for. Department admins see *A Workforce Pro payment failed. Everything keeps working until* the date the grace ends, on the wellness pages and the seats page. After the 7 days, wellness is **Not licensed** (read-only). |
| **Licensed** | **Full.** A record about a member can be created or changed only while that member holds a Workforce Pro seat. Officers acting on a seated member need their wellness role, not a seat of their own. Records of a member without a seat stay read-only, and the page says *Workforce Pro is not switched on for* that member. Suggestions after flagged calls and anniversary reminders go to seat holders only. |

Two things are never blocked, whatever the state: a member's own **data download** (the GDPR archive includes their exposure and health records), and **retention**, which still erases records when their retention period ends.

**When the add-on ends:** a renewal you cancelled ends at the end of the paid month, and wellness becomes read-only then. A refunded or charged-back month ends at once. A renewal **payment that fails** keeps Workforce Pro working for a **7-day grace period** while the payment is retried, as for the LMS; if it is still unpaid after that, wellness becomes read-only. Nothing is deleted. Buying Workforce Pro again (or the retried payment going through) makes the records editable again for the members who hold a seat.

**More members switched on than seats:** if you buy fewer packs than the members still switched on from before (for example after a lapse), members are licensed in the order they were switched on. The rest show **On, not licensed** on the seats page and their records stay read-only until you add a pack.

**Self-hosted:** Workforce Pro cannot be bought on a self-hosted server. Like Resgrid's other paid add-ons, it depends on Resgrid's hosted billing service.

## Technical reference

| Item | Value |
|---|---|
| Add-on | `PlanAddonTypes.WorkforcePro = 8`, PlanAddons row `65516545-bf65-47ce-9e3a-abaf18409d88`, migrations M0422 (add-on, flag, seats) and M0423 (`WorkforceProAddonStates`, for the grace period) |
| Feature flag | `Workforce.Pro` (operator rollout and kill switch, seeded off). Off: wellness pages, the v4 wellness and health endpoints, the call's **Wellness follow-up** and the duty status board answer 404 or are hidden; data kept. See [Feature flags](../../reference/feature-flags.md). |
| Billing page | `WorkforceProBillingController`: `/User/WorkforceProBilling/{Index,Checkout,PreviewPacks,ChangePacks,CancelRenewal}`. Checkout and the pack quantity live in the Billing API (`WorkforceProBilling`); Core relays. |
| Seats page | `WorkforceProSeatsController`: `/User/WorkforceProSeats/{Index,SetSeat}` (department admins) |
| Prices | `WorkforceProAddonConfig` (pack size 25, minimum 1, maximum 400; tiers at packs 5 and 21) |
| Entitlement | `WorkforceProAccessService`: the flag (fresh), then a live add-on payment window with its pack quantity, no entitlement cache; fails closed to read-only. A failed renewal stays licensed for `WorkforceProAddonConfig.DunningGraceDays` (7) after its paid-through date, judged from the last interval seen (`WorkforceProAddonStates`); a cancelled renewal ends at its paid-through date and a revoked one at once |
| Refusal codes | `workforce_pro_required` (not licensed), `workforce_pro_seat_required` (the member holds no seat); the v4 API answers 400 with the code |
| Audit | `WorkforceProPacksChanged` (*Workforce Pro Packs Changed*), `WorkforceProSeatsChanged` (*Workforce Pro Seats Changed*) |
