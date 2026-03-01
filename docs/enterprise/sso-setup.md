---
sidebar_position: 2
---

# SSO Setup Guide

This guide walks department administrators through the complete process of configuring Single Sign-On for their Resgrid department. SSO can be managed through the **web application** (recommended for most administrators) or through the **REST API**.

:::tip Web UI vs API
The web application provides a wizard-style setup experience with built-in IdP documentation, inline field hints, and quick-fill attribute mapping presets. The API is available for automation and programmatic configuration. Both approaches are documented side-by-side below.
:::

## Prerequisites

- A Resgrid department with an active administrator account
- An identity provider (IdP) that supports OIDC or SAML 2.0
- Administrative access to your IdP to register a new application

## Quick-Start Checklist

1. **Decide your protocol** — OIDC (Microsoft Entra, Okta, Google, Auth0) or SAML 2.0 (most enterprise IdPs)
2. **Register Resgrid** as an application in your IdP
3. **Create the SSO configuration** — via the web UI wizard or `POST /api/v4/SsoAdmin/CreateSsoConfig`
4. **Enable** the configuration (`isEnabled: true`)
5. **Optionally** configure SCIM via the web UI SCIM Setup page or `POST /api/v4/SsoAdmin/RotateScimToken`
6. **Optionally** harden access via the web UI Security Policy page or `POST /api/v4/SsoAdmin/SaveSecurityPolicy`
7. **Test** SSO login from the mobile app or via the SSO discovery URL shown on the SSO index page

---

## Step 1 — Register Resgrid in Your Identity Provider

### OIDC (Microsoft Entra ID / Okta / Auth0 / Google)

When registering Resgrid as an OIDC application in your identity provider, use these values:

| IdP Field | Value to Enter |
| --- | --- |
| Application type | Public client / Single-page app (PKCE, no client secret required for mobile) |
| Redirect URI | `resgrid://auth/callback` (mobile) and `https://app.resgrid.com/auth/callback` (web) |
| Allowed grant types | `authorization_code`, `refresh_token` |
| Scopes | `openid`, `email`, `profile`, `offline_access` |

After registration, copy these values from your IdP:

- **Client ID** (e.g. `a1b2c3d4-...`)
- **Authority / Issuer URL** (e.g. `https://login.microsoftonline.com/{tenant-id}/v2.0`)

### SAML 2.0

When registering Resgrid as a SAML service provider in your identity provider, use these values:

| IdP Field | Value to Enter |
| --- | --- |
| SP Entity ID | Choose a unique URI, e.g. `https://app.resgrid.com/saml/{departmentCode}` |
| ACS URL (Assertion Consumer Service) | `https://{your-api-host}/api/v4/connect/saml-mobile-callback?departmentToken={encryptedToken}` (shown on the SSO setup page; falls back to `departmentCode={DEPT}` for backward compatibility) |
| Name ID format | `emailAddress` or `persistent` |
| Attribute statements | Map `email`, `givenname`, `surname` to your directory attributes |

After registration, copy these values from your IdP:

- **Metadata URL** (e.g. `https://idp.example.com/metadata.xml`)
- **IdP Signing Certificate** (PEM format)

---

## Step 2 — Create the SSO Configuration

### Using the Web Application

1. Navigate to **Department Settings** → **Security** → **SSO & SCIM**
2. Click **New SSO Configuration**
3. The wizard guides you through three steps:
   - **Step 1 — Provider & Basics**: Select OIDC or SAML 2.0, enable/disable the configuration, and set local login and auto-provisioning preferences
   - **Step 2 — Connection Details**: The form adapts based on your provider selection:
     - *OIDC*: Enter Client ID, Client Secret (optional), and Authority URL
     - *SAML 2.0*: Enter Entity ID, Metadata URL, ACS URL, and IdP Certificate. Each field includes inline hints with example values for major IdPs
   - **Step 3 — Attribute Mapping**: Configure how IdP claims map to Resgrid fields. Use the **quick-fill preset buttons** to auto-populate correct mappings for Microsoft Entra ID, Okta, Google Workspace, or ADFS
4. Click **Save** to create the configuration

:::tip Quick-Fill Presets
The attribute mapping step includes one-click preset buttons for common identity providers. Clicking a preset (e.g., "Microsoft Entra ID") populates the mapping JSON with the correct claim URIs for that provider. You can modify the values after applying a preset.
:::

### Using the API

All API requests must include the Resgrid admin bearer token as `Authorization: Bearer <token>`.

### OIDC Example

```bash
POST /api/v4/SsoAdmin/CreateSsoConfig
Content-Type: application/json
Authorization: Bearer <admin-token>
```

```json
{
  "providerType": "oidc",
  "isEnabled": true,
  "clientId": "a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "authority": "https://login.microsoftonline.com/{tenant-id}/v2.0",
  "allowLocalLogin": true,
  "autoProvisionUsers": true,
  "scimEnabled": false,
  "attributeMappingJson": "{\"email\":\"email\",\"firstName\":\"given_name\",\"lastName\":\"family_name\"}"
}
```

**Response:**

```json
{
  "status": "created",
  "departmentSsoConfigId": "3f7a1c2b-...",
  ...
}
```

:::tip
Save the `departmentSsoConfigId` from the response — you'll need it to update or delete this configuration later.
:::

### SAML 2.0 Example

```bash
POST /api/v4/SsoAdmin/CreateSsoConfig
Content-Type: application/json
Authorization: Bearer <admin-token>
```

```json
{
  "providerType": "saml2",
  "isEnabled": true,
  "entityId": "https://app.resgrid.com/saml/FIRE123",
  "metadataUrl": "https://idp.example.com/metadata.xml",
  "assertionConsumerServiceUrl": "https://api.resgrid.com/api/v4/connect/saml-mobile-callback?departmentCode=FIRE123",
  "idpCertificate": "-----BEGIN CERTIFICATE-----\nMIID...\n-----END CERTIFICATE-----",
  "allowLocalLogin": false,
  "autoProvisionUsers": true,
  "scimEnabled": false,
  "attributeMappingJson": "{\"email\":\"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress\",\"firstName\":\"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname\",\"lastName\":\"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname\"}"
}
```

:::warning Security Note
`idpCertificate` and `signingCertificate` are accepted as plaintext on input only. They are encrypted with your department-specific key before storage and are **never returned** by any GET endpoint. The response only contains boolean flags like `hasIdpCertificate: true`.

In the web UI, secret fields (Client Secret, IdP Certificate, Signing Certificate) are **never pre-filled** when editing. A "Secret stored" badge is shown when a value exists, with hint text "Leave blank to keep current value." Submitting a blank secret field does not overwrite the stored value.
:::

---

## Step 3 — View and Update Your Configuration

### Using the Web Application

All SSO configurations are listed on the **SSO & SCIM** index page (**Department Settings** → **Security** → **SSO & SCIM**). The page shows:

- An **overview panel** with your department's SSO discovery URL (using the encrypted department token)
- A **configuration table** listing each SSO config with provider type, status, and action buttons
- **Edit** and **Delete** buttons for each configuration

To edit, click the **Edit** button to reopen the wizard with your current values pre-filled (except secrets). To delete, click **Delete** and confirm in the modal dialog.

### Using the API

#### List All SSO Configs

```bash
GET /api/v4/SsoAdmin/GetSsoConfigs
Authorization: Bearer <admin-token>
```

### Get a Single Config (No Secrets)

```bash
GET /api/v4/SsoAdmin/GetSsoConfig/{departmentSsoConfigId}
Authorization: Bearer <admin-token>
```

### Update a Config

Omit secret fields (`clientSecret`, `idpCertificate`, `signingCertificate`) or send `null` to leave them unchanged. Only provide a value when you need to overwrite the stored secret. This matches the web UI behavior where blank secret fields are not overwritten.

```bash
PUT /api/v4/SsoAdmin/UpdateSsoConfig/{departmentSsoConfigId}
Content-Type: application/json
Authorization: Bearer <admin-token>
```

```json
{
  "providerType": "oidc",
  "isEnabled": true,
  "clientId": "new-client-id",
  "authority": "https://login.microsoftonline.com/{tenant-id}/v2.0",
  "allowLocalLogin": true,
  "autoProvisionUsers": true,
  "scimEnabled": false
}
```

### Delete a Configuration

```bash
DELETE /api/v4/SsoAdmin/DeleteSsoConfig/oidc
Authorization: Bearer <admin-token>
```

---

## Step 4 — Test the SSO Login

Once your configuration is saved and enabled, test the SSO flow.

### Using the Web Application

The SSO index page displays your department's **SSO Discovery URL** with the encrypted department token. Copy this URL and open it in a browser or share it with your IdP administrator to verify the configuration returns the expected values.

### Using the API

Test the SSO discovery endpoint that mobile and web apps use:

```bash
GET /api/v4/connect/sso-config?departmentToken={encryptedToken}
```

Or with the plain department code (backward-compatible):

```bash
GET /api/v4/connect/sso-config?departmentCode=YOUR_DEPT_CODE
```

This returns the public SSO configuration (provider type, authority, client ID) that clients need to initiate the SSO flow. No authentication is required for this endpoint.

### Token Exchange

After a user authenticates with your IdP, the app exchanges the external token for a Resgrid access token:

```bash
POST /api/v4/connect/external-token
Content-Type: application/x-www-form-urlencoded
```

| Field | Description |
| --- | --- |
| `grant_type` | `external_token` |
| `provider` | `oidc` or `saml2` |
| `external_token` | The token or assertion received from the IdP |
| `department_code` | Your Resgrid department code |

The response follows the same format as the standard `/connect/token` endpoint, returning an `access_token`, `refresh_token`, and `expires_in`.

---

## Attribute Mapping Reference

The `attributeMappingJson` field is a JSON object mapping Resgrid field names (keys) to the claim URI or name your IdP emits (values).

### Resgrid Fields

| Resgrid Field Key | What It Maps To |
| --- | --- |
| `email` | User's email address |
| `firstName` | User's given name |
| `lastName` | User's surname / family name |
| `subject` | The unique IdP subject identifier (used for SSO account linking) |

### IdP-Specific Examples

The web UI's wizard provides **quick-fill preset buttons** that auto-populate these mappings. When using the API, use the JSON values below.

**Microsoft Entra ID (Azure AD):**

```json
{
  "email": "email",
  "firstName": "given_name",
  "lastName": "family_name",
  "subject": "sub"
}
```

**Okta (SAML):**

```json
{
  "email": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
  "firstName": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
  "lastName": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname",
  "subject": "nameidentifier"
}
```

**Google Workspace (OIDC):**

```json
{
  "email": "email",
  "firstName": "given_name",
  "lastName": "family_name",
  "subject": "sub"
}
```

---

## Configuration Fields Reference

### DepartmentSsoConfig Fields

| Field | Type | Description |
| --- | --- | --- |
| `providerType` | string | `oidc` or `saml2` |
| `isEnabled` | bool | Whether this SSO configuration is active |
| `clientId` | string | OIDC client/application ID |
| `clientSecret` | string | OIDC client secret (encrypted at rest, write-only) |
| `authority` | string | OIDC issuer/authority URL |
| `metadataUrl` | string | SAML IdP metadata URL |
| `entityId` | string | SAML SP entity ID |
| `assertionConsumerServiceUrl` | string | SAML ACS URL |
| `idpCertificate` | string | SAML IdP signing certificate in PEM format (encrypted at rest, write-only) |
| `signingCertificate` | string | SAML SP signing certificate (encrypted at rest, write-only) |
| `attributeMappingJson` | string | JSON mapping of IdP claims to Resgrid fields |
| `allowLocalLogin` | bool | Whether password-based login is still permitted (default: `true`) |
| `autoProvisionUsers` | bool | Automatically create Resgrid users on first SSO login |
| `defaultRankId` | int? | Default rank assigned to auto-provisioned users |
| `scimEnabled` | bool | Whether SCIM provisioning is enabled (default: `false`) |

## Troubleshooting

### SSO login fails with "invalid_token"

- Verify the `authority` or `metadataUrl` is correct and accessible from the Resgrid API server
- For OIDC, ensure the `clientId` matches exactly what is registered in your IdP
- For SAML, ensure the `entityId` matches the SP entity ID configured in your IdP
- Check that the IdP certificate has not expired

### User is not auto-provisioned

- Confirm `autoProvisionUsers` is set to `true` in the SSO configuration
- Verify the `attributeMappingJson` includes at least the `email` mapping
- Check that the email claim is being sent by your IdP

### "SSO required" error when trying to log in with password

- A department administrator has set `requireSso: true` in the security policy
- Set `allowLocalLogin: true` in the SSO config or `requireSso: false` in the security policy to re-enable password login

### Mobile app does not show SSO option

- Ensure the SSO configuration `isEnabled` is `true`
- Verify the department code used in the app matches the department's code in Resgrid
- Test the SSO discovery endpoint: `GET /api/v4/connect/sso-config?departmentCode=YOUR_CODE`
