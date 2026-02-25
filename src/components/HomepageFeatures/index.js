import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

/* ── Quick-start navigation cards ── */
const QuickLinks = [
  {
    title: 'Getting Started',
    icon: '🚀',
    description: 'Set up your Resgrid account in minutes and start dispatching.',
    link: '/get-started/start',
    linkLabel: 'Quick Start',
  },
  {
    title: 'Self-Hosted',
    icon: '🖥️',
    description: 'Deploy Resgrid on your own infrastructure with Docker or bare-metal.',
    link: '/get-started/hosted',
    linkLabel: 'Installation Guide',
  },
  {
    title: 'API Reference',
    icon: '🔌',
    description: 'Integrate Resgrid into your workflow with our REST API.',
    link: '/api/information',
    linkLabel: 'Explore APIs',
  },
  {
    title: 'Configuration',
    icon: '⚙️',
    description: 'Fine-tune departments, roles, notifications and more.',
    link: '/configuration/setup',
    linkLabel: 'Configure',
  },
];

/* ── Core platform capabilities ── */
const Capabilities = [
  {
    title: 'Computer Aided Dispatch',
    icon: '📡',
    description:
      'Create, manage and track calls with real-time status updates, mapping and automatic notifications.',
  },
  {
    title: 'Personnel & Units',
    icon: '👥',
    description:
      'Organize your team with roles, groups, stations and unit tracking across shifts.',
  },
  {
    title: 'Real-Time Mapping',
    icon: '🗺️',
    description:
      'Visualize calls, personnel and units on live maps with custom layers and geofencing.',
  },
  {
    title: 'Mobile Applications',
    icon: '📱',
    description:
      'Native iOS and Android apps for responders, dispatchers and unit commanders.',
  },
  {
    title: 'Shifts & Scheduling',
    icon: '📅',
    description:
      'Build recurring shift patterns, manage sign-ups and automate staffing coverage.',
  },
  {
    title: 'Open Source',
    icon: '🔓',
    description:
      'Fully open-source under the Apache 2.0 license — audit, extend and self-host with confidence.',
  },
];

/* ── Explore section cards ── */
const ExploreLinks = [
  {
    title: 'Apps',
    description: 'Big Board, Dispatch, Responder, Unit and more.',
    link: '/apps/dispatch',
    icon: '📋',
  },
  {
    title: 'Modules',
    description: 'Calls, Personnel, Units, Mapping, Shifts, Reports and more.',
    link: '/category/modules',
    icon: '🧩',
  },
  {
    title: 'How-To Guides',
    description: 'Step-by-step walkthroughs for common tasks.',
    link: '/category/how-tos',
    icon: '📖',
  },
  {
    title: 'Development',
    description: 'Prerequisites, solution architecture and contributing.',
    link: '/development/prerequisites',
    icon: '💻',
  },
];

/* ── Components ── */

function QuickLinkCard({title, icon, description, link, linkLabel}) {
  return (
    <Link to={link} className={styles.quickLinkCard}>
      <span className={styles.cardIcon}>{icon}</span>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <span className={styles.cardLink}>
        {linkLabel} <span aria-hidden="true">&rarr;</span>
      </span>
    </Link>
  );
}

function CapabilityCard({title, icon, description}) {
  return (
    <div className={styles.capabilityCard}>
      <span className={styles.capIcon}>{icon}</span>
      <h4 className={styles.capTitle}>{title}</h4>
      <p className={styles.capDescription}>{description}</p>
    </div>
  );
}

function ExploreCard({title, icon, description, link}) {
  return (
    <Link to={link} className={styles.exploreCard}>
      <span className={styles.exploreIcon}>{icon}</span>
      <div>
        <h4 className={styles.exploreTitle}>{title}</h4>
        <p className={styles.exploreDescription}>{description}</p>
      </div>
      <span className={styles.exploreArrow} aria-hidden="true">&rarr;</span>
    </Link>
  );
}

export default function HomepageFeatures() {
  return (
    <>
      {/* ── Quick-start cards ── */}
      <section className={styles.quickLinks}>
        <div className="container">
          <div className={styles.quickLinksGrid}>
            {QuickLinks.map((props, idx) => (
              <QuickLinkCard key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform capabilities ── */}
      <section className={styles.capabilities}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Platform Capabilities</h2>
            <p className={styles.sectionSubtitle}>
              Everything you need to manage emergency and non-emergency operations — out of the box.
            </p>
          </div>
          <div className={styles.capabilitiesGrid}>
            {Capabilities.map((props, idx) => (
              <CapabilityCard key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore section ── */}
      <section className={styles.explore}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Explore the Docs</h2>
            <p className={styles.sectionSubtitle}>
              Dive deeper into specific areas of the platform.
            </p>
          </div>
          <div className={styles.exploreGrid}>
            {ExploreLinks.map((props, idx) => (
              <ExploreCard key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
