---
sidebar_position: 30
title: Subscription & Billing
---

# Subscription & Billing

The Subscription module manages department plan selection, payment processing, and addon management through Stripe integration. It is managed by the `SubscriptionController`.

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

## Invoice Viewing

**Authorization:** `CanUserViewPayment` runtime check

Displays invoice details with deserialized Stripe `Charge` data.

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Dashboard** | Plan limit warnings displayed |
| **Department** | Personnel/unit counts checked against limits |
| **Personnel** | Personnel count affects plan usage |
| **Units** | Unit count affects plan usage |
| **Voice** | PTT addon enables voice features |
| **Department Links** | Plan determines link availability |
