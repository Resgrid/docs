---
sidebar_position: 12
title: Content standards (SCORM, cmi5, LTI, xAPI)
---

# Content standards: SCORM, cmi5, LTI and xAPI

Departments often buy e-learning from content providers (continuing-education courses, HAZMAT refreshers, vendor product training) or move courses out of another learning system. The **Standards** pages let that content run inside Resgrid and land on the member's transcript like any other course lesson:

- **SCORM 1.2, SCORM 2004 and cmi5 packages**: upload the provider's zip, then use it as a lesson in a [course](/web-app/trainings/courses). It plays in a sandboxed player.
- **LTI 1.3 tools**: register a provider's tool, then add an LTI lesson that opens the provider's course in a new window and, with score passback, completes when the provider reports the result.
- **xAPI**: send your members' course and lesson results to your own Learning Record Store (LRS).

Content standards are part of the [LMS add-on](/web-app/trainings/lms/).

**Where to find it:** **Trainings → Standards**, with three tabs: **Content packages**, **LTI tools** and **xAPI**. The section shows for course managers and graders; the pages are for department admins and members with **Manage Courses** (132). Changes need an active LMS add-on; without it the pages show *Content standards are part of the LMS add-on. Activate it to upload packages, register LTI tools and send xAPI statements.* After a lapse everything stays visible and lessons already assigned keep playing, but packages, tools and xAPI settings cannot be changed. The pages are hidden while the `Training.Lms` rollout flag is off.

## Supported standards

| Standard | Versions | How the lesson completes |
|---|---|---|
| SCORM | 1.2; 2004 (2nd, 3rd and 4th edition share the runtime) | When the package reports its completion status. The member cannot mark it complete. |
| cmi5 | cmi5 packages with their AUs inside the zip | By the cmi5 moveOn rule of the package. AUs hosted elsewhere are refused. |
| LTI | 1.3 launch, with Assignment and Grade Services (AGS) score passback | With passback: when the tool reports the activity finished and graded at or above the lesson's pass mark. Without passback: when the member opens the tool. |
| xAPI | 1.0.3 statements out to an external LRS | — (reporting only) |

SCORM and cmi5 results (completion, score, pass or fail) are reported by the package running in the learner's browser, so a determined learner could alter them. For courses that carry continuing-education credit, add a Resgrid assessment lesson as well.

## Upload a SCORM or cmi5 package

1. Open **Trainings → Standards → Content packages**.
2. Under **Package (.zip)** choose the file and select **Upload package**. *Up to 500 MB. The zip must have imsmanifest.xml (SCORM) or cmi5.xml (cmi5) at its root; it is checked before it is stored and unpacked shortly after.*
3. The package appears with status **Waiting to unpack**, then **Unpacking**, then **Ready** (usually within a few minutes). The list shows the **Title**, **Standard**, the number of **SCOs / AUs**, the file count and size, and when it was **Uploaded**.
4. If the package is refused, the status is **Failed** with the reason, for example *No imsmanifest.xml (SCORM) or cmi5.xml (cmi5) at the root of the zip.* or *This SCORM version is not supported (SCORM 1.2 and 2004 are).*

![Content packages (media storage is not configured on this installation)](/img/web-app/lms/lms-standards-packages.png)

A package is checked before it is stored. It is refused when it is empty or not a zip, larger than 500 MB, holds more than 10,000 files, unpacks to more than 2 GB, holds a single file over 1 GB, holds a file that compresses far beyond real content, contains a path that leaves the package folder, has no launchable SCO or AU, or names a launch file that is not in the zip.

**Remove** takes a package out of the list for new lessons (*Package removed from new lessons.*); lessons that already use it are not affected.

Packages are stored in the LMS media store. If your Resgrid server has none configured, the page says *LMS media storage is not configured on this system, so packages cannot be uploaded or played.*

### Use the package in a course

1. Open the course under **Trainings → Course library** and edit its draft version.
2. Under **Add a lesson:** choose **SCORM package** or **cmi5 package**.
3. Pick the **Content package**. *The lesson completes when the package reports it (SCORM status or the cmi5 moveOn rule); the member cannot mark it complete.*
4. Save the lesson, then submit and publish the version as usual (see [Courses](/web-app/trainings/courses)).

<!-- SHOT: /img/web-app/lms/lms-standards-lesson-package.png | A SCORM package lesson in the course builder | /User/Courses/Builder/(course version id) | Cedar Valley, draft of the course "Hazmat awareness" with a lesson of kind SCORM package and "Hazmat awareness refresher" selected -->

### What the member sees

The member opens the lesson from **Trainings → Courses** as usual. The package runs in a protected frame (*The course runs in a protected frame and reports only its own progress.*) that cannot reach Resgrid pages or sign-ins. **Parts of this lesson** lists the SCOs or AUs with a **done** mark, and the panel shows the **Result**, **Score** and whether the **Completion rule met**. **Refresh progress** updates it. A launch stays valid for 8 hours; after that the member opens the lesson again (*This launch has expired. Open the lesson again.*).

<!-- SHOT: /img/web-app/lms/lms-standards-player.png | A member playing a SCORM lesson | /User/Courses/Play/(enrollment id)?lesson=(lesson id) | Priya Raman enrolled in "Hazmat awareness", the SCORM lesson open in the sandboxed player with "Parts of this lesson" and the Result panel -->

## Register an LTI 1.3 tool

An LTI provider gives you its tool's endpoints; you give the provider Resgrid's platform details.

1. Open **Trainings → Standards → LTI tools** and select **Register a tool**.
2. Enter the provider's details:

   | Field | What to enter |
   |---|---|
   | **Name** | How the tool is shown to authors and members, e.g. *Partner CE (cardiac)*. |
   | **Login initiation URL** | The tool's OIDC login initiation endpoint (https). |
   | **Launch (target link) URL** | The tool's launch endpoint (https). |
   | **Tool key set URL** | The tool's JWKS URL, used to verify its score passback requests. |
   | **Redirect URIs** | One per line (https). Launches are only ever posted to these; the launch URL is used when empty. |
   | **Tool public keys (JWKS), instead of a URL** | Paste the tool's key set if it has no key set URL. |
   | **Custom parameters** | One `key=value` per line, sent with every launch. |
   | **The tool reports the score back (Assignment and Grade Services)** | Tick when the provider passes scores back. |
   | **Share the member's name** / **Share the member's e-mail address** | Off by default: launches share only a pseudonymous member ID. |
   | **Active** | Untick to stop new launches. |

3. Select **Save**. Resgrid creates the tool's **Client ID** and **Deployment ID** and shows them at the top of the page.
4. Give the provider these values with the **Platform details for tool providers** from the LTI tools page: **Issuer**, **Key set URL (JWKS)**, **Authorization (OIDC) URL**, **Access token URL** and the **Active key ID**.

![An LTI tool registration](/img/web-app/lms/lms-standards-tool.png)

The platform details for your department:

| Detail | Value |
|---|---|
| Issuer | `https://<your Resgrid address>/lti/<department id>` |
| Key set URL (JWKS) | `https://<your Resgrid address>/lti/<department id>/jwks` |
| Authorization (OIDC) URL | `https://<your Resgrid address>/lti/authorize` |
| Access token URL | `https://<your Resgrid address>/lti/<department id>/token` |

The first tool you save creates the department's signing key (RS256). **Rotate signing key** creates a new one: *A new signing key is active. The previous key stays published for a week.* Tools that read the key set pick up the new key on their own.

![LTI tools and the platform details](/img/web-app/lms/lms-standards-platform.png)

### Add an LTI lesson to a course

1. In the course builder choose **LTI tool** under **Add a lesson:**.
2. Pick the **LTI tool** (tools without passback are marked *no score passback*). Optionally set the **Target link URI** for a specific activity and lesson-level **Custom parameters**.
3. Set the **Pass mark (%)**. With score passback the lesson completes at the pass mark (0 = when the tool reports it finished); otherwise when the tool is opened.
4. Save, submit and publish.

The member sees *This lesson is provided by Partner CE (cardiac) and opens in a new window.* and selects **Open the course**. With passback: *Your result comes back from the provider when you finish; refresh this page to see it.* The launch is checked like any lesson (add-on, lapse rules, lesson order) and its login hint is single-use and valid for 5 minutes.

## Send xAPI statements to your LRS

1. Open **Trainings → Standards → xAPI**.
2. Tick **Send xAPI statements to the LRS**.
3. Enter the **LRS endpoint (https)**, the **LRS key** and the **LRS secret** your LRS issued. The secret is stored encrypted and never shown again (*Stored (leave empty to keep it)*); tick **Remove the stored secret** to clear it.
4. Leave **Identify members by e-mail address (otherwise a pseudonymous department account)** off unless your LRS needs e-mail addresses.
5. Select **Save**.

Statements (attempted, completed, passed, failed) are queued when they happen and sent in batches of 50, with retries when the LRS is unavailable: up to 12 attempts, waiting up to 6 hours between them. The page counts statements **Waiting to send**, **Delivered** and **Failed** and lists **Recent failures** with the **Last error**. **Retry failed statements** queues them again (*Failed statements were queued again.*). Delivered statements are purged after 30 days.

![xAPI settings and the outbox](/img/web-app/lms/lms-standards-xapi.png)

The same pseudonymous member ID is used at every LTI tool and LRS (the LTI subject, the cmi5 and xAPI account name, the SCORM learner ID), so a provider can follow one member's results without learning who they are.

## Setup examples

| Organization | How they use the standards |
|---|---|
| **EMS agency** | Registers its CE provider's LTI 1.3 tool; a cardiac course lesson completes with the passed-back score and the hours land on the transcript. |
| **Fire department** | Uploads a SCORM 2004 HAZMAT refresher bought from a vendor and adds a Resgrid assessment lesson for the CE credit. |
| **Industrial / HAZMAT team** | Moves its existing SCORM 1.2 safety modules out of a corporate LMS and sends results to the company LRS over xAPI. |
| **Law enforcement / security** | Plays a vendor's cmi5 de-escalation module; supervisors read results in the course report. |
| **Training academy** | Sends every course result to its own LRS for long-term records alongside other systems. |
| **EU organizations** | Keeps **Identify members by e-mail address** off so the LRS only receives pseudonymous IDs. |

## Technical reference

| Item | Value |
|---|---|
| Pages | `LmsStandardsController`: `GET /User/LmsStandards/Index` (packages), `POST Upload`, `POST DeletePackage`, `GET Tools`, `GET Tool/{id?}`, `POST SaveTool`, `POST DeleteTool`, `POST RotateKey`, `GET Launch/{id}?lesson=` (member LTI launch), `GET Xapi`, `POST SaveXapi`, `POST RetryXapi`; partials `_AddonNotice`, `_LessonFields` (course builder fields), `_Platform` (platform details), `_Player` (runtime player) |
| Content runtime | `LmsContentController` at `/lms-content/{token}/...`: package files served under a sandbox CSP, the SCORM adapter (`__rg/config.js`, `__rg/commit`), the cmi5 fetch URL and a minimal LRS for cmi5 AUs (`xapi/statements`, `xapi/activities/state`) |
| LTI platform | `LmsLtiController` at `/lti/`: `authorize` (OIDC), `{departmentId}/jwks`, `{departmentId}/token` (AGS client credentials), `{departmentId}/ags/{lessonId}/lineitem` and `/scores` |
| Lesson kinds | `LmsLessonKinds.Scorm` 4, `Cmi5` 5, `LtiLink` 9 |
| Limits | `LmsStandardsConfig`: 500 MB zip, 10,000 files, 2 GB unpacked, 1 GB per file, compression ratio 200; launch 8 hours; LTI login hint and id_token 5 minutes, AGS token 60 minutes, retired keys kept 7 days; xAPI batch 50, 12 attempts, backoff up to 360 minutes, delivered kept 30 days; `LearnerIdPepper` for the pseudonymous ID |
| Storage | `LmsConfig` S3-compatible media store (no store: uploads refused, nothing launches) |
| Department setting | 147 `LmsStandardsSettings` (xAPI enabled, endpoint, key, encrypted secret, e-mail in actor) |
| Worker | 98 LMS Standards (unpacks packages, delivers xAPI statements, purges launches and tokens) |
| Services | `LmsContentPackageService`, `LmsStandardsRuntimeService`, `LmsLtiService`, `LmsXapiService` |
| Migrations | M0392 (packages and runtime), M0393 (LTI and xAPI outbox), M0394 (lesson columns) |
| v4 API | `GET api/v4/LmsStandards/GetLaunch?enrollmentId=&lessonId=&item=` (app launch) |
| Admin Assist | feature `lms-content-standards` |
