import proxyflare from "@flaregun-net/proxyflare-for-pages"
import { devConfig } from "../devConfig"

const hosts = {
  proxyflare: process.env.HOSTNAME,
  localhost: "http://localhost:8788",
}

export const onRequest = [proxyflare({ config: devConfig(hosts.proxyflare) })]
