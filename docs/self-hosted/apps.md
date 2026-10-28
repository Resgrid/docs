---
sidebar_position: 7
title: Connecting the mobile apps
---

# Connecting the mobile apps to your server

The Resgrid **Responder** and **Unit** apps from the App Store and Google Play work with self-hosted servers; you don't need special builds. Each user points the app at your server's API hostname once.

## Before you start

- The server's **API** and **events** hostnames must resolve on the phone's network (public DNS, or records on the WiFi router for LAN/offline installs) and present a certificate the phone trusts ([Certificates](./certificates)).
- On **Android**, the apps only trust publicly issued certificates. Use Let's Encrypt or your own public certificate if Android phones must use the apps; the local CA works for Android browsers and for iPhones.
- Create the users in the web app first (**Personnel > Add Person**, or invitations if the server sends email).
- For offline deployments, install the apps while the phones still have internet.

## Set the server URL

### Resgrid Responder

1. Open the app. On the login screen tap **Change Server URL**.
2. In **Server**, choose **Custom**.
3. In **Server URL** enter `https://<your API hostname>`, for example `https://dispatchapi.example.com`. Only the base URL: no `/api/v4`, no trailing slash. If the server serves HTTPS on a port other than 443 (`RESGRID_HTTPS_PORT` in `.env`, set when 443 was already taken), add the port: `https://dispatchapi.example.com:8443`.

   A private name such as `https://rgapi.rick.internal` works for iPhones, which trust the local CA. It cannot work for the Android apps: `.internal` is reserved for private networks and no public CA will issue a certificate for it, so Android needs a hostname under a domain you own ([RICK: publicly trusted certificate](./rick#publicly-trusted-certificate-android-apps)).
4. Save, then log in with your Resgrid user name and password.

### Resgrid Unit

1. On the login screen tap **Server URL**.
2. Choose **Custom** and enter `https://<your API hostname>`, with the port if `RESGRID_HTTPS_PORT` is not 443 (`https://dispatchapi.example.com:8443`). The Unit app only accepts `https://` addresses.
3. Save and log in with the unit's or user's credentials.

You can change it later under **Settings > Server**; changing it signs you out. When the phone has no internet, the server sheet first tries to reach resgrid.com and can take up to 30 seconds before it lets you choose **Custom**.

The app reads everything else from your server: the events hub address comes from `RESGRID__SystemBehaviorConfig__ResgridEventingBaseUrl`, so that hostname must be reachable from phones too.

## On a WiFi network without internet

When the phone joins a network without internet (a [RICK](./rick) kit, a field LAN):

- **Android** shows *No internet access*: choose **Stay connected** / **Keep WiFi connection**, and turn off mobile data so Android doesn't route the apps over cellular. Turn off **Private DNS** if it is set to a provider.
- **iPhone** asks to allow access to devices on your **Local Network** the first time: allow it (later: **Settings > Privacy & Security > Local Network**). Turn off iCloud Private Relay or VPNs for that WiFi.

## What to expect

| Feature | Online self-hosted server | Offline (laptop, RICK) |
|---|---|---|
| Log in, calls, dispatches, statuses, staffing, personnel and unit lists | Yes | Yes |
| Real-time updates while the app is open (events hub) | Yes | Yes |
| Location sharing to the server | Yes | Yes |
| Messages and chat | Yes (chat needs the Chat feature enabled for the department) | Yes, while the app is open |
| Push notifications when the app is closed | Only with a configured Novu instance and the apps' Firebase/APNs credentials (`RESGRID__ChatConfig__Novu*`); not configured by default | No (needs Google/Apple services) |
| Maps in the apps | Mapbox; set `RESGRID__MappingConfig__ResponderAppMapboxKey` / `UnitAppMapBoxKey` | Only areas already cached on the phone |
| Address search | Needs internet geocoding | No |

Because push notifications aren't available on a typical self-hosted server, ask responders to keep the app open (and the screen on, with **Keep Alive** in the app settings) during an incident so they receive new dispatches immediately.

## Troubleshooting

| Symptom | Fix |
|---|---|
| "Network error" at login on Android | The certificate isn't publicly trusted. Use Let's Encrypt or your own public certificate. |
| Login fails on iPhone | Install and enable the CA profile ([Certificates](./certificates#iphone-and-ipad)), check the Local Network permission. |
| Logs in but nothing updates | The events hostname doesn't resolve or isn't trusted from the phone. |
| "Invalid URL" in the Unit app | Use `https://`; the Unit app rejects `http://` servers. |
| Can't resolve the server name | The phone uses another DNS (Private DNS, VPN, cellular). Fix the router records and the phone's DNS settings. |
