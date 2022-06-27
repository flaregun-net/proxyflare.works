import React, { FC } from "react"
import styles from "./styles.module.scss"

export const RouteDiagram: FC<{
  to: string
  from: string
}> = ({ to, from }) => {
  const [fromHostname, ...fromPathnameParts] = from.split("/")
  const fromPathname = `/${fromPathnameParts.join("/")}`

  const [toHostname, ...toPathnameParts] = to.split("/")
  const toPathname = `${
    toPathnameParts.length ? "/" : ""
  }${toPathnameParts.join("/")}`

  return (
    <div className={styles.wrapper}>
      <div>
        <span className={styles.hostname}>{fromHostname}</span>
        <span className={styles.pathname}>{fromPathname}</span>
      </div>
      <span className={styles.arrow}>⟶</span>
      <div>
        <span className={styles.hostname}>{toHostname}</span>
        {toPathname && <span className={styles.pathname}>{toPathname}</span>}
      </div>
    </div>
  )
}
