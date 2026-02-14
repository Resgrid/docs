---
sidebar_position: 13
---

# Department Links

Department Links allow two Resgrid departments to share information with each other. When a link is established between departments, they can view each other's active calls, personnel status, and unit status. This is designed for mutual aid scenarios where neighboring departments need situational awareness of each other's operations.

## Why Department Links Matter

During large-scale incidents or mutual aid situations, departments need visibility into neighboring organizations' resources and active calls. Department Links provide this cross-department visibility directly within Resgrid, eliminating the need for phone calls or separate communication channels to coordinate resources between organizations.

## Scope

Department Links are bidirectional agreements between two departments. When a link is created, it must be accepted by the target department before data sharing begins. Each department controls what data it shares and can disable the link at any time. Links only share read-only views of active data — no department can modify another department's data.

## How Department Links Work

1. **Department A** creates a link request using **Department B's** link code
2. **Department B** receives a notification about the incoming link request
3. **Department B** accepts the link and selects a display color for Department A
4. Both departments can now view each other's shared data

## Link Codes

Every department has a unique **Link Code** displayed on the Department Links page. This code is what other departments use to initiate a link request. Share your link code with departments you want to establish mutual aid visibility with.

## Creating a Link

Navigate to **Department → Links** and click **New Link**.

| Field     | Required | Description                                                   |
| --------- | -------- | ------------------------------------------------------------- |
| Link Code | Yes      | The target department's link code                             |

:::warning Link Requirements
- You cannot link to your own department
- Both departments must be on a paid subscription plan (not the Free tier)
- The link code must correspond to an existing department
:::

## Accepting a Link

When another department creates a link to your department, you will see it in your Links list as pending. To accept:

1. Navigate to **Department → Links**
2. Find the pending link request
3. Click **Enable**
4. Select a **Department Color** — this color is used to visually identify the linked department's data on maps and in lists

| Field            | Required | Description                                              |
| ---------------- | -------- | -------------------------------------------------------- |
| Department Color | Yes      | Color used to represent the linked department on maps    |

## Shared Data

Once a link is active, the following data is shared between departments:

| Data Type        | Description                                                       |
| ---------------- | ----------------------------------------------------------------- |
| Active Calls     | Currently active dispatch calls (if call sharing is enabled)      |
| Personnel Status | Personnel names, statuses, and staffing levels                    |
| Unit Status      | Unit names, current states, and assignments                       |

:::tip Read-Only Access
Linked department data is read-only. You can view but not modify, dispatch to, or interact with another department's personnel, units, or calls.
:::

## Managing Links

From the Links page, you can:
- **View** a linked department's shared data (active calls, personnel, units)
- **Enable** a pending incoming link request
- **Disable** an active link to stop data sharing (link can be re-enabled later)

## Enabling and Disabling Links

Only the target department (the one that received the link request) can enable or disable a link. Disabling a link immediately stops data sharing in both directions. The link configuration is preserved, so it can be re-enabled without creating a new link.

## Common Errors and Resolutions

| Error                                     | Resolution                                                            |
| ----------------------------------------- | --------------------------------------------------------------------- |
| "Link code not found"                     | Verify the link code is correct and corresponds to an active department |
| "Cannot link to your own department"      | You cannot create a link to your own department                       |
| Link not showing shared data              | Ensure the target department has accepted and enabled the link        |
| Cannot create a link                      | Both departments must be on a paid subscription plan                  |
| Linked department data not updating       | Data is refreshed periodically; check that the link is still enabled  |
