import React from "react"
import { Prism } from "react-syntax-highlighter"
import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/dracula"

export default function SyntaxHighlighter({
  language = "typescript",
  value,
  ...other
}): JSX.Element {
  return (
    <Prism
      style={dracula}
      language={language}
      customStyle={{ marginBottom: 32 }}
      wrapLongLines={true}
      {...other}
    >
      {value.trim()}
    </Prism>
  )
}
