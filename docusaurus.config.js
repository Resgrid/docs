// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Resgrid Docs',
  tagline: 'Resgrid - Open Source Dispatch & Emergency Management System',
  url: 'https://docs.resgrid.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Resgrid', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  deploymentBranch: 'release', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Resgrid/docs/tree/develop',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://blog.resgrid.com',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Resgrid Docs',
        hideOnScroll: false,
        logo: {
          alt: 'Resgrid Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'dropdown',
            label: 'Get Started',
            position: 'left',
            items: [
              {type: 'doc', docId: 'intro', label: 'Introduction'},
              {type: 'doc', docId: 'get-started/start', label: 'Quick Start'},
              {type: 'doc', docId: 'get-started/hosted', label: 'Hosted vs Self-Hosted'},
              {type: 'doc', docId: 'setup-guides/overview', label: 'Setup Guides by Organization'},
              {type: 'doc', docId: 'how-tos/setup-department', label: 'Set Up a Department'},
              {type: 'doc', docId: 'get-started/support', label: 'Support'},
            ],
          },
          {
            type: 'dropdown',
            label: 'Web App',
            position: 'left',
            items: [
              {type: 'doc', docId: 'web-app/overview', label: 'Overview'},
              {type: 'doc', docId: 'web-app/navigation', label: 'Navigation'},
              {type: 'doc', docId: 'web-app/dispatch-calls', label: 'Dispatch & Calls'},
              {type: 'doc', docId: 'web-app/run-cards', label: 'Run Cards'},
              {type: 'doc', docId: 'web-app/personnel', label: 'Personnel'},
              {type: 'doc', docId: 'web-app/units', label: 'Units'},
              {type: 'doc', docId: 'web-app/mapping', label: 'Mapping'},
              {type: 'doc', docId: 'web-app/shifts', label: 'Shifts'},
              {type: 'doc', docId: 'web-app/records/overview', label: 'Records (RMS)'},
              {type: 'doc', docId: 'web-app/checklists', label: 'Checklists'},
              {type: 'doc', docId: 'web-app/work-orders', label: 'Work Orders'},
              {type: 'doc', docId: 'web-app/inventory', label: 'Inventory'},
              {type: 'doc', docId: 'web-app/chat', label: 'Chat & Assistant'},
              {type: 'doc', docId: 'web-app/workflows', label: 'Workflows'},
              {type: 'doc', docId: 'web-app/reports', label: 'Reports'},
              {type: 'doc', docId: 'web-app/security-permissions', label: 'Security & Permissions'},
            ],
          },
          {
            type: 'dropdown',
            label: 'Apps',
            position: 'left',
            items: [
              {type: 'doc', docId: 'apps/calendar', label: 'Apps Overview'},
              {type: 'doc', docId: 'apps/responder', label: 'Responder'},
              {type: 'doc', docId: 'apps/unit', label: 'Unit'},
              {type: 'doc', docId: 'apps/dispatch', label: 'Dispatch'},
              {type: 'doc', docId: 'apps/big-board', label: 'Big Board'},
              {type: 'doc', docId: 'apps/relay', label: 'Relay'},
            ],
          },
          {
            type: 'dropdown',
            label: 'Administer',
            position: 'left',
            items: [
              {type: 'doc', docId: 'configuration/setup', label: 'Configuration'},
              {type: 'doc', docId: 'web-app/department-settings', label: 'Department Settings'},
              {type: 'doc', docId: 'web-app/types-configuration', label: 'Types & Statuses'},
              {type: 'doc', docId: 'web-app/notifications', label: 'Notifications'},
              {type: 'doc', docId: 'enterprise/sso-overview', label: 'Enterprise SSO & SCIM'},
              {type: 'doc', docId: 'web-app/data-protection', label: 'Advanced Data Protection'},
              {type: 'doc', docId: 'web-app/subscription-billing', label: 'Subscription & Billing'},
            ],
          },
          {
            type: 'dropdown',
            label: 'Self-Hosted',
            position: 'left',
            items: [
              {type: 'doc', docId: 'self-hosted/quick-start', label: 'Quick Start'},
              {type: 'doc', docId: 'self-hosted/installation', label: 'Installation'},
              {type: 'doc', docId: 'self-hosted/multi', label: 'Kubernetes & k3s'},
              {type: 'doc', docId: 'self-hosted/laptop', label: 'Windows Laptop / Desktop'},
              {type: 'doc', docId: 'self-hosted/rick', label: 'Incident Command Kit (RICK)'},
              {type: 'doc', docId: 'reference/docker', label: 'Docker Reference'},
              {type: 'doc', docId: 'reference/sizing', label: 'Sizing Guidelines'},
            ],
          },
          {
            type: 'dropdown',
            label: 'Developers',
            position: 'left',
            items: [
              {type: 'doc', docId: 'api/information', label: 'API Overview'},
              {type: 'doc', docId: 'api/authentication', label: 'API Authentication'},
              {type: 'doc', docId: 'api/workflows', label: 'Workflows API'},
              {type: 'doc', docId: 'enterprise/sso-api-reference', label: 'SSO & SCIM API'},
              {type: 'doc', docId: 'development/prerequisites', label: 'Development Setup'},
              {type: 'doc', docId: 'development/solution', label: 'Solution Architecture'},
              {type: 'doc', docId: 'reference/overview', label: 'Reference'},
              {type: 'doc', docId: 'reference/feature-flags', label: 'Feature Flags'},
            ],
          },
          {
            href: 'https://resgrid.com',
            label: 'Resgrid.com',
            position: 'right',
            className: 'navbar-external-link',
          },
          {
            href: 'https://github.com/Resgrid',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'Resgrid on GitHub',
            html: '<span class="header-github-label">GitHub</span>',
          },
        ],
      },
      footer: {
        style: 'dark',
        logo: {
          href: '/',
          src: '/img/Resgrid_JustText_White.png',
          srcDark: '/img/Resgrid_JustText_White.png',
          alt: 'Resgrid Docs',
          height: '36px',
        },
        links: [
          {
            title: 'Product',
            items: [
              {
                label: 'Home',
                href: 'https://resgrid.com',
              },
              {
                label: 'Pricing',
                href: 'https://resgrid.com/Home/Pricing',
              }
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About Us',
                href: 'https://resgrid.com/Home/About',
              },
              {
                label: 'Contact Us',
                href: 'https://resgrid.com/Home/Contact',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Documentation',
                href: 'https://docs.resgrid.com',
              },
              {
                label: 'Blog',
                href: 'https://blog.resgrid.com',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Resgrid, LLC. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
