import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import { useMemo } from "react"
import {
  apiRoute,
  docsRoute,
  privateR2BucketRoute,
  publicR2BucketRoute,
  redirectRoute,
  staticRoute,
  websocketRoute,
  wordPressRoute,
} from "../../routes"
import { RouteDiagram } from "../components/HomepageFeatures/RouteDiagram"
import SyntaxHighlighter from "../components/SyntaxHighlighter"

const removeWildcards = (pattern: string) =>
  new URL(`https://${pattern.replace(/\/?\*/, "")}`).href

const getColors = (opacity) => [
  `rgba(26,148,208,${opacity})`,
  `rgba(83,198,56,${opacity})`,
  `rgba(252,213,0,${opacity})`,
  `rgba(239,130,40,${opacity})`,
  `rgba(222,68,57,${opacity})`,
  `rgba(126,67,177,${opacity})`,
]

const colors = getColors(".2")
const selectedColors = getColors(".1")

type LineNumber = number
type RouteName = string
type Color = string

export type RouteMetadata = [LineNumber, RouteName, Color, Color]

const startingRouteLine = 7
const routeMetadata: RouteMetadata[] = [
  [startingRouteLine, "apiRoute", colors[0], selectedColors[0]],
  [startingRouteLine + 1, "websocketRoute", colors[1], selectedColors[1]],
  [startingRouteLine + 2, "wordpressRoute", colors[2], selectedColors[2]],
  [startingRouteLine + 3, "reactRoute", colors[3], selectedColors[3]],
  [startingRouteLine + 4, "privateR2BucketRoute", colors[4], selectedColors[4]],
  [startingRouteLine + 5, "publicR2BucketRoute", colors[5], selectedColors[5]],
  [startingRouteLine + 6, "staticTextRoute", colors[0], selectedColors[0]],
  [startingRouteLine + 7, "redirectRoute", colors[1], selectedColors[1]],
]

export const scaffold = `
import proxyflare from "@flaregun-net/proxyflare-for-pages"

export const onRequest: PagesFunction[] = [
  (context) => proxyflare({
    config: {
     routes: [
       ${routeMetadata[0][1]},
       ${routeMetadata[1][1]},
       ${routeMetadata[2][1]},
       ${routeMetadata[3][1]},
       ${routeMetadata[4][1]},
       ${routeMetadata[5][1]},
       ${routeMetadata[6][1]},
       ${routeMetadata[7][1]},
     ]
    }
  })(context)
]
`

export type Route = {
  title: JSX.Element | string
  url: string
  docsUrl: string
  exampleRouteDiagram: JSX.Element
  description: string
  explanation: JSX.Element | string
  metadata: RouteMetadata
  snippet: JSX.Element
}

export const useProxyflareRouteList = () => {
  const { siteConfig } = useDocusaurusContext()
  const routes = useMemo(() => {
    const hostname = (siteConfig.customFields.HOSTNAME ??
      "proxyflare.works") as string

    return [
      [
        {
          title: "Send traffic to another web service",
          url: removeWildcards(apiRoute(hostname).from.pattern),
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/tutorials/proxying-services",
          exampleRouteDiagram: (
            <RouteDiagram from={`${hostname}/api`} to={`${hostname}:5432`} />
          ),
          description:
            "Proxyflare can send incoming traffic on your domain to other places on the internet.",
          explanation: (
            <>
              With the above code, traffic on subpaths of <code>api</code> is
              sent to a remote service.
            </>
          ),
          metadata: routeMetadata[0],
          snippet: (
            <SyntaxHighlighter
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
            "https://flaregun.net/docs/latest/proxyflare/plugin/tutorials/proxying-services",
          exampleRouteDiagram: (
            <RouteDiagram from={`${hostname}/ws`} to="elsewhere.com/ws" />
          ),
          description:
            "Proxyflare is compatible with HTTP and Websocket protocols.",
          explanation: (
            <>
              Proxyflare upgrades to <code>wss:</code> protocol if provided. Try
              out our websocket playground by clicking the button below.
            </>
          ),
          metadata: routeMetadata[1],
          snippet: (
            <SyntaxHighlighter
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
          title: "Mount your Wordpress-powered website",
          url: removeWildcards(wordPressRoute(hostname).from.pattern),
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/tutorials/proxying-websites",
          exampleRouteDiagram: (
            <RouteDiagram from={`${hostname}/blog`} to="wordpress-site.com" />
          ),
          description:
            "Mount your CMS-powered websites on a subpath of your apex domain.",
          explanation:
            "Press Try it and notice how Proxyflare handles routing and rewrites links on the Wordpress website.",
          metadata: routeMetadata[2],
          snippet: (
            <SyntaxHighlighter
              value={`const wordpressRoute = ${JSON.stringify(
                wordPressRoute(hostname),
                null,
                2,
              )}`}
            />
          ),
        },
        {
          title: "Mount your frontend Javascript framework-powered website",
          url: removeWildcards(docsRoute(hostname).from.pattern),
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/tutorials/proxying-websites",
          exampleRouteDiagram: (
            <RouteDiagram from={`${hostname}/docs`} to="react-docs-site.com" />
          ),
          description:
            "Mount your single page app on a subpath of your apex domain.",
          explanation:
            "Proxyflare works with any website — whether its powered by a client side bundle or rendered server side.",
          metadata: routeMetadata[3],
          snippet: (
            <SyntaxHighlighter
              value={`const reactRoute = ${JSON.stringify(
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
          title: (
            <>
              Serve content from a <i>private</i> Cloudflare R2 bucket
            </>
          ),
          url: `https://${hostname}/private-pics/cat-2.png`,
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/tutorials/proxying-cloudflare-r2-buckets",
          exampleRouteDiagram: (
            <RouteDiagram
              from={`${hostname}/private-pics`}
              to={`cat-pics.r2.com`}
            />
          ),
          description:
            "Proxyflare can serve content from a private Cloudflare R2 object storage bucket.",
          explanation: (
            <>
              Mount a private R2 bucket on any part of your domain by providing
              the bucket metadata and a valid{" "}
              <a href="https://dash.cloudflare.com/?account=r2/overview/api-tokens">
                R2 API token
              </a>
            </>
          ),
          metadata: routeMetadata[4],
          snippet: (
            <SyntaxHighlighter
              value={`const privateR2BucketRoute = ${JSON.stringify(
                privateR2BucketRoute(hostname),
                null,
                2,
              )}`}
            />
          ),
        },
        {
          title: (
            <>
              Serve content from a <i>public</i> Cloudflare R2 bucket
            </>
          ),
          url: `https://${hostname}/public-pics/cat-1.png`,
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/tutorials/proxying-cloudflare-r2-buckets",
          exampleRouteDiagram: (
            <RouteDiagram
              from={`${hostname}/public-pics`}
              to="pub-ec6768.r2.dev"
            />
          ),
          description:
            "Proxyflare can serve content from a public Cloudflare R2 object storage bucket.",
          explanation: (
            <>
              Mount a public R2 bucket on any part of your domain with a simple
              configuration
            </>
          ),
          metadata: routeMetadata[5],
          snippet: (
            <SyntaxHighlighter
              value={`const publicR2BucketRoute = ${JSON.stringify(
                publicR2BucketRoute(hostname),
                null,
                2,
              )}`}
            />
          ),
        },
      ],
      [
        {
          title: "Serve static files such as robots.txt",
          url: removeWildcards(staticRoute(hostname).from.pattern),
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/tutorials/serving-static-responses",
          exampleRouteDiagram: (
            <RouteDiagram
              from={`${hostname}/robots.txt`}
              to="robots.txt SEO file"
            />
          ),
          description:
            "Proxyflare can serve a text file on any URL on your domain.",
          metadata: routeMetadata[6],
          explanation: (
            <>
              Serve HTML, JSON, and metadata files by providing the file text
              and <code>content-type</code> response header.
            </>
          ),
          snippet: (
            <SyntaxHighlighter
              value={`const staticRoute = ${JSON.stringify(
                staticRoute(hostname),
                null,
                2,
              )}`}
            />
          ),
        },
        {
          title: "Redirect traffic to another domain",
          url: removeWildcards(redirectRoute(hostname).from.pattern),
          docsUrl:
            "https://flaregun.net/docs/latest/proxyflare/plugin/tutorials/redirecting-traffic",
          exampleRouteDiagram: (
            <RouteDiagram from={`${hostname}/redirect`} to={"example.com"} />
          ),
          description:
            "Proxyflare can redirect traffic from absolute or wildcard pathnames on your domain to other places on the internet.",
          explanation: (
            <>
              Provide a <code>statusCode</code> to redirect traffic to a page or
              part of your domain with the desired response code.
            </>
          ),
          metadata: routeMetadata[7],
          snippet: (
            <SyntaxHighlighter
              value={`const redirectRoute = ${JSON.stringify(
                redirectRoute(hostname),
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
    getRouteElement: (lineNumber: number, route: Route) => {
      let metadata = routeMetadata.find((meta) => meta[0] === lineNumber)
      console.log("here")

      if (!metadata && route) {
        console.log("down here")
        metadata = routeMetadata.find((meta) => meta[1] === route.metadata[1])
      }

      if (!metadata) return {}

      const element = document.getElementById(metadata[1])
      if (!element) {
        throw new Error(`id not found ${metadata[1]}`)
      }

      return { element, metadata }
    },
  }
}
