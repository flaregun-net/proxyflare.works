const isBrowser = (fn?: () => unknown) => {
  try {
    if (typeof window !== "undefined") {
      return fn?.()
    }
  } catch (err) {
    return false
  }
}

const getHostname = isBrowser(() => window.location.hostname)

export const docsRoute = (host = getHostname) => ({
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
export const wordPressRoute = (host = getHostname) => ({
  from: { pattern: `${host}/wordpress/*` },
  to: {
    url: "https://wordpress-on-proxyflare.xyz/",
    website: {
      resources: [`${host}/wp-content/*`, `${host}/wp-includes/*`],
    },
  },
})
export const apiRoute = (host = getHostname) => ({
  from: { pattern: `${host}/api/*` },
  to: { url: "https://proxyflare-api-tutorial.networkchimp.workers.dev" },
})

export const redirectRoute = (host = getHostname) => ({
  from: { pattern: `${host}/redirect` },
  to: { url: "example.com", statusCode: 307 },
})

export const devConfig = (host = getHostname) => ({
  global: { debug: true },
  routes: [
    docsRoute(host),
    wordPressRoute(host),
    apiRoute(host),
    redirectRoute(host),
  ],
})
