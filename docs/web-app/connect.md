---
sidebar_position: 34
title: Connect
---

# Connect

The Connect module manages the department's public-facing profile, enabling community engagement and inter-department discovery. It is managed by the `ConnectController`.

## Department Profile

### Viewing Profile
**Authorization:** `Connect_View` policy

The dashboard shows:
- Department profile summary
- Avatar URL (from API)
- Latest 3 posts
- Visible post count

The profile is auto-created if it doesn't exist (`GetOrInitializeDepartmentProfile`).

### Editing Profile
**Authorization:** `Connect_Update` policy

| Field | Description |
|-------|-------------|
| Name | Public display name |
| Short Name | Abbreviated name |
| Description | Department description |
| In Case of Emergency | Emergency contact information |
| Service Area | Geographic service area |
| Services Provided | List of services offered |
| Founded | Year founded |
| Keywords | Search keywords |
| Invite Only | Whether joining requires an invite |
| Allow Messages | Whether external messages are accepted |
| Share Stats | Share department statistics publicly |
| Disabled | Hide profile from public directory |

### Volunteer Recruitment

| Field | Description |
|-------|-------------|
| Volunteer Positions Available | Whether positions are open |
| Volunteer Keywords | Search terms for recruitment |
| Volunteer Description | Description of volunteer opportunities |
| Volunteer Contact Name | Recruitment contact person |
| Volunteer Contact Info | How to reach the contact |

### Location

| Field | Description |
|-------|-------------|
| Address | Department address (creates/updates `Address` entity) |
| Latitude/Longitude | GPS coordinates |
| What3Words | Three-word location code |

**Geolocation Resolution:**
1. If What3Words is provided but lat/lng is empty → Resolves via W3W API
2. If still no coordinates and address exists → Geocodes the full address

## Messages

**Authorization:** `Connect_View` policy

View incoming messages from external departments:
- Grouped by sender
- Shows latest message text per conversation
- Sender name and timestamp

## Posts / Articles

### Viewing Posts
**Authorization:** `Connect_View` policy

Lists all department articles/posts. Data loaded via AJAX.

### Creating Posts
**Authorization:** `Connect_Create` policy

| Field | Required | Description |
|-------|----------|-------------|
| Title | Yes | Post title |
| Body | Yes | Post content |
| Start On | Yes | Publication date (defaults to now in department timezone) |

### Post Data API
The `GetPostsList` endpoint returns all articles as JSON with:
- Title and body
- Images
- Formatted dates (department timezone)
- Expiry information
- Creator's full name

## Interactions with Other Modules

| Module | Interaction |
|--------|-------------|
| **Department** | Department data used for profile |
| **Department Links** | Profile enables department discovery |
| **Mapping** | Location data for department positioning |
