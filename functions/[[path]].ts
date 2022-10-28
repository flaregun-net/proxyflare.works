import proxyflare from "@flaregun-net/proxyflare-for-pages"
import { devConfig } from "../devConfig"

const hosts = {
  proxyflare: "proxyflare.works",
  localhost: "http://localhost:8788",
}

export const onRequest: PagesFunction<{ HOSTNAME: string }>[] = [
  ({ env }) => {
    console.log(`env.HOSTNAME`, env.HOSTNAME)

    return proxyflare({ config: devConfig(env.HOSTNAME) })
  },
]
