---
sidebar_position: 3
title: LMS packs and pricing
slug: /web-app/trainings/lms/packs/
---

# LMS packs and pricing

The [LMS add-on](/web-app/trainings/lms/) is sold in **packs of 25 seats**, per department, billed **monthly**. You buy the number of packs you need, give the seats to the members you train ([LMS seats](/web-app/trainings/lms/seats/)), and change the number of packs when your roster changes. The invoice only changes when the managing member changes the number of packs, and the new price is shown before anything is charged.

**Where to find it:** **Subscription and Billing → LMS** (the **LMS** card, *Courses, formal training reports and verifiable certificates*), or **Manage packs** from the LMS seats panels and **Trainings → Records → Settings**. The card appears while the `Training.Lms` rollout flag is on for your department. Only the department's **managing member** can buy, change packs or cancel; members who can manage the subscription can see the billing figures.

![The LMS card on the Subscription and Billing page](/img/web-app/lms/lms-addon-card.png)

## Prices

Packs are priced in tiers. **Each pack is billed at the price of its own tier**, so adding packs never makes the earlier packs cheaper or dearer.

| Packs | Members | US (Stripe), per pack per month | EU (Paddle), per pack per month |
|---|---|---|---|
| 1–4 | 1–100 | **$79** | **€99** |
| 5–20 | 101–500 | **$49** | **€59** |
| 21 and up | 501 and up | **$29** | **€35** |

The currency follows the payment provider of the Resgrid data center your department is on: USD through Stripe, EUR through Paddle.

| Department | Packs | US per month | EU per month |
|---|---|---|---|
| 20 trained members | 1 | $79 | €99 |
| 48 trained members (Cedar Valley) | 2 | $158 | €198 |
| 100 | 4 | $316 | €396 |
| 150 | 6 | $414 | €514 |
| 500 | 20 | $1,100 | €1,340 |
| 1,000 | 40 | $1,680 | €2,040 |

The page sells between **1 and 400 packs** (10,000 seats). A larger department is quoted by hand: contact Resgrid.

### What is included

- 25 seats per pack. Members who are not LMS-enabled keep the free Training module, their transcript and the Academy. Instructors, evaluators and officers need no seat.
- 100 GB of hosted course video per department. Storage use is shown on the course library's storage page; there is no overage charge.
- [External learners](/web-app/trainings/external-learners) free up to 25% of your purchased seats (at least 25). Beyond that each one uses a seat.
- Every LMS feature: courses, question banks, requirements, programs, classes, skills, external learners, standards and the formal reports.

### Rules

- **Monthly only.** There is no annual term and no pay-by-invoice option. If you need a yearly figure, it is 12 months of the monthly price.
- **No trial.** Try the free Training module and the [Resgrid Academy](/web-app/trainings/academy/) first; both run on the same course player.
- **A paid Resgrid plan is required to buy the LMS.** Without one the page says *The LMS is sold with a paid Resgrid plan. Choose a plan on the subscription page first.* Cancelling the plan also ends paid add-ons.
- **Billed separately** from your Resgrid plan.
- AI course drafting and flashcards also need the separate Enhanced AI add-on. See [Drafting aids](/web-app/trainings/drafting-aids/).

## Buy the LMS

1. Sign in as the managing member and open **Subscription and Billing → LMS**.
2. Read **What's included** and the notes under it.
3. In the status box on the right, enter the number of **Packs**. The page proposes enough packs for the members who are already LMS-enabled. The preview updates as you type: *2 packs (50 seats): $158 a month.*
4. Select **Buy LMS**. Checkout runs on Stripe or Paddle, never on this page.
5. Back on the page you see *Payment received. Your add-on is being activated and this page will refresh automatically.* Then the status reads **Active for your department** with **Paid through** and the date.
6. Give seats to your members on the **Personnel** page. See [LMS seats](/web-app/trainings/lms/seats/).

![Buying the LMS add-on](/img/web-app/lms/lms-billing-buy.png)

If checkout is cancelled you see *Checkout was cancelled. You have not been charged.*

## Add or remove packs

Once the add-on is active, the **Packs and seats** box shows the packs in force (*2 packs: 50 seats, 48 in use*), next month's price and the tier lines.

1. Enter the new number in **Packs**.
2. Read the preview before you change anything:
   - **More packs:** *3 packs (75 seats): $237 a month from now on. About $39.50 is charged now for the rest of this billing period.* The added packs are charged at once, prorated to your billing date, and the seats are available straight away.
   - **Fewer packs:** *2 packs (50 seats): $158 a month from 1 March 2027. Nothing is refunded and your seats stay until then.* The decrease takes effect at the next billing date.
3. Select **Update packs**.
4. The page confirms *Packs added. The prorated charge for the rest of this billing period has been invoiced.* or *The pack decrease is scheduled for your next billing date. Your seats stay until then.* A scheduled decrease shows as *From 1 March 2027: 2 packs.*

![Changing the number of packs](/img/web-app/lms/lms-billing-packs.png)

You cannot go below the packs your LMS-enabled members (and any external learners beyond the free allowance) need: *At least 2 packs are needed for the members who are LMS-enabled. Switch some off on the personnel page first.* Switch members off on the [Personnel page](/web-app/trainings/lms/seats/) first, then lower the packs.

If someone else changed the packs while you had the page open, nothing is charged: *The pack quantity could not be changed and nothing was charged. Please try again, or contact us.* Reload the page and try again.

## Cancel the renewal

1. Open **Subscription and Billing → LMS** as the managing member.
2. Select **Cancel renewal** and confirm *Cancel renewal? The add-on stays active until the end of the period you have already paid for.*
3. The status shows *Renewal cancelled. The add-on stays active until …*. After that date the [lapse rules](/web-app/trainings/lms/#when-the-add-on-ends) apply. Nothing is deleted.

To come back later, buy the add-on again. Paused requirements are re-based so members are not suddenly overdue. See [Coming back](/web-app/trainings/lms/#coming-back).

## When a payment fails

A renewal that fails keeps the LMS working for **7 days** past the paid-through date while the payment provider retries the card. **Trainings → Records → Settings** shows *A payment failed. The LMS keeps working until …*. If the payment still fails, the add-on lapses at the end of those 7 days. A refunded or charged-back period ends at once.

## Setup examples

| Organization | Typical purchase |
|---|---|
| **Volunteer fire company** (22 members) | 1 pack, $79 / €99 a month. |
| **Combination department** (62 members, 48 trained) | 2 packs; dispatch and auxiliary stay on free Training. |
| **County EMS** (180 clinicians) | 8 packs: 4 × $79 + 4 × $49 = $512 a month. External learners from partner agencies are free up to 50. |
| **Regional fire training center** (600 members across contracts) | 24 packs: $1,100 + 4 × $29 = $1,216 a month; external learners from partner departments free up to 150. |
| **Industrial site** (35-person ERT) | 2 packs; plant-wide awareness training stays on free Training. |
| **EU department** (90 members) | 4 packs at €99 = €396 a month through Paddle. |

## Technical reference

| Item | Value |
|---|---|
| Controller | `LmsBillingController` (shared `AddonBillingControllerBase` page): `GET /User/LmsBilling/Index`, `POST /User/LmsBilling/Checkout` (`packs`), `GET /User/LmsBilling/PreviewPacks?packs=N` (JSON price preview), `POST /User/LmsBilling/ChangePacks` (`packs`, `expectedPacks`), `POST /User/LmsBilling/CancelRenewal` |
| View | `Views/LmsBilling/Index.cshtml` → `Shared/_AddonBilling.cshtml`, `_AddonBillingScripts.cshtml` |
| Who | Buy, change packs, cancel: managing member only. Billing figures: `CanUserManageSubscription`. |
| Add-on | `PlanAddonTypes.Lms = 9`, `AddonCatalog` key `Lms`, flag `Training.Lms` |
| Pricing | `LmsAddonConfig`: `PackSize` 25, `MinimumPacks` 1, `MaximumPacks` 400, `SecondTierFirstPack` 5, `ThirdTierFirstPack` 21, Stripe 79 / 49 / 29 USD, Paddle 99 / 59 / 35 EUR; `LmsPackPricing`, `PackQuotes` (graduated total, prorated increase, refusal below enabled seats) |
| Grace | `LmsAddonConfig.DunningGraceDays` = 7; `ReactivationGraceDays` = 14 |
| Service | `LmsBillingService` (relays checkout, status, pack changes and cancellation to the Billing API) |
| Audit log | `LmsPacksChanged` (packs and monthly price before and after, scheduled date, amount charged now) |
| Workflow trigger | 274 `LmsSeatsChanged` (also raised when a renewal changes the packs), 267 `LmsAddonLapsed`, 268 `LmsAddonReactivated` |
| Admin Assist | feature `lms-packs` (`Catalog/training.yaml`) |
