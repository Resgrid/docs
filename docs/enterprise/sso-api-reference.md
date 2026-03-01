---
sidebar_position: 5
---

# SSO & SCIM API Reference

Complete reference for all SSO administration, SCIM provisioning, and SSO authentication endpoints in the Resgrid v4 API.

---

## SSO Administration Endpoints

All SSO administration endpoints require a valid Resgrid admin bearer token and that the caller is a department administrator. The SSO policy claims (`Sso_View`, `Sso_Create`, `Sso_Update`, `Sso_Delete`) are enforced in addition to the admin role check.

### List SSO Configurations

Returns all SSO configurations for the administrator's department. Secret values (client secrets, certificates, SCIM tokens) are never included in the response.

```
GET /api/v4/SsoAdmin/GetSsoConfigs
```

**Headers:**

| Header | Value |
| --- | --- |
| `Authorization` | `Bearer <admin-token>` |

**Required Permission:** `Sso_View` + department admin

**Response:** Array of SSO configuration objects (without secrets).

---

### Get Single SSO Configuration

Returns a single SSO configuration by ID. Secret values are replaced with boolean indicators (e.g., `hasIdpCertificate: true`).

```
GET /api/v4/SsoAdmin/GetSsoConfig/{departmentSsoConfigId}
```

**Headers:**

| Header | Value |
| --- | --- |
| `Authorization` | `Bearer <admin-token>` |

**Path Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `departmentSsoConfigId` | string | The ID of the SSO configuration |

**Required Permission:** `Sso_View` + department admin

---

### Create SSO Configuration

Creates a new SSO configuration for the department. Only one configuration per provider type (OIDC or SAML2) is allowed per department.

```
POST /api/v4/SsoAdmin/CreateSsoConfig
```

**Headers:**

| Header | Value |
| --- | --- |
| `Authorization` | `Bearer <admin-token>` |
| `Content-Type` | `application/json` |

**Required Permission:** `Sso_Create` + department admin

**Request Body:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `providerType` | string | Yes | `oidc` or `saml2` |
| `isEnabled` | bool | Yes | Whether this configuration is active |
| `clientId` | string | OIDC | OIDC client/application ID |
| `clientSecret` | string | No | OIDC client secret (encrypted before storage) |
| `authority` | string | OIDC | OIDC issuer/authority URL |
| `metadataUrl` | string | SAML | SAML IdP metadata URL |
| `entityId` | string | SAML | SAML SP entity ID |
| `assertionConsumerServiceUrl` | string | SAML | SAML Assertion Consumer Service URL |
| `idpCertificate` | string | SAML | IdP signing certificate in PEM format (encrypted before storage) |
| `signingCertificate` | string | No | SP signing certificate in PEM format (encrypted before storage) |
| `attributeMappingJson` | string | Yes | JSON mapping of IdP claims to Resgrid fields |
| `allowLocalLogin` | bool | No | Allow password login alongside SSO (default: `true`) |
| `autoProvisionUsers` | bool | No | Auto-create users on first SSO login (default: `false`) |
| `defaultRankId` | int | No | Default rank for auto-provisioned users |
| `scimEnabled` | bool | No | Enable SCIM provisioning (default: `false`) |

**Response:** `201 Created` with the created configuration object.

---

### Update SSO Configuration

Updates an existing SSO configuration. Omit secret fields or send `null` to leave them unchanged.

```
PUT /api/v4/SsoAdmin/UpdateSsoConfig/{departmentSsoConfigId}
```

**Headers:**

| Header | Value |
| --- | --- |
| `Authorization` | `Bearer <admin-token>` |
| `Content-Type` | `application/json` |

**Path Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `departmentSsoConfigId` | string | The ID of the SSO configuration to update |

**Required Permission:** `Sso_Update` + department admin

**Request Body:** Same fields as Create. Only include fields you want to change.

**Response:** `200 OK` with the updated configuration object.

---

### Delete SSO Configuration

Deletes an SSO configuration by provider type.

```
DELETE /api/v4/SsoAdmin/DeleteSsoConfig/{providerType}
```

**Headers:**

| Header | Value |
| --- | --- |
| `Authorization` | `Bearer <admin-token>` |

**Path Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `providerType` | string | `oidc` or `saml2` |

**Required Permission:** `Sso_Delete` + department admin

**Response:** `200 OK` on success.

:::warning
Deleting an SSO configuration will immediately prevent users from authenticating via that provider. If `requireSso` is enabled in the security policy, this may lock users out. Disable `requireSso` first.
:::

---

### Rotate SCIM Token

Generates a new SCIM bearer token for the specified provider type. Enables SCIM if not already enabled. The previous token is immediately invalidated.

```
POST /api/v4/SsoAdmin/RotateScimToken/{providerType}
```

**Headers:**

| Header | Value |
| --- | --- |
| `Authorization` | `Bearer <admin-token>` |

**Path Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `providerType` | string | `oidc` or `saml2` |

**Required Permission:** `Sso_Update` + department admin

**Response:**

```json
{
  "status": "success",
  "scimBearerToken": "abc123...very-long-random-token..."
}
```

:::danger
The token is returned in plaintext **once only**. Copy it immediately. It is stored encrypted and cannot be retrieved again.
:::

---

### Test SCIM Connection

Verifies that SCIM is enabled and a bearer token is configured for the specified provider type.

```
GET /api/v4/SsoAdmin/TestScimConnection/{providerType}
```

**Headers:**

| Header | Value |
| --- | --- |
| `Authorization` | `Bearer <admin-token>` |

**Path Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `providerType` | string | `oidc` or `saml2` |

**Required Permission:** `Sso_View` + department admin

**Response:**

```json
{
  "success": true
}
```

---

### Get Security Policy

Returns the department's current security policy.

```
GET /api/v4/SsoAdmin/GetSecurityPolicy
```

**Headers:**

| Header | Value |
| --- | --- |
| `Authorization` | `Bearer <admin-token>` |

**Required Permission:** `Sso_View` + department admin

**Response:** Security policy object (see [Security Policies](security-policies) for field details).

---

### Save Security Policy

Creates or updates the department's security policy.

```
POST /api/v4/SsoAdmin/SaveSecurityPolicy
```

**Headers:**

| Header | Value |
| --- | --- |
| `Authorization` | `Bearer <admin-token>` |
| `Content-Type` | `application/json` |

**Required Permission:** `Sso_Update` + department admin

**Request Body:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `requireMfa` | bool | No | Require MFA for all users |
| `requireSso` | bool | No | Force all login through SSO (rejected if no active SSO config) |
| `sessionTimeoutMinutes` | int | No | Session inactivity timeout (0 = disabled) |
| `maxConcurrentSessions` | int | No | Max simultaneous sessions per user (0 = unlimited) |
| `allowedIpRanges` | string | No | CSV of CIDR blocks (empty = all IPs allowed) |
| `passwordExpirationDays` | int | No | Days until password expires (0 = disabled) |
| `minPasswordLength` | int | No | Minimum password length (0 = system default) |
| `requirePasswordComplexity` | bool | No | Require mixed case, digits, and special characters |
| `dataClassificationLevel` | int | No | `0` = Unclassified, `1` = CUI, `2` = Confidential |

**Response:** `200 OK` with the saved security policy object.

---

## Public SSO Endpoints

These endpoints are used by mobile and web apps to discover SSO configuration and exchange external tokens. They do **not** require Resgrid authentication.

### SSO Discovery

Returns the public SSO configuration for a department, used by apps to determine if SSO is available and how to initiate the flow.

```
GET /api/v4/connect/sso-config?departmentToken={encryptedToken}
```

Or with the plain department code (backward-compatible):

```
GET /api/v4/connect/sso-config?departmentCode={code}
```

**Query Parameters:**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `departmentToken` | string | Preferred | Encrypted department token (generated by the web UI and shown on the SSO index page). Format: URL-escaped result of `EncryptForDepartment("{id}:{code}", id, code)` |
| `departmentCode` | string | Fallback | The department's unique code. Used when `departmentToken` is not provided (backward compatibility) |

**Response:** Public SSO configuration (provider type, authority/metadata URL, client ID, entity ID). No secrets are included.

---

### External Token Exchange

Exchanges an external IdP token or SAML assertion for a Resgrid OpenIddict access token.

```
POST /api/v4/connect/external-token
Content-Type: application/x-www-form-urlencoded
```

**Form Fields:**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `grant_type` | string | Yes | Must be `external_token` |
| `provider` | string | Yes | `oidc` or `saml2` |
| `external_token` | string | Yes | The token or assertion from the IdP |
| `department_token` | string | Preferred | Encrypted department token |
| `department_code` | string | Fallback | The department's unique code (used when `department_token` is not provided) |

**Response:** Standard OpenIddict token response:

```json
{
  "access_token": "eyJhbGciOiJSU0Et...",
  "token_type": "Bearer",
  "refresh_token": "eyJhbGciOiJSU0EtT0FFUC...",
  "expires_in": 86398,
  "id_token": "eyJhbGciOiJSUzI1N..."
}
```

**Error Responses:**

| HTTP Status | Error | Cause |
| --- | --- | --- |
| `400` | `invalid_grant` | The external token is invalid or expired |
| `400` | `invalid_request` | Missing required fields |
| `403` | `access_denied` | Security policy violation (IP restriction, MFA required, etc.) |
| `404` | `department_not_found` | No department matches the provided code |
| `404` | `sso_not_configured` | No active SSO configuration for the department/provider |

---

### SAML Mobile Callback

The SAML Assertion Consumer Service (ACS) endpoint for mobile app flows. This is configured as the ACS URL in the SAML IdP.

```
POST /api/v4/connect/saml-mobile-callback?departmentToken={encryptedToken}
```

Or with the plain department code (backward-compatible):

```
POST /api/v4/connect/saml-mobile-callback?departmentCode={code}
```

**Query Parameters:**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `departmentToken` | string | Preferred | Encrypted department token (the web UI generates this for SAML ACS URLs) |
| `departmentCode` | string | Fallback | Plain department code for backward compatibility |

This endpoint receives the SAML response from the IdP, validates the assertion, and redirects the mobile app with the authentication result.

:::info Encrypted Department Token
The web application generates the SAML ACS URL with an encrypted department token so that the plain department code is never exposed in public-facing URLs. The API decrypts the token to resolve the department. If no token is provided, it falls back to the `departmentCode` parameter.
:::

---

## SCIM 2.0 Endpoints

SCIM endpoints are served under `/scim/v2` and authenticated via the per-department SCIM bearer token. All requests must include the `X-Department-Id` header.

**Required Headers:**

| Header | Value |
| --- | --- |
| `Authorization` | `Bearer <scim-bearer-token>` |
| `X-Department-Id` | Department ID (integer) |
| `Content-Type` | `application/scim+json` (for POST/PUT/PATCH) |

### List Users

```
GET /scim/v2/Users
```

Supports SCIM filtering (`filter=userName eq "user@example.com"`) and pagination (`startIndex`, `count`).

---

### Create User

```
POST /scim/v2/Users
```

Creates a new Resgrid user (`IdentityUser` + `UserProfile` + `DepartmentMember`).

---

### Get User

```
GET /scim/v2/Users/{id}
```

Returns a single user in SCIM schema format.

---

### Replace User (Full Update)

```
PUT /scim/v2/Users/{id}
```

Replaces all mutable fields of the user with the provided values.

---

### Update User (Partial)

```
PATCH /scim/v2/Users/{id}
```

Applies partial updates using SCIM `PatchOp` operations.

---

### Delete / Deactivate User

```
DELETE /scim/v2/Users/{id}
```

Sets `IsDisabled = true` on the `DepartmentMember`. The user account is preserved but deactivated.

---

### List Groups

```
GET /scim/v2/Groups
```

Returns department roles mapped to SCIM Group resources.

---

## Endpoint Summary Table

### Admin Endpoints (Authenticated)

| Method | Endpoint | Permission | Description |
| --- | --- | --- | --- |
| `GET` | `/api/v4/SsoAdmin/GetSsoConfigs` | `Sso_View` + admin | List all SSO configs |
| `GET` | `/api/v4/SsoAdmin/GetSsoConfig/{id}` | `Sso_View` + admin | Get single SSO config (no secrets) |
| `POST` | `/api/v4/SsoAdmin/CreateSsoConfig` | `Sso_Create` + admin | Create new SSO config |
| `PUT` | `/api/v4/SsoAdmin/UpdateSsoConfig/{id}` | `Sso_Update` + admin | Update existing SSO config |
| `DELETE` | `/api/v4/SsoAdmin/DeleteSsoConfig/{providerType}` | `Sso_Delete` + admin | Delete SSO config |
| `POST` | `/api/v4/SsoAdmin/RotateScimToken/{providerType}` | `Sso_Update` + admin | Generate new SCIM bearer token |
| `GET` | `/api/v4/SsoAdmin/TestScimConnection/{providerType}` | `Sso_View` + admin | Verify SCIM is configured |
| `GET` | `/api/v4/SsoAdmin/GetSecurityPolicy` | `Sso_View` + admin | Get security policy |
| `POST` | `/api/v4/SsoAdmin/SaveSecurityPolicy` | `Sso_Update` + admin | Create/update security policy |

### Public Endpoints (No Auth Required)

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v4/connect/sso-config?departmentToken=X` | Mobile app SSO discovery (encrypted token preferred; `departmentCode=X` as fallback) |
| `POST` | `/api/v4/connect/external-token` | Exchange IdP token for Resgrid token (`department_token` preferred; `department_code` as fallback) |
| `POST` | `/api/v4/connect/saml-mobile-callback` | SAML ACS relay for mobile apps (`departmentToken` preferred; `departmentCode` as fallback) |

### SCIM Endpoints (SCIM Token Auth)

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/scim/v2/Users` | List users |
| `POST` | `/scim/v2/Users` | Create user |
| `GET` | `/scim/v2/Users/{id}` | Get user |
| `PUT` | `/scim/v2/Users/{id}` | Replace user |
| `PATCH` | `/scim/v2/Users/{id}` | Partial update user |
| `DELETE` | `/scim/v2/Users/{id}` | Deactivate user |
| `GET` | `/scim/v2/Groups` | List groups |
