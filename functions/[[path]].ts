import proxyflare from "@flaregun-net/proxyflare-for-pages"
import { devConfig } from "../devConfig"

const hosts = {
  proxyflare: "proxyflare.works",
  localhost: "http://localhost:8788",
}
console.log(`process.env.HOSTNAME`, process.env.HOSTNAME)

export const onRequest = [proxyflare({ config: devConfig(hosts.proxyflare) })]
