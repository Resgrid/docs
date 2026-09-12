import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Icon from './Icons';
import styles from './styles.module.css';

/* ─────────────────────────────────────────────
   Content
   ───────────────────────────────────────────── */

/* Four entry paths — who are you and what do you want to do? */
const Paths = [
  {
    title: 'New to Resgrid?',
    icon: 'book',
    tone: 'blue',
    description:
      'What Resgrid is, what comes in the box, who uses it and how the hosted and self-hosted editions differ.',
    link: '/intro',
    linkLabel: 'Read the introduction',
  },
  {
    title: 'Set up your department',
    icon: 'compass',
    tone: 'teal',
    description:
      'Step-by-step recipes for fire, EMS, SAR, emergency management, security, industrial, transit and more.',
    link: '/setup-guides/overview',
    linkLabel: 'Pick a setup guide',
  },
  {
    title: 'Host it yourself',
    icon: 'server',
    tone: 'violet',
    description:
      'Run the same code as the hosted service on Docker, Kubernetes, a laptop or the Resgrid Incident Command Kit.',
    link: '/self-hosted/quick-start',
    linkLabel: 'Self-hosted quick start',
  },
  {
    title: 'Integrate & automate',
    icon: 'code',
    tone: 'amber',
    description:
      'REST API, event-driven workflows, webhooks, SSO & SCIM provisioning and the developer setup.',
    link: '/api/information',
    linkLabel: 'Open the API docs',
  },
];

/* Every documented module, grouped the same way the introduction groups them. */
const FeatureAreas = [
  {
    key: 'operations',
    title: 'Operations',
    icon: 'radio',
    tone: 'blue',
    description:
      'Take the call, alert the right people, watch it unfold on the map and keep every status current.',
    items: [
      {label: 'Dispatch & Calls', to: '/web-app/dispatch-calls'},
      {label: 'Run Cards & Auto-Dispatch', to: '/web-app/run-cards'},
      {label: 'Call Check-In Timers', to: '/web-app/call-checkin-timers'},
      {label: 'Personnel', to: '/web-app/personnel'},
      {label: 'Units', to: '/web-app/units'},
      {label: 'Groups & Stations', to: '/web-app/groups-stations'},
      {label: 'Custom Statuses', to: '/web-app/custom-statuses'},
      {label: 'Mapping', to: '/web-app/mapping'},
      {label: 'Custom Maps', to: '/web-app/custom-maps'},
      {label: 'Indoor Maps', to: '/web-app/indoor-maps'},
      {label: 'Hardware GPS Tracking', to: '/web-app/unit-tracking'},
      {label: 'Routes', to: '/web-app/routes'},
      {label: 'Shifts', to: '/web-app/shifts'},
      {label: 'Workshifts', to: '/web-app/workshifts'},
      {label: 'Chat & Assistant', to: '/web-app/chat'},
      {label: 'Messages', to: '/web-app/messages'},
      {label: 'Voice & Audio', to: '/web-app/voice-audio'},
      {label: 'Protocols', to: '/web-app/protocols'},
      {label: 'Contacts', to: '/web-app/contacts'},
    ],
  },
  {
    key: 'records',
    title: 'Records & Reporting',
    icon: 'fileText',
    tone: 'teal',
    description:
      'A full records management system — incident reports, prevention, investigations, analytics and disclosure.',
    items: [
      {label: 'Records (RMS) Overview', to: '/web-app/records/overview'},
      {label: 'NERIS Incident Reports', to: '/web-app/records/incident-reports'},
      {label: 'Record Definitions & Templates', to: '/web-app/records/definitions'},
      {label: 'Authoring Records', to: '/web-app/records/authoring'},
      {label: 'Dashboard & Work Queue', to: '/web-app/records/dashboard-and-queue'},
      {label: 'Occupancies & Pre-plans', to: '/web-app/records/occupancies'},
      {label: 'Inspections', to: '/web-app/records/inspections'},
      {label: 'Hydrants & Water Sources', to: '/web-app/records/hydrants'},
      {label: 'Permits & Plan Review', to: '/web-app/records/permits'},
      {label: 'Community Risk Reduction', to: '/web-app/records/community-risk-reduction'},
      {label: 'Investigations', to: '/web-app/records/investigations'},
      {label: 'Analytics', to: '/web-app/records/analytics'},
      {label: 'Quality Review', to: '/web-app/records/quality-review'},
      {label: 'Legal Holds & Disclosures', to: '/web-app/records/legal-holds-and-disclosures'},
      {label: 'Reports', to: '/web-app/reports'},
      {label: 'Forms', to: '/web-app/forms'},
      {label: 'Documents', to: '/web-app/documents'},
      {label: 'Notes', to: '/web-app/notes'},
      {label: 'Calendar', to: '/web-app/calendar'},
      {label: 'Trainings', to: '/web-app/trainings'},
    ],
  },
  {
    key: 'readiness',
    title: 'Readiness & Logistics',
    icon: 'clipboardCheck',
    tone: 'violet',
    description:
      'Know that apparatus, equipment, stock and people are ready before the next call comes in.',
    items: [
      {label: 'Checklists', to: '/web-app/checklists'},
      {label: 'Work Orders & Maintenance', to: '/web-app/work-orders'},
      {label: 'Inventory', to: '/web-app/inventory'},
      {label: 'Resource Orders', to: '/web-app/resource-orders'},
      {label: 'Department Links', to: '/web-app/department-links'},
      {label: 'Communication Tests', to: '/web-app/communication-tests'},
      {label: 'Weather Alerts', to: '/web-app/weather-alerts'},
      {label: 'Templates', to: '/web-app/templates'},
      {label: 'Distribution Lists', to: '/web-app/distribution-lists'},
      {label: 'Dashboard', to: '/web-app/dashboard'},
    ],
  },
  {
    key: 'automation',
    title: 'Automation, Security & Integration',
    icon: 'zap',
    tone: 'amber',
    description:
      'Automate the routine, lock down access and connect Resgrid to the rest of your stack.',
    items: [
      {label: 'Workflows', to: '/web-app/workflows'},
      {label: 'Workflow Variables', to: '/reference/workflow-variables'},
      {label: 'Notifications', to: '/web-app/notifications'},
      {label: 'Security & Permissions', to: '/web-app/security-permissions'},
      {label: 'Account Security & 2FA', to: '/web-app/account-security'},
      {label: 'Advanced Data Protection', to: '/web-app/data-protection'},
      {label: 'Enterprise SSO & SCIM', to: '/enterprise/sso-overview'},
      {label: 'Logs & Auditing', to: '/web-app/logs'},
      {label: 'User Defined Fields', to: '/web-app/user-defined-fields'},
      {label: 'Command Definitions', to: '/web-app/command-definitions'},
      {label: 'Connect', to: '/web-app/connect'},
      {label: 'REST API', to: '/api/information'},
      {label: 'Feature Flags', to: '/reference/feature-flags'},
    ],
  },
];

/* The cross-platform application suite. */
const Apps = [
  {
    title: 'Responder',
    icon: 'smartphone',
    description: 'For individual personnel: status, calls, chat, PTT voice, shifts and location.',
    link: '/apps/responder',
  },
  {
    title: 'Unit',
    icon: 'truck',
    description: 'Shared apparatus device: unit status, crew roles, call details and GPS.',
    link: '/apps/unit',
  },
  {
    title: 'Dispatch',
    icon: 'headphones',
    description: 'Multi-panel dispatch console with live map, resources, PTT and activity log.',
    link: '/apps/dispatch',
  },
  {
    title: 'Big Board',
    icon: 'monitor',
    description: 'Widget-based wall display for stations, EOCs and command vehicles.',
    link: '/apps/big-board',
  },
  {
    title: 'Relay',
    icon: 'radioTower',
    description: 'Listen to a scanner or audio feed, detect tones, record audio and dispatch.',
    link: '/apps/relay',
  },
];

/* Setup guides by organization type. */
const SetupGuides = [
  {label: 'Fire Department', to: '/setup-guides/fire-department'},
  {label: 'EMS Agency', to: '/setup-guides/ems-agency'},
  {label: 'Search & Rescue', to: '/setup-guides/search-and-rescue'},
  {label: 'Emergency Management / EOC', to: '/setup-guides/emergency-management'},
  {label: 'Incident Management Team', to: '/setup-guides/incident-management-team'},
  {label: 'CERT & Community Response', to: '/setup-guides/cert-community-response'},
  {label: 'Security & Facilities', to: '/setup-guides/security-and-facilities'},
  {label: 'Industrial Emergency Response', to: '/setup-guides/industrial-emergency-response'},
  {label: 'Delivery, Transit & Field Service', to: '/setup-guides/delivery-transit-field-service'},
  {label: 'Multi-Agency Dispatch Center', to: '/setup-guides/multi-agency-dispatch-center'},
];

/* Administer / self-host / develop link columns. */
const ResourceColumns = [
  {
    title: 'Administer',
    icon: 'sliders',
    description: 'Configure and run a department day to day.',
    items: [
      {label: 'Configuration Overview', to: '/configuration/setup'},
      {label: 'Department Settings', to: '/web-app/department-settings'},
      {label: 'Types & Configuration', to: '/web-app/types-configuration'},
      {label: 'Personnel Roles', to: '/configuration/personnel-roles'},
      {label: 'Stations & Groups', to: '/configuration/stations-groups'},
      {label: 'Mapping Layers', to: '/configuration/mapping-layers'},
      {label: 'Text Messaging', to: '/configuration/text-messaging'},
      {label: 'Call Import', to: '/configuration/call-import'},
      {label: 'Subscription & Billing', to: '/web-app/subscription-billing'},
      {label: 'Help & Setup', to: '/web-app/help-setup'},
    ],
  },
  {
    title: 'Self-host',
    icon: 'server',
    description: 'Deploy and operate Resgrid on your own infrastructure.',
    items: [
      {label: 'Quick Start', to: '/self-hosted/quick-start'},
      {label: 'Installation', to: '/self-hosted/installation'},
      {label: 'Kubernetes & k3s', to: '/self-hosted/multi'},
      {label: 'Windows Laptop / Desktop', to: '/self-hosted/laptop'},
      {label: 'Incident Command Kit (RICK)', to: '/self-hosted/rick'},
      {label: 'Docker Reference', to: '/reference/docker'},
      {label: 'Sizing Guidelines', to: '/reference/sizing'},
      {label: 'Auditing', to: '/reference/auditing'},
      {label: 'Localization', to: '/reference/localization'},
      {label: 'Hosted vs Self-Hosted', to: '/get-started/hosted'},
    ],
  },
  {
    title: 'Develop',
    icon: 'terminal',
    description: 'Build against the API or contribute to the codebase.',
    items: [
      {label: 'API Information', to: '/api/information'},
      {label: 'API Authentication', to: '/api/authentication'},
      {label: 'Workflows API', to: '/api/workflows'},
      {label: 'Custom Maps API', to: '/api/custom-maps'},
      {label: 'Calendar Export API', to: '/api/calendar-export'},
      {label: 'SSO & SCIM API Reference', to: '/enterprise/sso-api-reference'},
      {label: 'Prerequisites', to: '/development/prerequisites'},
      {label: 'Getting the Code', to: '/development/getting-code'},
      {label: 'Solution Architecture', to: '/development/solution'},
      {label: 'Reference Overview', to: '/reference/overview'},
    ],
  },
];

/* ─────────────────────────────────────────────
   Building blocks
   ───────────────────────────────────────────── */

function SectionHeader({eyebrow, title, subtitle, action}) {
  return (
    <div className={styles.sectionHeader}>
      <div>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h2 className={styles.sectionTitle}>{title}</h2>
        {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
      </div>
      {action && (
        <Link to={action.to} className={styles.sectionAction}>
          {action.label}
          <Icon name="arrowRight" size={16} />
        </Link>
      )}
    </div>
  );
}

function IconBadge({name, tone = 'blue', size = 'md'}) {
  return (
    <span className={clsx(styles.iconBadge, styles[`tone-${tone}`], styles[`iconBadge-${size}`])}>
      <Icon name={name} size={size === 'lg' ? 24 : 20} />
    </span>
  );
}

function PathCard({title, icon, tone, description, link, linkLabel}) {
  return (
    <Link to={link} className={clsx(styles.pathCard, styles[`pathCard-${tone}`])}>
      <IconBadge name={icon} tone={tone} size="lg" />
      <h3 className={styles.pathTitle}>{title}</h3>
      <p className={styles.pathDescription}>{description}</p>
      <span className={styles.pathLink}>
        {linkLabel}
        <Icon name="arrowRight" size={16} className={styles.pathArrow} />
      </span>
    </Link>
  );
}

function FeatureArea({title, icon, tone, description, items}) {
  return (
    <section className={styles.area}>
      <div className={styles.areaHeader}>
        <IconBadge name={icon} tone={tone} />
        <div>
          <h3 className={styles.areaTitle}>{title}</h3>
          <p className={styles.areaDescription}>{description}</p>
        </div>
      </div>
      <ul className={styles.chipList}>
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className={styles.chip}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AppCard({title, icon, description, link}) {
  return (
    <Link to={link} className={styles.appCard}>
      <span className={styles.appIcon}>
        <Icon name={icon} size={22} />
      </span>
      <div className={styles.appBody}>
        <h4 className={styles.appTitle}>{title}</h4>
        <p className={styles.appDescription}>{description}</p>
      </div>
      <Icon name="arrowRight" size={16} className={styles.appArrow} />
    </Link>
  );
}

function ResourceColumn({title, icon, description, items}) {
  return (
    <div className={styles.resourceColumn}>
      <div className={styles.resourceHeader}>
        <IconBadge name={icon} tone="slate" />
        <div>
          <h3 className={styles.resourceTitle}>{title}</h3>
          <p className={styles.resourceDescription}>{description}</p>
        </div>
      </div>
      <ul className={styles.resourceList}>
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className={styles.resourceLink}>
              <span>{item.label}</span>
              <Icon name="arrowRight" size={14} className={styles.resourceArrow} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page body
   ───────────────────────────────────────────── */

export default function HomepageFeatures() {
  return (
    <>
      {/* ── Start here ── */}
      <section className={clsx(styles.section, styles.sectionPaths)}>
        <div className="container">
          <SectionHeader
            eyebrow="Start here"
            title="Where do you want to begin?"
            subtitle="Pick the path that matches what you are trying to do today."
          />
          <div className={styles.pathGrid}>
            {Paths.map((props) => (
              <PathCard key={props.link} {...props} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform features ── */}
      <section className={clsx(styles.section, styles.sectionAreas)}>
        <div className="container">
          <SectionHeader
            eyebrow="Platform features"
            title="Everything in the web application"
            subtitle="Every module, grouped the way departments use them. Each link goes straight to that feature's documentation."
            action={{label: 'Web application overview', to: '/web-app/overview'}}
          />
          <div className={styles.areaGrid}>
            {FeatureAreas.map((area) => (
              <FeatureArea key={area.key} {...area} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Apps ── */}
      <section className={clsx(styles.section, styles.sectionApps)}>
        <div className="container">
          <SectionHeader
            eyebrow="Applications"
            title="One suite, every screen"
            subtitle="Cross-platform apps built with React Native and Expo for iOS, Android, web and desktop — each designed for a specific role."
            action={{label: 'Apps overview', to: '/apps/calendar'}}
          />
          <div className={styles.appGrid}>
            {Apps.map((props) => (
              <AppCard key={props.link} {...props} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Setup guides ── */}
      <section className={clsx(styles.section, styles.sectionGuides)}>
        <div className="container">
          <div className={styles.guidesPanel}>
            <div className={styles.guidesCopy}>
              <span className={styles.eyebrow}>Setup guides</span>
              <h2 className={styles.sectionTitle}>Configured for how you operate</h2>
              <p className={styles.sectionSubtitle}>
                Resgrid runs fire departments, EMS agencies, SAR teams, EOCs,
                security companies, industrial brigades and transit fleets. Each
                guide walks through the statuses, types, roles and modules that
                fit your kind of organization.
              </p>
              <Link to="/setup-guides/overview" className={styles.sectionAction}>
                Choosing a setup guide
                <Icon name="arrowRight" size={16} />
              </Link>
            </div>
            <ul className={clsx(styles.chipList, styles.guidesChips)}>
              {SetupGuides.map((guide) => (
                <li key={guide.to}>
                  <Link to={guide.to} className={clsx(styles.chip, styles.chipLarge)}>
                    {guide.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Administer / Self-host / Develop ── */}
      <section className={clsx(styles.section, styles.sectionResources)}>
        <div className="container">
          <SectionHeader
            eyebrow="Go deeper"
            title="Administer, self-host and develop"
            subtitle="Reference material for the people who run, deploy and extend Resgrid."
          />
          <div className={styles.resourceGrid}>
            {ResourceColumns.map((column) => (
              <ResourceColumn key={column.title} {...column} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Help ── */}
      <section className={clsx(styles.section, styles.sectionHelp)}>
        <div className="container">
          <div className={styles.helpBand}>
            <div className={styles.helpCopy}>
              <IconBadge name="lifeBuoy" tone="blue" size="lg" />
              <div>
                <h2 className={styles.helpTitle}>Need a hand?</h2>
                <p className={styles.helpText}>
                  Reach the Resgrid team, file an issue, or contribute a fix —
                  this documentation is open source too.
                </p>
              </div>
            </div>
            <div className={styles.helpActions}>
              <Link to="/get-started/support" className={styles.helpButtonPrimary}>
                Get support
              </Link>
              <a
                href="https://github.com/Resgrid/docs"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.helpButton}>
                <Icon name="github" size={18} />
                Edit these docs
              </a>
              <a
                href="https://blog.resgrid.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.helpButton}>
                Blog
                <Icon name="externalLink" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
