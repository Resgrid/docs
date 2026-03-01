---
sidebar_position: 4
---

# Security Policies

The Department Security Policy feature allows administrators to enforce compliance-oriented controls across their entire department. These policies govern authentication requirements, session behavior, network restrictions, and password rules — designed to meet the needs of enterprise organizations and government agencies operating under frameworks like NIST, CJIS, or FedRAMP.

## Overview

Security policies are stored per-department in the `DepartmentSecurityPolicies` table and enforced at login time by the Resgrid API. When a user attempts to authenticate (via password or SSO), the system checks the department's security policy and blocks access if any requirement is not met.

Security policies can be managed through the **web application** or the **REST API**.

## Managing via the Web Application

Navigate to **Department Settings** → **Security** → **Security Policy** (or click the **Security Policy** button on the Security index page).

The Security Policy page provides:

- **Authentication controls** — toggle MFA requirement and SSO-only mode
- **Session settings** — configure timeout and concurrent session limits
- **IP range restrictions** — enter allowed CIDR blocks
- **Password policy** — set minimum length, complexity, and expiration
- **Data classification** — select the classification level for the department
- **Preset buttons** — one-click templates to apply common configurations:
  - **Government / CUI** — applies strict settings suitable for CJIS, NIST 800-171, and FedRAMP
  - **Enterprise** — applies balanced settings with MFA but optional SSO
  - **Minimal** — resets all fields to defaults (no restrictions)

After selecting a preset or manually adjusting settings, click **Save** to apply the policy.

:::tip Preset Buttons
Preset buttons populate the form with recommended values but do not save automatically. Review the settings and click **Save** to apply. You can modify individual fields after applying a preset.
:::

## Managing via the API

### Reading the Current Policy

```bash
GET /api/v4/SsoAdmin/GetSecurityPolicy
Authorization: Bearer <admin-token>
```

Returns the current security policy for the administrator's department, or a default (empty) policy if none has been configured.

## Saving / Updating the Policy

```bash
POST /api/v4/SsoAdmin/SaveSecurityPolicy
Content-Type: application/json
Authorization: Bearer <admin-token>
```

```json
{
  "requireMfa": true,
  "requireSso": false,
  "sessionTimeoutMinutes": 480,
  "maxConcurrentSessions": 3,
  "allowedIpRanges": "10.0.0.0/8,192.168.1.0/24",
  "passwordExpirationDays": 90,
  "minPasswordLength": 12,
  "requirePasswordComplexity": true,
  "dataClassificationLevel": 1
}
```

---

## Policy Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `requireMfa` | bool | `false` | Require multi-factor authentication for all department members |
| `requireSso` | bool | `false` | Force all users through SSO, disabling password-based login |
| `sessionTimeoutMinutes` | int | `0` (disabled) | Automatically expire sessions after this many minutes of inactivity |
| `maxConcurrentSessions` | int | `0` (unlimited) | Maximum number of simultaneous active sessions per user |
| `allowedIpRanges` | string | `""` (all IPs) | Comma-separated list of CIDR blocks; only these IP ranges can access the department |
| `passwordExpirationDays` | int | `0` (disabled) | Force password resets after this many days |
| `minPasswordLength` | int | `0` (system default) | Minimum password length for department members |
| `requirePasswordComplexity` | bool | `false` | Require passwords to include uppercase, lowercase, digits, and special characters |
| `dataClassificationLevel` | int | `0` | Data classification tag for the department |

### Data Classification Levels

| Value | Level | Description |
| --- | --- | --- |
| `0` | Unclassified | Default. No special handling required |
| `1` | CUI | Controlled Unclassified Information — subject to NIST SP 800-171 controls |
| `2` | Confidential | Requires enhanced access controls and audit logging |

---

## Common Policy Presets

### Government / CUI Environment

For departments handling Controlled Unclassified Information (CUI) or operating under CJIS, NIST 800-171, or similar frameworks:

```json
{
  "requireMfa": true,
  "requireSso": true,
  "sessionTimeoutMinutes": 240,
  "maxConcurrentSessions": 1,
  "allowedIpRanges": "10.0.0.0/8",
  "passwordExpirationDays": 60,
  "minPasswordLength": 14,
  "requirePasswordComplexity": true,
  "dataClassificationLevel": 1
}
```

Key characteristics:
- SSO is mandatory — no password-based login
- MFA is required on every login
- Sessions expire after 4 hours
- Only one concurrent session per user
- Access restricted to internal network (`10.0.0.0/8`)
- Passwords expire every 60 days with 14-character minimum

### Standard Enterprise (SSO Optional, MFA Required)

For corporate departments that want stronger security without fully locking down to SSO:

```json
{
  "requireMfa": true,
  "requireSso": false,
  "sessionTimeoutMinutes": 480,
  "maxConcurrentSessions": 5,
  "allowedIpRanges": "",
  "passwordExpirationDays": 90,
  "minPasswordLength": 12,
  "requirePasswordComplexity": true,
  "dataClassificationLevel": 0
}
```

Key characteristics:
- MFA is required but SSO is optional
- Sessions expire after 8 hours
- Up to 5 concurrent sessions per user
- No IP restrictions (access from anywhere)
- Passwords expire every 90 days with 12-character minimum

### Minimal (Default Behavior)

For departments that do not need additional security controls:

```json
{
  "requireMfa": false,
  "requireSso": false,
  "sessionTimeoutMinutes": 0,
  "maxConcurrentSessions": 0,
  "allowedIpRanges": "",
  "passwordExpirationDays": 0,
  "minPasswordLength": 0,
  "requirePasswordComplexity": false,
  "dataClassificationLevel": 0
}
```

---

## How Policies Are Enforced

Security policies are checked at login time (both password and SSO authentication) and enforced as follows:

### At Authentication

| Check | Behavior |
| --- | --- |
| `requireSso` | If `true`, password-based login attempts are rejected with a message directing the user to SSO |
| `requireMfa` | If `true`, the user must complete MFA after primary authentication; login is blocked if MFA is not configured |
| `allowedIpRanges` | The client's IP address is checked against the CIDR list; requests from disallowed IPs are rejected |
| `maxConcurrentSessions` | If the user already has the maximum number of active sessions, the oldest session is invalidated |
| `sessionTimeoutMinutes` | The issued token's expiration is capped to the configured timeout |

### At Password Change

| Check | Behavior |
| --- | --- |
| `minPasswordLength` | New passwords shorter than the minimum are rejected |
| `requirePasswordComplexity` | New passwords must include uppercase, lowercase, digit, and special character |
| `passwordExpirationDays` | Users are forced to change their password when the expiration period elapses |

---

## IP Range Configuration

The `allowedIpRanges` field accepts a comma-separated list of CIDR blocks. Examples:

| Value | Meaning |
| --- | --- |
| `""` (empty) | All IP addresses are allowed |
| `10.0.0.0/8` | Only class A private network |
| `10.0.0.0/8,172.16.0.0/12,192.168.0.0/16` | All RFC 1918 private networks |
| `203.0.113.0/24` | A specific public subnet |
| `203.0.113.42/32` | A single IP address |

:::warning
If you configure IP restrictions incorrectly, you may lock yourself out of the API. Ensure your current IP address is within the allowed ranges before saving the policy. If locked out, contact Resgrid support to reset the policy.
:::

---

## Important Warnings

### RequireSso

Setting `requireSso: true` **disables password-based login for all department members**, including administrators. Both the web application and the API enforce a safety guard:

- **Web UI**: The Security Policy page checks whether an active SSO configuration exists before allowing `RequireSso` to be enabled. If no active config is found, a validation error is displayed with a link to the SSO configuration page.
- **API**: The `POST /api/v4/SsoAdmin/SaveSecurityPolicy` endpoint returns a `400 Bad Request` with an error message if `requireSso: true` is submitted without an active SSO configuration.

Before enabling this:
1. Ensure your SSO configuration is fully tested and working
2. Verify that all department administrators can log in via SSO
3. Consider keeping at least one emergency admin account with `allowLocalLogin: true` in the SSO config

### Session Timeout

Setting a very low `sessionTimeoutMinutes` (e.g., less than 30 minutes) may cause poor user experience, especially on mobile devices where background app refresh is common. Recommended minimum values:

| Environment | Recommended Timeout |
| --- | --- |
| Government / high-security | 240 minutes (4 hours) |
| Standard enterprise | 480 minutes (8 hours) |
| Field operations | 720 minutes (12 hours) |

---

## Troubleshooting

### "Access denied: IP not in allowed range"

- Check that your current IP is in the `allowedIpRanges` CIDR list
- If using a VPN, verify the VPN's egress IP is included
- Mobile devices on cellular networks have dynamic IPs — consider whether IP restrictions are appropriate for mobile users

### "MFA required" but user has not set up MFA

- When `requireMfa` is `true`, users who have not enrolled in MFA will be blocked at login
- Direct affected users to set up MFA in their Resgrid account settings before the policy is enabled
- Consider rolling out MFA enrollment before enabling the `requireMfa` policy

### Cannot disable SSO-only mode

- You must be able to authenticate to change the security policy
- If locked out, contact Resgrid support for assistance with policy reset
