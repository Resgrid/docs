import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Icon from '@site/src/components/HomepageFeatures/Icons';

import styles from './index.module.css';

/* ── Popular destinations shown in the hero side panel ── */
const JumpLinks = [
  {label: 'Dispatch & Calls', icon: 'radio', to: '/web-app/dispatch-calls'},
  {label: 'Personnel & Units', icon: 'users', to: '/web-app/personnel'},
  {label: 'Mapping', icon: 'map', to: '/web-app/mapping'},
  {label: 'Records (RMS)', icon: 'fileText', to: '/web-app/records/overview'},
  {label: 'Checklists & Readiness', icon: 'clipboardCheck', to: '/web-app/checklists'},
  {label: 'Workflows & Automation', icon: 'zap', to: '/web-app/workflows'},
];

/* ── At-a-glance figures under the hero ── */
const Stats = [
  {value: '2014', label: 'Running as a hosted service since'},
  {value: 'Millions', label: 'Calls, messages, statuses & staffing updates processed'},
  {value: 'Apache 2.0', label: 'Fully open source — same code hosted and self-hosted'},
  {value: '5 apps', label: 'Responder, Unit, Dispatch, Big Board & Relay'},
];

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroGlowA} aria-hidden="true" />
      <div className={styles.heroGlowB} aria-hidden="true" />
      <div className={styles.heroGrid} aria-hidden="true" />

      <div className={clsx('container', styles.heroContainer)}>
        <div className={styles.heroCopy}>
          <span className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} aria-hidden="true" />
            Open source · Apache 2.0
          </span>
          <h1 className={styles.heroTitle}>
            Dispatch, records &amp; readiness.
            <br />
            <span className={styles.heroTitleAccent}>One platform, documented.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Everything you need to set up, operate, self-host and extend Resgrid —
            the open-source computer-aided dispatch, records management and
            logistics platform for first responders and the teams that dispatch
            people and vehicles.
          </p>
          <div className={styles.heroCtas}>
            <Link
              className={clsx('button button--lg', styles.ctaPrimary)}
              to="/get-started/start">
              Get started
              <Icon name="arrowRight" size={18} className={styles.ctaIcon} />
            </Link>
            <Link
              className={clsx('button button--lg', styles.ctaSecondary)}
              to="/web-app/overview">
              Explore the web app
            </Link>
          </div>
          <div className={styles.heroMeta}>
            <Link to="/setup-guides/overview" className={styles.heroMetaLink}>
              Setup guides
            </Link>
            <span className={styles.heroMetaDivider} aria-hidden="true">·</span>
            <Link to="/self-hosted/quick-start" className={styles.heroMetaLink}>
              Self-hosted
            </Link>
            <span className={styles.heroMetaDivider} aria-hidden="true">·</span>
            <Link to="/api/information" className={styles.heroMetaLink}>
              API
            </Link>
            <span className={styles.heroMetaDivider} aria-hidden="true">·</span>
            <a
              href="https://github.com/Resgrid"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroMetaLink}>
              GitHub
            </a>
          </div>
        </div>

        <aside className={styles.jumpPanel} aria-label="Popular documentation">
          <div className={styles.jumpHeader}>
            <span className={styles.jumpEyebrow}>Jump to</span>
            <span className={styles.jumpTitle}>Popular modules</span>
          </div>
          <ul className={styles.jumpList}>
            {JumpLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={styles.jumpLink}>
                  <span className={styles.jumpIcon}>
                    <Icon name={item.icon} size={18} />
                  </span>
                  <span className={styles.jumpLabel}>{item.label}</span>
                  <Icon name="arrowRight" size={16} className={styles.jumpArrow} />
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/web-app/overview" className={styles.jumpFooter}>
            See every module
            <Icon name="arrowRight" size={14} />
          </Link>
        </aside>
      </div>

      <div className="container">
        <dl className={styles.stats}>
          {Stats.map((stat) => (
            <div key={stat.value} className={styles.stat}>
              <dt className={styles.statValue}>{stat.value}</dt>
              <dd className={styles.statLabel}>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="Resgrid Documentation"
      description="Official documentation for Resgrid — the open-source computer-aided dispatch, records management and readiness platform. Set up, operate, self-host and extend Resgrid.">
      <HomepageHeader />
      <main className={styles.main}>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
