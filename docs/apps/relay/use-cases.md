---
sidebar_position: 11
title: Use Cases
description: "How fire departments, EMS agencies, SAR teams, emergency management, industrial teams, security, CERT, dispatch centers, IMTs, contractors and fleets use Resgrid Relay, with sample configurations."
---

# Relay Use Cases

These scenarios show which [modes](index.md#the-five-modes) to run for each kind of organization Resgrid's [setup guides](../../setup-guides/overview.md) cover, with a sample configuration and tips. Mix and match: most organizations use two or three modes.

| Organization | SMTP dispatch | Radio bridge | LTE donor radio | Recorder | Tone-out | Tone detect |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| [Fire department](#fire-departments) | ● | ● | | ○ | ● | ● |
| [EMS agency](#ems-agencies) | ● | ○ | | ● | ● | |
| [Search and rescue](#search-and-rescue) | ○ | ● | ● | ● | | |
| [Emergency management / EOC](#emergency-management-and-eocs) | ● | ● | ○ | ● | ○ | |
| [Industrial emergency response](#industrial-emergency-response) | ● | ● | | ● | ○ | |
| [Security and facilities](#security-and-facilities) | ● | ● | ● | ● | | |
| [CERT and community response](#cert-and-community-response) | ○ | ○ | | ○ | ● | |
| [Multi-agency dispatch center](#multi-agency-dispatch-centers) | ● | | | ● | ● | |
| [Incident management team](#incident-management-teams) | | ● | ● | ● | | |
| [Contract services](#contract-services) | ● | ○ | ● | ● | | |
| [Delivery, transit and field service](#delivery-transit-and-field-service) | ● | | ● | ● | ● | |

● common, ○ sometimes.

The sample configurations are `relay.user.json` fragments (what the desktop app saves) or `RESGRID__RELAY__` environment files for Linux and Docker. Every sample also needs the [Resgrid credentials](connect-to-resgrid.md); they are left out to keep the samples short.

:::warning Radio licensing
The radio bridge puts what app users say on the air. Only bridge a channel or talk group your members are allowed to transmit on, and check the rules of the radio service. Amateur and GMRS rules, for example, restrict connecting a radio to the internet and passing other people's traffic. To let members only **listen** to a channel, use a Resgrid [audio stream](../../configuration/audio.md#audio-streams) instead of a bridge.
:::

## Fire departments

**The situation.** A volunteer or combination department. The county tones out each station with two-tone pages on the county fire channel, followed by a voice dispatch, and the county CAD also emails each dispatch. Members carry pagers and the Responder app; the department runs a fireground channel on its own VHF license.

**What to run.**

- **SMTP dispatch** (or Resgrid's own [Call Import](../../configuration/call-import.md)): the CAD emails `station1@groups.your-fd.org` and `station2@groups.your-fd.org`, and each email becomes a call for that station, with the run card attached.
- **Tone detect** as a backup that doesn't depend on email: a scanner on the county fire channel, a watcher per station, and the voice dispatch attached to the call. If the CAD email arrives as well, you get two calls; use tone detect where the county doesn't email, or for the stations it doesn't email.
- **Radio bridge** on the department's fireground channel, so officers in the Responder or Dispatch app hear and talk with crews on portables.
- **Dispatch tone-out** on a *Station Alerting* PTT channel, so members with the app open hear each new call read out.

**Sample configuration** (one Windows PC at Station 1, desktop app, with two USB interfaces):

```json
{
  "AudioConfigPath": "C:\\ResgridRelay\\settings.json",
  "Voice": { "Channel": "Fireground" },
  "Radio": {
    "Profile": "analog",
    "InputDevice": 2, "OutputDevice": 3,
    "PttMethod": "Cm108", "Cm108GpioPin": 3,
    "TxLeadMs": 150, "MaxTransmitSeconds": 120,
    "Squelch": { "Mode": "Vox", "OpenDbfs": -40, "CloseDbfs": -47, "HangMs": 600 }
  },
  "DispatchVoice": { "Channel": "Station Alerting" },
  "Tts": { "ServiceBaseUrl": "https://tts.resgrid.com" }
}
```

with `settings.json` holding a watcher per station (tone detect, input 1) and **Auto-start** on for Audio Tone-Detect, Radio Bridge and Dispatch Tone-Out.

**Tips.**

- Give tone detect and the radio bridge each their own sound input: a scanner on one, the fireground radio's interface on the other.
- Set the transmit time-out below your radios' own, so a stuck app user can't hold the fireground channel.
- Turn on the radio bridge's **Record the channel and the radio side** to keep fireground traffic for post-incident review.
- See the [Fire Department setup guide](../../setup-guides/fire-department.md).

## EMS agencies

**The situation.** An ambulance service dispatched by a regional CAD that emails each assignment. Crews run the Unit app on tablets in each ambulance and talk on Resgrid PTT; supervisors want every PTT transmission kept for QA.

**What to run.**

- **SMTP dispatch** with a group address per station or post (`post3@groups.your-ems.org`), so each assignment pages the right crew.
- **Recorder** on all channels, for QA, complaints and training.
- **Dispatch tone-out** on the crews' channel, so a crew hears the call read out as it drops, without looking at the tablet.

**Sample configuration** (a Linux VM, three systemd units, see [Install](install.md#several-modes-on-one-linux-host)):

```bash
# /etc/resgrid-relay/smtp.env
RESGRID__RELAY__Mode=smtp
RESGRID__RELAY__Smtp__GroupAddressDomains__0=groups.your-ems.org
RESGRID__RELAY__Smtp__DepartmentAddressDomains__0=dispatch.your-ems.org
RESGRID__RELAY__Smtp__DefaultCallType=Emergency

# /etc/resgrid-relay/record.env
RESGRID__RELAY__Mode=record
RESGRID__RELAY__Recorder__Channel=all
RESGRID__RELAY__Recorder__Store=both
RESGRID__RELAY__Recorder__S3__Bucket=your-ems-ptt-recordings
RESGRID__RELAY__Recorder__S3__Region=us-east-1
RESGRID__RELAY__Resgrid__TokenCachePath=/var/lib/resgrid-relay/record-token.json

# /etc/resgrid-relay/dispatch.env
RESGRID__RELAY__Mode=dispatch
RESGRID__RELAY__DispatchVoice__Channel=Crews
RESGRID__RELAY__Tts__ServiceBaseUrl=https://tts.resgrid.com
RESGRID__RELAY__Resgrid__TokenCachePath=/var/lib/resgrid-relay/dispatch-token.json
```

**Tips.**

- `DefaultCallType` must match one of your call types exactly, or it is dropped.
- With `Store` `both`, a local copy is kept even when S3 is unreachable; set an S3 lifecycle rule for your retention period.
- If your PTT talk includes patient information, treat the recordings like other protected records: restrict the bucket and folder.
- See the [EMS Agency setup guide](../../setup-guides/ems-agency.md).

## Search and rescue

**The situation.** A volunteer SAR team called out by the sheriff's office. In the field the team uses VHF radios on its own channel and, for wide-area coverage, LTE push-to-talk radios; members at home and at the trailhead use the Responder app.

**What to run.**

- **Radio bridge** at the command post or base: an analog radio on the team channel bridged to the *Mission* PTT channel, so members on the app hear the field teams.
- **LTE donor radio**: a Rapid Radios G1 or Diga-Talk+ DTP-8900 on the team's talk group, bridged to the **same PTT channel** as the VHF bridge, so the PoC radios, the app and the VHF radios all hear each other. Nothing crosses between PTT channels, so put the donor on a channel of its own only when you want the two radio groups kept apart.
- **Recorder** on all channels, for the mission log and debriefs.
- **SMTP dispatch** only if the sheriff's office emails callouts and you want them on your own domain; otherwise use Resgrid's Call Import.

**Sample configuration** (a laptop at the command post, desktop app):

```json
{
  "Voice": { "Channel": "Mission" },
  "Radio": {
    "Profile": "rapidradios",
    "PttMethod": "Cm108", "Cm108GpioPin": 3,
    "TxLeadMs": 800, "TxHangMs": 1000, "TxTailMs": 200,
    "CourtesyTone": false,
    "Squelch": { "Mode": "Vox", "OpenDbfs": -42, "CloseDbfs": -50, "HangMs": 900 },
    "RecordWhileBridging": true
  },
  "Recorder": { "LocalPath": "D:\\MissionRecordings", "Log": "jsonl" }
}
```

**Tips.**

- One desktop app runs one radio bridge. To bridge both a VHF radio and a PoC radio, run the second on another PC, or a Relay console process with its own interface, settings and refresh token.
- Check LTE coverage at the command post before relying on the donor radio, and power it from the vehicle, not its battery.
- With `RecordWhileBridging`, both directions of the bridge are recorded without a separate recorder.
- See the [Search & Rescue setup guide](../../setup-guides/search-and-rescue.md) and [LTE donor radios](lte-donor-radios.md).

## Emergency management and EOCs

**The situation.** A county emergency management agency activates its EOC for storms and events. Partner agencies email situation reports and resource requests; the EOC monitors a county interoperability channel; staff working from home use the Responder app; the agency keeps a record of the activation.

**What to run.**

- **SMTP dispatch** with group-message addresses: partners email `eoc-staff@gm.your-ema.org`, and the report goes to the EOC staff group as a Resgrid message rather than a call. Activation requests to `activation@groups.your-ema.org` create a call for the activation group.
- **Radio bridge** on a channel the EOC may transmit on, so remote staff take part in the radio net.
- **Recorder** on all channels for the activation's official record and the after-action report.
- **Dispatch tone-out** on an *EOC* channel, so staff hear each new tasking.

**Sample configuration** (SMTP part):

```json
{
  "Smtp": {
    "DepartmentAddressDomains": [ "dispatch.your-ema.org" ],
    "GroupAddressDomains": [ "groups.your-ema.org" ],
    "GroupMessageAddressDomains": [ "gm.your-ema.org" ],
    "DefaultCallPriority": 2
  }
}
```

**Tips.**

- Group messages need a member's sign-in (`RefreshToken`), not the system API key.
- For a ham net, check your radio service's rules on remote control and third-party traffic before bridging; often an audio stream (listen only) is the right tool.
- See the [Emergency Management setup guide](../../setup-guides/emergency-management.md).

## Industrial emergency response

**The situation.** A plant ERT on a UHF trunked or conventional plant radio system. The fire alarm and gas detection panels can send email. Team members carry plant radios on shift and the Responder app off shift.

**What to run.**

- **SMTP dispatch**: the alarm panels email `ert@groups.your-plant.com`, creating a call for the ERT group with the panel's message as the nature.
- **Radio bridge** on the ERT talk group, so off-shift members and the incident commander on the app hear and talk with the team.
- **Emergency tone detection** on the bridge, if your plant radios send an emergency tone: a detected tone creates a *RADIO EMERGENCY* call.
- **Recorder** for incident investigations.

**Sample configuration** (radio emergency part):

```json
{
  "Radio": {
    "Profile": "analog",
    "Emergency": {
      "DetectTones": true,
      "ToneFrequencies": [ 1950 ],
      "CreateCall": true,
      "CallPriority": 3,
      "DispatchList": "G:12",
      "CooldownSeconds": 120
    }
  }
}
```

(Use your system's emergency tone frequency and your ERT group's id.)

**Tips.**

- Many alarm panels only send plain SMTP: put Relay on the plant network, firewalled to the panels' addresses, and point the panels at it directly.
- Set `Smtp:DefaultCallType` to an *Alarm* call type so these calls stand out.
- Don't rely on MDC-1200 detection; it is experimental.
- See the [Industrial Emergency Response setup guide](../../setup-guides/industrial-emergency-response.md).

## Security and facilities

**The situation.** A campus or hospital security department. Officers carry UHF radios or LTE push-to-talk radios; supervisors and facilities staff use the app. The alarm monitoring company and the building management system send email.

**What to run.**

- **SMTP dispatch**: alarm and building-system emails to `security@groups.your-campus.edu` become calls; a *Facilities* group address for maintenance alarms.
- **Radio bridge** on the security channel, or an **LTE donor radio** if officers carry Diga-Talk+ or Rapid Radios.
- **Recorder** for incident reports, complaints and liability.

**Sample configuration** (Diga-Talk+ donor radio):

```json
{
  "Voice": { "Channel": "Security" },
  "Radio": {
    "Profile": "digatalkplus",
    "PttMethod": "Cm108", "Cm108GpioPin": 3,
    "TxLeadMs": 600, "TxHangMs": 1000,
    "RecordWhileBridging": true
  }
}
```

**Tips.**

- Tune the key-up lead with a listener on a second Diga-Talk+ radio ([procedure](lte-donor-radios.md#tune-the-key-up-lead)).
- The DTP-8900 covers LTE bands 2, 4, 5, 12 and 17 only: check coverage in the building where the relay sits.
- See the [Security & Facilities setup guide](../../setup-guides/security-and-facilities.md).

## CERT and community response

**The situation.** A CERT program activated by the emergency management agency. Most volunteers have only a phone; a few coordinators have radios.

**What to run.**

- **Dispatch tone-out** on a *CERT* PTT channel, so volunteers with the app open hear each activation read out.
- **SMTP dispatch** with a group-message address if the agency emails notices you want passed to teams as messages; otherwise Resgrid's own Call Import is enough.
- **Recorder** during large activations, for the after-action review.
- A **radio bridge** only on a channel your coordinators may use, and within its service's rules.

**Sample configuration** (Docker, tone-out only):

```bash
docker run -d --name cert-toneout --restart unless-stopped \
  -e RESGRID__RELAY__Mode=dispatch \
  -e RESGRID__RELAY__DispatchVoice__Channel=CERT \
  -e RESGRID__RELAY__DispatchVoice__Tone__Type=SingleTone \
  -e RESGRID__RELAY__Tts__ServiceBaseUrl=https://tts.resgrid.com \
  --env-file cert-credentials.env \
  -v cert-toneout-data:/app/data \
  resgridllc/resgridrelay:latest
```

**Tips.**

- A short single tone is less alarming than a fire-style two-tone page for community volunteers.
- See the [CERT & Community Response setup guide](../../setup-guides/cert-community-response.md).

## Multi-agency dispatch centers

**The situation.** A dispatch center that dispatches several agencies, each with its own Resgrid department, from one CAD that emails each dispatch.

**What to run.**

- **SMTP dispatch** in **hosted mode** with the system API key, on a self-hosted Resgrid installation: one relay serves every agency. Department addresses carry each agency's own code (`k7x2q@dispatch.your-911.org`); group addresses carry the agency's department id (`engine5@1234.groups.your-911.org`).
- A **Redis** lookup cache, since the relay looks up many codes.
- Per agency, a **recorder** and a **dispatch tone-out**, each signed in as that agency's Relay member (the voice modes can't use the system key).

**Sample configuration** (hosted SMTP):

```bash
RESGRID__RELAY__Mode=smtp
RESGRID__RELAY__Resgrid__GrantType=SystemApiKey
RESGRID__RELAY__Resgrid__SystemApiKey=YOUR_SYSTEM_API_KEY
RESGRID__RELAY__Smtp__HostedMode=true
RESGRID__RELAY__Smtp__DepartmentAddressDomains__0=dispatch.your-911.org
RESGRID__RELAY__Smtp__GroupAddressDomains__0=groups.your-911.org
RESGRID__RELAY__Smtp__RedisCache__Enabled=true
RESGRID__RELAY__Smtp__RedisCache__ConnectionString=redis:6379,abortConnect=false
```

with a wildcard MX record for `*.groups.your-911.org`.

**Tips.**

- With the system key, a **department-wide** call is saved as a **pending** call for a dispatcher in that agency to send; group addresses page at once. Use group addresses for anything that must page immediately.
- The system API key belongs to a Resgrid installation, so hosted mode is for self-hosted installations. On Resgrid's hosted service, give each agency its own relay, or have the CAD email each agency's own dispatch import email.
- Group-message addresses aren't available with the system key.
- See the [Multi-Agency Dispatch Centre setup guide](../../setup-guides/multi-agency-dispatch-center.md).

## Incident management teams

**The situation.** An IMT deploys to incidents where the host agency assigns radio channels. Team members at the incident and at home base use the app.

**What to run.**

- A **radio bridge** in a go-kit: a laptop with the desktop app, a CM108 interface and a mobile radio programmed for the incident's command channel (where the host agency allows the team to transmit), or an **LTE donor radio** on the team's own PoC talk group.
- **Recorder** for the incident record and unit logs.

**Sample configuration** (go-kit laptop):

```json
{
  "Voice": { "Channel": "IMT Command" },
  "Radio": {
    "Profile": "analog",
    "PttMethod": "Cm108", "Cm108GpioPin": 3,
    "TxLeadMs": 150, "MaxTransmitSeconds": 60,
    "RecordWhileBridging": true
  },
  "Recorder": { "LocalPath": "D:\\IncidentRecordings" }
}
```

**Tips.**

- Re-run **Tune** at each incident: the radio, the noise and the channel change.
- Set Windows audio device names you can recognize, and check the device picks after plugging the kit together.
- Keep the refresh token fresh between deployments: a relay that has been off for more than its lifetime needs a new one ([Refresh token rotation](connect-to-resgrid.md#refresh-token-rotation)).
- See the [Incident Management Team setup guide](../../setup-guides/incident-management-team.md).

## Contract services

**The situation.** A wildland contractor or private ambulance company. Agencies email resource orders and assignments; crews carry LTE push-to-talk radios for company traffic; the office uses the app.

**What to run.**

- **SMTP dispatch** with a group address per crew or base, so emailed assignments page the right crew.
- **LTE donor radio** on the company talk group, so office staff on the app talk with crews.
- **Recorder** for contract compliance and disputes.

**Sample configuration:**

```json
{
  "Smtp": {
    "GroupAddressDomains": [ "crews.your-company.com" ],
    "DefaultCallType": "Assignment"
  },
  "Voice": { "Channel": "Company" },
  "Radio": { "Profile": "poc", "PttMethod": "Cm108", "TxLeadMs": 700 }
}
```

**Tips.**

- A company-wide address on a department domain pages everyone; use group addresses for crew assignments.
- Recordings can matter in billing disputes: set a retention period with your records policy.
- See the [Contract Services Provider setup guide](../../setup-guides/contract-services-provider.md).

## Delivery, transit and field service

**The situation.** A fleet whose drivers or technicians carry LTE push-to-talk radios or handsets, dispatched from an office. Jobs and customer requests come from a ticketing or work-order system that sends email.

**What to run.**

- **LTE donor radio** on the drivers' talk group, so dispatchers on the Dispatch app talk with them.
- **SMTP dispatch**: the ticketing system emails `depot-north@groups.your-fleet.com`, creating a call for that depot's drivers.
- **Dispatch tone-out** on the drivers' channel, reading out new jobs.
- **Recorder** for customer disputes and safety reviews.

**Sample configuration** (tone-out with a soft single tone):

```json
{
  "DispatchVoice": {
    "Channel": "Drivers",
    "PollSeconds": 10,
    "Tone": { "Type": "SingleTone", "ToneAFrequency": 880, "ToneADurationMs": 400, "Amplitude": 0.3 }
  },
  "Tts": { "ServiceBaseUrl": "https://tts.resgrid.com" }
}
```

**Tips.**

- Each donor radio bridges one talk group; a second depot's talk group needs a second donor radio.
- Tone-out reads the call's name, nature and address: have the ticketing system put something useful in the subject and first line.
- See the [Delivery, Transit & Field Service setup guide](../../setup-guides/delivery-transit-field-service.md).
