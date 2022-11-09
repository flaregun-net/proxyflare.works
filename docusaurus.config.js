// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const path = require("path")
const lightCodeTheme = require("prism-react-renderer/themes/vsLight")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")

const appVersion =
  require("./package.json")["dependencies"][
    "@flaregun-net/proxyflare-for-pages"
  ]

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Proxyflare",
  tagline: "A reverse proxy for your Cloudflare domain",
  url: "https://proxyflare.works",
  baseUrl: "/",
  trailingSlash: true,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "/img/favicon.ico",
  organizationName: "flaregun",
  projectName: "flaregun",
  staticDirectories: ["static", "public"],
  customFields: {
    appVersion,
    HOSTNAME: process.env.HOSTNAME,
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
      }),
    ],
  ],
  plugins: [
    "docusaurus-plugin-sass",
    // [
    //   path.resolve(
    //     __dirname,
    //     "./src/plugins/docusaurus-plugin-segment-analytics",
    //   ),
    //   {
    //     prodKey: "RQXoHRpNcmBKllUDihjDjupGv4AHn5TB",
    //     devKey: "FRKElp5cyMax6GAdM8OVyNMIFVppgEgp",
    //     // boolean (defaults to false) on whether you want
    //     // to include analytics.page() automatically
    //     trackPage: true,
    //     // number (defaults to 50); time to wait after a route update before it should
    //     // track the page change, to implement this, make sure your `trackPage` property is set to `true`
    //     // trackPageDelay: 50,
    //   },
    // ],
    [
      path.resolve(__dirname, "./src/plugins/docusaurus-plugin-google-gtm"),
      {
        trackingID: "GTM-PF5MQ2Z",
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: true,
        respectPrefersColorScheme: true,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["markdown"],
      },

      navbar: {
        hideOnScroll: true,
        title: "Proxyflare",
        logo: {
          target: "_self",
          alt: "Proxyflare Logo",
          src: "/img/logo.svg",
          srcDark: "/img/logo.svg",
          href: "http://localhost:3000",
        },
        items: [
          {
            to: "https://flaregun.net",
            label: "Docs",
            position: "left",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Flaregun, Inc. (Version ${appVersion})`,
      },
    }),
}

module.exports = config
