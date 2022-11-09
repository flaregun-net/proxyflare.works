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
            {featureListRow.map((featureProps, idx) => (
              <div key={idx} className="col col--6 padding-vert--md">
                <Feature
                  {...featureProps}
                  selected={selectedLineNumber === featureProps.metadata[0]}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
