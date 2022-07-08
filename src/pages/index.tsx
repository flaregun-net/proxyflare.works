import BrowserOnly from "@docusaurus/BrowserOnly"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import LoadingIcon from "@site/static/icons/loading.svg"
import Layout from "@theme/Layout"
import clsx from "clsx"
import React from "react"
import HomepageFeatures from "../components/HomepageFeatures"
import SyntaxHighlighter from "../components/SyntaxHighlighter"
import styles from "./index.module.scss"

const scaffold = `
import proxyflare from "@flaregun-net/proxyflare-for-pages"

export const onRequest = [
  proxyflare({
    config: {
      routes: [
        apiRoute,
        wordpressRoute,
        docusaurusRoute,
        redirectRoute,
      ],
    },
  }),
]
`
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>

        <div
          style={{
            maxWidth: 740,
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
          }}
        >
          <SyntaxHighlighter
            className={clsx("hero hero--primary", styles.shadow)}
            showLineNumbers={true}
            value={scaffold}
          />
        </div>

        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Proxyflare works"
      description="A reverse-proxy that runs on the edge of Cloudflare's global network."
    >
      <HomepageHeader />
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
          {() => <HomepageFeatures />}
        </BrowserOnly>
      </main>
    </Layout>
  )
}
