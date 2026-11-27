---
sidebar_position: 6
title: Decision Engine on Calls
description: "Triggers that suggest protocols on calls, key questions with weights, case flows that lead to a determinant and priority, the protocol panel on the call forms, what is saved to the call, and step-through checklists."
---

# Decision Engine on Calls

Protocols meet calls in three ways:

- **Triggers** suggest a protocol on the call form when the call's type, priority, area, time, words or source match, and **key questions** with weights decide whether it applies.
- A Dispatch protocol can carry a **case flow**: entry questions, key questions and read-aloud instructions that lead the dispatcher to an **outcome** with a **determinant**, a suggested priority, a response hint and what to tell the caller after dispatch.
- A Procedure (or a Dispatch protocol with steps) can be **stepped through** on the call like a checklist, every step timestamped.

Everything is recorded on the call: which version was used, the answers and score, the path through the case flow, the determinant (and any override with its reason) and each checklist step. Run cards can react to the determinant.

The decision engine is **free**. The **Suggest with AI** button, which reads the call and proposes a protocol with answers, needs the Enhanced AI add-on with AI intake.

**Where to find it:**

- Building: a protocol's **Edit** page, sections **Triggers**, **Questions** and **Case flow (decision graph)** (**Author Protocols**, 128). Only Dispatch and Procedure kinds have triggers; only Dispatch protocols have a case flow.
- Using: the **Protocols** field of **New Call**, **Update Call** and **Add Archived Call** (members who can create calls), and the **Protocols** tab of **View Call** ([Dispatch & Calls](../dispatch-calls.md)).

## Triggers

*Triggers are used to determine when this protocol will be activated, or will ask the questions below, for calls.* A protocol with no triggers is never suggested, but it can be added to a call by hand.

1. Open the protocol and select **Edit**.
2. Under **Triggers**, select **Add Trigger**.
3. Choose the **Type**:
   - **Call Priority**: calls of one of your call priorities;
   - **Call Type**: calls of one call type (or **No type**);
   - **Call Priority & Type**: both;
   - **Any call (conditions only)**: any call, narrowed only by the conditions below (at least one is required).
4. Optionally set **Starts On** and **Ends On** (department time zone) to limit the trigger to a period.
5. Under **Conditions**, set any that must also hold: *every condition you set must also hold*.
   - **Inside the area of**: a station or group with a drawn area (geofence);
   - **Days**, **From (time)** and **Until (time)**: department time;
   - **Words in the nature or notes**: for example `chest pain, not breathing`;
   - **Point of interest type at the location**: for example a school or a care home;
   - **Came in by**: **Dispatcher (call form)**, **E-mail import**, **Audio import**, **Chatbot**, **Intake channel (SMS, e-mail, chat, webhook)**, **Voice intake (AI)**.
6. Add more triggers if needed (any one of them matching is enough) and select **Save Protocol**.

![Triggers section of the CP-10 Chest pain editor with a new Call Type trigger](/img/web-app/protocols/protocol-triggers.png)

Triggers take effect when the protocol is saved; they are not part of the version. Renaming a call type keeps its triggers matching. Deleting a call type or removing a priority stops the triggers that used it until they are changed, and the call types page says which protocols are affected.

## Key questions and weights

Under **Questions**, **Add Question** and give it answers (**Add answer**), each with a **Weight**. In **Basics**, set the **Activation Question Weight** (0 to 1000): *The total answer weight a suggested protocol needs to apply. 0 applies it whatever the answers.*

- With no questions, a matched protocol applies at once.
- With questions, the dispatcher answers them on the call and the protocol applies once the weights add up to at least the minimum.

Key questions are simple yes/no style checks. For a branching interview, build a [case flow](#case-flows).

## Case flows

A **case flow** (decision graph) is a set of steps the dispatcher walks on the call form:

- **Questions**, read to the caller, at the **Entry question** or **Key question** stage, answered **Yes / no**, with **One of several answers**, **A number** (with **Lowest value** and **Highest value**) or **Free text**. Each answer leads to the next step (**Then**), or **Any answer** does.
- **Instructions**: a **Script to read aloud**. Tick **Offer "Play" (text to speech) to the dispatcher** to let the dispatcher play it, and **May be texted to the caller** to allow it to be sent over the caller's text thread.
- **Outcomes**: a **Determinant** (letters, digits, spaces and `. _ / -`, up to 32), a suggested **Priority** (or **No suggestion**), a **Response** hint, and **After dispatch** instructions.

*Write your own questions and codes. Licensed protocol content (for example MPDS) may be held only in your department, with "Licensed content" ticked; it is never shared, published or used by AI.*

The case flow is part of the protocol's content: it is saved with the draft, shown in the protocol text, approved with the version and locked while the version is in review. Changing it means a new version.

### Build a case flow

1. Open a **Dispatch protocol** and select **Edit** (or **Edit the draft**).
2. Under **Case flow (decision graph)**, select **Add question** for the first question. Give it a **Short name**, the **Question as read to the caller**, the **Stage** and what it is **Answered with**. The first step you add is the **First step**; use **Make first** to change it.
3. Add the other questions, instructions (**Add instruction**) and outcomes (**Add outcome**).
4. For each answer, choose the step it leads to under **Then**. Every path must end at an outcome with a determinant.
5. Fix anything listed under *To fix before review:* (exactly one first step, every answer needs a next step, every outcome needs a determinant code, no loops, no step that cannot be reached).
6. Select **Save Protocol**, then **Save and submit for review**. The case flow is used on calls once the version is published.

![Case flow builder with two key questions, an instruction and two outcomes, every answer linked to a next step](/img/web-app/protocols/protocol-case-flow-builder.png)

A case flow can have up to 150 steps and 12 answers per question.

## On the call form

The **Protocols** field of the call form lists *Protocols the call's type and priority suggest, with the trigger that matched. Answer each protocol's questions; you can also add one by hand.* The list is refreshed when you change the type or priority (or pick a call template), using the nature and location entered so far for the trigger conditions.

### Open a protocol case on a call

1. On **New Call**, fill in the nature and address, then the call type and priority. The matching protocols appear, each with *Matched: Type: Medical*.
2. For a protocol with key questions, answer them in order (**Question 1 of 3**, **Back**, **Next**). The panel shows the score and **Applies** or **Does not apply**. Nothing is chosen in advance.
3. For a protocol with a case flow, walk it:
   - answer each question as the caller answers; select **Change** beside an earlier answer to go back (later answers on the path are dropped);
   - read each instruction aloud, or select **Play** when it is offered;
   - at the outcome, the panel shows the **Determinant**, the suggested **Priority** (*applied to the call*: set on the form once, and you can still change it), the response hint and the **After dispatch** instructions.
4. To use a different determinant, open **Override the determinant**, enter it and a **Reason (required)**.
5. To add a protocol that was not suggested, choose it under **Add a protocol by hand** and select **Add**.
6. Save the call. The server walks the case flow again from your answers and records the case.

![Protocols row on the New Call form with IND-101 added by hand](/img/web-app/protocols/protocol-new-call-panel.png)

If a case flow cannot be walked (for example, it was changed in a way the call form cannot follow), the panel says *This case flow could not be walked. Attach the protocol without it, or tell the protocol's owner.*

### Suggest with AI

On **Update Call** (a call that has been saved), **Suggest with AI** asks Enhanced AI to read the call's text or its text-message thread and pick one of your published Dispatch protocols with a case flow, with its answers filled in. The panel then shows *Suggested by Enhanced AI. Check every answer before you save.* The dispatcher checks every answer, changes what is wrong and saves; nothing is attached until then. The case is recorded as *Enhanced AI suggestion, confirmed by the dispatcher*.

The button appears only when the department has the Enhanced AI add-on with AI intake. Protocols marked **Exclude from AI** or **Licensed content** are never offered to AI, and only codes, names and the case flow's questions are sent, not the protocol text. With no good match, or when the monthly Enhanced AI budget is used up, the dispatcher picks by hand. It is not available while [Advanced Data Protection](../data-protection.md) is on.

## What is saved to the call

**View Call → Protocols** shows each protocol on the call:

- how it got there: **Suggested by a trigger**, **Added by hand** or *Attached before answers were kept*; and who attached it and when (*Attached by Lena Hartwell on ...*);
- the key questions with each answer and its weight, the **Score** (*12 of minimum 10*) and **Applies**, **Not every question answered** or **Below the minimum**;
- the **Case flow** record: the **Determinant** (with **Overridden**, the computed one and the reason), the priority and response hint, the path in words, the **After dispatch** instructions and the texts sent to the caller;
- **Text as dispatched (v2.0)**: the exact version the call cites, marked **Changed since dispatch** when a newer version is in force, and **Current text** for the version in force now;
- the protocol's attachments, and **Ask about this call's protocol** when the department has [knowledge answers](./knowledge-answers.md).

![View Call Protocols tab with IND-101 added by hand, the text as dispatched and the step-through link](/img/web-app/protocols/protocol-view-call-case.png)

On a department with [Advanced Data Protection](../data-protection.md), the case record, the answers in words and the override and removal reasons are protected call content: they show *REDACTED* until a member reveals them with a fresh identity check. The determinant itself stays readable for run cards and reports.

### After the call is saved

Members who can edit the call can, on **View Call → Protocols**:

- **Override the determinant:** open it, enter the **Determinant** and the **Reason (required)**, and select **Save determinant**. *Leave the determinant blank to go back to the one the case flow reached. Any other determinant needs a reason, kept on the call.*
- **Text to the caller:** when the call came in by text message and its thread is open, each instruction marked *May be texted to the caller* has a **Text to caller** button. The text is logged on the call (*Texted to the caller and logged on the call.*). Nothing is sent if the caller opted out (STOP) or another dispatcher is connected to the thread ([Intake channels](../intake-channels/overview.md)).
- **Remove from call:** give a reason (*Why it does not apply*) and select **Remove from call**. The protocol stays on the record, marked **Removed**, with who removed it, when and why.

A determinant change raises the **Call determinant changed** workflow trigger.

## Step-through and SOP checklists

A protocol whose version has **Ordered steps** or **Contact medical control** blocks (or numbered lists in rich text) can be worked through on a call like a checklist. **View Call → Protocols → Step-through and SOP checklists** lists:

- the protocols on the call that can be stepped through, with *3 of 8* steps done and **Finished** when complete; and
- **Start an SOP checklist**: the department's Procedure protocols (for example Mayday, RIT activation or hazmat entry) that are not on the call yet. Choose one and select **Start checklist**: it is added to the call as a hand-picked protocol citing the version in force, marked **Incident SOP**.

### Work through a checklist

1. Open the protocol from **Step-through and SOP checklists**.
2. The **Step through** page shows **Steps done**, **Started** and the **Version used**, the steps on the left and the protocol text on the right.
3. For each step select **Done**, **Skip** or **Not applicable** (**Undo** puts it back). Each change records who and when. A **Contact medical control** gate is marked as such.
4. Select **Finish checklist** when done (*Finish this checklist? Steps not done stay recorded as not done.*). The page shows *Finished by Owen Thatcher at ...*.
5. Select **Back to the call**.

![Step through page for IND-101 Chemical release and shelter in place with three of seven steps done](/img/web-app/protocols/protocol-step-through.png)

Several members can step through the same checklist at once; nothing is lost. Steps recorded in the mobile app while offline arrive with the time they happened. A step can carry a short **note** (up to 500 characters) written in the mobile app; the web page shows it after the step. On a department with Advanced Data Protection, notes are protected and show *REDACTED* until revealed.

## Run cards and dispatch texts

- **Run cards:** a run card's conditional responses have the condition **A protocol determinant on the call**, which **equals** or **starts with** a value (**Determinant (e.g. 09-E)**), optionally for one protocol. An *E* determinant can raise the alarm level or pick another response package; run cards stay the place that picks resources ([Run Cards](../run-cards.md)).
- **Dispatch texts:** with **Put the determinant and the protocol name in dispatch push, text and voice messages** on ([Protocol settings](./index.md#protocol-settings)), responders see the call's determinant and protocol after the call name.
- **New call field policy:** the call form's **Protocols** field can be hidden or required like other fields ([Dispatch & Calls](../dispatch-calls.md)).

## Setup examples

| Organization | How to set it up |
|---|---|
| **Fire** | Procedure protocols for Mayday, RIT and two in, two out, started from **Start an SOP checklist** on working fires; a Dispatch protocol for alarms with **Came in by: Intake channel** so monitoring-company calls get it |
| **EMS** | A Dispatch protocol per chief complaint with your own case flow (entry question, key questions, instructions), outcomes with your own determinants and priorities; run cards that send ALS on any `-E` determinant |
| **Search and rescue** | A Dispatch protocol for missing-person reports: key questions (age, medical needs, weather exposure) leading to an urgency outcome; the step-through for team check-in |
| **Industrial / HAZMAT** | Triggers with **Inside the area of** the process unit and **Words in the nature or notes** `leak, release, odor`; the shelter-in-place procedure stepped through with each step timestamped |
| **Law enforcement / security** | An alarm-response protocol with **Point of interest type at the location** (bank, school); instructions texted to the reporting party over the intake thread |
| **Business / facilities** | **Any call (conditions only)** triggers by area and working hours for building emergencies; a lockdown checklist |

## Technical reference

| Item | Value |
|---|---|
| Call form JSON | `ProtocolsController`: `GET GetProtocolsForCall?priority=&type=&callTypeId=&loggedOn=&callId=&nature=&latitude=&longitude=&locationPoiId=` (enabled, published Dispatch and Procedure protocols; on Update Call the protocols already on the call are left out), `GET GetProtocolsForPrioType` (older pages), `GET GetProtocol`, `GET GetTextForProtocol`, `GET GetProtocolAttachment` |
| Case flow pages | `ProtocolCasesController` (area User): `GET Definitions?callId=` (`Call_Create`; the published case flows and whether AI is available), `GET InstructionAudio?protocolId=&node=` (text to speech), `POST Suggest` (`Call_Update`, Enhanced AI), `POST Override` (`callId`, `callProtocolId`, `determinant`, `reason`), `POST SendToCaller` (`callId`, `callProtocolId`, `node`) |
| Step-through pages | `ProtocolToolsController`: `GET Steps?callId=&callProtocolId=` (`Call_View`), `POST StepsRevealed` (ADP reveal), `POST StartSteps` (`callId`, `protocolId`), `POST RecordStep` (`stepId`, `state`), `POST CompleteSteps` (`Call_Update`) |
| Call view | `Dispatch/ViewCall` partials `_CallProtocols`, `_CallProtocolCase`, `_CallSopChecklists`; `POST Dispatch/RemoveCallProtocol` (`callId`, `callProtocolId`, `reason`) |
| Trigger types | `ProtocolTriggerTypes` 0 Call Priority, 1 Call Type, 2 Call Priority & Type, 3 Any call (conditions) |
| Call sources (Came in by) | Dispatcher, E-mail import, Audio import, Chatbot, Intake channel, Voice intake |
| Limits | Activation weight 0 to 1000; case flow 150 steps, 12 answers per question, 40 deep; determinant 32 characters; override reason 500; step note 500; caller texts 50 per case |
| Run cards | Conditional type `ProtocolOutcome` (3): equals or starts with, optional protocol |
| Feature flags | None for the engine. **Suggest with AI**: `Ai.Enhanced`, `Ai.Intake` and the Enhanced AI add-on |
| Workflow trigger | 254 *Call determinant changed* ([Workflows](../workflows.md)) |
| v4 API | `ProtocolCases/GetCaseFlows`, `GetCaseFlow`, `EvaluateCase`, `GetInstructionAudio`, `SuggestProtocol`, `OverrideDeterminant`, `SendCallerInstruction`; `ProtocolContent/GetCallChecklists`, `GetSopLibrary`, `StartCallChecklist`, `RecordCallStep` (state 0 pending, 1 done, 2 skipped, 3 not applicable; note; device time; client step id for offline replays), `CompleteCallChecklist`; `CallProtocols/GetAllCallProtocols`, `GetProtocol`, `GetFile`, `RemoveCallProtocol`; `Protocols/GetProtocolsForCall` |
| Migrations | M0361 step log, M0376 decision engine, M0377 AI suggestions, M0403 step notes |
