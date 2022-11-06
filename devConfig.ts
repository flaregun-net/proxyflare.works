export const docsRoute = (host: string) => ({
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

export const wordPressRoute = (host: string) => ({
  from: { pattern: `${host}/blog/*` },
  to: {
    url: "https://wordpress-on-proxyflare.xyz/",
    website: {
      resources: [`${host}/wp-content/*`, `${host}/wp-includes/*`],
    },
  },
})

export const apiRoute = (host: string) => ({
  from: { pattern: `${host}/api/*` },
  to: { url: "https://proxyflare-api-tutorial.networkchimp.workers.dev" },
})

export const websocketRoute = (host: string) => ({
  from: { pattern: `${host}/ws/*` },
  to: { url: "https://websocket-app.networkchimp.workers.dev" },
})

export const redirectRoute = (host: string) => ({
  from: { pattern: `${host}/redirect/*` },
  to: { url: "example.com", statusCode: 307 },
})

export const staticRoute = (host: string) => ({
  from: { pattern: `${host}/text` },
  to: { text: "hello bro" },
})
