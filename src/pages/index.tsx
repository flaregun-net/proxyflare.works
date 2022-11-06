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
      <div
        style={{
          backgroundColor:
            "linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(20,28,34,1) 90%)",
          transform: "scaleY(-1)",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 0,
          height: 560,
          opacity: 0.2,
        }}
      >
        <Polygon style={{ zIndex: -1 }} />
      </div>

      <div className="alert alert--danger" role="alert">
        If you stumbled on this site, it's not quite ready yet. Come back in a
        couple days to check for updates.
      </div>

      <HomepageHeader onCodeLineClick={handleLineClick} />
      <main>
        <HomepageFeatures selectedLineNumber={selectedLineNumber} />
      </main>
    </Layout>
  )
}
