---
sidebar_position: 5
---

# Localization

Resgrid's website and applications can support multiple languages. 

## Current Supported Languages

- US English

## Unsupported Languages

We will be unable to support any Right-To-Left languages, for example Arabic, in the system at this time.

## Localization Resources

Resgrid uses `.resx` resource files with a marker-class pattern in the `Resgrid.Localization` project. Localized strings are organized by area and view. For example, the Edit Profile page has resources in `Areas/User/Home/EditProfile.en.resx` (English) and `EditProfile.es.resx` (Spanish).

### Contact Verification Localization Strings

The following localization keys are available for the contact verification feature:

| Key | English (en) | Description |
|-----|-------------|-------------|
| `EmailNotVerifiedWarning` | "Your email address has not been verified. Verify it to ensure you receive dispatches and notifications." | Shown next to a pending email field |
| `MobileNotVerifiedWarning` | "Your mobile number has not been verified. Verify it to ensure you receive SMS dispatches and notifications." | Shown next to a pending mobile number field |
| `HomeNotVerifiedWarning` | "Your home number has not been verified. Verify it to ensure you receive voice call dispatches." | Shown next to a pending home number field |
| `VerifyButtonLabel` | "Verify" | Label for the verify button |
| `VerificationCodePlaceholder` | "Enter verification code" | Placeholder text for the code input |
| `VerificationCodeSent` | "A verification code has been sent." | Confirmation after sending a code |
| `VerificationSuccessful` | "Verification successful." | Shown after successful verification |
| `VerificationFailed` | "Verification failed. Please check the code and try again." | Shown after a failed attempt |
| `VerificationRateLimited` | "Too many verification attempts. Please try again later." | Shown when rate limit is exceeded |
| `GrandfatheredEmailWarning` | "We recommend verifying your email address to ensure uninterrupted delivery of dispatches and notifications." | Info banner for grandfathered email |
| `GrandfatheredMobileWarning` | "We recommend verifying your mobile number to ensure uninterrupted delivery of SMS dispatches and notifications." | Info banner for grandfathered mobile number |
| `GrandfatheredHomeWarning` | "We recommend verifying your home number to ensure uninterrupted delivery of voice call dispatches." | Info banner for grandfathered home number |

These strings are defined in `EditProfile.en.resx` and `EditProfile.es.resx` and follow the existing marker-class localization pattern.

### Calendar Localization Strings

The following localization keys are available for the calendar module's all-day events, multi-day events, and calendar sync features:

| Key | English (en) | Description |
|-----|-------------|-------------|
| `AllDayEvent` | "All Day Event" | Label for all-day events on the calendar and detail views |
| `DateRange` | "{0} – {1}" | Format string for multi-day event date ranges |
| `DownloadIcs` | "Download .ics" | Button label for downloading a single event as iCal |
| `SubscribeCalendar` | "Subscribe to Calendar" | Button/panel label for calendar sync |
| `CalendarSyncTitle` | "Calendar Sync" | Panel heading for the calendar sync section |
| `CalendarSyncDescription` | "Subscribe to your department calendar in Google Calendar, Microsoft Outlook, Apple Calendar, or any application that supports iCal feeds." | Help text in the sync panel |
| `ActivateCalendarSync` | "Activate Calendar Sync" | Button to generate a subscription URL |
| `RegenerateCalendarSync` | "Regenerate Sync Key" | Button to invalidate and recreate the subscription URL |
| `CalendarSyncActivateHelp` | "To sync your department calendar with an external calendar application, you must first activate calendar sync. This generates a unique subscription URL. If the URL is compromised, you can regenerate it to invalidate the old one." | Detailed help text for first-time activation |
| `CopyToClipboard` | "Copy to Clipboard" | Button label for copying the subscription URL |
| `SubscriptionUrl` | "Subscription URL" | Label for the subscription URL field |
| `WebCalLink` | "Open in Calendar App" | Label for the webcal:// protocol link |
| `CalendarSyncActive` | "Calendar sync is active. Use the URL below to subscribe." | Status text when sync is active |
| `CalendarSyncInactive` | "Calendar sync is not yet activated. Click the button below to generate your subscription URL." | Status text when sync is not yet activated |

These strings are defined in `Calendar.en.resx` and `Calendar.es.resx` (Spanish translations are also provided).

## Localization Gaps

The following areas or parts of the system may not be properly localized for your specific language:

- Date and Time Displays
- Number Formats
- Some warnings, error dialog, popups

We are working on improving the localization experience for dynamic and server generated content (i.e. warnings, errors) and the other areas noted above.

## Multi-lingual Documentation and Support

Our technical documentation, help and support channels are US English only. We are unable to translate the documentations or provide support in any other language at this time.