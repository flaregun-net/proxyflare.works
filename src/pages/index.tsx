import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Polygon from "@site/static/icons/polygon-background.svg"
import Layout from "@theme/Layout"
import { useEffect, useState } from "react"
import { HomepageFeatures } from "../components/HomepageFeatures"
import { HomepageHeader } from "../components/HomepageHeader"
import { Route, useProxyflareRouteList } from "../hooks/useProxyflareRouteList"
import { globalWindow } from "../utils/globalWindow"

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  const { getRouteElement } = useProxyflareRouteList()

  const [selectedLineNumber, setSelectedLineNumber] = useState<number>()

  const scrollToExample = (route: Route, lineNumber?: number) => {
    const { element, metadata } = getRouteElement(lineNumber, route)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 40,
        behavior: "smooth",
      })

      setSelectedLineNumber(metadata[0])

      if (history.pushState) {
        history.pushState(null, null, `#${metadata[1]}`)
      } else {
        location.hash = "#myhash"
      }
    }
  }

  useEffect(() => {
    if (globalWindow.location.hash) {
      scrollToExample({
        metadata: [undefined, window.location.hash.slice(1)],
      } as unknown as Route)
    }
  }, [globalWindow.location.hash])

  const handleLineClick = (route: Route, lineNumber: number) => {
    scrollToExample(route, lineNumber)
  }

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <div className="graph-background">
        <Polygon />
      </div>

      <HomepageHeader onCodeLineClick={handleLineClick} />
      <main>
        <div className="container">
          <div className="row">
            <div className="col col--12">
              <h2 style={{ textAlign: "center" }}>
                ⚡ Make hard networking problems easy
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col col--12">
              <h3 style={{ textAlign: "center" }}>
                See what Proxyflare can do for you
              </h3>
            </div>
          </div>
        </div>
        <HomepageFeatures selectedLineNumber={selectedLineNumber} />
      </main>
    </Layout>
  )
}
