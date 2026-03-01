---
sidebar_position: 16
---

# Contact Method Verification

Contact Method Verification is an anti-spam protection feature that requires users to validate their email addresses, mobile numbers, and home phone numbers before the system sends dispatches, notifications, and messages through those channels. This ensures that outbound communications only reach confirmed, valid contact methods and protects against misrouted messages.

## Why Contact Verification Matters

Without verification, a mistyped email address or phone number in a user's profile could cause dispatch notifications, alerts, and messages to be sent to the wrong person — or to no one at all. In emergency operations, missed notifications can have serious consequences. Contact verification ensures that every communication channel attached to a user has been confirmed by that user, reducing delivery failures and preventing spam to unintended recipients.

## Scope

Contact verification applies to all personnel in a department. Each user is responsible for verifying their own contact methods. The verification status of each contact method determines whether outbound communications (dispatches, notifications, messages) are sent through that channel.

## Verification States

Each contact method (email, mobile number, home number) has one of three verification states:

| State | Stored Value | Description |
|-------|-------------|-------------|
| **Grandfathered** | `NULL` | The contact method existed before verification was introduced. Communications are **allowed**. The user is encouraged to verify but not required. |
| **Pending** | `false` | The contact method has been added or changed but not yet verified. Communications are **blocked** until verified. |
| **Verified** | `true` | The contact method has been confirmed by the user. Communications are **allowed**. |

:::info Grandfathered Users
Existing users whose contact information was entered before the verification feature was introduced are automatically in the Grandfathered state. Their communications continue to flow normally. They will see a recommendation banner on their profile encouraging them to verify, but no action is forced.
:::

## How Verification Works

### Email Verification
1. The user clicks **Verify** next to their email address on their profile page.
2. The system sends a verification email containing a numeric code to the email address on file.
3. The user enters the code in the inline verification input on their profile page.
4. If the code is correct and not expired, the email is marked as **Verified**.

### Mobile Number Verification
1. The user clicks **Verify** next to their mobile number on their profile page.
2. The system sends an SMS containing a numeric code to the mobile number on file.
3. The user enters the code in the inline verification input on their profile page.
4. If the code is correct and not expired, the mobile number is marked as **Verified**.

### Home Number Verification
1. The user clicks **Verify** next to their home number on their profile page.
2. The system sends an SMS containing a numeric code to the home number on file.
3. The user enters the code in the inline verification input on their profile page.
4. If the code is correct and not expired, the home number is marked as **Verified**.

:::tip Voice Call Numbers
If a voice call number shares the same value as the user's mobile number, verification of the mobile number also verifies the voice call channel. Otherwise, the home number follows the same SMS verification pattern.
:::

## Verification Code Rules

| Setting | Default | Description |
|---------|---------|-------------|
| Code Length | 6 digits | The length of the numeric verification code |
| Code Expiry | 30 minutes | How long a verification code remains valid after being sent |
| Max Sends Per Hour | 3 | Maximum number of verification codes that can be sent per contact method per hour |
| Max Attempts Per Day | 5 | Maximum number of verification attempts (code entries) per contact method per day |

All of these values are configurable by system administrators via the `VerificationConfig` configuration class.

:::warning Rate Limiting
If you exceed the maximum number of sends per hour or attempts per day, you will receive a rate-limited error and must wait before trying again. Daily attempt counters reset at midnight UTC.
:::

## What Happens When Contact Information Changes

When a user (or an administrator) changes a contact method value on a user's profile:

- The corresponding verification status is reset to **Pending** (`false`).
- Any existing verification code and expiry are cleared.
- The verification attempt counter is reset to zero.
- The user must re-verify the new contact method before communications resume on that channel.

This applies to changes made through:
- The user editing their own profile
- An administrator editing a user's profile
- Any API-based profile update

## Admin-Created Personnel

When an administrator creates a new user via **Personnel → Add Person**, the new user's contact methods (email, mobile number, home number) are initialized in the **Pending** state. The new user must verify their contact methods upon their first login or when they view their profile.

:::note
Unlike grandfathered users, newly created users will not receive dispatches, notifications, or messages via unverified channels until they complete verification.
:::

## Impact on Communications

Contact verification gates the following outbound communication channels:

| Communication Type | Gated Channel | Verification Required |
|-------------------|---------------|----------------------|
| Call Dispatch (email) | Email | Email must be Verified or Grandfathered |
| Call Dispatch (SMS) | SMS | Mobile Number must be Verified or Grandfathered |
| Call Dispatch (voice) | Voice Call | Home or Mobile Number must be Verified or Grandfathered |
| Notifications (email) | Email | Email must be Verified or Grandfathered |
| Notifications (SMS) | SMS | Mobile Number must be Verified or Grandfathered |
| Calendar Alerts | Email / SMS | Corresponding method must be Verified or Grandfathered |
| Trouble Alerts | Email / SMS | Corresponding method must be Verified or Grandfathered |
| Text Messages | SMS | Mobile Number must be Verified or Grandfathered |
| Chat Messages | Email / SMS | Corresponding method must be Verified or Grandfathered |

If a contact method is in the **Pending** state, the system silently skips that communication channel for the user. The dispatch or notification is not failed — it simply does not send via the unverified channel. Other verified channels for the same user still function normally.

## Profile UI Indicators

On the user profile page, each contact field displays a verification indicator:

| Indicator | Condition | Description |
|-----------|-----------|-------------|
| **Green verified badge** | Verified (`true`) | The contact method has been confirmed |
| **Yellow warning banner with Verify button** | Pending (`false`) | The contact method needs verification; communications are blocked on this channel |
| **Subtle info banner** | Grandfathered (`NULL`) with a value present | Recommends the user verify to ensure uninterrupted delivery |

The **Verify** button triggers the verification flow inline — sending a code and presenting an input field and **Confirm** button without navigating away from the profile page.

## How Contact Verification Connects to Other Features

| Feature | Connection |
|---------|------------|
| [Dispatch & Calls](../web-app/dispatch-calls) | Email, SMS, and voice call dispatches are gated by verification status |
| [Notifications](notifications) | Notification delivery channels are gated by verification status |
| [Messages](../web-app/messages) | SMS message delivery is gated by mobile verification status |
| [Text Messaging](text-messaging) | SMS-based features require a verified mobile number for outbound delivery |
| [Adding Personnel](adding-personnel) | Admin-created personnel start with Pending verification status |
| [Profile & Account](../web-app/profile-account) | Verification status is displayed and managed on the profile page |
| [Voice & Audio](../web-app/voice-audio) | Voice call dispatch is gated by home/mobile number verification |

## Common Errors and Resolutions

| Error | Resolution |
|-------|------------|
| "Too many verification attempts. Please try again later." | You have exceeded the daily attempt limit (default: 5). Wait until the next day or contact your administrator. |
| "A verification code has been sent." followed by no code received | Check your spam/junk folder (email) or ensure the phone number on file is correct. Wait a few minutes for SMS delivery. |
| "Verification failed. Please check the code and try again." | Double-check the code you entered. Codes are 6 digits. Ensure you are entering the most recently sent code. |
| Verification code expired | Codes expire after 30 minutes (default). Click Verify again to send a new code. |
| Not receiving dispatches or notifications | Check your profile for yellow warning banners next to your contact methods. Verify any Pending contact methods. |
| Admin-created user not receiving communications | The user must log in and verify their contact methods from their profile page. |
