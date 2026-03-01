---
sidebar_position: 4
---

# Contact Verification API

The Contact Verification API allows clients to programmatically send verification codes and confirm contact methods for the authenticated user. These endpoints are used by the profile UI to manage email, mobile number, and home number verification inline.

## Authentication

All Contact Verification API endpoints require a valid JWT token. See [API Authentication](authentication) for details.

**Base URL:** `/api/v4/ContactVerification`

## Send Verification Code

Sends a verification code to the specified contact method for the authenticated user. For email, a verification email is sent. For mobile and home numbers, an SMS is sent.

```
POST /api/v4/ContactVerification/SendVerificationCode
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `Type` | int | Yes | Contact verification type: `0` = Email, `1` = MobileNumber, `2` = HomeNumber |

**Response:**

| Field | Type | Description |
|-------|------|-------------|
| `Success` | bool | Whether the code was sent successfully |
| `Message` | string | Descriptive message (e.g., "A verification code has been sent." or an error message) |

**Error Scenarios:**

| HTTP Status | Condition |
|-------------|-----------|
| `200 OK` | Code sent successfully, or a descriptive error in the response body |
| `429 Too Many Requests` | Rate limit exceeded (max 3 sends per contact method per hour) |
| `400 Bad Request` | Invalid contact type or no contact value on file |

**Example Request:**

```bash
curl -X POST \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  "https://api.resgrid.com/api/v4/ContactVerification/SendVerificationCode" \
  -d '{"Type": 0}'
```

**Example Response:**

```json
{
  "Data": {
    "Success": true,
    "Message": "A verification code has been sent."
  },
  "Status": "success"
}
```

## Confirm Verification Code

Validates a verification code entered by the user and, if correct and not expired, marks the contact method as verified.

```
POST /api/v4/ContactVerification/ConfirmVerificationCode
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `Type` | int | Yes | Contact verification type: `0` = Email, `1` = MobileNumber, `2` = HomeNumber |
| `Code` | string | Yes | The 6-digit numeric verification code |

**Response:**

| Field | Type | Description |
|-------|------|-------------|
| `Success` | bool | Whether the verification was successful |
| `Message` | string | Descriptive message (e.g., "Verification successful." or an error message) |

**Error Scenarios:**

| HTTP Status | Condition |
|-------------|-----------|
| `200 OK` | Verification confirmed or a descriptive error in the response body |
| `429 Too Many Requests` | Daily attempt limit exceeded (max 5 attempts per contact method per day) |
| `400 Bad Request` | Invalid contact type or missing code |

**Example Request:**

```bash
curl -X POST \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  "https://api.resgrid.com/api/v4/ContactVerification/ConfirmVerificationCode" \
  -d '{"Type": 1, "Code": "482910"}'
```

**Example Response (Success):**

```json
{
  "Data": {
    "Success": true,
    "Message": "Verification successful."
  },
  "Status": "success"
}
```

**Example Response (Failure):**

```json
{
  "Data": {
    "Success": false,
    "Message": "Verification failed. Please check the code and try again."
  },
  "Status": "success"
}
```

## Contact Verification Types

| Value | Name | Description |
|-------|------|-------------|
| `0` | Email | Email address verification (sends verification email) |
| `1` | MobileNumber | Mobile number verification (sends SMS) |
| `2` | HomeNumber | Home number verification (sends SMS) |

## Rate Limits

| Limit | Default | Description |
|-------|---------|-------------|
| Max sends per hour | 3 | Maximum verification code sends per contact method per hour |
| Max attempts per day | 5 | Maximum verification code entry attempts per contact method per day |
| Code expiry | 30 minutes | How long a verification code remains valid |

When a rate limit is reached, the API returns an appropriate error message. Daily attempt counters reset at midnight UTC.

## Verification State Model

Each contact method on a user profile has a tri-state verification value:

| Value | State | Communications |
|-------|-------|---------------|
| `null` | Grandfathered | Allowed (pre-existing users) |
| `false` | Pending | Blocked until verified |
| `true` | Verified | Allowed |

For more details on how verification affects dispatches, notifications, and messaging, see the [Contact Method Verification](../configuration/contact-verification) configuration guide.
