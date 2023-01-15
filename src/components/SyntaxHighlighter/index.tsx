import React from "react"
import { Prism } from "react-syntax-highlighter"
import prismStyle from "react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark"
import styles from "./styles.module.scss"

const Pre = ({ children }) => <pre className={styles.pre}>{children}</pre>

export default ({
  value,
  wrapLongLines = false,
  language = "typescript",
  ...other
}) => (
  <Prism
    style={prismStyle}
    language={language}
    wrapLongLines={wrapLongLines}
    PreTag={Pre}
    {...other}
  >
    {value.trim()}
  </Prism>
)
