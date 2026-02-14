---
sidebar_position: 2
---

# Setup Department

This guide walks you through every step needed to get your Resgrid department configured and ready for day-to-day use. Work through the sections in order — each one builds on the previous.

## Before You Begin

Collect the following information so you have it handy as you configure each section:

| What you need | Example |
|---|---|
| Department name | *Smallville Fire & Rescue* |
| Department street address | *123 Main St, Smallville, KS 66002, US* |
| Response-area centre coordinates (decimal) | *38.8783, −77.0687* |
| Time zone | *Eastern Standard Time* |
| Station / group names and addresses | *Station 1 — 100 Elm St …* |
| Personnel role names | *Firefighter, EMT, Captain, Driver* |
| User names + email addresses for each member | |
| Unit types you use | *Engine, Ladder, Ambulance, Rescue* |
| Unit names & assigned stations | *Engine 1 @ Station 1* |
| Any custom personnel status labels you want | *Responding, On Scene, Available, etc.* |
| Any custom staffing-level labels you want | *Available, Light Duty, Off Duty, etc.* |
| Any custom unit status labels (per unit type) | *In Service, Out of Service, Responding, etc.* |

:::tip Recommended Setup Order
1. Department Settings → 2. Groups & Stations → 3. Roles → 4. Personnel (Users) → 5. Unit Types → 6. Units → 7. Custom Statuses
:::

---

## 1 — Department Settings

Navigate to **Department → Settings** in the left-hand menu.

### General Settings

| Field | Description |
|---|---|
| **Department Name** | The display name of your department (required). |
| **Time Zone** | Select your local time zone from the dropdown (required). |
| **Use 24 Hour Time** | Check this if your department uses 24-hour (military) time. |
| **Managing User** | The account owner / primary administrator. Select from the user dropdown. |
| **Disable Auto Available** | When checked, users will **not** be automatically set to "Available" status when they log in. |

### Sorting Options

| Field | Description |
|---|---|
| **Personnel Sorting** | How the personnel list is ordered (Default, First Name, Last Name, or Group). |
| **Unit Sorting** | How units are ordered in lists. |
| **Call Sorting** | How dispatch calls are ordered. |

### Department Address

This is the primary physical address for your department and is used as the default map centre.

| Field | Description |
|---|---|
| **Street** | Street address (required). |
| **City** | City (required). |
| **State** | State or province (required). |
| **Zip / Postal Code** | Postal code (required). |
| **Country** | Select your country from the dropdown (required). |
| **Default Map Center Latitude** | Decimal latitude for the centre of your response area (e.g. `38.8783`). |
| **Default Map Center Longitude** | Decimal longitude for the centre of your response area (e.g. `-77.0687`). |

### Personnel Staffing Reset (optional)

If you want every member's staffing level to automatically reset at a certain time each day:

1. Toggle **Enable Staffing Reset** to **On**.
2. Set the **Time to Reset Staffing** (e.g. `06:00`).
3. Choose the **Reset Staffing Level To** value from the dropdown (uses the default levels, or your custom staffing levels if configured).

### Personnel Status Reset (optional)

Works the same way as staffing reset but for personnel status:

1. Toggle **Enable Status Reset** to **On**.
2. Set the **Time to Reset Status**.
3. Choose the **Reset Status Level To** value.

### Save

Click **Save** at the bottom of the page. A green confirmation banner will appear when settings are saved successfully.

---

## 2 — Groups & Stations

Groups organise your personnel and units into logical groupings. Resgrid has two group types:

| Type | When to use | Location required? |
|---|---|---|
| **Station Group** | Represents a physical location (fire station, precinct, base). | Yes — street address, GPS coordinates, or what3words |
| **Organizational Group** | A logical / administrative grouping (team, division, squad). | No |

Navigate to **Department → Groups** in the left-hand menu.

### Create a New Group

1. Click **Add New Group**.
2. Choose the **Group Type**:
   - **Station** — you must provide a location (address, lat/long, or what3words).
   - **Organizational** — no location required.
3. Enter a **Group Name** (required, max 50 characters).
4. Optionally select a **Parent Group** (for nesting organizational groups under a station, for example).
5. **For Station groups**, fill in at least one location method:
   - **Street / City / State / Postal Code / Country**, or
   - **Latitude / Longitude** in decimal format, or
   - **what3words address** (e.g. `humble.echo.sticky`).
6. Add **Group Admins** — select users who can manage this group.
7. Add **Group Users** — select the members assigned to this group.
8. Click **Save**.

:::info
A user can only belong to **one group** at a time. If you try to add someone who is already in another group you will receive a validation error.
:::

:::tip
After creating a Station group you can draw a **Geofence** polygon on the map by clicking the **Geofence** button on the group list. This defines the station's response area boundary.
:::

### Edit or Delete a Group

- Click **Edit** next to the group to change its name, members, or location.
- Click **Delete** to remove a group. Deletion is **blocked** if the group still has users, child groups, units, or shifts assigned — you must move or remove those dependencies first.

---

## 3 — Personnel Roles

Roles describe what function a person performs in your department (e.g. *Firefighter*, *EMT*, *Captain*, *Driver/Operator*). A person can hold **multiple** roles.

Navigate to **Personnel → Roles** in the left-hand menu.

### Create a New Role

1. Click **Add New Role**.
2. Enter the **Role Name** (required, must be unique within the department).
3. Optionally add a **Description** explaining the role.
4. Click **Save**.

Repeat for every role your department uses.

### Assign Users to a Role

1. Click **Edit** next to the role.
2. In the **Users** multi-select, choose the department members who hold this role.
3. Click **Save**.

:::tip
You can also assign roles to users when you create or edit their personnel record (see the next section).
:::

### Using Roles to Work Around the One-Group Limitation

Because a user can only belong to **one group** at a time, roles become the primary tool for organizing people across group boundaries. Unlike groups, a user can hold **any number of roles simultaneously**, and Resgrid lets you dispatch by role — making roles the key to flexible, cross-group operations.

#### Example 1 — Cross-Trained Personnel

Your department has *Station 1* and *Station 2*. Several members are cross-trained as both Firefighters and EMTs and may need to respond with either station depending on the call.

**Setup:**
- Place each person in their **primary** station group (the one they report to most often).
- Create roles such as `Firefighter`, `EMT`, and `Paramedic`.
- Assign the appropriate roles to each person regardless of which station group they belong to.

**Dispatching:** When you create a call, Resgrid lets you dispatch by **role** in addition to (or instead of) by group. Selecting the `EMT` role on a dispatch will notify *every* member with that role across *all* stations — effectively dispatching cross-group without moving anyone.

#### Example 2 — Specialty Teams That Span Multiple Stations

You have a HazMat team and a Water Rescue team whose members are drawn from several different stations.

**Setup:**
- Keep every member in their home station group.
- Create roles named `HazMat Team` and `Water Rescue Team`.
- Assign those roles to the qualified members, regardless of station.

**Dispatching:** Dispatch to the `HazMat Team` role and all qualified members across every station receive the call. No need to pull people out of their station groups.

#### Example 3 — Officers and Command Staff

Your captains and chiefs need to be reachable for command-level dispatches but they physically belong to individual stations.

**Setup:**
- Each officer stays in their home station group.
- Create roles like `Captain`, `Battalion Chief`, and `Incident Commander`.
- Assign the appropriate command roles.

**Dispatching:** A mutual-aid or large-incident dispatch can target the `Battalion Chief` role to notify all battalion chiefs department-wide, while a routine call still goes to a single station group.

#### Example 4 — Volunteers Who Cover Multiple Stations

Volunteer departments often have members who respond to whichever station is closest or needs staffing.

**Setup:**
- Assign each volunteer to a **primary** station group (e.g. the one nearest their home).
- Create a role called `Volunteer Pool` (or more specific roles like `Volunteer Firefighter`, `Volunteer EMT`).
- Assign the role to every cross-covering volunteer.

**Dispatching:** When a station is short-staffed, dispatch to both the station group **and** the `Volunteer Pool` role. All volunteers across the department will be notified and can respond to whichever station needs them.

:::info Key Takeaway
Think of **groups** as *where* a person is physically based (one location) and **roles** as *what* a person can do or *which teams* they belong to (many at once). Use group-based dispatch for routine, location-specific calls and role-based dispatch when you need to reach people across group boundaries.
:::

---

## 4 — Adding Personnel (Users)

Navigate to **Personnel** in the left-hand menu.

### Add a New User

1. Click **Add Person**.
2. Fill in the **Account Information**:

| Field | Description |
|---|---|
| **Username** | The login username (required, must be unique). |
| **Password / Confirm Password** | Must be at least 8 characters with uppercase, lowercase, and numbers. |

3. Fill in the **User Details**:

| Field | Description |
|---|---|
| **ID Number** | Optional badge / employee number. |
| **First Name** | Required. |
| **Last Name** | Required. |
| **Email Address** | Required. Must be unique across all Resgrid accounts. |

4. Set the **Group Details**:

| Field | Description |
|---|---|
| **Group** | Select the group (station or organizational) for this user, or "No Group". |
| **Is Group Admin** | Check if this user should be an administrator of the selected group. |

5. Select **Roles** — choose one or more roles from the multi-select (roles you created in Step 3).

6. Configure **Contact Details**:

| Field | Description |
|---|---|
| **Mobile Number** | The user's mobile phone number (optional). |
| **Mobile Carrier** | Required if a mobile number is provided. |
| **Call Options** | How the user is notified of dispatch calls — Email, Text, and/or Push. |
| **Message Options** | How the user receives messages — Email, Text, and/or Push. |
| **Notification Options** | How the user receives system notifications — Email, Text, and/or Push. |

7. **Notify User** — check this to send the new user a welcome email with their login credentials.
8. Click **Add Person**.

### Invite Existing Users

If someone already has a Resgrid account (e.g. they belong to another department), you can invite them instead. Navigate to **Department → Invites**, enter their email address(es) (comma-separated), and click **Send Invites**.

---

## 5 — Unit Types

Unit types categorise your apparatus or vehicles (e.g. *Engine*, *Ladder*, *Ambulance*, *Rescue*, *Brush Truck*). Each unit type can optionally be linked to a **custom unit status set** (configured in Step 7).

Navigate to **Department → Types** and find the **Unit Types** section.

### Create a New Unit Type

1. Click **Add Unit Type**.
2. Enter the **Name** (required, e.g. `Engine`).
3. Select the **Actions** dropdown:
   - **Standard Actions** — uses the built-in unit statuses (Available, Delayed, Unavailable, Committed, Out Of Service, Responding, On Scene, etc.).
   - Or select a **custom unit status set** you have already created (see Step 7).
4. Select a **Map Icon** — choose the icon that will represent this unit type on the map (e.g. *Truck*, *Ambulance*, *Car*, *Helicopter*, etc.) or leave as **Default**.
5. Click **Save**.

:::note
If you haven't created custom unit statuses yet, select **Standard Actions** for now. You can come back and edit the unit type later to link a custom status set after you create one in Step 7.
:::

---

## 6 — Units

Units are the individual vehicles, apparatus, or equipment your department operates.

Navigate to **Units** in the left-hand menu.

### Create a New Unit

1. Click **New Unit**.
2. Fill in the form:

| Field | Description |
|---|---|
| **Name** | Required. Must be unique within your department (e.g. `Engine 1`, `Medic 3`). |
| **Type** | Select the unit type from the dropdown (types created in Step 5). |
| **Station** | Assign this unit to a station group, or select "No Station". |

3. **Add Roles** (optional) — these are seat/position roles specific to this unit (e.g. *Driver*, *Officer*, *Firefighter*). Click **Add Role** to add rows, then type a role name in each row. These are different from department-wide personnel roles — they represent the positions on this specific unit.
4. Click **Save**.

### Assign Personnel to Unit Roles

After creating your units and their roles, you can staff them:

1. Navigate to **Units** and click **Unit Staffing**.
2. For each unit that has roles defined, you will see dropdowns for each role.
3. Select a department member for each role slot.
4. Click **Save**.

---

## 7 — Custom Statuses (Optional)

Resgrid comes with built-in default statuses for personnel, staffing, and units. If the defaults don't fit your department's workflow, you can create fully custom status sets with your own labels, colours, and behaviour.

Navigate to **Custom Statuses** in the left-hand menu.

There are three types of custom statuses:

| Type | What it tracks | How many active sets? |
|---|---|---|
| **Personnel Status** (Actions) | What a person is *doing* — e.g. Responding, On Scene, Available | One set for the entire department |
| **Personnel Staffing** | A person's *availability / readiness* — e.g. Available, Light Duty, Off Duty | One set for the entire department |
| **Unit Status** | A unit's operational status — e.g. In Service, Responding, Out of Service | One set **per unit type** |

### Create Custom Personnel Statuses

1. In the **Personnel Status** section, click **Set Custom Statuses**.
2. Enter a **Name** for the status set (e.g. `Fire Department Personnel Actions`).
3. Optionally add a **Description**.
4. Click **Add Option** to add each status. For each option, fill in:

| Field | Description |
|---|---|
| **Button Text** | The label shown on the status button (e.g. `Responding`). |
| **Button Color** | Background colour for the button (use the colour picker). |
| **Text Color** | Text colour for the button. |
| **Base Type** | Maps this custom status to a system-level behaviour so Resgrid knows its meaning. Options: *Available*, *Not Responding*, *Responding*, *On Scene*, *Dispatched*, *Cleared*, *Returning*, *Staging*, *Unavailable*, or *None*. |
| **Require GPS** | Check if selecting this status should require the user's GPS location. |
| **Detail Type** | What additional picker appears when this status is selected: **None** (no picker), **Calls** (pick an active call), **Stations** (pick a station), or **Calls and Stations** (pick either). |
| **Note Type** | Whether a free-text note is shown: **None**, **Optional**, or **Required**. |

5. Repeat **Add Option** for each status you need.
6. Click **Save**.

### Create Custom Personnel Staffing Levels

1. In the **Personnel Staffing** section, click **Set Custom Staffing Levels**.
2. Enter a **Name** (e.g. `Staffing Levels`).
3. Click **Add Option** for each staffing level:

| Field | Description |
|---|---|
| **Button Text** | The label (e.g. `Available`, `Light Duty`, `Off Duty`). |
| **Button Color** | Background colour. |
| **Text Color** | Text colour. |
| **Note Type** | **None**, **Optional**, or **Required**. |

:::info
Personnel Staffing levels do **not** have Base Type, Require GPS, or Detail Type options — those fields only apply to Personnel Status and Unit Status types.
:::

4. Click **Save**.

### Create Custom Unit Statuses

You can create a different status set for each unit type. For example, your engines might have different statuses than your ambulances.

1. In the **Unit Statuses** section, click **Add Unit Statuses**.
2. Enter a **Name** (e.g. `Engine Statuses`).
3. Click **Add Option** for each status:

| Field | Description |
|---|---|
| **Button Text** | The label (e.g. `In Service`, `Responding`, `Out of Service`). |
| **Button Color** | Background colour. |
| **Text Color** | Text colour. |
| **Base Type** | Maps to system behaviour — same options as personnel statuses. |
| **Require GPS** | Check if GPS location is required when selecting this status. |
| **Detail Type** | **None**, **Calls**, **Stations**, or **Calls and Stations**. |
| **Note Type** | **None**, **Optional**, or **Required**. |

4. Click **Save**.
5. **Link the status set to a unit type:** Navigate to **Department → Types → Unit Types**, edit the desired unit type, and change the **Actions** dropdown from "Standard Actions" to your new custom status set.

---

## Summary Checklist

Use this checklist to confirm you've completed every step:

- [ ] **Department Settings** — name, address, time zone, map centre, and sorting configured
- [ ] **Groups / Stations** — all station and organisational groups created with members assigned
- [ ] **Roles** — all personnel roles created (e.g. Firefighter, EMT, Captain)
- [ ] **Personnel** — all users added with correct group, roles, and notification preferences
- [ ] **Unit Types** — all apparatus types created (e.g. Engine, Ladder, Ambulance)
- [ ] **Units** — all units created with type, station, and unit-specific roles
- [ ] **Custom Personnel Statuses** — configured (if desired) instead of defaults
- [ ] **Custom Personnel Staffing** — configured (if desired) instead of defaults
- [ ] **Custom Unit Statuses** — configured and linked to the appropriate unit types (if desired)

Once all of the above are complete your department is ready for operational use. Personnel can log in, set their status, and dispatchers can begin creating and dispatching calls.
