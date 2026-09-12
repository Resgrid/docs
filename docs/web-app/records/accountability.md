---
sidebar_position: 18
title: Accountability
---

# Records Accountability

**Records → Reports → Accountability** answers the officer's question *"who owes me a report?"*

![Accountability](/img/web-app/records/accountability.png)

| Column | Meaning |
|---|---|
| **Open** | Unfinished records (drafts, ready for review, returned). |
| **Overdue reviews** | Reviews past the review-due hours. |
| **Returned, not corrected** | Records sent back to the author that have not been re-submitted. |
| **Finalized in window** | Completed in the chosen window (default 30 days). |
| **Avg. hours to finalize** | From creation to finalization. |
| **Oldest open** | The age of the oldest unfinished record. |

Pivot **by person**, **by station/group** or **by unit**; filter by owner or group; **Show open records** lists them.

**Remind** sends the owner a reminder through their notification preferences (at most once a day per record); **Remind all** reminds every owner in the current view. The result shows how many were sent and skipped.

## Technical reference

| Item | Value |
|---|---|
| Route | `/User/Records/Accountability?pivot=person|group|unit&days=30&owner=&group=` |
| Service | `IRecordsAccountabilityService` |
| Reminders | Delivered as system messages / push through the notification pipeline; audited |
