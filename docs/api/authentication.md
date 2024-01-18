---
sidebar_position: 2
---

# API Authentication

Resgrid as of the v4 version of the API uses the JWT (JSON Web Token) <https://jwt.io/> standard with OpenID Connect. You need to auth to the Resgrid API via a specific endpoint before you can call operations against the API.

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