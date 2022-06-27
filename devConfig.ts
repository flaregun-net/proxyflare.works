export const docsRoute = (host) => ({
  from: { pattern: `${host}/docs/*` },
  to: {
    url: "https://docusaurus-on-proxyflare.vercel.app/",
    website: {
      mode: "spa" as const,
      resources: [
        `${host}/docs/img/*`,
        `${host}/docs/katex/*`,
        `${host}/docs/assets/*`,
        `${host}/docs/manifest.json`,
      ],
    },
  },
})
export const wordPressRoute = (host) => ({
  from: { pattern: `${host}/wordpress/*` },
  to: {
    url: "https://wordpress-on-proxyflare.xyz/",
    website: {
      resources: [],
    },
  },
})
export const apiRoute = (host) => ({
  from: { pattern: `${host}/api/*` },
  to: { url: "https://proxyflare-api-tutorial.networkchimp.workers.dev" },
})

export const redirectRoute = (host) => ({
  from: { pattern: `${host}/redirect` },
  to: { url: "example.com", statusCode: 307 },
})

export const devConfig = (host) => ({
  global: { debug: true },
  routes: [
    docsRoute(host),
    wordPressRoute(host),
    apiRoute(host),
    redirectRoute(host),
  ],
})
