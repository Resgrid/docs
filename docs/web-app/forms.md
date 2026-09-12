---
sidebar_position: 42
title: Forms (retired)
---

# Forms

:::caution Module retired
The original **Forms** module (a drag-and-drop form builder whose forms were attached to calls) is **switched off** in current Resgrid releases. Its pages return *not found*, no new form templates can be created, and no new form data is captured. Form data that was captured in the past still renders **read-only** on the call detail page so history is preserved.
:::

## What to use instead

| Need | Use |
|---|---|
| Extra fields on calls, units, personnel or records | [User Defined Fields](user-defined-fields) — typed fields with visibility rules, validation, mobile and report visibility. |
| Structured operational reports with sections, rules, review and signatures | [Records](records/overview) — design a department definition from a template (patrol log, incident report, near-miss, damage assessment, ICS forms …) or from scratch. |
| Checks that must be answered item by item, with pass/fail and evidence | [Checklists](checklists). |
| Simple polls or acknowledgements | [Messages](messages) with responses. |
| Automations that used to fire on form submission | [Workflows](workflows) on *Record finalized*, *Checklist completed* or *Call* events. |

## Technical reference

`FormsController` overrides `OnActionExecuting` to return `NotFound()` for every action; the `Forms` and `FormData` tables and the `FormSubmittedEvent` remain in the codebase so the module can be re-enabled by removing that override. `CallData` still renders stored form data on `Dispatch/ViewCall`.
