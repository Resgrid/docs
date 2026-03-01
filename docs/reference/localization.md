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

## Localization Gaps

The following areas or parts of the system may not be properly localized for your specific language:

- Date and Time Displays
- Number Formats
- Some warnings, error dialog, popups

We are working on improving the localization experience for dynamic and server generated content (i.e. warnings, errors) and the other areas noted above.

## Multi-lingual Documentation and Support

Our technical documentation, help and support channels are US English only. We are unable to translate the documentations or provide support in any other language at this time.