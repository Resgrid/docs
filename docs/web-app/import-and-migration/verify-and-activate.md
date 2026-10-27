---
sidebar_position: 8
title: Verify & Activate
---

# Verify and Activate

**Department menu → Import & Migration → (workspace) → Verify & activate**

After an import, Resgrid checks that what was written matches what you approved. **Verify & activate** shows those results and walks you through going live: confirm who becomes an administrator, invite the people you imported — in small batches, never at night — and sign off. Imported people stay **dormant** until you invite them, so nothing reaches them before you are ready.

:::note Preview feature
Import & Migration is a **Preview** feature: it is off by default and Resgrid turns it on per department while it is being rolled out.
:::

<a id="where"></a>
## Where to find it

The **Verify & activate** tab of a workspace, or **Verify** on an imported data set's card and the **Next step** card (*Check the results of the import*, then *Everything is verified: invite your people and go live*).

| Area | Contents |
|---|---|
| **Stat tiles** | **People imported**, **Not invited yet**, **Invited**, **Signed in**, **Checks that differ** (opens History). |
| **Activation checklist** | The steps below with *Done*, *Required* or *Recommended* chips, and **Sign off and go live**. |
| **People who will become administrators** | Shown when your file marked people as administrators. |
| **Invite people** | Who to invite and when. |
| **Invitations** | Every invitation with its status, **Resend** and **Revoke**. |

<a id="enable"></a>
## Turning it on

Part of Import & Migration: the `Onboarding.MigrationWizard` flag on for your department and a department administrator signed in. Signing off needs your second factor. See [Overview → Turning it on](overview#enable).

<a id="verify-results"></a>
## Verify the result

Every import ends with a verification run (*Checking* on the History tab). For each kind of data it compares what the import recorded with what is actually in Resgrid: every row it says it wrote exists in your department, every reference points at a record of your department, and every person it created is still dormant unless you invited them. The History tab shows the outcome next to the run — **N checks matched** or **N checks differ** — and data sets that pass become **Verified**.

Rows the import could not write (`IMP-ROW-WRITE-FAILED`, `IMP-PERSON-ACCOUNT-FAILED`) are not part of that comparison — the import never recorded them as written — so they never show as a difference and they do not stop you signing off. Reconcile the *N added, N updated or linked, N unchanged, N skipped, N failed* counts on the History tab against your source file first, and [ask Resgrid support](getting-help-from-support) about the failed rows: signing off starts the rollback and retention clocks.

A difference (*The check after the import found a difference*) needs explaining before you can sign off. Compare the counts on the History tab with your file; if they don't add up, [ask Resgrid support](getting-help-from-support) from the run. *Some finishing steps didn't complete* means parent groups, a status button's next statuses or some roles may need setting by hand.

Spot-check in Resgrid itself too — [Personnel](../personnel), [Units](../units), [Groups & Stations](../groups-stations), [Types](../types-configuration), [Custom Statuses](../custom-statuses), [Mapping](../mapping) — and look at **Setup Report** in [Help & Setup](../help-setup), which counts an import as complete once it is verified.

<a id="checklist"></a>
## The activation checklist

| Item | Chip | Done when |
|---|---|---|
| **Review the import results** | Required | At least one import has finished and no check differs. |
| **Practice: run a Communication Test** | Recommended | Advisory — the link opens [Communication Tests](../communication-tests) in a new tab so you can test paging with a few people you have already invited. It is never ticked automatically. |
| **Confirm administrators** | Recommended | Everyone your file marked as an administrator has been confirmed (or there was nobody). |
| **Invite your people** | Recommended | Nobody is left to invite. |
| **Sign off** | Required | You selected **Sign off and go live**. |

Activation is a checklist, not a switch: *Each item can be done separately; nothing is switched on all at once.* **Sign off and go live** (with your second factor) is available once at least one import has finished, no check differs and no import or rollback is running. It records your sign-off (*Signed off. Your department is live.*), marks the workspace **Live**, and starts the clock on the [rollback window](rollback-and-retention#rollback-window) and the [retention of checked data](rollback-and-retention#retention-schedule). You can sign off before everyone is invited and keep inviting afterwards.

For a live department (*Add to a live department*, *Update a live department*, *Continue an earlier import*) the same tab is where you invite the people each import created and record that the work is finished.

<a id="administrators"></a>
## Confirm administrators

People whose **Department administrator** column said *yes* are imported as normal members and listed under **People who will become administrators** — *Your file marked these people as administrators. Confirm each one; until then they're normal members.* Tick the people to promote and select **Make administrators**. Nobody becomes an administrator just because a file said so.

<a id="import-dormant-members"></a>
## Dormant members

Every person an import creates starts **dormant**:

- **They cannot sign in.** A sign-in attempt is refused, and so is a password reset, while their only memberships are dormant.
- **They receive nothing.** No dispatches, messages, notifications, certification reminders, calendar or training notices, or digests — they are left out of every notification sweep, exactly like a disabled member.
- **They count as members.** They appear in your department and use a seat on your plan.

| State | Tile | Meaning |
|---|---|---|
| **Dormant** | *Not invited yet* | Imported, not invited. |
| **Invited** | *Invited* | An invitation is scheduled or sent. Still dormant: nothing but the invitation reaches them. |
| **Activated** | *Signed in* | They accepted the invitation and set a password. From now on they are a normal member. |

People your file marked **inactive** are imported disabled and hidden as well as dormant; they are not counted or listed among the people to invite, and inviting skips them. Admin Assist raises a finding when imported people have not been invited for more than two weeks.

<a id="invite-people"></a>
## Invitations

**Invite people** — *Imported people can't sign in or receive anything until you invite them. Invitations are sent in small batches, outside night hours in your department's time zone.*

1. **Invite all N people** is ticked, with everyone not yet invited listed below it. Untick anyone who should not be invited yet — for example a station you are bringing on later. People your file marked inactive are not listed.
2. **Invite N people who already have a Resgrid account to join** is ticked when some of the people in your file already have a Resgrid account in another department (see [below](#existing-accounts)).
3. **Send no earlier than** — a date and time, or leave it empty to send as soon as possible.
4. Select **Schedule invitations**: *N invitations scheduled.*

How they are sent:

- In **batches of about 50 a minute**, by Resgrid's background worker.
- **Never between 21:00 and 07:00** in your department's time zone — an invitation due at night waits until 07:00.
- In the person's **language** when your file set one, otherwise the department's.
- A failed send is retried automatically (up to five attempts), then shown as *Failed*.

The **Invitations** table lists each one with its email, kind (**Account** or **Join with an existing account**) and status: *Scheduled*, *Sent*, *Accepted*, *Failed* or *Revoked*. **Resend** puts an invitation back in the queue for the next batch. **Revoke** cancels it; the person goes back to *Not invited yet* and can be invited again later.

<a id="managed"></a>
## Steps Resgrid staff plan for you

In a [managed migration](getting-help-from-support#managed), Resgrid staff can also send the invitations, confirm administrators and sign off for you, if your grant allows it. These steps never just happen:

- **Two Resgrid staff members** sign every step: one requests it, a different one approves it.
- **Your Verify & activate tab shows each planned step** at the top, labelled *Resgrid staff*: *Resgrid staff planned a step on your department's behalf.*, what it does (for example *Invite 312 people.*), and who requested it.
- **Under a contract authorization, every administrator is told 24 hours ahead.** Each one gets a notice like *Resgrid will invite 312 people from "Spring roster" on 2026-11-02 14:00 UTC*. Nothing happens before that time unless an administrator approves sooner.
- **If you asked to approve every step** when you granted access, a step that two staff members approved waits with *Two Resgrid staff members approved this. It starts when an administrator of your department approves it.* and **Approve and start**.

What you can do with a planned step:

| It shows | You can |
|---|---|
| *It waits for a second Resgrid staff member to approve it.* | **Cancel it**. You can't approve it before the second staff member has. |
| *Two Resgrid staff members approved this. It starts when an administrator of your department approves it.* | **Approve and start** (confirm with your second factor) or **Cancel it** |
| *Two Resgrid staff members approved it. It is scheduled for (date); you can start it now or cancel it.* | **Start now** (confirm with your second factor), which ends the notice period, or **Cancel it** |

**Cancel it** stops the step before anything is sent or changed. Every request, approval and cancellation is on the workspace timeline. A step Resgrid staff carry out follows the same rules as yours: people imported as inactive are never invited, invitations respect night hours, and sign-off needs a clean reconciliation.

<a id="what-people-see"></a>
## What invited people see

**People the import created** get an email with a link. The page says *[Department] has set up a Resgrid account for you. Choose a password to sign in for the first time.*, shows their user name, and asks for a password. **Set password and sign in** activates them, confirms their email and signs them in. From then on they are a normal member and can set up two-factor authentication, the apps and their notification preferences.

<a id="existing-accounts"></a>

**People who already have a Resgrid account** (their email belongs to another department) are never added silently and their profile is never touched. Their invitation says *[Department] has invited you to join with your existing Resgrid account.*; they select **Sign in to accept**, sign in with **that** account, and select **Join [Department]**. Their membership is created only then — and only if your plan still has room. An invitation opened while signed in with a different account shows *This invitation was sent to a different email address. Sign in with the account it was sent to.*

An invitation that was revoked or already used shows *This invitation can no longer be accepted. Please contact the administrator who invited you.*
