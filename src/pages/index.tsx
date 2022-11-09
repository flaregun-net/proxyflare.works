import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Polygon from "@site/static/icons/polygon-background.svg"
import Layout from "@theme/Layout"
import React, { useState } from "react"
import { HomepageFeatures } from "../components/HomepageFeatures"
import { HomepageHeader } from "../components/HomepageHeader"
import { useProxyflareRouteList } from "../hooks/useProxyflareRouteList"

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  const { getRouteElement } = useProxyflareRouteList()

  const [selectedLineNumber, setSelectedLineNumber] = useState<number>()

  const handleLineClick = (lineNumber: number) => {
    const { element, metadata } = getRouteElement(lineNumber)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 40,
        behavior: "smooth",
      })

      setSelectedLineNumber(metadata[0])
    }
  }

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <div className="graph-background">
        <Polygon />
      </div>

      <div className="alert alert--danger" role="alert">
        If you stumbled on this site, it's not quite ready yet. Come back in a
        couple days to check for updates.
      </div>

      <HomepageHeader onCodeLineClick={handleLineClick} />
      <main>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="row">
            <h2>Some things you can do with Proxyflare</h2>
          </div>
        </div>
        <HomepageFeatures selectedLineNumber={selectedLineNumber} />
      </main>
    </Layout>
  )
}
