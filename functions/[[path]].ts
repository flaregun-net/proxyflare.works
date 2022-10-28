import proxyflare from "@flaregun-net/proxyflare-for-pages"
import { devConfig } from "../devConfig"

const hosts = {
  proxyflare: "proxyflare.works",
  localhost: "http://localhost:8788",
}

export const onRequest: PagesFunction<{ HOSTNAME: string }>[] = [
  (thing) => {
    console.log(`env.HOSTNAME`, thing.env.HOSTNAME)

    return proxyflare({ config: devConfig(thing.env.HOSTNAME) })(thing)
  },
]
