const hosts = {
  proxyflare: "proxyflare.works",
  localhost: "http://localhost:8788",
}

export const docsRoute = (host = hosts.proxyflare) => ({
  from: { pattern: `${host}/docusaurus/*` },
  to: {
    url: "https://docusaurus-on-proxyflare.vercel.app/",
    website: {
      mode: "spa" as const,
      resources: [
        `${host}/docusaurus/img/*`,
        `${host}/docusaurus/katex/*`,
        `${host}/docusaurus/assets/*`,
        `${host}/docusaurus/manifest.json`,
      ],
    },
  },
})
export const wordPressRoute = (host = hosts.proxyflare) => ({
  from: { pattern: `${host}/wordpress/*` },
  to: {
    url: "https://wordpress-on-proxyflare.xyz/",
    website: {
      resources: [],
    },
  },
})
export const apiRoute = (host = hosts.proxyflare) => ({
  from: { pattern: `${host}/api/*` },
  to: { url: "https://proxyflare-api-tutorial.networkchimp.workers.dev" },
})

export const redirectRoute = (host = hosts.proxyflare) => ({
  from: { pattern: `${host}/redirect` },
  to: { url: "example.com", statusCode: 307 },
})

export const devConfig = (host = hosts.proxyflare) => ({
  global: { debug: true },
  routes: [
    docsRoute(host),
    wordPressRoute(host),
    apiRoute(host),
    redirectRoute(host),
  ],
})
