import proxyflare from "@flaregun-net/proxyflare-for-pages"
import { devConfig } from "@site/devConfig"

export const onRequest = [proxyflare({ config: devConfig })]
