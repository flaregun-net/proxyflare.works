import {
  apiRoute,
  docsRoute,
  redirectRoute,
  staticRoute,
  websocketRoute,
  wordPressRoute,
} from "@flaregun-net/proxyflare-core/build/devConfig"

import proxyflare from "@flaregun-net/proxyflare-for-pages"

// This function runs on every request to proxyflare.works and proxyflare.xyz
// If we're on proxyflare.works, the proxyflare-for-pages plugin is injected
// If we're on proxyflare.xyz, we do nothing because proxyflare is mounted via the proxyflare-dev worker
export const onRequest: PagesFunction<{
  HOSTNAME: string
  R2_ACCOUNT_ID: string
  R2_ACCESS_KEY_ID: string
  R2_SECRET_ACCESS_KEY: string
}>[] = [
  (context) => {
    const {
      HOSTNAME: host,
      R2_ACCOUNT_ID,
      R2_ACCESS_KEY_ID,
      R2_SECRET_ACCESS_KEY,
    } = context.env

    const config = {
      global: { debug: true },
      routes: [
        docsRoute(host),
        wordPressRoute(host),
        apiRoute(host),
        websocketRoute(host),
        redirectRoute(host),
        staticRoute(host),
        {
          from: { pattern: `${host}/pics/*` },
          to: {
            r2Bucket: {
              accountId: R2_ACCOUNT_ID,
              accessKeyId: R2_ACCESS_KEY_ID,
              secretAccessKey: R2_SECRET_ACCESS_KEY,
              bucketName: "proxyflare-r2-test-private",
            },
          },
        },
      ],
    }

    return context.env.HOSTNAME === "proxyflare.works"
      ? proxyflare({ config })(context)
      : context.next()
  },
]
