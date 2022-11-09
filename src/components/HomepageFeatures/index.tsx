import {
  RouteMetadata,
  useProxyflareRouteList,
} from "@site/src/hooks/useProxyflareRouteList"
import React, { FC } from "react"
import { Feature } from "./Feature"

export const HomepageFeatures: FC<{
  selectedLineNumber?: RouteMetadata[0]
}> = ({ selectedLineNumber }) => {
  const { routes } = useProxyflareRouteList()

  return (
    <section style={{ display: "flex", alignItems: "center" }}>
      <div className="container">
        {routes.map((featureListRow, i) => (
          <div key={i} className="row">
            {featureListRow.map((props, idx) => (
              <div key={idx} className="col col--6 padding-vert--md">
                <Feature
                  selected={selectedLineNumber === props.metadata[0]}
                  {...props}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
