import React, { useMemo } from "react"
import {
  apiRoute,
  docsRoute,
  redirectRoute,
  staticRoute,
  websocketRoute,
  wordPressRoute,
} from "../../devConfig"
import SyntaxHighlighter from "../components/SyntaxHighlighter"
import { globalWindow } from "../utils/globalWindow"

const removeWildcards = (pattern: string) =>
  new URL(`https://${pattern.replace(/\/?\*/, "")}`).href

const getColors = (opacity) => [
  `rgba(26, 148, 208, ${opacity})`,
  `rgba(83, 198, 56, ${opacity})`,
  `rgba(252, 213, 0, ${opacity})`,
  `rgba(239, 130, 40, ${opacity})`,
  `rgba(222, 68, 57, ${opacity})`,
  `rgba(126, 67, 177, ${opacity})`,
]

const colors = getColors(0.5)
const selectedColors = getColors(0.2)

type LineNumber = number
type RouteName = string
type Color = string

export type RouteMetadata = [LineNumber, RouteName, Color, Color]

const startingRouteLine = 9
const routeMetadata: RouteMetadata[] = [
  [startingRouteLine, "apiRoute", colors[0], selectedColors[0]],
  [startingRouteLine + 1, "websocketRoute", colors[1], selectedColors[1]],
  [startingRouteLine + 2, "wordpressRoute", colors[2], selectedColors[2]],
  [startingRouteLine + 3, "docusaurusRoute", colors[3], selectedColors[3]],
  [startingRouteLine + 4, "redirectRoute", colors[4], selectedColors[4]],
  [startingRouteLine + 5, "textRoute", colors[5], selectedColors[5]],
]

export const scaffold = `
// <your-project-root>/functions/[[path]].ts

import proxyflare from "@flaregun-net/proxyflare-for-pages"

export const onRequest = [
  proxyflare({
    config: {
      routes: [
        ${routeMetadata[0][1]},
        ${routeMetadata[1][1]},
        ${routeMetadata[2][1]},
        ${routeMetadata[3][1]},
        ${routeMetadata[4][1]},
        ${routeMetadata[5][1]},
      ],
    },
  }),
]
`

export const useProxyflareRouteList = () => {
  const routes = useMemo(() => {
    const hostname = globalWindow
      ? globalWindow.location.hostname
      : "proxyflare.works"

    return [
      [
        {
          title: "Send traffic to another web service",
          url: removeWildcards(apiRoute(hostname).from.pattern),
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/configure/proxy-service",
          description:
            "Proxyflare can send incoming traffic on your domain to other places on the internet.",
          metadata: routeMetadata[0],
          snippet: (
            <SyntaxHighlighter
              customStyle={{ backgroundColor: "rgba(20,28,34,0.5)" }}
              value={`const apiRoute = ${JSON.stringify(
                apiRoute(hostname),
                null,
                2,
              )}`}
            />
          ),
        },
        {
          title: "Send traffic over a websocket connection",
          url: removeWildcards(websocketRoute(hostname).from.pattern),
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/configure/proxy-service",
          description:
            "Proxyflare is compatible with HTTP and Websocket protocols.",
          metadata: routeMetadata[1],
          snippet: (
            <SyntaxHighlighter
              customStyle={{ backgroundColor: "rgba(20,28,34,0.5)" }}
              value={`const websocketRoute = ${JSON.stringify(
                websocketRoute(hostname),
                null,
                2,
              )}`}
            />
          ),
        },
      ],
      [
        {
          title: "Mount your Wordpress blog",
          url: removeWildcards(wordPressRoute(hostname).from.pattern),
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/configure/proxy-website",
          description:
            "Proxyflare can proxy content rich websites with a little additional setup.",
          metadata: routeMetadata[2],
          snippet: (
            <SyntaxHighlighter
              customStyle={{ backgroundColor: "rgba(20,28,34,0.5)" }}
              value={`const wordpressRoute = ${JSON.stringify(
                wordPressRoute(hostname),
                null,
                2,
              )}`}
            />
          ),
        },
        {
          title: "Mount your documentation website",
          url: removeWildcards(docsRoute(hostname).from.pattern),
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/configure/proxy-website",
          description:
            "Proxyflare can proxy content rich websites with a little additional setup.",
          metadata: routeMetadata[3],
          snippet: (
            <SyntaxHighlighter
              customStyle={{ backgroundColor: "rgba(20,28,34,0.5)" }}
              value={`const docusaurusRoute = ${JSON.stringify(
                docsRoute(hostname),
                null,
                2,
              )}`}
            />
          ),
        },
      ],
      [
        {
          title: "Redirect traffic to another domain",
          url: removeWildcards(redirectRoute(hostname).from.pattern),
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/configure/redirect-traffic",
          description:
            "Proxyflare can redirect traffic on absolute or wildcard pathnames on your domain to other places on the internet.",
          metadata: routeMetadata[4],
          snippet: (
            <SyntaxHighlighter
              customStyle={{ backgroundColor: "rgba(20,28,34,0.5)" }}
              value={`const redirectRoute = ${JSON.stringify(
                redirectRoute(hostname),
                null,
                2,
              )}`}
            />
          ),
        },
        {
          title: "Serve static files such as robots.txt",
          url: removeWildcards(staticRoute(hostname).from.pattern),
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/configure/serve-text-files",
          description:
            "Proxyflare can serve a text file on any URL on your domain.",
          metadata: routeMetadata[5],
          snippet: (
            <SyntaxHighlighter
              customStyle={{ backgroundColor: "rgba(20,28,34,0.5)" }}
              value={`const staticRoute = ${JSON.stringify(
                staticRoute(hostname),
                null,
                2,
              )}`}
            />
          ),
        },
      ],
    ]
  }, [])

  return {
    routes,
    scaffold,
    getRouteElement: (lineNumber: number) => {
      const metadata = routeMetadata.find((meta) => meta[0] === lineNumber)

      if (!metadata) return {}

      const element = document.getElementById(metadata[1])
      if (!element) {
        throw new Error(`id not found ${metadata[1]}`)
      }

      return { element, metadata }
    },
  }
}
