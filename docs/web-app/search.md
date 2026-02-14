---
sidebar_position: 35
title: Search
---

# Search

The Search module provides a quick navigation command palette for accessing application features. It is managed by the `SearchController`.

## How It Works

**Authorization:** `Department_View` policy

The `GetSearchResults` endpoint returns a curated list of application navigation shortcuts that can be filtered by a search query.

### Available Navigation Items

| Item | URL Target |
|------|-----------|
| Calls | Dispatch dashboard |
| Personnel | Personnel list |
| Units | Units list |
| Mapping | Map view |
| Shifts | Shifts list |
| Logs | Logs list |
| Reports | Reports dashboard |
| Calendar | Calendar view |
| Notes | Notes list |
| Documents | Documents list |
| Trainings | Trainings list |
| Inventory | Inventory overview |
| Inbox | Message inbox |
| Profile | User profile |
| Department Settings | Department settings |
| Security | Security settings |

### Conditional Items

Some items are shown only when the user has appropriate permissions:

| Item | Condition |
|------|-----------|
| New Call | User can create calls |
| Add Person | User can add personnel |
| Manage Invites | User can add personnel |

### Filtering

When a query is provided, results are filtered by matching against the item label and summary text.

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **All Modules** | Provides navigation shortcuts to all feature areas |
| **Security** | Conditional items based on permissions |
