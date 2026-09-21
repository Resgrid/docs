---
sidebar_position: 3
title: Online Payments
---

# Online Payments

**Online payments** let a customer pay an [invoice](invoicing) with a card, wallet or US bank debit from a link on the invoice — without you handling card numbers. The money goes to **your department's own Stripe account**: Resgrid never holds the funds, takes no fee and cannot issue refunds. You connect the account once, and every invoice can then carry a **Pay online** link.

Needs the Business Ops add-on, the `Invoicing.OnlinePayments` flag and the operator's regional switch (`Payments.StripeConnect`). Stripe is the only provider in this release.

## Connecting your Stripe account

**Invoicing → Billing settings → Online payments** (department administrators only).

1. **Connect with Stripe** — you are sent to Stripe, sign in to (or create) your Stripe account and allow Resgrid to create payment pages on it. Resgrid stores your Stripe **account id** only, never your Stripe credentials or keys.
2. Back in Resgrid the panel shows the **connected account** (business name, live or sandbox mode, connected on, last verified, capabilities such as *card* and *us_bank_account*, last error if Stripe reported one).
3. **Collection settings**: tick **Offer online payment on invoices** and choose the **accepted payment methods** — *Cards and wallets* and/or *Bank debit (ACH, US accounts)*. A method your Stripe account cannot accept is not offered even if ticked.
4. Under **Billing identity** set the **pay link expiry (days)** and whether to **show a "Pay online" link on invoices** (printed on the PDF and included in the e-mail).

**Disconnect** stops new pay links immediately; open links stop working. **Reconnect with Stripe** repeats the authorization (for example after changing Stripe accounts).

If the panel says *Online payments are not yet enabled for your department*, ask Resgrid support to turn the flag on; *Online payment collection is suspended by the operator in this region* means the regional switch is off — your connection is kept and links resume when it is re-enabled.

## What the customer sees

The invoice e-mail and PDF carry the pay link (`/pay/<token>`). The page shows the department name, invoice number, **amount due** and due date, and a **Pay** button that opens Stripe's hosted checkout. Card or bank details are entered on Stripe's page only. Afterwards the customer sees *Thanks — your payment is being confirmed* (or *Payment cancelled — nothing was charged* if they backed out); Stripe e-mails its own receipt.

A link is valid for the expiry you set; **Refresh payment page** on the invoice issues a fresh one. Paying twice is not possible — a second click on the link resumes the open payment page.

## What you see

On the invoice page the **Pay online** panel shows the link (**Copy link**), the current **payment request** with its status and expiry, and buttons to **Open payment page now** or **Refresh payment page**. Online payments appear under **Payments** with method *Online*, the Stripe **fee**, a **receipt** link and a **payment status**.

| Request status | Meaning |
|---|---|
| Created / Opened | Link issued / customer opened the page. |
| Processing | Bank debit initiated; funds not yet confirmed (can take a few business days). |
| Completed | Paid — the payment is recorded and the invoice status updates. |
| Expired / Cancelled / Failed | Nothing charged; refresh the payment page to try again. |

| Payment status | Effect on the invoice |
|---|---|
| Succeeded | Counts toward the balance. |
| Refunded / Partially refunded | Reduces the amount paid; the balance reopens (refunds are issued in your Stripe dashboard, never from Resgrid). |
| Disputed / Dispute lost | The amount is held back from the balance while the dispute is open and removed if it is lost. |

Invoice status changes come only from Stripe's confirmation (webhook or the 15-minute reconciliation), never from the customer returning to the page.

## Setup examples

| Organization | Recommendation |
|---|---|
| **Private ambulance / fire protection company** | Connect the company Stripe account; cards + ACH; 30-day link expiry; *Show "Pay online"* on. |
| **Municipal fire** | Usually off — municipalities collect through the treasury; if on, connect the city's Stripe account and restrict to cards. |
| **Security / facilities company** | On, cards + ACH; net-30 profiles; workflow *Invoice Paid* → notify the account manager. |
| **EU departments** | Online collection is switched off at the operator level in the EU region in this release; invoicing itself works. |

## Technical reference

| Item | Value |
|---|---|
| Flags | `Payments.StripeConnect` (operator-only, per cluster, prerequisite) and `Invoicing.OnlinePayments` (child of `Invoicing.CustomerInvoicing`) |
| Config | `PaymentConnectConfig` (Connect client id/secret, `PublicBaseUrl`, `WebhookPath`, `RequestReconcileAfterMinutes`, `EventRetentionDays`, `WebhookStaleAfterHours`) — separate from the SaaS-billing `PaymentProviderConfig` |
| Provider | `Providers/Resgrid.Providers.Payments` — Stripe Connect **OAuth** (Standard accounts), direct charges with the `Stripe-Account` header, one Checkout Session per attempt |
| Tables | `DepartmentPaymentConnections`, `InvoicePaymentRequests`, `PaymentConnectEvents` (webhook idempotency; payer PII minimized) |
| Endpoints | `/pay/{token}` (`PayController`, anonymous, `_RecoveryLayout`), `api/PaymentWebhooks/stripe` on the API host, v4 `Invoices/GetOnlinePaymentsStatus`, `GetPaymentConnections`, `CreatePaymentLink` |
| Health | `api/v4/Health/GetCurrent` → `Payments*` block and `PaymentsWebhookHealthy` (value-free) |
| Worker | 29 passes 2–4: reconcile open requests, close expired ones, re-verify connections weekly, purge old webhook bodies |
| Non-goals in this release | Platform fees, surcharges, partial online payments, refunds from Resgrid, saved payment methods, Square / PayPal / Authorize.net (reserved) |
