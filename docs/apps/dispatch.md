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
- **Active calls** count
- **Pending calls** count
- **Scheduled calls** count
- **Available units** count
- **Available personnel** count
- **On-duty personnel** count
- **Current time** (24-hour format, updated every second)
- **Weather widget** (based on department map center coordinates)

#### Active Calls Panel
- List of all active, pending, and scheduled calls with priority indicators
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
- **Change status** of selected personnel or unit
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
  - **Five location input methods**: address search, GPS coordinates, [what3words](https://what3words.com), Plus Code search, and interactive map picker
  - **Dispatch selection**: multi-select users, groups, roles, units, or everyone
- **Call detail view** with priority header, static map preview, and action buttons
  - Add notes, attach images, attach files, route to call in native Maps
  - Tabbed content: Info, Contact, Protocols, Dispatched resources, Timeline
  - Close call (permission-gated)
- **Edit call** with the same form schema as creation
- Web-specific implementations (`.web.tsx`) for call views, creation, and editing

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
- Auto-reconnect with background resume refresh
- Events trigger automatic data refresh across all console panels

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
