---
sidebar_position: 53
title: Help & Setup
---

# Setup Wizard, Setup Report and Admin Assist

**Admin Assist** is where department administrators set Resgrid up and check that the setup is working. It walks you through a nine-step setup journey, shows a report of what is verified, what needs attention and what could not be checked, and explains every module and paid add-on. Nothing on these pages changes your configuration by itself: each change is made on its normal screen, and you come back to Admin Assist to check it.

**Department menu → Admin Assist** (the first item in the menu). Department administrators only, when setup is enabled for your Resgrid installation.

<a id="start-setup"></a>

<AcademyVideo id="01-setup-wizard" />

<AcademyVideo id="14-admin-assist" />

<AcademyVideo id="21-ai" />

## Start or resume setup

Department administrators can open **Admin Assist** from the top of the Department menu when setup is enabled for the deployment. It opens on **Setup Wizard**, with **Setup Report**, **Explore Resgrid & Addons** and **Admin AI** beside it. An unfinished setup also appears on the dashboard. Dismissing that prompt affects only your account; the menu remains available. Setup Wizard, Setup Report and Explore do not require Admin AI or an AI add-on; the Admin AI tab stays disabled until Admin AI is enabled for the department.

| Tab | What it is for |
|---|---|
| **Setup Wizard** | The [nine-step setup journey](#setup-journey). Your choices are saved as you go; pause and come back at any time. |
| **Setup Report** | Verified checks, checks needing attention and checks with unknown evidence for the modules you use, your next setup actions, a setup checklist per module, and the administrative review. See [Configure and verify](#configure-and-verify). |
| **Explore Resgrid & Addons** | Browse every Resgrid module, including ones your plan or menu does not show yet. Each module lists its key features and what to do first. Search, or tick **Show paid add-ons only**. |
| **Admin AI** | Disabled until Admin AI is enabled for the department. It then holds Overview, Health checks, the [Admin worklist](#follow-up), [Settings reference and Change history](#reference-and-history), and, where available for your department, Ask Admin Assist, Plans and Troubleshoot. |

The dashboard prompt reads **Setup Wizard** with **Start or resume setup**, **Setup Report** and **Dismiss for me; setup stays available in the menu**. Besides dismissing it, the prompt goes away once a current administrative review is recorded (it comes back when the chosen review date arrives) or once you have marked every key feature as understood.

The old setup pop-up, which saved the time zone, address, stations, units and call import in one step, has been removed; its old addresses (`/User/Department/SetupWizard`, `/User/Help/SetupReport`) now open Admin Assist. Setup Report also replaces the old numerical setup score.

### Setup mode

Step 1 asks how you are starting. Choose **Fresh setup**, **Review existing setup**, or **Import or migration**. The choice records your intent; it does not import or overwrite data.

| Mode | Use it when |
|---|---|
| **Fresh setup** | The department is new to Resgrid. |
| **Review existing setup** | The department already runs on Resgrid and you want to check or extend its setup. |
| **Import or migration** | You are moving from another system. Import planning does not copy data: use the existing reviewed import tools, then verify the resulting configuration here. |

**Import or migration** offers **Open Import & Migration** — *Bring data from your current systems with Import & Migration. Admin Assist then verifies the result.* — where you bring people, stations, apparatus and settings from spreadsheets or the system you are leaving; nothing is saved until you review and approve it (see [Import & Migration](import-and-migration/overview)). The button appears when Import & Migration is turned on for your department and you are a department administrator.

Import & Migration is also one click away whatever you chose: Admin Assist shows an **Import & Migration** button in its toolbar on every tab, and an **Import & Migration** card (with **Open Import & Migration**) beside the review on **Setup Report** and **Admin AI → Overview**. Both appear only when Import & Migration is turned on for your department and you are a department administrator.

<a id="setup-journey"></a>

## The nine-step journey

The nine-step journey covers goals and applications, the department profile, all-area orientation, people and access, operational essentials, selected workflows, add-ons, verification and practice, and review and handover. Pause and resume without creating sample incidents or overwriting existing configuration. The step list shows each step's status (for example *Not set up yet*, *In progress*, *Needs attention*, *No open items found*), and **Previous step** / **Next step** move through it in order.

| Step | Shown as | What you do |
|---|---|---|
| 1 | **Welcome and goals** | Choose the [setup mode](#setup-mode) and see how Resgrid's modules are grouped into Core modules, Recommended, Optional modules and Paid add-ons. |
| 2 | **Department profile** | Confirm the department address and time zone on [Department Settings](department-settings), then fill in the [department operating profile](#operating-profile) so Resgrid can suggest the modules that fit. |
| 3 | **Choose your modules** | Mark each module **Use now**, **Learn later** or **Not applicable**. See [Choose the modules your department uses](#choose-areas). |
| 4 | **People and access** | Personnel and groups, and department administration and security: add your members, stations, groups and roles, and make sure at least two administrators use two-factor sign-in. Invitations are sent only when you send them. |
| 5 | **Dispatch essentials** | The other core modules (dispatch and calls, units, notifications and messaging, apps and devices): call types, statuses, dispatch settings and call intake, your units, and making sure members can be reached through notifications and the Responder app. |
| 6 | **Your other modules** | The Recommended and Optional modules you marked **Use now**, such as shifts, training, records, checklists or inventory. |
| 7 | **Plan and add-ons** | Your subscription and capacity, and what each paid add-on adds. Nothing here purchases, starts a trial or switches anything on. See [Understand optional add-ons](#understand-addons). |
| 8 | **Verify and practice** | Open the Setup Report, fix what needs attention and look at anything that could not be verified. Run a [communication test](communication-tests) from its own screen when you are ready. |
| 9 | **Review and hand over** | Mark the report reviewed, choose a date to review it again and print a copy for your officers. Other administrators keep their own learning progress. |

In steps 4 to 6, each module you use shows **Before you start** (what to have ready), how many of its key features are set up, each key feature with a link to the screen that configures it, and any of its checks that need attention or could not be verified.

<a id="operating-profile"></a>

## Department operating profile

**Department operating profile** (step 2, or `/User/Department/OperatingProfile`) describes your organization so Admin Assist can suggest modules to review. Department administrators and the managing user can edit it.

| Section | Fields |
|---|---|
| **Operating packs** | Fire; EMS and ambulance; Mental health and mobile crisis; Search and rescue; Emergency management and response; Hazardous materials response; Industrial response; Security and facilities; Multi-agency and mutual aid. Tick every one that applies. |
| **Organization and operations** | **Workforce mix** (career, volunteer, contract, combination), **Approximate member count** (optional), **Dispatch model** (central, self, external, combination), **Operating hours** (24-hour operation, scheduled hours, on call, seasonal), **Participates in mutual aid**, **Expected email polling interval (minutes)** (optional), and the department time zone (shown here; change it on Department Settings). |
| **Seasonal operation** | **Season starts** / **Season ends** (month and day, optional). A season can run across the new year. |
| **Languages and accessibility** | **Working languages** and **Accessibility preferences** (captions, screen reader, large text, plain language). |
| **Sites, policies and systems** | **Sites and service-area groups** (chosen from your department's groups); **Approved staffing policies**, **Approved qualification policies** and **Approved continuity procedures** (chosen from your department's current documents); **Authoritative source systems** (short labels). |

Use the department operating profile to describe your organization and link approved local policies. Fire, EMS, mental health, SAR, emergency response, Hazmat, industrial, security and mutual-aid packs suggest areas to review. They do not establish qualifications or authorize clinical, tactical or hazardous work.

Selected operating packs suggest areas without changing your choices; suggested modules carry a *Suggested by your selected operating packs* label. Site references use existing department group IDs; policy references use existing, unexpired department document IDs. Saving checks those references and rejects concurrent overwrites. A valid reference does not prove that its contents are approved or sufficient. Verification checks whether linked policies or site groups later become unavailable, and flags documents scheduled for removal within 30 days. A reviewed profile without a continuity link receives an administrative review prompt; an external procedure may still exist. The checks do not read or certify policy contents. Choosing a group does not grant group access or change dispatch scope, and source-system labels are declarations: saving does not verify a connection or import.

An optional **Expected email polling interval** compares recorded mailbox polls with your declared maximum interval. Leave it blank when no interval has been established. Missing or future poll timestamps remain unknown, and low call volume alone does not imply failure. SMS, CAD push and API intake require separate telemetry; the expectation does not change polling or send a test.

<a id="choose-areas"></a>

## Choose the modules your department uses

Mark each module **Use now**, **Learn later**, or **Not applicable**. A not-applicable choice requires a reason: outside the mission, managed in another approved system, managed by a responsible partner, or no current need. Baseline security remains in scope: *Department administration and security* is always **Use now**.

| Group | Modules |
|---|---|
| **Core modules** (every department sets these up) | Personnel and groups · Department administration and security · Dispatch and calls · Units and apparatus · Notifications and messaging · Apps and devices · Subscription and capacity |
| **Recommended** (most departments benefit) | Mapping and location · Shifts and scheduling · Training and certifications |
| **Optional modules** (included in your plan) | Contacts, documents and protocols · Records and reporting · Checklists · Inventory · Deployments · Automation and integrations |
| **Paid add-ons** | Maintenance and work orders · Workforce and business operations · Push-to-Talk · Advanced Data Protection · Enhanced AI |

Your choices decide what the wizard walks through and what the Setup Report checks. **Explore this module** on each card, and the **Explore Resgrid & Addons** tab, describe a module in full: each feature explains its purpose, value, example and adoption requirements. Tick **I understand this feature** to record your own learning progress.

Area choices are shared by department administrators. Learning and interest choices are personal. Another administrator's save can require you to reload and review before saving again. Learning a feature does not configure it, purchase an add-on, enable a module or send anything.

<a id="configure-and-verify"></a>

## Configure and verify

Use **Open owning screen** to configure a feature with its existing permissions and validation. Some settings include contextual help and a highlighted field when opened from Admin Assist. Save on that screen, then use **Return to setup and verify**. The return link does not submit the form. Its navigation context lasts 30 minutes and is tied to the current administrator and department, so it can survive the owning screen’s save and redirect. Returning to setup clears it. Choose **Verify again** after saving.

### Setup Report

| Part | What it shows |
|---|---|
| **Summary** | Verified checks in your modules, checks needing attention, checks with unknown evidence, your learning progress, and when the evidence was read (*Evidence as of*). |
| **Next setup actions** | Up to five checks in your selected scope that need attention, most important first, each with a link to the screen that fixes it. |
| **Module readiness** | Each module's state and checks. Modules you deferred or marked not applicable are not counted, except security and critical checks, which always apply. **Change which modules you use** returns to the wizard. |
| **Setup review** | The last administrative review, **Mark this report reviewed**, the optional review date and the printable report. See [Review and hand over](#review-and-handover). |
| **Setup checklist for your modules** | Each key feature in four steps: understand it, confirm access, configure it on its own screen, then verify. Only supported checks can verify a feature; other steps stay *Not verified* until you review them. |
| **All checks in your selected scope** | Every check, grouped by result: needing attention, unknown, suggestions, passed, not applicable. |

The report separates verified checks, failures and unknown evidence. Unpurchased optional add-ons do not reduce core completion. Deferring an area does not hide a verified critical failure or uncertainty in an active critical check. Selected areas with no automated checks are listed explicitly; they are not verified. Missing, restricted or unavailable source data remains unknown; it is never treated as zero. Critical unknowns prevent a fully verified result. Review the evidence time and refresh again if configuration changed during the read.

Setup Report replaces the old numerical setup score. It is administrative configuration guidance, not certification of operational readiness or proof that a page was delivered. Start a Communication Test explicitly through its own screen when communication verification is needed.

<a id="review-and-handover"></a>

### Review and hand over

Record an administrative review (**Mark this report reviewed**) to retain the report version, evidence revision, selected-scope revision, timestamp and unresolved-check counts. A changed configuration, scope or catalog makes that review visibly out of date. Each newly added administrator still has a separate orientation checklist.

An optional revisit date (**Review again on**, within the next year) is stored in the report; it does not schedule a one-off notification. **Download calendar reminder** gives you a calendar file to import into your own calendar if you want one; Resgrid does not send a message. Weekly follow-up is a separate preference.

**Open a fresh printable report** rechecks access and reloads the summary. It includes current findings, selected areas, personal feature interests and public add-on guidance. It omits protected notes, names, source records and credentials. Printing or saving a local copy does not create a managed server export; handle the copy under department policy.

<a id="understand-addons"></a>

## Understand optional add-ons

| Add-on | What it adds | Adoption considerations |
|---|---|---|
| Push-to-Talk | Voice channels in supported Resgrid clients | Review seats, devices and channel membership. Phone voice alerts and radio requirements are separate. |
| Advanced Data Protection | Additional protection and scoped disclosure for supported sensitive content | Purchase and enrollment are separate. Review MFA, recovery, supported fields and effects on search, exports and integrations. |
| Readiness Pro | Maintenance, work orders, preventive and corrective work, approvals and safety holds | Checklists remain available without the add-on. Maintenance also needs its module and permissions. |
| Business Operations | Invoicing, rates, contracts, bids, reimbursement and workforce costing | Certifications and Deployment Finance remain available without the add-on. Pay-data reporting also requires enabled ADP; payment providers need separate setup. |
| Enhanced AI | Planned summaries, drafts, knowledge assistance and optional conversation | Availability depends on release and rollout. Deterministic setup and Admin Assist do not require it. |

Availability can depend on subscription, rollout, module settings, permissions, protection enrollment and source availability. An unknown subscription is not confirmation of a free or paid plan. Only the managing member can perform subscription changes through the [billing screen](subscription-billing). Learning about an add-on does not start a trial or purchase.

Step 7 (**Plan and add-ons**) shows your subscription and capacity and a card for each of the five add-ons. Each card lists the features that use the add-on, shows whether it is part of your current plan, and takes a setup choice like any other module. **I understand this feature**, availability, purchased entitlement, configuration and verified checks are separate states. Buying an add-on does not configure or verify the feature. Feature rows distinguish recorded configuration, supported check results, current entitlement and optional opportunities. Recorded-setup evidence covers a set of key features, such as personnel, groups, units, run cards, check-in timers, weather zones and email intake. Other feature configuration remains unassessed; absence of setup evidence does not prove a feature is unused.

<a id="follow-up"></a>

## Follow up on findings

Admin Assist adds an administrative worklist (**Admin AI → Admin worklist**, once Admin AI is enabled; choose **Verify again** to create or update it). Claim an unresolved finding (**Assign to me**, optionally with a review date), start a review, or record an accepted exception with a reason and expiry (within 90 days). Exceptions do not make the underlying check pass. Fresh verification resolves a finding; a later verified failure reopens it. An evidence outage cannot resolve it. Fix records, qualifications, inventory and other source tasks through their owning screens.

| Status | Meaning |
|---|---|
| **Unassigned** | Nobody has claimed the finding. |
| **Assigned** | An administrator claimed it. |
| **In review** | A review has started. |
| **Accepted exception** | Accepted for a reason until its expiry. The check still shows its actual result. |
| **Resolved by verification** | A fresh passing check resolved it. |

Weekly follow-up is opt-in (**Follow-up preferences** on the worklist: **Send me a generic weekly summary link**, with quiet hours) and only runs when the deployment enables scheduled digests. Quiet hours use the department time zone. The message contains a generic link to Admin Assist; open the authenticated page to see current evidence. A notification handoff is not confirmation of delivery. Turning the preference off suppresses future handoffs.

<a id="reference-and-history"></a>

## Use Settings Reference and Change History

Settings reference, Change history and the change previews are on the **Admin AI** tab (Settings reference and Change history are sub-tabs; the previews are under **Overview → Preview a change before you make it**, and per setting in Settings reference).

Settings Reference searches a release-pinned public documentation catalog. It does not search department records or attachments. If your language has no reference article, the result labels its source language.

Supported scalar settings offer **Preview a proposed value**. A preview compares values in memory, shows related health-check changes and lists its limits. It does not save configuration. Current operational previews cover v4 map-marker selection, the automatic-availability status projection and administrator MFA enrollment. These do not establish every client's behavior, actual physical availability or session/recovery readiness.

**Preview plan capacity** compares proposed total personnel and unit counts with observed base-plan headroom. It does not purchase capacity or add resources; add-on seats, provider quotas and pricing are separate.

**Preview dispatch routing** uses a saved call ID as a route scenario. Choose an explicit UTC roster time within seven days of now and all three proposed shift/crew/group options. It compares direct, group, role and unit crew/group recipients with the broadcaster's resolver, preserving direct duplicates and empty-shift fallback. Current membership and crews are not reconstructed historical assignments. Unit devices, printers, channel eligibility, provider handoff and delivery are outside these personnel counts. The preview sends nothing and rereads inputs to detect changes during evaluation.

**Preview a permission change** compares current members through the supported action or resource visibility gate. It includes roles, department and group administration, target-group ancestors, and ungrouped targets. It counts allowed actor/target pairs separately from members, so a narrowed group scope is visible even when the same members retain some access. Existing sessions, protected fields and other permission gates still require verification.

**Preview a module switch** compares web navigation and bounded primary-table counts. Hiding an entry keeps the underlying data; it does not prove API access is revoked or a worker stops. Mapping, Reports, Logs/Records and Inventory data totals remain unknown where a complete adapter is unavailable. Licensed maintenance, checklists and business switches require separate entitlement-aware previews.

**Preview a text sender scenario** compares a test number against current source patterns and the complete proposed call/command switches. Choose the provider path actually in use. The result returns a masked reference and distinguishes routing branches from actual successful acceptance. SignalWire and Twilio legacy paths share their production routing decisions with the preview, but do not consult the switches uniformly. Chatbot and master-number paths, number ownership, active SMS department, plan access, webhook authentication, verified identity, opt-out exceptions and parser success require separate verification. A missing dispatch-source pattern is not proof that verified members cannot use commands. The preview never receives or sends a text.

**Preview notification volume** compares the current staffing-suppression setting with a proposed toggle for a declared department-wide scenario. Set the future window and assumed events per member across that entire window. The result separates current membership, preference/contact gates, confirmed suppression, unknown profiles/staffing and possible channel-handoff ranges. It uses no historical event sample and does not resolve every notification-rule audience. Address/device validity, provider behavior, chat/voice, SMS segments and delivery remain separate. Changing this preview never saves settings, sends a notification or changes staffing.

**Preview sign-in and session policy** compares department-wide MFA, SSO-only policy, password age/minimum length, idle timeout or concurrent-session limits. Enrollment is distinct from verified factors and recovery. The SSO-only gate keeps its existing safety valve when no provider is enabled; an enabled provider is not a successful login test. Session estimates respect the host policy date and distinguish next-session limits from revocation. Password age uses the owning boundary and preserves its handling of untracked dates. No password, recovery secret, session ticket, IP address or provider credential is read by these projections, and the preview does not change credentials or sessions.

**Preview retention policy** compares a prospective Records default using a bounded sample of metadata. A blank default uses the system class default; zero means permanent. Historical policy and definition overrides remain in force, so older revisions do not simply inherit a shortened default. Known parent/preservation holds and permanent-content obligations are excluded; uncertain historical holds are identified. Remaining candidates need the owning lifecycle checks for children, disclosure copies, attachments, external storage, evidence, submissions, workflows and search erasure. These counts are not permission or proof of eligibility to purge. The preview does not read record bodies, purge content, change protection or cancel an add-on.

Counts and checks are only as current as their source evidence. Unquantified effects still need review on the owning screen. Refresh after a configuration conflict and verify again after an actual save. Reference results can expand the full release-pinned source text and identify its source language.

Change History starts when collection is enabled. Earlier changes are unavailable. History shows safe configuration differences; secrets and sensitive strings use presence/change markers. It does not expose another administrator's personal learning choices.

## Technical reference

| Item | Value |
|---|---|
| Controllers | `AdminAssistController` (one page; each route picks the tab it opens on); `DepartmentController.OperatingProfile`; legacy redirects in `DepartmentController.SetupWizard` and `HelpController.SetupReport` |
| Routes | `/User/AdminAssist` and `/User/AdminAssist/SetupWizard` (Setup Wizard), `/User/AdminAssist/SetupReport`, `/User/AdminAssist/Plans` (when plans are enabled), `/User/AdminAssist/PrintReport`, `/User/AdminAssist/ReviewCalendar` (calendar reminder), `/User/AdminAssist/DismissSetup` (POST, dashboard prompt), `/User/Department/OperatingProfile` |
| Legacy routes | `/User/Department/SetupWizard` → `/User/AdminAssist/SetupWizard`; `/User/Help/SetupReport` → `/User/AdminAssist/SetupReport`. The old setup modal and its `SubmitSetupWizard` writer were removed. |
| Access | Department administrators. Operating profile: department administrators and the managing user (`Department_Update`). |
| Feature flags | `Admin.Setup` — Setup Wizard, Setup Report and Explore. `Admin.Assist` plus `Ai.AdminAssist` — the Admin AI tab. |
| Page data | `api/v4/AdminAssist/` |
