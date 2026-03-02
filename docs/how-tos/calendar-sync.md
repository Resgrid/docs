---
sidebar_position: 4
---

# Calendar Sync & iCal Export

This guide explains how to subscribe to your Resgrid department calendar from an external calendar application (Google Calendar, Microsoft Outlook, Apple Calendar, etc.) and how to export individual events as `.ics` files.

## Overview

Resgrid can publish your department calendar as a standard iCal feed that external calendar applications can subscribe to. Once subscribed, events are automatically kept in sync — new events appear, updated events are refreshed, and deleted events are removed on the next sync cycle.

:::tip Supported Applications
Any application that supports iCal / ICS calendar subscriptions will work, including:
- **Google Calendar**
- **Microsoft Outlook** (desktop and web)
- **Apple Calendar** (macOS and iOS)
- **Thunderbird**
- **Yahoo Calendar**
:::

---

## Step 1 — Activate Calendar Sync

1. Navigate to **Calendar** in the left-hand menu
2. In the right sidebar, locate the **Calendar Sync** panel below the Types section
3. Click **Activate Calendar Sync**
4. A unique subscription URL is generated and displayed

This URL is personal to your account and contains an encrypted token that identifies your department and user. No additional login is required when a calendar application fetches the feed.

---

## Step 2 — Subscribe in Your Calendar Application

### Google Calendar

1. Copy the subscription URL from the Calendar Sync panel
2. Open [Google Calendar](https://calendar.google.com)
3. In the left sidebar, click the **+** next to "Other calendars"
4. Select **From URL**
5. Paste the subscription URL and click **Add calendar**

Alternatively, click the **Google Calendar** quick-add link in the sync panel — it opens Google Calendar with the URL pre-filled.

### Microsoft Outlook (Web)

1. Copy the subscription URL
2. Open [Outlook Calendar](https://outlook.live.com/calendar)
3. Click **Add calendar** → **Subscribe from web**
4. Paste the URL, give it a name, and click **Import**

### Apple Calendar (macOS / iOS)

**macOS:**

1. Click the **Open in Calendar App** button in the sync panel (uses `webcal://` protocol), or:
2. Open Apple Calendar → **File** → **New Calendar Subscription**
3. Paste the subscription URL and click **Subscribe**
4. Configure refresh interval (recommended: every 15 minutes)

**iOS:**

1. Copy the subscription URL
2. Go to **Settings** → **Calendar** → **Accounts** → **Add Account** → **Other**
3. Tap **Add Subscribed Calendar**
4. Paste the URL and tap **Next** → **Save**

### Other Applications

For any application that supports iCal subscriptions, use the subscription URL directly. The feed returns standard RFC 5545 iCalendar data with `text/calendar` content type.

---

## Step 3 — Verify the Subscription

After subscribing, your external calendar should display department events within a few minutes. All-day events appear as full-day banners. Multi-day events span their full date range. Events include titles, descriptions, locations, and reminders.

:::note Sync Interval
External calendar applications control how often they refresh the feed. Most default to every 15–60 minutes. Check your calendar application settings if you need more frequent updates.
:::

---

## Regenerating the Sync Key

If you believe your subscription URL has been shared or compromised:

1. Navigate to **Calendar** in the left-hand menu
2. In the Calendar Sync panel, click **Regenerate Sync Key**
3. The old URL is immediately invalidated
4. Copy the new URL and update it in all your subscribed calendar applications

:::warning
Regenerating the sync key invalidates **all** previously issued subscription URLs for your account. Any calendar application using the old URL will stop receiving updates and must be re-subscribed with the new URL.
:::

---

## Downloading Individual Events

You can download any single calendar event as an `.ics` file:

1. Navigate to the event detail page (click on an event in the calendar)
2. Click the **Download .ics** button
3. Open the downloaded file with your calendar application to add that single event

This is useful for sharing a specific event with someone outside your department or adding it to a personal calendar without subscribing to the full feed.

---

## How the iCal Feed Works

| Aspect | Detail |
|--------|--------|
| **Format** | Standard iCalendar (RFC 5545) |
| **Content Type** | `text/calendar` |
| **Authentication** | Encrypted token in the URL (no login required) |
| **All-Day Events** | Exported with `VALUE=DATE` format (no time component) |
| **Multi-Day Events** | `DTEND` is exclusive (one day after the last event day), per iCal standard |
| **Recurrences** | Each recurrence instance is a separate `VEVENT` (no `RRULE`) |
| **Reminders** | Exported as `VALARM` components with appropriate trigger durations |
| **Locations** | Exported as `LOCATION` properties |
| **Attendees** | Exported as `ATTENDEE` properties (if populated) |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Calendar app says "unable to verify account" | Ensure the subscription URL is copied completely without extra spaces |
| Events not appearing after subscribing | Wait for the next sync cycle (up to 60 minutes depending on your app). Check that the URL starts with `https://` or `webcal://` |
| Events stopped updating | Your sync key may have been regenerated. Check the Calendar Sync panel for the current URL and re-subscribe |
| "Calendar sync is not yet activated" message | Click **Activate Calendar Sync** to generate your subscription URL |
| All-day events showing wrong dates | Ensure your calendar application is set to the correct time zone |
| Cannot see the Calendar Sync panel | Calendar sync may be disabled by your system administrator (`ICalFeedEnabled` config) |
