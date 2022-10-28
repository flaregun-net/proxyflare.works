import { devConfig } from "@flaregun-net/proxyflare-core"
import proxyflare from "@flaregun-net/proxyflare-for-pages"

export const onRequest: PagesFunction<{ HOSTNAME: string }>[] = [
  (context) => {
    // Here, devConfig isn't actually used in development because proxyflare-for-pages only runs in production (on proxyflare.works)
    // In development, the proxyflare-core's local devConfig file is injected into a worker mounted on the dev site (proxyflare.xyz)
    return context.env.HOSTNAME === "proxyflare.works"
      ? proxyflare({ config: devConfig(context.env.HOSTNAME) })(context)
      : context.next()
  },
]
