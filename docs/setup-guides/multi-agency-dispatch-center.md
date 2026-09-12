---
sidebar_position: 11
title: Multi-Agency Dispatch Centre
---

# Setting Up a Multi-Agency Dispatch Centre

For a county or regional dispatch centre, a mutual-aid coordination centre, or a dispatch company that pages and tracks several independent departments. In Resgrid every agency keeps **its own department** (roster, units, settings, records) and the centre is a department too, joined to each agency by a **department link**. Links share active calls and unit/personnel status in the direction you choose, and **resource orders** move units between agencies.

## 1 — Structure

| Piece | How to set it up |
|---|---|
| **Centre department** | Its own personnel are the dispatchers (role *Dispatcher*); stations = the centre and any backup centre; usually no units. |
| **Agency departments** | Each agency follows its own guide ([fire](fire-department), [EMS](ems-agency) …) and administers itself. |
| **Department links** | From the centre's **Department → Links**, create a link to each agency (the agency accepts it). Choose what is shared: *active calls*, *units*, *personnel status* — typically calls **to** the agency and status **from** the agency. |
| **Dispatcher permissions** | In each agency, the link grants the centre the ability to create calls in that agency; the agency keeps close/delete rights. |

## 2 — Dispatching through links

- Dispatchers use the **Dispatch app** (or the web) signed in to the **centre** department. The New Call page lists linked agencies' units and groups as dispatch targets.
- A call created for an agency lives in **that agency's** department (its numbering, its records, its notifications); the centre sees it on its own dashboard through the link.
- **Run cards** are configured per agency (the agency's types and units). A regional standard of *Structure fire* cards in every agency keeps behaviour consistent.
- **Email / SMS import**: CAD pages can go to each agency's import address; or the centre creates calls by hand.

## 3 — The Big Board and mapping

- Run the **Big Board** in the centre with linked departments' units and calls visible.
- Mapping shows units from every linked agency (subject to each agency's *view unit locations* permission and the link's sharing settings).
- **Weather alerts** subscribed for the whole region in the centre department.

## 4 — Resource orders

Use **Orders** for cross-agency moves: the centre (or an agency) raises an order (*2 tenders to Station 4 for water shuttle*), agencies **fill** it with specific units, and fills are accepted/returned — with the whole exchange audited. Agencies with Records can log the same order as a **deployment** with the order document as a snapshot.

## 5 — Communication

- **Chat**: create a custom channel in the centre department for coordinators; incident channels stay inside the owning agency.
- **Messages / distribution lists**: `chiefs@` across agencies via contacts.
- **Workflows** in the centre: *Call created* → post to the regional Discord; in each agency: *Call created* → local notifications.
- **Communication tests** run per agency.

## 6 — Records and reporting

Records stay per agency (each agency's NERIS identity and definitions). The centre uses **Reports → Active calls and resources** and its own Run records for centre activity; for regional statistics ask agencies to schedule **report exports** to a shared mailbox, or use **saved reports** per agency.

## Setup checklist

- [ ] Centre department created; dispatchers with the Dispatcher role and Dispatch app login permission
- [ ] Each agency linked; sharing directions verified with a test call
- [ ] Regional call type / priority naming agreed and applied in every agency
- [ ] Big Board running with linked units visible
- [ ] One resource order filled and returned end-to-end
