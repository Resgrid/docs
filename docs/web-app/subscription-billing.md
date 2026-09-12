---
sidebar_position: 51
title: Subscription & Billing
---

# Subscription & Billing

**Subscription & Billing** shows the department's plan (Free, Standard, Premium, Ultimate, Enterprise), what it includes and its limits (personnel, units, features), lets the **managing user** upgrade, change billing details, buy **add-ons** (Push-to-Talk, Advanced Data Protection, Readiness Pro) and download invoices. Self-hosted installations show the plan they are licensed for.

**Department menu → Subscription and Billing.** Only the managing user can purchase or cancel.

![Subscription](/img/web-app/subscription/index.png)

## Subscription Dashboard

**Authorization:** `Department_Update` + `CanUserManageSubscription` runtime check

The dashboard displays:
- Current plan name and details
- Personnel count vs. plan limit
- Unit count vs. plan limit
- Progress bars (info < 75%, warning 75-99%, danger ≥ 100%)
- PTT (Push-to-Talk) addon status
- Stripe customer portal link

### Plan Types

Plans are divided into two categories:

| Plan Range | Limit Calculation |
|------------|-------------------|
| Plans < 36 | Personnel-based limits |
| Plans ≥ 36 | Entity-based limits (personnel + units combined) |

## Billing Information

### Viewing
Displays current Stripe card information and provides the Stripe client key for card updates.

### Updating
Process:
1. Client-side collects card via Stripe.js
2. Token submitted to server
3. Creates new card on Stripe customer
4. Sets as default source
5. Audit event logged

### Stripe Response Logging
The `LogStripeResponse` endpoint records Stripe card token responses as `PaymentProviderEvent` entries.

## Plan Purchase

### Stripe Checkout
The `GetStripeSession` endpoint creates a Stripe checkout session:
- Returns `SessionId` and `HasActiveSub` flag
- Redirects to Stripe-hosted checkout page
- Completion redirects to processing page

### Processing
After purchase:
- `Processing` page shown while payment is confirmed
- `CheckProcessingStatus` polls until payment matches the plan
- Redirects to completion or failure pages

## Subscription Update

### Stripe Update Session
The `GetStripeUpdate` endpoint creates a Stripe session for modifying an existing subscription.

## Subscription Cancellation

**Authorization:** `Department_Update` + `CanUserManageSubscription`

### Cancellation Process
1. View cancellation confirmation page
2. Must check the confirmation checkbox
3. Cancels via Stripe API
4. Audit event logged
5. Redirects to success or failure page

## Coupon Validation

The `ValidateCoupon` endpoint checks a Stripe coupon code and returns "Valid" or "Invalid."

## Plan Addons

### PTT (Push-to-Talk) Addon

![ADP add-on](/img/web-app/subscription/buy-adp-addon.png)

Manage the PTT addon subscription:
- View current PTT quantity from active Stripe subscription
- Add PTT addon (modifies subscription quantity)
- Cancel PTT addon by type

### Other Addons
The `BuyAddon` action supports purchasing plan addons:
- View addon plan details
- Current addon payment info
- Frequency information

## Payment History

View all historical payments for the department.

![Payment history](/img/web-app/subscription/payment-history.png)

## Invoice Viewing

**Authorization:** `CanUserViewPayment` runtime check

Displays invoice details with deserialized Stripe `Charge` data.

## Setup examples

| Department type | How to set it up |
|---|---|
| **Small volunteer department** | Free or Standard covers dispatch, personnel and units; add PTT if you use the apps as radios. |
| **Career fire / EMS** | Premium/Ultimate for voice alerting, shifts and records; Readiness Pro for work orders; ADP if patient data is stored. |
| **Multi-agency / government** | Enterprise for SSO/SCIM and security policy; department links for shared dispatch. |
| **Business / industrial** | Standard plus Readiness Pro (maintenance) and PTT. |

## Technical reference

`SubscriptionController`, `ReadinessProBillingController`; routes `/User/Subscription/{Index,UpdateBillingInfo,Cancel,BuyAddon,ManagePTTAddon,BuyAdpAddon,ManageAdpAddon,PaymentHistory,ViewInvoice,SelectRegistrationPlan}`; payments through Stripe or Paddle; plan limits cached 14 days (`SubscriptionsService`, `LimitsService`); addon entitlements checked live (`ReadinessAccessService`).

### Interactions with Other Modules
| Module | Interaction |
|--------|-------------|
| **Dashboard** | Plan limit warnings displayed |
| **Department** | Personnel/unit counts checked against limits |
| **Personnel** | Personnel count affects plan usage |
| **Units** | Unit count affects plan usage |
| **Voice** | PTT addon enables voice features |
| **Department Links** | Plan determines link availability |
