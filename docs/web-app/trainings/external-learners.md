---
sidebar_position: 11
title: External learners
---

# External learners and the learner portal

**External learners** are people outside your department who take your courses and public classes without becoming members: mutual-aid partners, contractors, volunteers, CERT members and the public at a CPR or first-aid class. They sign in on your department's own **learner portal**, a separate website with your logo and colour, and see only their own catalog, courses, classes, transcript and certificates. They never get a Resgrid account and never see anything else in your department.

External learners are part of the [LMS add-on](/web-app/trainings/lms/). They are included free up to **25% of your purchased seats (at least 25)**; beyond that each one uses a seat, like a member.

**Where to find it:** **Trainings → External learners** (the **External learners** section). It shows for those who manage training: department admins and members with **Manage Courses** (132) or **Who can Assign Trainings and see Reports** (126). The page is hidden while the `Training.Lms` rollout flag is off. Raising invoices for class fees also needs the Business Ops **Invoicing** create right. The portal itself is at `https://<your Resgrid address>/Learn/<portal key>`, shown on the page as **Portal address**.

## The external learners page

The page opens with four tiles: **External learners** (invited or active), **Included free**, **Counted in packs** and **Free seats**, and the note *External learners are included up to 25% of your purchased seats (minimum 25). Beyond that each one uses a seat, like a member.* Under them are the **Learner portal** box with the **Portal address**, the list of learners (**Name**, **Organization**, **Status**, **Last sign-in**) and the **Invite an external learner** form. Buttons lead to **Portal settings** and **Courses for external learners**.

![The external learners page with the fair-use tiles](/img/web-app/lms/lms-external-learners.png)

| Status | Meaning |
|---|---|
| **Invited** | The department sent an invitation that is not accepted yet (valid 14 days). |
| **Not verified** | The person registered on the portal but has not confirmed their e-mail address yet (link valid 48 hours). |
| **Active** | Can sign in and take training. |
| **Suspended** | Cannot sign in: *Your access is paused. Please contact the department.* |
| **Removed** | No longer has access. Their records stay. |
| **Erased** | Deleted for data protection (GDPR); no longer listed. |

### Fair use

- Invited and active learners count. The allowance is 25% of your purchased seats, rounded down, and never less than 25: 1–4 packs include 25 learners, 8 packs (200 seats) include 50.
- Beyond the allowance each learner needs a seat that no LMS-enabled member holds. When none is left, inviting is refused: *Beyond the free allowance each external learner uses a seat, and no seat is left. Add 1 pack(s) to invite more.* Self-registration then answers *Registration is not available right now. Please contact the department.*
- Learners beyond the allowance also raise the fewest packs you can drop to on the [billing page](/web-app/trainings/lms/packs/).

## Walkthrough: open a course to a mutual-aid partner and the public

Cedar Valley Fire & Rescue runs a monthly *Hands-only CPR* public class and wants Pine Ridge Fire District's crews to take its *Mutual-aid radio procedures* course.

### 1. Turn the portal on

1. Open **Trainings → External learners → Portal settings**.
2. Tick **Turn the learner portal on**.
3. Tick **Let people create their own learner account (for public classes and catalog courses)** if the public should be able to sign up. Leave it off to admit invited learners only.
4. Tick **Show open public classes and catalog courses to visitors who are not signed in** to let visitors browse before they sign up.
5. Set an **Accent colour** such as `#b03a2e` (leave empty for the Resgrid colour). The logo comes from the department profile; tick **Hide the department logo** to leave it off.
6. Write the **Welcome text**. *Shown at the top of the portal. You can add your privacy contact or a link to your privacy policy here.*
7. Select **Save**. The **Preview** shows the portal's header, and the **Portal address** appears.

![Learner portal settings](/img/web-app/lms/lms-learner-portal-settings.png)

**Change the portal address** issues a new address: old links stop working and signed-in learners are signed out. Use it if the link was shared somewhere it should not be.

### 2. Choose which courses external learners can take

1. Open **Courses for external learners**. Every published department course is listed (Academy lessons are for members only).
2. For each course pick **External learners**:
   - **Members only**: not offered on the portal (the default).
   - **Department enrols learners**: you enrol learners yourself; it is not listed.
   - **Listed on the portal**: anyone signed in on the portal can enrol.
3. Select **Save** on each row you changed.

Set *Mutual-aid radio procedures* to **Department enrols learners**, and *CERT basic first aid* to **Listed on the portal**.

![Courses for external learners](/img/web-app/lms/lms-external-course-access.png)

A course whose protocol lessons cannot be shown outside the department cannot be opened, and the page says why: a protocol with licensed content, a protocol limited to an audience, a document-backed protocol, or a protocol version that is no longer in force. Remove or update that lesson first.

The portal plays reading, video, document, protocol, assessment and course-evaluation lessons. SCORM, cmi5 and LTI lessons have no player on the portal and cannot be completed there, so keep them out of courses you open to external learners.

### 3. Invite the partner's crews

1. On **Trainings → External learners**, fill **Invite an external learner**: **E-mail**, **First name**, **Last name**, **Organization** (*Pine Ridge Fire District*) and, if you use Business Ops, the **Sponsoring organization (Business Operations customer)**.
2. Select the **Courses** (here *Mutual-aid radio procedures*) and any **Classes** to enrol them in. Both lists allow several choices.
3. Select **Send invitation**. The learner gets an e-mail with a link to choose a password; the link is valid 14 days.

On the learner's own page (**Open** in the list) you can edit their details, **Resend invitation**, **Suspend**, **Reactivate** or **Remove** them, **Enrol in a course**, **Register for a class**, see their **Transcript**, **Export data (GDPR)** and **Erase learner**.

### 4. Share the link

Copy the **Portal address** into your newsletter, website or the class flyer. With public listing on, visitors see **Open classes and courses**: **Public classes** with date, place, **Fee** (or **Free**) and seats left, and the catalog **Courses**.

![The learner portal catalog](/img/web-app/lms/lms-portal-catalog.png)

### 5. A learner signs up

Casey Morrow, a CERT volunteer, opens the link:

1. **Create an account**: **First name**, **Last name**, **E-mail**, **Organization (optional)**, **Password** and **Confirm password** (*At least 8 characters with an upper case letter, a lower case letter and a digit.*). The form shows the short privacy notice and a CAPTCHA.
2. The portal says *Check your e-mail: we sent a link to confirm your address.* The link is valid for 48 hours. **Didn't get your e-mail?** sends it again.
3. The link opens **Confirm your e-mail address**. Casey confirms the name and chooses the password again (*Only the password chosen here works: one typed when the account was registered is not kept.*) and selects **Confirm my e-mail address**.
4. *Your e-mail address is confirmed. Sign in to continue.*

![Creating a learner account with the CAPTCHA](/img/web-app/lms/lms-portal-register.png)

Sign-in is limited: five wrong passwords lock the account for 15 minutes (*Too many wrong passwords. Try again in 15 minutes.*), and too many attempts from one network are slowed down (*Too many attempts have come from your network. Please wait a while and try again.*). **Forgot your password?** sends a reset link valid for 2 hours. Registering with an address that already has an account never reveals that: the page answers the same way and the mailbox owner gets an e-mail telling them to sign in.

### 6. The learner takes the course

1. On the catalog Casey selects **Enrol** on *CERT basic first aid*, or **Register** on the CPR class (or **Join the waitlist** when it is full).
2. **My learning** lists **My courses** and **My classes**. **Continue** opens the course player: lessons in order (*Finish the earlier lessons first.*), **Mark complete** on reading and document lessons, **Watch video**, and for a test the attestation *I confirm I am taking this test myself, without help.* before **Start the test** and **Submit answers**.
3. When the course is done: *Course complete. It is on your transcript.* **Transcript and certificates** lists the completion with its hours and a **Certificate** to download.

![My learning on the learner portal](/img/web-app/lms/lms-portal-my-learning.png)

In the department, the learner's progress, attempts and certificates show on their page under **External learners**, and class attendance on the class roster.

## Public classes and fees

A class session can be listed on the portal and carry a fee. Resgrid never takes the payment: you export the roster for your own billing, or raise invoices through [Business Ops invoicing](/web-app/business-ops/invoicing).

1. Open the class session under **Trainings → Classes** and select **Public class and fees**.
2. Tick **List this class on the learner portal**, enter the **Fee per external learner** and **Currency** (leave the fee empty for a free class), and pick the **Business Operations rate item** if you invoice. Select **Save**.
3. **Roster and fees** lists everyone on the roster (**Kind**: member or external learner) with **Attendance**, **Fee** and **Fee status** (**Not due**, **Due**, **Invoiced**, **Waived**). Waive a fee or set a sponsoring organization per learner.
4. Select **Export roster (CSV)** for your own billing (learner, organization, attendance, fee). It works without Business Ops and after a lapse.
5. Or choose **One invoice per learner** or **One invoice per sponsoring organization** and select **Raise invoices**. The result reads *2 draft invoice(s) raised for 6 learner(s). Review and send them in Business Operations.* Learners with no customer are listed under *Not invoiced:*.

![Public class and fees](/img/web-app/lms/lms-public-class-fees.png)

## E-mails learners receive

External learners get e-mail only, in the language they chose under **E-mail preferences** (or the department's language):

| E-mail | When |
|---|---|
| Invitation | The department invited them; choose a password (link valid 14 days). |
| Confirm your address | They registered on the portal (link valid 48 hours). |
| Password reset | They asked for one (link valid 2 hours). |
| Already registered / sign-in reminder | Someone registered with their address, or they asked for the access e-mail again. |
| **Your place is confirmed** | They have a seat in a class. |
| **You are on the waitlist** | The class is full; with their place in the line. |
| **A seat opened for you** | They moved from the waitlist into the class. |
| **Reminder** | Before the class. They can stop these with **Stop class reminder e-mails** (or **Don't send me class reminders** under **E-mail preferences**). |
| **Class changed** / **Class cancelled** | The class moved or was cancelled, with the reason. |
| **Your training record** | Their attendance was recorded; the record and any certificate are under **My learning**. |
| **Course completed** | An instructor recorded that they completed a course. |

E-mails about their own places (confirmed, waitlisted, changed or cancelled) are always sent.

## Privacy and data

Your department is responsible for learners' details. The portal has a **Privacy** page (*How your details are used*) that names your department as responsible, says what is kept (name, e-mail, organization, preferences, registrations, attendance, progress, answers, scores, learning records and certificates) and why, and that some records such as invoices may stay after an account is deleted. The registration form shows a short version.

- Learners can **Download my data** and **Delete my account** (password required) under **My learning → My data**.
- Officers can **Export data (GDPR)** and **Erase learner** from the learner's page. Erasing removes the account, progress, attempts, learning records and certificates and clears the name from class rosters; invoices already raised stay in Business Ops. It cannot be undone.
- The learner portal uses its own sign-in, separate from Resgrid accounts, and puts no personal data in links.

## When the add-on is not active

External learners are suspended while the LMS add-on is not active: every portal page shows *This training portal is not available right now.* and no learner can be invited or registered. Their records stay, and the roster export keeps working. When the add-on is active again the portal reopens. See [When the add-on ends](/web-app/trainings/lms/#when-the-add-on-ends).

On a self-hosted server, registration, the password-reset request and the e-mail resend need reCAPTCHA keys to be configured, as the Resgrid sign-up page does.

## Setup examples

| Organization | How they use external learners |
|---|---|
| **Fire department** | Mutual-aid partners take the joint radio and accountability course before a joint drill; invited with **Department enrols learners**. |
| **EMS agency** | Public CPR and first-aid classes listed on the portal with a fee, invoiced per sponsoring employer through Business Ops. |
| **CERT / emergency management** | Self-registration on, catalog courses for neighborhood volunteers, class reminders by e-mail. |
| **Search and rescue** | Partner teams from neighboring counties take the team's navigation course before a joint exercise. |
| **Industrial / HAZMAT** | Contractors complete the site safety orientation before they are allowed on site; certificates kept on their transcript. |
| **Security / facilities** | Tenant fire wardens take the building evacuation course without becoming members. |
| **EU organizations** | The privacy page and the learner's own export and delete cover the data subject's access and erasure requests. Add your privacy contact to the welcome text. |

## Technical reference

| Item | Value |
|---|---|
| Department side | `LmsExternalLearnersController`: `Index`, `Invite`, `Learner/{id}`, `Update`, `SetStatus`, `Resend`, `EnrollCourse`, `EnrollClass`, `Export/{id}`, `Erase`, `Settings` (GET/POST), `RegenerateKey`, `Courses`, `SetCourseAccess`, `Class/{id}`, `SaveClass`, `SetFee`, `ExportRoster/{id}`, `RaiseInvoices` under `/User/LmsExternalLearners/` |
| Who | Department admins, Manage Courses 132, Assign Training 126; raising invoices also needs the Invoicing create right |
| Learner portal | `LmsLearnController` at `/Learn/{portal}`: `SignIn`, `SignOut`, `Register` (reCAPTCHA, `_Captcha`), `Verify`, `Accept` (invitation), `Forgot`, `Reset`, `Resend`, `Privacy`, `Unsubscribe`, `Preferences`, `My`, `Class/{id}/Register`, `Class/{id}/Withdraw`, `Course/{id}/Enroll`, `Play/{id}`, `Test/{id}`, `Certificate/{id}`, `MyData`, `MyData/Erase`; views in `Views/LmsLearn/` (`_LmsLearnLayout`, `_PrivacyNotice`, `Unavailable` with status 503) |
| Rules | `LmsExternalLearnerRules`: allowance 25% of purchased seats, minimum 25; password 8–128 characters; invitation 14 days, verification 48 hours, reset 2 hours; 5 wrong passwords lock for 15 minutes |
| Services | `LmsExternalLearnerService`, `LmsPublicClassService`, `LmsLearnerAccountMail`, `LmsLearnerClassMailer` |
| Course access | `LmsExternalCourseAccessKinds`: None (Members only), Assigned (Department enrols learners), Catalog (Listed on the portal) |
| Lapse | Lapse rule 7: the portal answers only while it is on, the flag and module are on and the add-on is active |
| Migrations | M0396 (external learners), M0397 (public classes), M0402 (learner notices), M0411, M0412 |
| Admin Assist | features `lms-external-learners`, `lms-learner-portal`, `lms-public-class-fees` |
