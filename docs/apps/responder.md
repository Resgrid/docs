---
sidebar_position: 2
---

# Responder

Resgrid Responder is a cross-platform application designed for **individual first responder personnel**. It enables emergency responders to manage their status, view dispatch calls, communicate with team members, track their location in real-time, use push-to-talk voice channels, and coordinate through shifts and calendars — all from a single mobile interface.

## Ideal Use Cases

- **On-Scene First Responders** — Volunteer firefighters, EMS personnel, or search & rescue team members who need to quickly update their status (responding, available, on-scene), view dispatch call details, and navigate to incident locations.
- **Push-to-Talk Field Communication** — Teams needing walkie-talkie-style voice communication via WebRTC voice channels, with Bluetooth PTT headset support or media button toggle.
- **Real-Time Personnel Tracking** — Departments needing GPS tracking of personnel on a shared map, with background location reporting and real-time updates.
- **Dispatch & Call Management** — Field-based call creation with multi-mode location entry, photo/file attachments, call notes, and dispatch selection of specific personnel, units, groups, or roles.
- **Shift & Calendar Coordination** — Responders managing their shift sign-ups and RSVP-ing to department calendar events.
- **Offline & Low-Connectivity Environments** — The offline queue ensures status updates and critical actions are queued and automatically synced when connectivity is restored, making it suitable for rural or disaster scenarios.

## Supported Platforms

| Platform | Support Level | Details |
|----------|:------------:|---------|
| **iOS** | ✅ Full | Primary target with CallKeep VoIP for background PTT and critical alerts |
| **Android** | ✅ Full | Primary target with foreground services for background location, audio, and BLE |
| **Web** | ⚠️ Partial | Sidebar/navigation supported; background features (BLE, CallKeep) unavailable. Docker deployment available |

## Operations & Features

### Status & Staffing Management
- Set your **personnel status** from department-configured options (e.g., Available, Responding, On Scene, Not Responding) with optional destination (call or station) and notes
- Set your **personnel staffing** level (e.g., On Shift, Available, Off Duty) with notes
- GPS coordinates are automatically captured with each status change
- **Offline queue** persists status changes when offline and automatically retries when connectivity returns

### Home Dashboard
- Current user status and staffing cards with colour-coded indicators
- Department statistics overview (active calls, available units, on-duty personnel)
- Quick-action status and staffing buttons

### Calls
- View all **active dispatch calls** with priority indicators and search
- **Create new calls** with:
  - Name, nature/description, priority, and type
  - Contact name and information
  - **Five location input methods**: address search (Google Geocoding), GPS coordinate entry, [what3words](https://what3words.com) word search, Plus Code search, and interactive map picker
  - **Dispatch selection**: multi-select personnel, groups, roles, units, or everyone
- **Call detail view** with tabbed content: info, contact, protocols, dispatched resources, and timeline
- Add **notes**, **images**, and **file attachments** to calls
- **Route to call** via native maps for turn-by-turn navigation
- Edit and close existing calls (permission-gated)

### Personnel & Units
- View all **department personnel** with status, staffing, group, and role information
- **Filter** personnel by group, role, or status
- View all **department units** with current statuses
- Filter units by type and status

### Messaging
- **Inbox and sent messages** with search
- **Compose new messages** with recipient selection (users, groups, roles)
- Reply and respond to messages

### Map
- Full **Mapbox GL** interactive map with pins for personnel, units, calls, stations, and POIs
- **Real-time updates** via SignalR for live position tracking
- **Heading-locked navigation mode** with tilted perspective for turn-by-turn orientation
- Recenter button to snap camera to current GPS position
- Tap pins for detail modals with type-specific information

### Push-to-Talk (PTT) Voice
- **LiveKit WebRTC** voice channels for real-time communication
- Join and leave department voice rooms
- Microphone toggle (mute/unmute)
- **Audio routing**: Bluetooth, speaker, or earpiece
- **CallKeep integration** for OS-level VoIP call handling (background audio on iOS)
- **Bluetooth PTT headsets**: scan, discover, and connect supported BLE devices (AINA PTT, B01 Inrico, HYS)
- **Media button PTT**: AirPods or wired headset media button triggers push-to-talk

### Audio Streams
- Listen to **department audio streams** (scanner feeds, dispatch audio)
- Play/pause streaming audio with sidebar indicator

### Calendar & Shifts
- View **department calendar events** with daily and upcoming views
- **RSVP** to calendar events (sign up or cancel attendance)
- View **shift schedules** and today's shifts
- **Sign up for shift days**

### Contacts, Notes & Protocols
- **Contact directory** with detail views and notes per contact
- **Department notes** list with detail view
- **Emergency protocols/SOPs** with detail sheets

### Notifications
- **Push notifications** via Firebase Cloud Messaging with Notifee
- Android notification channels mapped to call priorities (emergency, high, medium, low, custom)
- iOS critical alert support to bypass Do Not Disturb
- **In-app notification inbox** powered by Novu with unread badges

### Real-Time Updates
- Two persistent **SignalR WebSocket** connections:
  - **Eventing Hub**: personnel status/staffing updates, unit status updates, call added/updated/closed
  - **Geolocation Hub**: live personnel and unit location updates
- Auto-reconnect with token refresh

## Settings & Configuration

| Setting | Description |
|---------|-------------|
| **Server URL** | Custom API endpoint for self-hosted deployments |
| **Login Info** | Update username and password |
| **Theme** | Light, Dark, or System |
| **Language** | English, Spanish, or Arabic |
| **Keep Alive** | Prevent screen from sleeping |
| **Realtime Geolocation** | Send GPS position to API in real-time |
| **Background Geolocation** | Track location when app is backgrounded |
| **Bluetooth Device** | Scan and pair BLE PTT headsets |

## Hardware & Permission Requirements

### Required Hardware
| Hardware | Required | Purpose |
|----------|:--------:|---------|
| GPS | **Yes** | Personnel tracking and map positioning |
| Internet | **Yes** | API, SignalR, LiveKit, push notifications |
| Speaker | Recommended | Audio streams and voice playback |
| Microphone | Recommended | PTT voice communication |
| Camera | Optional | Taking photos for call documentation |
| Bluetooth LE | Optional | External PTT headset devices |

### iOS Permissions
| Permission | Reason |
|------------|--------|
| Location When In Use | Show current position on map |
| Location Always | Background GPS tracking for personnel positioning |
| Microphone | Voice PTT communication via LiveKit channels |
| Camera | Take photos for call documentation |
| Photos Library | Attach images to calls |
| Bluetooth | BLE PTT headset connectivity |

**Background Modes**: remote-notification, audio, bluetooth-central, voip

**Entitlements** (production): Critical alerts and time-sensitive notifications

### Android Permissions
| Permission | Reason |
|------------|--------|
| Fine/Coarse Location | GPS tracking for map and personnel positioning |
| Background Location | Background GPS tracking |
| Record Audio | Microphone input for PTT voice |
| Capture Audio Output | Audio routing for PTT/voice |
| Post Notifications | Push notifications (Android 13+) |
| Wake Lock | Keep device awake for active calls/PTT |
| Foreground Service | Background location tracking |
| Foreground Service (Microphone) | Background PTT voice |
| Foreground Service (Connected Device) | Background BLE headset |
| Foreground Service (Media Playback) | Background audio stream playback |
| Phone / CallKeep | System call integration for background audio |