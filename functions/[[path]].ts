import proxyflare from "@flaregun-net/proxyflare-for-pages"

var e = (t) => ({
    from: { pattern: `${t}/docs/*` },
    to: {
      url: "https://docusaurus-on-proxyflare.vercel.app/",
      website: {
        mode: "spa",
        resources: [
          `${t}/docs/img/*`,
          `${t}/docs/katex/*`,
          `${t}/docs/assets/*`,
          `${t}/docs/manifest.json`,
        ],
      },
    },
  }),
  r = (t) => ({
    from: { pattern: `${t}/blog/*` },
    to: {
      url: "https://wordpress-on-proxyflare.xyz/",
      website: { resources: [`${t}/wp-content/*`, `${t}/wp-includes/*`] },
    },
  }),
  o = (t) => ({
    from: { pattern: `${t}/api/*` },
    to: { url: "https://proxyflare-api-tutorial.networkchimp.workers.dev" },
  }),
  s = (t) => ({
    from: { pattern: `${t}/ws/*` },
    to: { url: "https://websocket-app.networkchimp.workers.dev" },
  }),
  p = (t) => ({
    from: { pattern: `${t}/redirect/*` },
    to: { url: "example.com", statusCode: 307 },
  }),
  n = (t) => ({
    from: { pattern: `${t}/text` },
    to: { text: "hello brothers and sisters" },
  }),
  c = (t = "proxyflare.xyz") => ({
    global: { debug: !0 },
    routes: [e(t), r(t), o(t), s(t), p(t), n(t)],
  })

// This function runs on every request to proxyflare.works and proxyflare.xyz
// If we're on proxyflare.works, the proxyflare-for-pages plugin is injected
// If we're on proxyflare.xyz, we do nothing because proxyflare is mounted via the proxyflare-dev worker
export const onRequest: PagesFunction<{ HOSTNAME: string }>[] = [
  (context) => {
    return context.env.HOSTNAME === "proxyflare.works"
      ? proxyflare({ config: c(context.env.HOSTNAME) })(context)
      : context.next()
  },
]
