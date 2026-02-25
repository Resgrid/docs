import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>Open Source</span>
          <h1 className={styles.heroTitle}>Resgrid Documentation</h1>
          <p className={styles.heroSubtitle}>
            Open-source computer-aided dispatch &amp; emergency management
            platform. Learn how to deploy, configure and extend Resgrid for
            your organization.
          </p>
          <div className={styles.heroCtas}>
            <Link
              className={clsx('button button--lg', styles.ctaPrimary)}
              to="/get-started/start">
              Get Started
            </Link>
            <Link
              className={clsx('button button--lg', styles.ctaSecondary)}
              to="/api/information">
              API Reference
            </Link>
          </div>
          <div className={styles.heroMeta}>
            <a
              href="https://github.com/Resgrid"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroMetaLink}>
              GitHub
            </a>
            <span className={styles.heroMetaDivider}>·</span>
            <Link to="/get-started/support" className={styles.heroMetaLink}>
              Support
            </Link>
            <span className={styles.heroMetaDivider}>·</span>
            <Link to="/category/get-started" className={styles.heroMetaLink}>
              Guides
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Resgrid Documentation"
      description="Official documentation for Resgrid — open-source computer-aided dispatch and emergency management platform.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
