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
            <h1 className="hero__title margin-bottom--lg">
              {siteConfig.tagline}
            </h1>
            <h2>
              Move HTTP traffic around your domain and across the internet with
              ease
            </h2>

            <div className="margin-vert--lg">
              <label style={{ fontWeight: "bold" }}>
                1. On your website on Cloudflare Pages, Install the plugin{" "}
                <a
                  style={{ marginRight: 4 }}
                  href="https://developers.cloudflare.com/pages/platform/functions/plugins/community-plugins/"
                >
                  [Cloudflare docs]
                </a>
                <a href="https://www.npmjs.com/package/@flaregun-net/proxyflare-for-pages">
                  [NPM package]
                </a>
              </label>
              <div className="code-wrapper">
                <SyntaxHighlighter
                  language="shell"
                  customStyle={{
                    background: "rgba(20,28,34,0.5)",
                    border: "1px solid #4a4658",
                  }}
                  value="> npm install @flaregun-net/proxyflare-for-pages"
                />
              </div>
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>
                2. Add Proxyflare to the <code>onRequest</code> stack in{" "}
                <code>functions/_middleware.ts</code> in your Pages project{" "}
                <a href="https://developers.cloudflare.com/pages/platform/functions/middleware/#adding-middleware">
                  [Cloudflare docs]
                </a>
              </label>
              <div className="code-wrapper">
                <SyntaxHighlighter
                  showLineNumbers={true}
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
      </div>
    </header>
  )
}
