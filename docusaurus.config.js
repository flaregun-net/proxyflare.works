// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const path = require("path")
const lightCodeTheme = require("prism-react-renderer/themes/vsLight")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")

const HOSTNAME = process.env.HOSTNAME
const BASE_HREF = HOSTNAME ? `https://${HOSTNAME}` : "http://localhost:3000"

const appVersion =
  require("./package.json")["dependencies"][
    "@flaregun-net/proxyflare-for-pages"
  ]

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Proxyflare",
  tagline: "Proxyflare is a reverse proxy for your Cloudflare domain",
  url: BASE_HREF,
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
    HOSTNAME,
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
          href: BASE_HREF,
        },
        items: [
          {
            to: "https://flaregun.net/docs/latest/proxyflare/plugin/index/",
            label: "Docs",
            position: "left",
          },
          {
            href: "https://github.com/flaregun-net",
            position: "right",
            className: "header-github-link",
            "aria-label": "Flaregun on Github",
          },
          {
            href: "https://discord.gg/YcDwujEH",
            position: "right",
            className: "header-discord-link",
            "aria-label": "Flaregun on Discord",
          },
          {
            href: "https://twitter.com/flaregun_net",
            position: "right",
            className: "header-twitter-link",
            "aria-label": "Flaregun on Twitter",
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
