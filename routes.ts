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
  from: { pattern: `${host}/robots.txt` },
  to: { text: "User-agent: * \n Disallow: /wp-admin/" },
  headers: {
    response: {
      "content-type": "text/plain",
    },
  },
})

export const privateR2BucketRoute = (host: string) => ({
  from: { pattern: `${host}/private-pics/*` },
  to: {
    r2Bucket: {
      accountId: `env.R2_ACCOUNT_ID`,
      accessKeyId: `env.R2_ACCESS_KEY_ID`,
      secretAccessKey: `env.R2_SECRET_ACCESS_KEY`,
      bucketName: "proxyflare-r2-test-private",
    },
  },
})

export const publicR2BucketRoute = (host: string) => ({
  from: { pattern: `${host}/public-pics/*` },
  to: {
    url: "pub-ec6768.r2.dev",
  },
})
