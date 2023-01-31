import { RouteMetadata } from "@site/src/hooks/useProxyflareRouteList"
import useCopyToClipboard from "@site/src/utils/useCopyToClipboard"
import CopyIcon from "@site/static/icons/copy.svg"
import { FC, useState } from "react"
import { ExpandableCode } from "../ExpandableCode"

export const Feature: FC<{
  url: string
  title: string
  docsUrl: string
  selected: boolean
  description: string
  explanation: string
  exampleRouteDiagram: JSX.Element
  snippet: JSX.Element
  metadata: RouteMetadata
}> = ({
  title,
  url,
  docsUrl,
  snippet,
  description,
  explanation,
  exampleRouteDiagram,
  selected,
  metadata,
  ...styles
}) => {
  const [, routeName, color, selectedColor] = metadata
  const [value, copy] = useCopyToClipboard()
  const [timer, setTimer] = useState(false)

  const doCopy = (url: string) => {
    copy(url)
    setTimer(true)
    setTimeout(() => {
      setTimer(false)
    }, 2200)
  }
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
          <h3 style={{ marginBottom: 2 }}>{title}</h3>

          <div>{exampleRouteDiagram}</div>
        </div>
      </div>

      <div className="row">
        <div className="col col--12">
          <p style={{ maxWidth: 700 }}>{description}</p>
        </div>
      </div>

      <ExpandableCode snippet={snippet} />

      <div className="row">
        <div className="col col--12">
          <p style={{ maxWidth: 700 }}>{explanation}</p>
        </div>
      </div>

      <div className="row">
        <div
          className="col col--12"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <a href={url} className="margin-right--sm">
              <button className="button button--primary">Try it</button>
            </a>
            <a href={docsUrl}>
              <button className="button button--outline button--primary">
                Read the docs
              </button>
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {value && timer && (
              <div style={{ marginRight: 4, fontSize: 12 }}>
                Copied link to clipboard
              </div>
            )}
            <CopyIcon
              fill="#0B89D0"
              width={30}
              style={{ cursor: "pointer" }}
              onClick={() => doCopy(`${window.location.origin}#${metadata[1]}`)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
