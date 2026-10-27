/*
 * Resgrid Academy (https://academy.resgrid.com) video catalog.
 *
 * Lessons live on the Academy home page and open with `#lesson=<id>`; their
 * media sits under /media. Walkthroughs each have their own page under
 * /deep-dive/lessons/<id>/ with media under /deep-dive/media. The Academy is
 * served from GitHub Pages with `Access-Control-Allow-Origin: *`, so the
 * videos and caption tracks can be played inline from the docs site.
 *
 * When the Academy adds a video, add it here and reference it from a doc page
 * with <AcademyVideo id="..." />.
 */

export const ACADEMY_URL = 'https://academy.resgrid.com/';
export const ACADEMY_WALKTHROUGHS_URL = `${ACADEMY_URL}deep-dive/`;

/* [id, topic, title, minutes, audience] */
const LESSONS = [
  ['00-start', 'Orientation', 'Resgrid: from the first alert to the next shift', 3.0, 'All department roles'],
  ['01-people', 'People', 'Build a roster dispatch can use', 2.6, 'Administrators'],
  ['02-security', 'Security', 'Configure a department and protect access', 3.7, 'Administrators'],
  ['03-units', 'Units', 'Represent apparatus, crews, and GPS devices', 2.4, 'Administrators and dispatchers'],
  ['04-apps', 'Apps', 'Put the right Resgrid app on each device', 3.0, 'Members, dispatchers, and commanders'],
  ['05-calls', 'Calls', 'Take an incident from intake to closeout', 4.3, 'Dispatchers and administrators'],
  ['06-communication', 'Communication', 'Make alerts reach the intended audience', 3.6, 'Administrators, officers, and members'],
  ['07-mapping', 'Mapping', 'Make location information useful and current', 3.6, 'Dispatchers and administrators'],
  ['08-shifts', 'Shifts', 'Plan coverage and keep dispatch aligned', 2.5, 'Schedulers, dispatchers, and members'],
  ['09-training', 'Training', 'Assign learning and track qualifications', 2.7, 'Training officers and members'],
  ['10-knowledge', 'Knowledge', 'Give members a dependable reference library', 4.6, 'Officers, dispatchers, and members'],
  ['11-checklists', 'Checklists', 'Record routine checks and missed work', 2.3, 'Readiness officers and members'],
  ['12-maintenance', 'Maintenance', 'Turn defects into accountable repairs', 4.1, 'Fleet officers and technicians'],
  ['13-inventory', 'Inventory', 'Know what is available, issued, and expiring', 3.0, 'Logistics officers and members'],
  ['14-records', 'Records', 'Keep incident and prevention records reviewable', 9.4, 'Report writers, reviewers, and records officers'],
  ['15-deployments', 'Deployments', 'Keep deployment activity and cost evidence together', 3.2, 'Deployment coordinators and finance officers'],
  ['16-business', 'Business', 'Connect service activity to costs and billing', 8.9, 'Finance staff and business administrators'],
  ['17-automation', 'Automation', 'Automate a repeatable task with visible outcomes', 2.6, 'Administrators and integration owners'],
  ['18-ptt', 'Push-to-talk', 'Set up voice channels for team coordination', 1.9, 'Administrators and field teams'],
  ['19-adp', 'Data protection', 'Plan protected-data access and recovery', 2.7, 'Security administrators and records officers'],
  ['20-plans', 'Plans', 'Match subscription capacity to the roster', 1.7, 'Managing members and administrators'],
  ['21-ai', 'AI', 'Understand AI availability and human review', 2.4, 'Administrators and officers'],
  ['22-relay', 'Relay', 'Relay: bring an audio dispatch feed into Resgrid', 1.2, 'System operators and dispatch administrators'],
  ['23-self-hosting', 'Self-hosting', 'Self-hosting: configuration and operating responsibilities', 1.5, 'Self-hosted system operators'],
];

/* [id, title, minutes] */
const WALKTHROUGHS = [
  ['01-setup-wizard', 'Set up a department with the nine-step wizard', 7.9],
  ['02-department-settings', 'Configure department-wide behavior', 6.7],
  ['03-custom-statuses', 'Create statuses with useful operational meaning', 7.1],
  ['06-dispatch-settings', 'Control recipient selection and dispatch behavior', 7.7],
  ['12-chat', 'Use chat channels, messages and acknowledgements', 5.9],
  ['13-assistant', 'Use the Assistant and understand AI prerequisites', 6.0],
  ['14-admin-assist', 'Use Admin Assist to review changes and follow up', 6.4],
];

const videos = {};

LESSONS.forEach(([id, topic, title, minutes, audience]) => {
  videos[id] = {
    id,
    kind: 'lesson',
    topic,
    title,
    minutes,
    audience,
    page: `${ACADEMY_URL}#lesson=${id}`,
    src: `${ACADEMY_URL}media/${id}.mp4`,
    poster: `${ACADEMY_URL}media/${id}.jpg`,
    captions: `${ACADEMY_URL}media/${id}.vtt`,
  };
});

WALKTHROUGHS.forEach(([id, title, minutes]) => {
  const page = `${ACADEMY_WALKTHROUGHS_URL}lessons/${id}/`;
  videos[id] = {
    id,
    kind: 'walkthrough',
    title,
    minutes,
    audience: 'Step-by-step in the web app',
    page,
    src: `${ACADEMY_WALKTHROUGHS_URL}media/${id}.mp4`,
    poster: `${page}01-01.jpg`,
    captions: `${page}captions.vtt`,
  };
});

export const academyLessons = LESSONS.map(([id]) => videos[id]);

export function getAcademyVideo(id) {
  return videos[id];
}
