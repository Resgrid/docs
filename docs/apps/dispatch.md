---
sidebar_position: 4
---

# Dispatch

Resgrid Dispatch is a cross-platform application designed for **dispatchers and coordinators** operating from a dispatch center, station, or remote location. It provides a comprehensive multi-panel dispatch console with real-time resource management, live mapping, activity logging, push-to-talk voice, and integrated call management — all optimized for tablet and desktop use with responsive multi-column layouts.

## Ideal Use Cases

- **Dispatch Centers** — Dedicated dispatch operators monitoring and managing calls, personnel, and units from a desktop or wall-mounted display.
- **Station Duty Officers** — Command staff at a station managing incoming calls, tracking resources, and coordinating dispatch operations.
- **Remote Dispatch** — Portable dispatch capability on tablets for incident command posts, mobile command vehicles, or emergency operations centers.
- **Desktop Dispatch Workstation** — Full desktop application via Electron for Windows, macOS, or Linux dispatch workstations with large screens.
- **Web-Based Dispatch** — Accessible from any browser via the Docker-deployed web version, ideal for backup dispatch or temporary command posts.

## Supported Platforms

| Platform | Support Level | Details |
|----------|:------------:|---------|
| **iOS** | ✅ Full | iPad optimized with multi-column layouts |
| **Android** | ✅ Full | Tablet optimized with responsive layouts |
| **Web** | ✅ Full | Full web support with Docker deployment; platform-specific sidebar and map implementations |
| **macOS** | ✅ Full | Electron — DMG packages |
| **Windows** | ✅ Full | Electron — NSIS installer |
| **Linux** | ✅ Full | Electron — AppImage packages |

## Operations & Features

### Dispatch Console (Home Screen)

The dispatch console is the primary interface, providing a multi-panel view that adapts to screen size and orientation:

- **Tablet Landscape** — 3-column layout: Calls & Units | Map & Activity Log | Personnel, Notes & PTT
- **Tablet Portrait** — 2-column layout: Calls, Units & Personnel | Map, Notes, PTT & Activity Log
- **Phone** — Single column scrollable layout with all panels stacked

#### Stats Header
Real-time statistics banner displaying:
- **Active calls** count (calls that have been dispatched)
- **Pending calls** count — calls saved but not yet dispatched, waiting for a dispatcher; tap to open **Pending Calls**
- **Scheduled calls** count — calls waiting for their dispatch time; tap to open **Scheduled Calls**
- **Available units** count
- **Available personnel** count
- **On-duty personnel** count
- **Current time** (24-hour format, updated every second)
- **Weather widget** (based on department map center coordinates)

#### Active Calls Panel
- List of active calls with priority indicators (pending and scheduled calls have their own screens, below)
- **Call filter mode** — tap a call to filter all panels (units, personnel, notes, activity log) to show only data related to that call
- Priority colour-coded call filter banner when active
- Clear filter button to return to all-data view

#### Units Panel
- List of all department units with current status
- **Select a unit** to view details and track in the activity log
- When call filter is active, shows dispatched units and their statuses
- **Set unit status** directly from the panel for call-related operations

#### Personnel Panel
- List of all department personnel with current status and staffing
- **Select personnel** to view details and track in the activity log
- When call filter is active, shows dispatched personnel
- **Set personnel status** directly from the panel

#### Personnel & Unit Action Panels
- When a personnel member or unit is selected, a dedicated actions panel appears in the activity log area
- **Change status** of selected personnel or unit. A unit's status starts on the call the unit is working, so the dispatcher does not pick the incident for every status: the call its latest status belongs to (unless that status cleared it), otherwise the one open call it is dispatched to. A call the unit's last clear ended does not count: the call that clear named or, when it named none (back in quarters at its station), every call the unit was sent to before it. A scheduled call counts once it has gone out or its dispatch time has passed. These are the same rules the server uses to [link a status to a call](../web-app/dispatch-calls#which-call-a-status-belongs-to). A unit with more than one call left starts on its last destination or the call selected on the console. The dispatcher can still pick another destination, and a status saved with no destination is still linked to the unit's call by the server
- **Change staffing** of selected personnel
- View detailed information about the selected resource

#### Map Widget
- Embedded **Mapbox GL** map with auto-fetched pins for personnel, units, stations, and calls
- Expand to full-screen map view
- Real-time position updates via SignalR

#### Notes Panel
- View **department notes** with search and refresh
- When call filter is active, shows **call-specific notes** instead
- **Add notes** to the selected call directly from the panel
- **Create new department notes** via bottom sheet

#### Activity Log Panel
- Chronological log of all dispatch console events
- Tracks: call selections, unit/personnel selections, status changes, PTT transmissions, system updates, note additions
- When call filter is active, shows only events related to the selected call
- **Radio log** tracks LiveKit voice transmissions with participant names, timestamps, and duration

#### Push-to-Talk (PTT) Interface
- Integrated **LiveKit WebRTC** push-to-talk directly in the dispatch console
- **PTT button** with press-and-hold to transmit
- Current channel display
- Transmitting indicator
- **Channel selector** for switching between department voice rooms
- All transmissions logged in the activity log with participant, timestamp, and duration

### Call Management
- **Create new calls** with:
  - Name, nature/description, priority, and type
  - Contact name and information
  - **Five location input methods**: address search, GPS coordinates, [what3words](https://what3words.com), Plus Code search, and interactive map picker. A call saved with a typed address that was never searched is geocoded by the server when it is created, so it still gets a location; a department that makes the location *required* needs a real point (search, coordinates or map pick)
  - External ID and Reference ID (the referring system's case or ticket numbers)
  - **Dispatch selection**: multi-select users, groups, roles, units, or everyone. The picker lists every unit, group, role and person whatever their status (it no longer shows *Everyone* alone when opened before the lists finish loading)
  - **Schedule dispatch** for a future time (web and desktop), or **Save as pending (do not dispatch yet)**: the call is saved and numbered, nobody is notified and the field apps do not see it; any recipients picked are kept as the proposed dispatch. The button becomes **Save Pending Call** and the call opens on **Pending Calls**
- **Call detail view** with priority header, static map preview, and action buttons
  - A pending call shows a *Pending — not yet dispatched* banner with **Dispatch**; a scheduled call shows *Scheduled for* its time with **Dispatch now**
  - Add notes, attach images, attach files, route to call in native Maps
  - Tabbed content: Info, Contact, Protocols, Dispatched resources, Timeline
  - Close call (permission-gated) — **Notify everyone on the call** (on by default) tells the dispatched personnel, groups, roles, units and command team it closed; a call under an active incident command is refused with the reason shown
- **Edit call** with the same form schema as creation
- Web-specific implementations (`.web.tsx`) for call views, creation, and editing

### Pending and Scheduled Calls
Both are under **Calls** in the side menu (Pending Calls shows a count badge) and behind the console's tiles. They work like the web app's [pending and scheduled calls](../web-app/dispatch-calls#pending-and-scheduled-calls).
- **Pending Calls** — calls waiting for a dispatcher, oldest first, with search: number, name, type, priority, address and when it was received. **Dispatch** opens the recipient picker with any proposed recipients already selected; confirming sends the call and it moves to the active calls. **Cancel Call** closes it as Cancelled without notifying anyone. Pending calls come from *Save as pending* here or on the web, or from another system through the API (`IsPending`).
- **Scheduled Calls** — calls waiting for their dispatch time, with **Dispatch now** to send one early and **Reschedule** on the call.
- Both lists refresh when the server reports a call was added, changed or closed.

### Additional Screens
- **Calls list** — searchable paginated list of all calls
- **Personnel list** — all department personnel with status information
- **Units list** — all department units with status information
- **Contacts** — department contact directory with detail sheets and notes
- **Notes** — department notes with detail views
- **Protocols** — emergency response protocols/SOPs with detail sheets
- **Map** — full-screen interactive map with pins and detail modals
- **Settings** — account, preferences, and configuration options

### Inactivity Lock Screen
- **Configurable inactivity timeout** (in minutes) that automatically locks the screen
- Password-based unlock using the user's credentials
- Prevents unauthorized access when a dispatch workstation is left unattended
- Configurable via the `INACTIVITY_TIMEOUT_MINUTES` environment variable

### Maintenance Mode
- Remote-controlled maintenance mode via environment variable
- When enabled, displays a maintenance screen instead of the application
- Useful for coordinated system updates

### Push-to-Talk Voice (LiveKit)
- **LiveKit WebRTC** voice channels for dispatcher communication
- Microphone toggle with mute/unmute
- Audio routing to Bluetooth, speaker, or earpiece
- **CallKeep integration** for OS-level VoIP call handling
- **Bluetooth PTT headsets**: scan, discover, and connect supported BLE devices (AINA PTT, B01 Inrico, HYS)

### Audio Streams
- Listen to **department audio streams** (scanner feeds, dispatch radio)
- Play/pause streaming audio via bottom sheet

### Notifications
- **Push notifications** via Firebase Cloud Messaging with Notifee
- Android notification channels mapped to call priorities
- iOS critical alert support to bypass Do Not Disturb
- **In-app notification inbox** powered by Novu with unread badges (native platforms)

### Real-Time Updates (SignalR)
- Persistent WebSocket connection for real-time event updates
- Personnel status/staffing updates, unit status updates, call updates
- Auto-reconnect with background resume refresh; after any reconnect the console reloads units, calls and personnel, so changes made while the connection was down are not missed
- Events trigger automatic data refresh across all console panels. Unit statuses are always reloaded from the server (never from the device's saved copy), and a status change that arrives while a reload is already running triggers one more reload, so the console matches the web dashboard

### Run cards and recommendations

When the department uses [Run Cards](../web-app/run-cards), the New Call screen shows the recommended units and personnel for the call's priority and type (or dispatches them automatically), lets the dispatcher escalate alarm levels, and surfaces move-up recommendations. The recommendation refreshes once the call has a location (from the address search, coordinates, what3words, Plus Code or the map picker); closest-unit selection needs that location, measures units in an **In Quarters** status from their station and adds the department's [turnout times](../web-app/run-cards#how-closest-unit-mode-measures-a-unit).

**Adding resources to an active call** (**Dispatch additional resources** on the call, or the add button on a call in the console's Active Calls panel) shows the run card recommendation at the top of the recipient picker: what the call's run card still needs at its current alarm level, after counting the units and people already on the call, picked the same way as at creation (station-based or closest unit). **Apply recommendation** ticks them; nothing is sent until **Confirm**. When the call already covers its run card the picker says so, and anyone can still be added by hand. To dispatch the next level's resources in full, use **Strike Next Alarm**.

### Chat, moderation and the Assistant

Dispatch is the reference chat client: all channels, incident channels per call, urgent messages and the Assistant. See [Chat & Assistant](../web-app/chat).

### Field Records

With `Records.Field.Dispatch` enabled, dispatchers can start the NERIS incident report or a run record directly from the call. See [Records](../web-app/records/overview).

### Deployments and pre-plans

Dispatchers see the department's **deployments** read-only (roster, window, identifiers, time-report numbers and status) so a call's crew and assignment are in view; time reports, usage and F-42 drafting are done from the Responder and Unit apps. A call's contact shows its **pre-plan** and **alert hazards** in the dispatch alert and on the Site Info tab. See [Deployment Finance](../web-app/business-ops/deployment-finance) and [Contacts](../web-app/contacts).

### Department terminology

Names a department sets under [Terminology](../web-app/department-settings#terminology) replace the app's own labels: the side menu (Calls, Map, Personnel, Units, Contacts, Records), the console's **Units**, **Personnel**, **Notes** and **Map** panel titles, the **Calls** tab in a unit's or person's action panel, the Map and Records screen titles, and record types in Field Records. Labels that combine a module with other words, such as *Active Calls* or *Units on Call*, keep the app's wording. The names load when the app starts or a dispatcher signs in.

![Dispatch with Units renamed Apparatus and Contacts renamed Pre-Plans](/img/apps/dispatch/terminology.png)

## Settings & Configuration

| Setting | Description |
|---------|-------------|
| **Server URL** | Custom API endpoint for self-hosted deployments |
| **Login Info** | Update username and password |
| **Theme** | Light, Dark, or System |
| **Language** | English, Spanish, or Arabic |
| **Keep Alive** | Prevent screen from sleeping (important for dispatch workstations) |
| **Background Geolocation** | Enable/disable background GPS tracking |
| **Bluetooth Device** | Scan and pair BLE PTT headsets |

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `MAINTENANCE_MODE` | Enable/disable application maintenance mode |
| `INACTIVITY_TIMEOUT_MINUTES` | Configurable lockscreen inactivity timeout |
| `BASE_API_URL` | API server hostname |
| `MAPBOX_PUBKEY` | Mapbox public access token for maps |
| `SENTRY_DSN` | Sentry error tracking DSN |
| `COUNTLY_APP_KEY` / `COUNTLY_SERVER_URL` | Countly analytics configuration |

### Docker Deployment

The web version can be deployed as a Docker container:

```bash
# Build the Docker image
docker build -t resgrid-dispatch-web .

# Run with environment file
docker run -p 3000:80 --env-file .env.docker resgrid-dispatch-web

# Or use Docker Compose
docker-compose up -d
```

## Hardware & Permission Requirements

### Required Hardware
| Hardware | Required | Purpose |
|----------|:--------:|---------|
| Internet | **Yes** | API, SignalR, LiveKit, push notifications |
| Large Screen | Recommended | Multi-panel dispatch console is optimized for tablets and desktops |
| Speaker | Recommended | Audio streams and voice playback |
| Microphone | Recommended | PTT voice communication |
| GPS | Optional | Dispatcher location tracking |
| Camera | Optional | Image attachments to calls |
| Bluetooth LE | Optional | External PTT button devices |

### iOS Permissions
| Permission | Reason |
|------------|--------|
| Bluetooth Always | BLE PTT device connectivity |
| Microphone | PTT voice communication |

**Background Modes**: remote-notification, audio, bluetooth-central, voip

**Entitlements** (production): Critical alerts and time-sensitive notifications

### Android Permissions
| Permission | Reason |
|------------|--------|
| Wake Lock | Keep device awake for continuous dispatch operations |
| Record Audio | PTT voice |
| Capture Audio Output | Audio routing for PTT/voice |
| Post Notifications | Push notifications (Android 13+) |
| Foreground Service | Background services |
| Foreground Service (Microphone) | Voice in foreground service |
| Foreground Service (Connected Device) | BLE in foreground service |
| Foreground Service (Media Playback) | Audio stream in foreground service |
