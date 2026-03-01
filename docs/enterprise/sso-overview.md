---
sidebar_position: 1
---

# Enterprise SSO & SCIM Overview

Resgrid supports enterprise-grade Single Sign-On (SSO) and automated user provisioning for organizations and government agencies that require centralized identity management. This feature set allows departments to authenticate users through their existing identity provider (IdP) using industry-standard protocols, automatically provision and deprovision user accounts, and enforce compliance-oriented security policies.

## Management Options

SSO, SCIM, and security policies can be managed through two interfaces:

| Interface | Access | Best For |
| --- | --- | --- |
| **Web Application** | Department Settings → Security → SSO & SCIM | Administrators who prefer a guided UI with wizard-style setup, built-in IdP documentation, and quick-fill presets |
| **REST API** | `/api/v4/SsoAdmin/*` endpoints | Automation, CI/CD pipelines, and programmatic configuration |

Both interfaces provide identical functionality. The web application is available to department administrators via the **SSO & Security** link in the Security section of the sidebar navigation.

## Supported Protocols

| Protocol | Use Case | Library / Stack |
| --- | --- | --- |
| **OIDC (OpenID Connect)** | Microsoft Entra ID, Okta, Auth0, Google Workspace | OpenIddict (built-in) |
| **SAML 2.0** | Enterprise IdPs, ADFS, government IdPs | Sustainsys.Saml2.AspNetCore2 |
| **SCIM 2.0** | Automated user lifecycle management | Custom implementation |

## Key Capabilities

### Single Sign-On (SSO)

- **OIDC and SAML 2.0** — connect to any standards-compliant identity provider
- **Automatic user provisioning** — new users authenticated via SSO can be automatically created in Resgrid with the correct department membership
- **Account linking** — existing Resgrid users are linked to their external identity by email match
- **Flexible local login** — optionally allow or disallow password-based login alongside SSO
- **Attribute mapping** — map IdP claims (email, name, subject) to Resgrid user profile fields
- **Per-department configuration** — each department maintains its own SSO configuration independent of other departments
- **Web-based management** — wizard-style setup with built-in IdP documentation, quick-fill attribute presets for Entra ID/Okta/Google/ADFS, and inline field hints

### SCIM 2.0 Provisioning

- **Automated user creation** — when a user is assigned access in your IdP, they are automatically created in Resgrid
- **Automated deactivation** — when a user is removed or disabled in your IdP, their Resgrid account is deactivated
- **Profile synchronization** — user profile updates (name, email) in the IdP are pushed to Resgrid
- **Secure token authentication** — each department has its own encrypted SCIM bearer token

### Security Policies

- **Mandatory MFA** — require multi-factor authentication for all department members
- **SSO-only mode** — disable password-based login entirely and force all users through SSO
- **Session controls** — configure session timeouts and limit concurrent sessions per user
- **IP restrictions** — restrict access to specific CIDR ranges (e.g., corporate VPN or government networks)
- **Password policies** — enforce minimum length, complexity requirements, and expiration periods
- **Data classification** — tag the department with a classification level (Unclassified, CUI, Confidential)

## Architecture

SSO configuration is stored per-department in the `DepartmentSsoConfigs` table. All sensitive values — client secrets, IdP certificates, signing certificates, and SCIM bearer tokens — are encrypted at rest using the internal `IEncryptionService` with department-specific keys. Secrets are never returned by any GET API endpoint or pre-filled in web UI forms; the web interface shows a "Secret stored" badge when a value exists and accepts new values as write-only inputs.

### Encrypted Department Tokens

All public-facing SSO URLs (SSO discovery, SAML ACS callback) use an **encrypted department token** instead of exposing the plain department code. The token is generated via `IEncryptionService.EncryptForDepartment("{id}:{code}", id, code)` and URL-escaped before embedding in URLs. The API decrypts the token to resolve the department, falling back to a plain `departmentCode` query parameter for backward compatibility.

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│  Mobile App  │◄───────►│  Resgrid API v4  │◄───────►│   Your IdP  │
│  or Web App  │  token  │  (OpenIddict +   │  OIDC/  │  (Entra,    │
│              │  exchange│  Sustainsys)     │  SAML   │  Okta, etc) │
└─────────────┘         └──────────────────┘         └─────────────┘
                               ▲
                               │ SCIM 2.0
                               │ (push from IdP)
                         ┌─────┴──────┐
                         │ IdP SCIM   │
                         │ Connector  │
                         └────────────┘
```

### Data Model

The SSO feature introduces two new entities and extends an existing one:

| Entity | Purpose |
| --- | --- |
| `DepartmentSsoConfig` | Stores the IdP connection settings, attribute mapping, and SCIM configuration per department |
| `DepartmentSecurityPolicy` | Stores compliance-oriented security rules (MFA, session limits, IP restrictions, password policies) per department |
| `DepartmentMember` (extended) | Adds `ExternalSsoId`, `SsoLinkedOn`, and `LastSsoLoginOn` fields to link external identities to Resgrid membership |

### Authentication Flow

1. The mobile or web app calls `GET /api/v4/connect/sso-config?departmentToken={encryptedToken}` to discover the SSO configuration (falls back to `departmentCode=DEPT` for backward compatibility)
2. The app redirects the user to the IdP for authentication (OIDC authorization code + PKCE, or SAML redirect)
3. After successful IdP authentication, the app receives a token or assertion
4. The app calls `POST /api/v4/connect/external-token` with the external token, provider type, and department code
5. Resgrid validates the token/assertion against the department's SSO configuration
6. If `AutoProvisionUsers` is enabled, a new user is created; otherwise, an existing user is linked by email
7. The department's security policy is enforced (IP check, MFA requirement, session limits)
8. Resgrid issues an OpenIddict access token to the app

### Audit Logging

All SSO and SCIM operations are logged to the Resgrid audit system:

| Audit Event | Trigger |
| --- | --- |
| `SsoConfigCreated` | A new SSO configuration is created |
| `SsoConfigUpdated` | An SSO configuration is modified |
| `SsoLoginSucceeded` | A user successfully authenticates via SSO |
| `SsoLoginFailed` | An SSO authentication attempt fails |
| `SsoUserProvisioned` | A new user is auto-provisioned from an SSO login |
| `ScimUserCreated` | A user is created via SCIM push |
| `ScimUserUpdated` | A user is updated via SCIM push |
| `ScimUserDeactivated` | A user is deactivated via SCIM push |

## Next Steps

- [SSO Setup Guide](sso-setup) — step-by-step instructions to configure SSO via the web UI or API, with IdP-specific walkthroughs
- [SCIM Provisioning](scim-provisioning) — configure automated user lifecycle management with tabbed IdP guides
- [Security Policies](security-policies) — enforce compliance controls with preset templates for Government/CUI and Enterprise environments
- [SSO API Reference](sso-api-reference) — complete API endpoint documentation including encrypted department token parameters
