import BrowserOnly from "@docusaurus/BrowserOnly"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import LoadingIcon from "@site/static/icons/loading.svg"
import Polygon from "@site/static/icons/polygon-background.svg"
import Layout from "@theme/Layout"
import clsx from "clsx"
import React, { useState } from "react"
import { HomepageFeatures } from "../components/HomepageFeatures"
import SyntaxHighlighter from "../components/SyntaxHighlighter"
import { useProxyflareRouteList } from "../hooks/useProxyflareRouteList"
import styles from "./index.module.scss"

function HomepageHeader({
  onCodeLineClick,
}: {
  onCodeLineClick: (lineNum: number) => void
}) {
  const { siteConfig } = useDocusaurusContext()
  const { routes, scaffold } = useProxyflareRouteList()

  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1 className="hero__title">{siteConfig.tagline}</h1>
            <h2>Move traffic around your domain with ease</h2>

            <div className="margin-vert--lg">
              <label style={{ fontWeight: "bold" }}>
                1. Install the Cloudflare Pages plugin
              </label>
              <SyntaxHighlighter
                language="shell"
                customStyle={{
                  background: "rgba(20,28,34,0.5)",
                  border: "1px solid #4a4658",
                }}
                value="> npm i @flaregun-net/proxyflare-for-pages"
              />
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>
                2. Add Proxyflare to your <code>onRequest</code> middleware
                stack in <code>functions/[[path]].ts</code>
              </label>
              <SyntaxHighlighter
                showLineNumbers={true}
                customStyle={{
                  background: "rgba(20,28,34,0.5)",
                  border: "1px solid #4a4658",
                }}
                wrapLongLines={true}
                value={scaffold}
                lineProps={(i: number) => {
                  const found = routes
                    .flat()
                    .find((route) => route.metadata[0] === i)

                  return {
                    style: found && {
                      color: "white",
                      cursor: "pointer",
                      marginBottom: 2,
                      backgroundColor: found.metadata[2],
                    },
                    onClick: () => onCodeLineClick(i),
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
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
          height: 560,
          zIndex: 0,
          opacity: 0.8,
        }}
      >
        <Polygon style={{ zIndex: -1 }} />
      </div>
      <HomepageHeader onCodeLineClick={handleLineClick} />
      <main>
        <BrowserOnly
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 1000,
              }}
            >
              <LoadingIcon />
            </div>
          }
        >
          {() => <HomepageFeatures selectedLineNumber={selectedLineNumber} />}
        </BrowserOnly>
      </main>
    </Layout>
  )
}
