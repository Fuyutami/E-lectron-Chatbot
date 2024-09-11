import React, { useEffect, useState } from "react"
import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/themes/prism-vsc-dark-plus.css"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Button from "@mui/material/Button"
import styled from "styled-components"

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e1e1e;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid #363636;
  margin: 1rem 0;

  /* overflow: hidden; */

  :last-child {
    ::selection {
      background-color: #3facb5;
      color: #1e1e1e;
    }
    &::-webkit-scrollbar {
      width: 5px;
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #1e1e1e;
    }

    &::-webkit-scrollbar-thumb {
      background: #4d4d4d;
      /* border-radius: 5px; */
    }
  }
`

const CodeWrapper = styled.div`
  width: 100%;
  /* overflow: scroll; */
`
const Pre = styled.pre`
  overflow: hidden;
`

const Code = styled.code`
  overflow: hidden;
`

const CodeBlock = ({ code }) => {
  const [formattedCode, setFormattedCode] = useState("")
  const [language, setLanguage] = useState("javascript")

  useEffect(() => {
    const language = code.split("\n")[0]
    setLanguage(language)
  }, [code])

  // useEffect(() => {
  //   // const format = async () => {
  //   //   const formatted = await prettier.format(code, {
  //   //     semi: false,
  //   //     parser: "babel",
  //   //     plugins: [babel, esTree],
  //   //   })
  //   //   setFormattedCode(formatted)
  //   // }
  //   // format()
  // }, [code])

  useEffect(() => {
    Prism.highlightAll()
  }, [code])

  return (
    <Container>
      <CopyToClipboard text={formattedCode}>
        <Button
          variant="outlined"
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
          }}
        >
          Copy block
          {/* <ContentCopyRoundedIcon /> */}
        </Button>
      </CopyToClipboard>
      <CodeWrapper>
        <Pre>
          <Code className={`language-${language}`}>{code}</Code>
        </Pre>
      </CodeWrapper>
    </Container>
  )
}

export default CodeBlock
