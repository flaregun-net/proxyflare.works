import React from "react"
import { Prism } from "react-syntax-highlighter"
import prismStyle from "react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark"

export default ({
  value,
  wrapLongLines = false,
  language = "typescript",
  ...other
}) => (
  <Prism
    style={prismStyle}
    language={language}
    customStyle={{ fontSize: 12, zIndex: 500, ...other.customStyle }}
    wrapLongLines={wrapLongLines}
    {...other}
  >
    {value.trim()}
  </Prism>
)
