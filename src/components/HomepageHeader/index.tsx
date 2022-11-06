import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import clsx from "clsx"
import React from "react"
import { useProxyflareRouteList } from "../../hooks/useProxyflareRouteList"
import SyntaxHighlighter from "../SyntaxHighlighter"
import styles from "./styles.module.scss"

export function HomepageHeader({
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
                1. Install the Cloudflare Pages plugin{" "}
                <a href="https://developers.cloudflare.com/pages/platform/functions/plugins/community-plugins/">
                  [Cloudflare docs]
                </a>
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
                2. Add Proxyflare to your <code>onRequest</code>
                stack in your Pages <code>functions/[[path]].ts</code> file{" "}
                <a href="https://developers.cloudflare.com/pages/platform/functions">
                  [Cloudflare docs]
                </a>
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
