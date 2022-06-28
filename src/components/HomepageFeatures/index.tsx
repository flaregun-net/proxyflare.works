import clsx from "clsx"
import React from "react"
import {
  apiRoute,
  docsRoute,
  redirectRoute,
  wordPressRoute,
} from "../../../devConfig"
import SyntaxHighlighter from "../SyntaxHighlighter"
import styles from "./styles.module.css"

type FeatureItem = {
  title: string
  url: string
  Svg?: React.ComponentType<React.ComponentProps<"svg">>
  description: JSX.Element
}

const removeWildcards = (pattern: string) =>
  new URL(`https://${pattern.replace(/\/?\*/, "")}`).href

const FeatureList: FeatureItem[] = [
  {
    title: "Send traffic to another web service",
    url: removeWildcards(apiRoute().from.pattern),
    description: (
      <SyntaxHighlighter
        value={`const apiRoute = ${JSON.stringify(apiRoute(), null, 2)}`}
      />
    ),
  },
  {
    title: "Redirect traffic to another domain",
    url: removeWildcards(redirectRoute().from.pattern),
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <SyntaxHighlighter
        value={`const redirectRoute = ${JSON.stringify(
          redirectRoute(),
          null,
          2,
        )}`}
      />
    ),
  },
  {
    title: "Mount your docs website",
    url: removeWildcards(docsRoute().from.pattern),
    description: (
      <SyntaxHighlighter
        value={`const docusaurusRoute = ${JSON.stringify(
          docsRoute(),
          null,
          2,
        )}`}
      />
    ),
  },
  {
    title: "Mount your Wordpress blog",
    url: removeWildcards(wordPressRoute().from.pattern),
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <SyntaxHighlighter
        value={`const wordpressRoute = ${JSON.stringify(
          wordPressRoute(),
          null,
          2,
        )}`}
      />
    ),
  },
]

function Feature({ title, Svg, url, description }: FeatureItem) {
  return (
    <div className={clsx("col col--6")}>
      {Svg && (
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
      )}
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <a href={url}>{`See it work at ${url}`}</a>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
