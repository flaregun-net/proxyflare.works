import clsx from "clsx"
import React, { FC } from "react"
import useCollapse from "react-collapsed"
import styles from "./styles.module.scss"

export const ExpandableCode: FC<{
  snippet: JSX.Element
}> = ({ snippet }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    collapsedHeight: 80,
  })

  return (
    <div className={styles.root}>
      <div className="row" {...getCollapseProps()}>
        <div className="col col--12">{snippet}</div>
      </div>
      <div className={styles.buttonWrapper}>
        <button
          type="button"
          className={clsx(
            "button",
            styles.button,
            "button--outline button--link",
          )}
          {...getToggleProps()}
        >
          {isExpanded ? "Collapse code" : "Expand code"}
        </button>
      </div>
    </div>
  )
}
