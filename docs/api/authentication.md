---
sidebar_position: 2
---

# API Authentication

Resgrid as of the v4 version of the API uses the JWT (JSON Web Token) <https://jwt.io/> standard with OpenID Connect. You need to auth to the Resgrid API via a specific endpoint before you can call operations against the API.

A system-to-system integration that should not sign in as a person can use a [department API key](#department-api-keys) instead.

## Connect Operation

To Authenticate with the Resgrid API you need to submit a POST request to the the `v4/connect/token` endpoint. Once this is done you will have the data needed to make subsequent calls the the other functions on the Resgrid API.


Example of using a Username and Password Combo:

```bash
 curl -v -X POST \
-H "Content-type:application/x-www-form-urlencoded" \
"https://api.resgrid.com/api/v4/connect/token" \
-d "grant_type=password&scope=openid profile&username=${username}&password=${password}"
```

Request Form Fields

| Field | Description |
| --- | --- |
| `grant_type` | `password` if you are supplying a username and password, `refresh_token` if you are supplying a refresh token to get a new `auth_token`. |
| `refresh_token` | Only if your `grant_type` is `refresh_token` your current refresh token |
| `username` | Only if `grant_type` is `password` your username. |
| `password` | Only if `grant_type` is `password` your users password. |
| `scope` | Set to `openid profile offline_access` or if you don't want to use the refresh token flow `openid profile`. |

Example Response:

```
 HTTP/1.1 200 OK
 Content-Type: application/json
 Cache-Control: no-store
 Pragma: no-cache
 {
     "access_token": "eyJhbGciOiJSU0Et...",
     "token_type": "Bearer",
     "refresh_token": "eyJhbGciOiJSU0EtT0FFUC...",
     "expires_in": 86398,
     "id_token": "eyJhbGciOiJSUzI1N..."
 }
```

Response Properties

| Field | Description |
| --- | --- |
| `access_token` | The `Bearer` access token you need to pass into requests to authorize them. |
| `token_type` | Commonly `Bearer` for almost all use cases. |
| `expires_in` | The expiration time of the access token in seconds. |
| `refresh_token` | An opaque refresh token. This is returned if the `offline_access` scope is granted. |
| `id_token` | An ID token. This is returned if the openid scope is granted. |

## Authorization Expiration

Once you have called the `v4/connect/token` endpoint and received a response you can now use data from that response to authorize against other Resgrid API calls.

You will want to use the `access_token` returned as part of the `v4/connect/token` call above. Note, these tokens do expire, when you authenticated you received a `expires_in` as part of the payload result, your `access_token` will expire in the amount of seconds in that value from when you received the response.

You can call `v4/connect/token` with the username and password or you can pass in `offline_access` as part of the `scope` parameter to receive a `refresh_token` as part of the response and pass that as `refresh_token` into the body instead of `username` and `password`. You also need to set the `grant_type` as `refresh_token`. This is useful if you don't want to reuse username and passwords for the backend systems and only want to prompt a user for a username and password every once and a while.

## Authorizing API Calls

Once you have a valid, and not expired, `access_token` you can pass it in the Authorization header value as a Bearer token.

Example Request using `access_token`:

```bash
 curl -v -X GET \
-H "Authorization: Bearer `access_token`" \
"https://api.resgrid.com/api/v4/Statuses/GetAllStatusesForPersonnel" \
```


Example Response:


```
 HTTP/1.1 200 OK
 Content-Type: application/json
 Cache-Control: no-store
 Pragma: no-cache
 {
    "Data":{}",
    "Version":"v4",
    "Node":"resgrid-api-6fb86b9f6c-wvs4d",
    "Environment":"QA",
    "RequestId":"00-62a47705765e3814b64e8af52dcf2655-5a95c0273223f544-01",
    "Status":"success",
    "PreviousPageUrl":null,
    "NextPageUrl":null
}
```


## Department API keys

Use a **department API key** when another system, rather than a person, calls Resgrid: a scheduling or case-management system that feeds in follow-up calls, a records system that reads calls, a CAD bridge. The key belongs to the department, not to a member, so there is no username or password to store in that system and nothing breaks when someone leaves.

A department admin creates keys under **Security → API Keys** in the web app ([Security & Permissions](../web-app/security-permissions#api-keys)). Each key:

- can only call the endpoints of the **scopes** you choose (below), and nothing else;
- has an **expiry date** (30 days to 2 years) after which it stops working;
- can be **revoked** at any time, which takes effect at once;
- can optionally be limited to **source addresses** (IP addresses or CIDR ranges);
- is shown **once**, when it is created. Resgrid stores only a keyed hash of it, so a lost key cannot be recovered: revoke it and create another.

Send the key in the `X-Resgrid-ApiKey` header. There is no token exchange and no refresh step. Never put a key in a URL or query string, and do not send a bearer token with it.

```bash
curl -X POST "https://api.resgrid.com/api/v4/Calls/SaveCall" \
  -H "X-Resgrid-ApiKey: rgk_XXXXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
  -H "Content-Type: application/json" \
  -d '{ "Name": "Follow-up visit", "Nature": "Post-discharge check", "Priority": 1, "Type": "Follow-up", "IsPending": true, "ExternalId": "EHR-55120" }'
```

### Scopes

| Scope | Endpoints (`api/v4/...`) |
|---|---|
| `calls.read` | `Calls/GetActiveCalls`, `Calls/GetCall`, `Calls/GetCalls`, `Calls/GetPendingCalls`, `Calls/GetAllPendingScheduledCalls`, `Calls/GetNewCallFieldPolicy` |
| `calls.create` | `Calls/SaveCall`, including pending (`IsPending`) and scheduled (`DispatchOn` / `DispatchOnUtc`) calls |
| `calls.update` | `Calls/EditCall`, `Calls/DispatchCallNow`, `Calls/UpdateScheduledDispatchTime` |
| `calls.close` | `Calls/CloseCall` |
| `reference.read` | `CallTypes/GetAllCallTypes`, `CallPriorities/GetAllCallPriorites`, `Dispatch/GetCallTemplates`, `Groups/GetAllGroups`, `Dispatch/GetRolesForCallGrid` (what you need to fill in a call and its dispatch list) |
| `units.read` | `Units/GetAllUnits`, `UnitStatus/GetAllUnitStatuses` |

Give a key only the scopes it needs. A system that only feeds in pending calls needs `calls.create` (and `reference.read` if it looks up types, priorities, groups or roles). No other endpoint accepts a key, whatever its scopes: deleting calls, personnel, messages and settings are always out of reach.

### What a key acts as

A request made with a key acts for the key's department. Department-wide checks run as the department's managing user, narrowed to the key's scopes, so a call created with a key shows the managing user as the reporting user. Use `ExternalId` (or `ReferenceId`) to carry your own system's id. Departments using [Advanced Data Protection](../web-app/data-protection) receive the protected fields through the broker's encrypt-only lane, the same as other unattended integrations; reads return them redacted.

### Errors

| Response | Meaning |
|---|---|
| `401` | The key is missing, unknown, expired, revoked or used from an address it is not allowed from. Also returned by every endpoint a key cannot call. |
| `403` | The key is valid but does not have the scope this endpoint needs, or the request also carries a bearer token. |

After repeated invalid keys from one address, further attempts from that address are refused for a few minutes.

### Rotating a key

Create the new key, switch the other system to it, check its **Last used** column in **Security → API Keys**, then revoke the old one. Every create and revoke is written to the [audit log](../web-app/security-permissions#audit-logs).
