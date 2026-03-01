---
sidebar_position: 3
---

# SCIM 2.0 Provisioning

SCIM (System for Cross-domain Identity Management) 2.0 allows your identity provider to automatically create, update, and deactivate Resgrid user accounts when changes are made in your corporate directory. This eliminates manual user management and ensures that access is revoked promptly when personnel leave the organization.

## How It Works

When SCIM is enabled for a department, your identity provider pushes user lifecycle events to Resgrid's SCIM endpoint:

```
IdP Directory ──► SCIM Connector ──► Resgrid SCIM API ──► User Account Changes
                                     /scim/v2/Users
```

| IdP Event | Resgrid Action |
| --- | --- |
| User assigned to Resgrid app | Create `IdentityUser` + `UserProfile` + `DepartmentMember` |
| User profile updated (name, email) | Update `UserProfile` and linked fields |
| User unassigned / disabled | Deactivate account (`IsDisabled` / `IsDeleted` on `DepartmentMember`) |

All SCIM operations are authenticated using a per-department bearer token. Each operation is logged to the Resgrid audit system.

## Prerequisites

- An active SSO configuration for the department (OIDC or SAML 2.0)
- An identity provider that supports SCIM 2.0 provisioning (e.g., Okta, Microsoft Entra ID, OneLogin, JumpCloud)
- Department administrator access to Resgrid (web application or API)

## Setup

### Step 1 — Enable SCIM and Generate a Bearer Token

#### Using the Web Application

1. Navigate to **Department Settings** → **Security** → **SSO & SCIM**
2. Click **SCIM Setup** next to your SSO configuration
3. Click the **Rotate / Generate SCIM Token** button
4. The token is displayed **once** in a highlighted yellow warning banner at the top of the page. The token field is auto-selected for easy copying. Use the **Copy** button to copy it to your clipboard.

:::danger One-Time Display
The SCIM bearer token is shown in plaintext **once only** on the SCIM Setup page immediately after generation. It is stored encrypted and no subsequent page load will reveal it. If you navigate away without copying the token, you must rotate again to generate a new one.
:::

#### Using the API

Call the rotate token endpoint. This enables SCIM on the SSO configuration and returns a new bearer token:

```bash
POST /api/v4/SsoAdmin/RotateScimToken/oidc
Authorization: Bearer <admin-token>
```

**Response:**

```json
{
  "status": "success",
  "scimBearerToken": "abc123...very-long-random-token...",
  ...
}
```

:::danger Copy the Token Immediately
The SCIM bearer token is returned in **plaintext once only** and stored encrypted. If you lose it, call the rotate endpoint again to generate a new one (this invalidates the previous token).
:::

### Step 2 — Configure SCIM in Your Identity Provider

The SCIM Setup page in the web application displays all the connector settings you need in a convenient table with **copy buttons** for each value. It also includes **tabbed step-by-step guides** with specific instructions for each major identity provider.

Use the following values when setting up the SCIM connector in your IdP:

| IdP SCIM Field | Value |
| --- | --- |
| SCIM connector base URL | `https://{your-api-host}/scim/v2` |
| Authentication method | HTTP Header |
| Authorization header | `Bearer <scimBearerToken from Step 1>` |
| Custom header | `X-Department-Id: {your departmentId (integer)}` |
| Supported resources | Users |
| Update method | PUT (full replace) or PATCH (partial) |

#### IdP-Specific Setup Guides

The web application’s SCIM Setup page includes tabbed instructions for each provider. Below is a summary of the key steps for each.

##### Okta

1. In your Okta admin console, go to **Applications** → your Resgrid app → **Provisioning** tab
2. Click **Configure API Integration** and check **Enable API Integration**
3. Set **SCIM connector base URL** to `https://{your-api-host}/scim/v2`
4. Set **Authentication Mode** to **HTTP Header**
5. Paste your SCIM bearer token in the **Authorization** field (prefixed with `Bearer `)
6. Add a custom header `X-Department-Id` with your department ID
7. Click **Test API Credentials** to verify connectivity
8. Enable the provisioning features you want: Create Users, Update User Attributes, Deactivate Users

##### Microsoft Entra ID (Azure AD)

1. In the Azure portal, go to **Enterprise Applications** → your Resgrid app → **Provisioning**
2. Set **Provisioning Mode** to **Automatic**
3. Under **Admin Credentials**, set **Tenant URL** to `https://{your-api-host}/scim/v2`
4. Set **Secret Token** to your SCIM bearer token
5. Add HTTP header `X-Department-Id: {your departmentId}`
6. Click **Test Connection** to verify
7. Configure **Mappings** to map Entra user attributes to SCIM fields
8. Set the provisioning scope and turn provisioning **On**

##### Google Workspace

1. In the Google Admin console, go to **Apps** → **SAML apps** (or use a third-party SCIM bridge)
2. Google Workspace does not natively support outbound SCIM. Use a SCIM bridge service or configure via the Google Cloud Identity API
3. Set the SCIM endpoint to `https://{your-api-host}/scim/v2`
4. Configure bearer token authentication with your SCIM token
5. Include the `X-Department-Id` header in all requests

##### Generic / Other IdPs

| Setting | Value |
| --- | --- |
| SCIM Base URL | `https://{your-api-host}/scim/v2` |
| Auth Method | Bearer Token |
| Bearer Token | `<your SCIM token>` |
| Required Header | `X-Department-Id: <departmentId>` |
| Supported Operations | Create, Read, Update (PUT & PATCH), Delete/Deactivate |
| Schema | `urn:ietf:params:scim:schemas:core:2.0:User` |

### Step 3 — Verify Connectivity

#### Using the Web Application

The SCIM Setup page includes a **Test Connection** section. If SCIM is enabled and a token is stored, the page shows a green success indicator.

#### Using the API

Test that SCIM is properly configured:

```bash
GET /api/v4/SsoAdmin/TestScimConnection/oidc
Authorization: Bearer <admin-token>
```

Returns `success: true` when SCIM is enabled and a token is stored.

You can also test directly from your IdP's SCIM test tool — most IdPs provide a "Test Connection" button that sends a `GET /scim/v2/Users` request.

---

## SCIM Endpoints

Resgrid implements the following SCIM 2.0 endpoints under `/scim/v2`:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/scim/v2/Users` | List users (supports filtering and pagination) |
| `POST` | `/scim/v2/Users` | Create a new user |
| `GET` | `/scim/v2/Users/{id}` | Get a specific user |
| `PUT` | `/scim/v2/Users/{id}` | Replace a user (full update) |
| `PATCH` | `/scim/v2/Users/{id}` | Partially update a user |
| `DELETE` | `/scim/v2/Users/{id}` | Deactivate a user |
| `GET` | `/scim/v2/Groups` | List groups (returns department roles) |

All requests must include:
- `Authorization: Bearer <scimBearerToken>` header
- `X-Department-Id: <departmentId>` header

### SCIM Schema

Resgrid maps the standard SCIM `User` schema (`urn:ietf:params:scim:schemas:core:2.0:User`) to internal entities:

| SCIM User Field | Resgrid Field | Entity |
| --- | --- | --- |
| `userName` | Email address | `IdentityUser.Email` |
| `name.givenName` | First name | `UserProfile.FirstName` |
| `name.familyName` | Last name | `UserProfile.LastName` |
| `emails[0].value` | Email address | `IdentityUser.Email` |
| `active` | Account active status | `DepartmentMember.IsDisabled` (inverted) |
| `externalId` | External IdP identifier | `DepartmentMember.ExternalSsoId` |

### Example: Create User (POST)

**Request from IdP:**

```json
POST /scim/v2/Users
Authorization: Bearer <scim-token>
X-Department-Id: 42
Content-Type: application/scim+json

{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "userName": "jane.doe@example.com",
  "name": {
    "givenName": "Jane",
    "familyName": "Doe"
  },
  "emails": [
    {
      "primary": true,
      "value": "jane.doe@example.com",
      "type": "work"
    }
  ],
  "externalId": "abc-123-ext",
  "active": true
}
```

**Response:**

```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "id": "usr-guid-...",
  "externalId": "abc-123-ext",
  "userName": "jane.doe@example.com",
  "name": {
    "givenName": "Jane",
    "familyName": "Doe"
  },
  "emails": [
    {
      "primary": true,
      "value": "jane.doe@example.com",
      "type": "work"
    }
  ],
  "active": true,
  "meta": {
    "resourceType": "User",
    "created": "2026-02-28T12:00:00Z",
    "lastModified": "2026-02-28T12:00:00Z",
    "location": "https://api.resgrid.com/scim/v2/Users/usr-guid-..."
  }
}
```

### Example: Deactivate User (PATCH)

When a user is removed from the Resgrid application in your IdP, the IdP typically sends a PATCH request to set `active` to `false`:

```json
PATCH /scim/v2/Users/usr-guid-...
Authorization: Bearer <scim-token>
X-Department-Id: 42
Content-Type: application/scim+json

{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
  "Operations": [
    {
      "op": "replace",
      "path": "active",
      "value": false
    }
  ]
}
```

This sets `IsDisabled = true` on the `DepartmentMember` record. The user's Resgrid account is preserved but they can no longer log in or access department resources.

---

## Token Rotation

To rotate the SCIM bearer token (e.g., for security compliance or if the token is compromised):

### Using the Web Application

1. Navigate to the **SCIM Setup** page
2. Click **Rotate / Generate SCIM Token**
3. The old token is immediately invalidated
4. Copy the new token from the one-time display banner
5. Update the bearer token in your IdP's SCIM connector settings

### Using the API

1. Call `POST /api/v4/SsoAdmin/RotateScimToken/{providerType}` to generate a new token
2. The old token is immediately invalidated
3. Update the bearer token in your IdP's SCIM connector settings with the new token

:::warning
Rotating the token will cause all SCIM operations from your IdP to fail until the new token is configured in the IdP. Plan for a brief interruption when rotating tokens.
:::

---

## Audit Logging

All SCIM operations are recorded in the Resgrid audit log:

| Audit Event | Trigger |
| --- | --- |
| `ScimUserCreated` | A new user was created via SCIM `POST /Users` |
| `ScimUserUpdated` | A user was updated via SCIM `PUT` or `PATCH /Users/{id}` |
| `ScimUserDeactivated` | A user was deactivated via SCIM `PATCH` or `DELETE /Users/{id}` |

---

## Troubleshooting

### IdP reports "401 Unauthorized" on SCIM requests

- Verify the SCIM bearer token was copied correctly (no extra whitespace)
- Check that the `Authorization` header is formatted as `Bearer <token>` (with a space)
- Ensure the `X-Department-Id` header is included and contains the correct integer department ID
- If the token was rotated, update the IdP with the new token

### Users are created but not linked to SSO

- Ensure the `externalId` field is populated in the SCIM request from your IdP
- This value is stored as `ExternalSsoId` on the `DepartmentMember` and used for SSO account linking

### SCIM creates duplicate users

- Resgrid matches incoming SCIM users by email address first
- If a user with the same email already exists, their account is linked rather than duplicated
- Ensure your IdP is sending the correct email address in the `userName` or `emails` field

### User deactivation does not work

- Verify your IdP sends a `PATCH` with `active: false` or a `DELETE` request when unassigning users
- Check the Resgrid audit log for `ScimUserDeactivated` events to confirm the request was received
