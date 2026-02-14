---
sidebar_position: 5
---

# Big Board

Resgrid Big Board is a cross-platform application designed for **station displays, command centers, and situational awareness dashboards**. It features a fully customizable widget-based dashboard where users can add, remove, resize, and rearrange information panels to create the perfect overview for their operational needs. The app is primarily optimized for large screens — wall-mounted displays, desktop monitors, and tablets.

## Ideal Use Cases

- **Station Wall Displays** — Mount a TV or monitor at a fire station or EMS base showing live personnel status, active calls, units, and a map with real-time positions.
- **Emergency Operations Centers (EOC)** — Customizable dashboards for command staff showing aggregated department statistics, call summaries, and resource availability.
- **Command Vehicles** — Laptop or tablet-mounted dashboard for incident commanders needing a real-time overview of all resources, weather, and active incidents.
- **Remote Monitoring** — Web or desktop app for chief officers and administrators to monitor department activity from home or office.
- **Briefing Rooms** — Display department status during shift briefings with personnel staffing summaries and upcoming calls.

## Supported Platforms

| Platform | Support Level | Details |
|----------|:------------:|---------|
| **iOS** | ✅ Full | iPad optimized for large screen dashboards |
| **Android** | ✅ Full | Tablet optimized with responsive widget grid |
| **Web** | ✅ Full | Full web support with Docker deployment via nginx |
| **macOS** | ✅ Full | Electron — DMG packages (1400×900 default window, 800×600 minimum) |
| **Windows** | ✅ Full | Electron — NSIS installer |
| **Linux** | ✅ Full | Electron — AppImage packages |

## Operations & Features

### Customizable Widget Dashboard

The home screen is a **drag-and-drop widget grid** where users can compose their own dashboard layout:

- **Add widgets** via a floating action button (+) menu
- **Remove widgets** in edit mode
- **Resize widgets** by adjusting width and height in grid units (1–4 columns)
- **Rearrange widgets** by dragging to new positions on the grid
- **Edit mode toggle** to enter/exit layout customization
- Widget layout is **persisted** via MMKV storage and survives app restarts

### Available Widgets

#### Personnel Widget
Displays a table of all department personnel with their current information:
- **Configurable columns**: Group, Staffing, Status, Roles, Timestamp
- **Sort responding to top**: Prioritize personnel who are responding
- **Hide not responding / unavailable**: Filter out inactive personnel
- **Custom status text**: Override the display text for responding, not responding, and unavailable statuses
- **Font size**: Adjustable from 4pt to 30pt for readability at a distance
- **Group filtering**: Hide specific groups from the display
- **Group sort order**: Custom weighted sorting for groups

#### Units Widget
Displays all department units with their current status:
- **Configurable columns**: Station, Type, State, Timestamp
- **Font size**: Adjustable from 4pt to 30pt
- **Group filtering**: Hide specific groups
- **Group sort order**: Custom weighted sorting

#### Calls Widget
Displays active dispatch calls:
- **Configurable columns**: ID, Name, Timestamp, Reporting User, Priority, Address
- **Show linked calls**: Option to display calls linked to other calls
- **Font size**: Adjustable for readability

#### Map Widget
Interactive **Mapbox GL** map with live pins:
- **Configurable zoom level**
- **Toggle markers**: Show/hide calls, stations, units, personnel
- **Show linked calls**: Display calls linked to the active call
- **Hide labels**: Clean map view for distance viewing
- **Custom center coordinates**: Set latitude and longitude for the default view

#### Weather Widget
Live weather display for the department area:
- **Unit selection**: Standard, Metric, or Imperial
- **Custom coordinates**: Set latitude and longitude for weather data
- Based on the department's configured map center by default

#### Notes Widget
Department notes display:
- **Category filter**: Show notes from a specific category
- **Include uncategorized**: Option to show/hide notes without categories

#### Time Widget
Large clock display for station wall displays:
- **24-hour or 12-hour format**
- **Show/hide seconds**

#### Personnel Status Summary Widget
Aggregated summary of personnel statuses across the department:
- **Font size**: Adjustable for distance viewing
- **Show colours**: Colour-coded status counts

#### Personnel Staffing Summary Widget
Aggregated summary of personnel staffing levels:
- **Font size**: Adjustable
- **Show colours**: Colour-coded staffing counts

#### Units Summary Widget
Aggregated summary of unit statuses:
- **Font size**: Adjustable
- **Show available / responding / on scene**: Toggle which status categories appear

#### Calls Summary Widget
Aggregated summary of call statistics:
- **Font size**: Adjustable
- **Show recent call**: Display the most recent call
- **Show priority counts**: Breakdown by call priority
- **Max priorities to show**: Limit how many priority levels appear

### Widget Configuration Screen
Each widget has a dedicated configuration tab accessible from the Configure screen:
- **Visible columns** toggles for table-based widgets
- **Filter options** to hide certain data
- **Font size sliders** for readability at distance
- **Widget dimension sliders** (width/height in grid units)
- Per-widget specific options

### Additional Screens

#### Calls
- View all active calls with priority indicators and search
- **Create new calls** with name, nature, priority, type, contact info, five location input methods (address, GPS, what3words, Plus Code, map picker), and dispatch selection
- **Call detail view** with notes, images, files, and turn-by-turn navigation
- Edit and close existing calls

#### Personnel
- View all department personnel with status and staffing information

#### Units
- View all department units with current statuses

#### Contacts
- Department contact directory with detail views and notes

#### Notes
- Department notes list with detail view

#### Protocols
- Emergency response protocols/SOPs with detail sheets

#### Map
- Full-screen interactive Mapbox map with pins and detail modals
- Web-specific map implementation

### Push-to-Talk Voice (LiveKit)
- **LiveKit WebRTC** voice channels for communication
- Microphone toggle with mute/unmute
- Audio routing to Bluetooth, speaker, or earpiece
- **CallKeep integration** for OS-level VoIP
- **Bluetooth PTT headsets**: AINA PTT, B01 Inrico, HYS support

### Audio Streams
- Listen to department audio streams (scanner feeds, dispatch radio)
- Play/pause streaming audio

### Notifications
- **Push notifications** via Firebase Cloud Messaging with Notifee
- Android notification channels per call priority
- iOS critical alert support
- **In-app notification inbox** powered by Novu

### Real-Time Updates (SignalR)
- Persistent WebSocket connection for real-time event updates
- Personnel status/staffing, unit status, and call updates propagate instantly to all widgets
- Auto-reconnect with status display in the sidebar
- Manual reconnect button available in the side menu

## Navigation Structure

- **Sidebar/Drawer** with navigation to: Home (Dashboard), Calls, Personnel, Units, Contacts, Notes, Protocols, Map, Configure, Settings
- **SignalR connection status** displayed in the sidebar with reconnect button
- **Logout** from the sidebar

## Settings & Configuration

| Setting | Description |
|---------|-------------|
| **Server URL** | Custom API endpoint for self-hosted deployments |
| **Login Info** | Update username and password |
| **Theme** | Light, Dark, or System |
| **Language** | English, Spanish, or Arabic |
| **Keep Alive** | Prevent screen from sleeping (essential for station wall displays) |
| **Background Geolocation** | Enable/disable background GPS tracking |
| **Bluetooth Device** | Scan and pair BLE PTT headsets |

### Docker Deployment

The web version can be deployed as a Docker container for station displays:

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t resgrid-bigboard-web .
docker run -p 3000:80 --env-file .env.docker resgrid-bigboard-web
```

## Hardware & Permission Requirements

### Required Hardware
| Hardware | Required | Purpose |
|----------|:--------:|---------|
| Internet | **Yes** | API, SignalR, push notifications |
| Large Screen | Recommended | Dashboard widgets are optimized for large displays (TV, monitor, tablet) |
| Speaker | Optional | Audio streams and voice playback |
| Microphone | Optional | PTT voice communication |
| GPS | Optional | Position tracking |
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
| Wake Lock | Keep device awake for continuous display |
| Record Audio | PTT voice |
| Capture Audio Output | Audio routing for PTT/voice |
| Post Notifications | Push notifications (Android 13+) |
| Foreground Service | Background services |
| Foreground Service (Microphone) | Voice in foreground service |
| Foreground Service (Connected Device) | BLE in foreground service |
| Foreground Service (Media Playback) | Audio stream in foreground service |

### Desktop (Electron)
- Default window size: 1400×900 pixels (minimum 800×600)
- External links open in the default system browser
- macOS dock icon support with window recreation
