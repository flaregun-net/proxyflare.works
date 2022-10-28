import proxyflare from "@flaregun-net/proxyflare-for-pages"
import { devConfig } from "../devConfig"

export const onRequest: PagesFunction<{ HOSTNAME: string }>[] = [
  (context) => {
    return context.env.HOSTNAME === "proxyflare.works"
      ? proxyflare({ config: devConfig(context.env.HOSTNAME) })(context)
      : context.next()
  },
]
