---
sidebar_position: 6
title: Certificates and hostnames
---

# Certificates and hostnames

Resgrid always runs over HTTPS on **three hostnames**: the web app, the API and the events hub (for example `dispatch.example.com`, `dispatchapi.example.com`, `dispatchevents.example.com`). Browsers and the mobile apps connect to all three, so on every device each hostname must:

1. resolve to your server (DNS or a hosts-file entry), and
2. present a certificate the device trusts.

If either fails for the API or events hostname, the web app loads but logging in, chat, maps or live updates fail.

## Choosing a certificate mode

| Mode (`RESGRID_TLS` in `.env`) | When | What devices need |
|---|---|---|
| An email address → **Let's Encrypt** | Server reachable from the internet on ports 80 and 443, public DNS records | Nothing |
| **Your own certificate** (`/certs/site/fullchain.pem /certs/site/privkey.pem`) | You have a certificate from your organization's CA, a wildcard, or one obtained with a DNS challenge | Whatever already trusts that certificate. Public certificates need nothing. |
| `internal` → **Resgrid local CA** | LAN-only and offline installs (laptop, RICK) | Install the local CA certificate once |

The installers set this up for you. For your own certificate, copy the full chain and key to `certs/site/fullchain.pem` and `certs/site/privkey.pem` (or pass `RESGRID_TLS_CERT_FILE` / `RESGRID_TLS_KEY_FILE` to `setup.sh`). The certificate must cover all three hostnames.

If that certificate comes from your organization's own CA rather than a public one, trusting it on client devices is not enough: the containers call the public hostnames themselves (the web app's server-side calls to the API), so they must trust the CA too, or those calls fail. Mount the CA certificate into the containers and add its directory to `SSL_CERT_DIR` — [Trusting a private certificate authority](../reference/docker#trusting-a-private-certificate-authority). Do not turn certificate checks off instead: `RESGRID__ApiConfig__BypassSslChecks=true` makes the web, API and events containers refuse to start in Production.

:::info Android apps need a public certificate
The Resgrid **Responder** and **Unit** apps on Android only trust certificates from public certificate authorities; they ignore CAs installed by the user. If Android phones must use the apps, use Let's Encrypt or a publicly trusted certificate. Browsers on Android, and iPhones, can use the local CA. The [RICK guide](./rick#publicly-trusted-certificate-android-apps) shows how to get a public certificate for a kit that is never online.
:::

## The Resgrid local CA

With `internal`, setup creates a small certificate authority:

| File | Purpose |
|---|---|
| `certs/ca/resgrid-root-ca.crt` | The CA certificate. Install it on clients. It is public. |
| `certs/private/resgrid-root-ca.key` | The CA private key. Never share it; anyone with it can create certificates your devices trust. |

Caddy issues and renews the site certificates for the three hostnames from this CA by itself. The Resgrid containers trust the CA too (`SSL_CERT_DIR` in `.env`), so the web app's server-side calls to the API work without turning certificate checks off. The CA certificate is valid for 10 years.

## Installing the CA certificate

Copy `resgrid-root-ca.crt` to the device (USB stick, email, file share, `scp`), then:

### Windows

1. Double-click `resgrid-root-ca.crt` and choose **Install Certificate**.
2. Choose **Local Machine** (or **Current User** if you are not an administrator) and **Next**.
3. Choose **Place all certificates in the following store**, **Browse**, **Trusted Root Certification Authorities**, **OK**, **Next**, **Finish**.
4. Restart the browser. Chrome and Edge use the Windows store. In Firefox open `about:config` and set `security.enterprise_roots.enabled` to `true`.

The [laptop installer](./laptop) does this for your account automatically.

### macOS

1. Double-click `resgrid-root-ca.crt`; Keychain Access opens and adds it to the **login** keychain.
2. Double-click **Resgrid Local CA** in the list, expand **Trust**, and set **When using this certificate** to **Always Trust**. Close the window and enter your password.

### iPhone and iPad

1. AirDrop or email the file to the device and open it; iOS says **Profile Downloaded**.
2. **Settings > General > VPN & Device Management**, select the **Resgrid Local CA** profile, **Install**.
3. **Settings > General > About > Certificate Trust Settings**, turn on **Resgrid Local CA**.

### Android

**Settings > Security > More security settings > Encryption & credentials > Install a certificate > CA certificate**, then pick the file (menu names vary by manufacturer). This makes Chrome trust the server; the Resgrid apps still need a public certificate (see above).

### Linux

```bash
sudo cp resgrid-root-ca.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates
```

Firefox and Chrome on Linux keep their own store: import the file under **Settings > Privacy & Security > Certificates > View Certificates > Authorities > Import** (Firefox) or **Settings > Privacy and security > Security > Manage certificates** (Chrome).

## Hostnames without DNS

Without DNS records, add one line per device to its hosts file: `C:\Windows\System32\drivers\etc\hosts` on Windows (edit Notepad as Administrator), `/etc/hosts` on macOS and Linux.

```text
192.168.1.50  rg.mylocal rgapi.mylocal rgevents.mylocal
```

Phones can't edit a hosts file; create the records on your router or DNS server instead. Most routers call this *DNS rewrites*, *custom hosts* or *static DNS*.

Hostname tips:

- Names under `.localhost` (`rg.localhost`) always point at the computer itself in Chrome, Edge and Firefox; the [laptop install](./laptop) uses them so no hosts-file edit is needed.
- Avoid `.local`: iPhones and Macs resolve it only with multicast DNS and ignore router records for it. `.internal` is reserved for private networks and works everywhere.
- Every device's clock must be right: certificates are rejected when a clock is far off.
