import proxyflare from "@flaregun-net/proxyflare-for-pages"

// This function runs on every request to proxyflare.works and proxyflare.xyz
// If we're on proxyflare.works, the proxyflare-for-pages plugin is injected
// If we're on proxyflare.xyz, we do nothing because proxyflare is mounted via the proxyflare-dev worker
export const onRequest: PagesFunction<{ HOSTNAME: string }>[] = [
  (context) => {
    return context.env.HOSTNAME === "proxyflare.works"
      ? proxyflare({ config: {} })(context)
      : context.next()
  },
]
