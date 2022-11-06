import { RouteMetadata } from "@site/src/hooks/useProxyflareRouteList"
import SourceCode from "@site/static/icons/source-code.svg"
import React, { FC } from "react"
import useCollapse from "react-collapsed"

export const Feature: FC<{
  url: string
  title: string
  docsUrl: string
  selected: boolean
  description: string
  snippet: JSX.Element
  metadata: RouteMetadata
}> = ({
  title,
  url,
  docsUrl,
  snippet,
  description,
  selected,
  metadata,
  ...styles
}) => {
  const { getCollapseProps, getToggleProps } = useCollapse()

  const [, routeName, color, selectedColor] = metadata

  return (
    <div
      id={routeName}
      className="container"
      style={{
        borderRadius: 8,
        padding: "1rem",
        border: `1px solid ${selected ? color : "#4a4658"}`,
        backgroundColor: selected ? selectedColor : "rgba(20,28,34,.5)",
        ...styles,
      }}
    >
      <div className="row margin-bottom--md">
        <div className="col col--12">
          <h3 className="margin-bottom--md">{title}</h3>

          <button
            style={{ display: "flex", alignItems: "center", padding: 0 }}
            className="button button--outline button--link"
            {...getToggleProps()}
          >
            <SourceCode width={16} height={16} style={{ marginRight: 8 }} />
            View {routeName}
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col col--12">
          <p style={{ maxWidth: 700 }}>{description}</p>
        </div>
      </div>

      <div className="row" {...getCollapseProps()}>
        <div className="col col--12">{snippet}</div>
      </div>

      <div className="row">
        <div className="col col--12">
          <a href={url} className="margin-right--sm">
            <button className="button button--primary">Try it</button>
          </a>
          <a href={docsUrl}>
            <button className="button button--outline button--primary">
              Read the docs
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
