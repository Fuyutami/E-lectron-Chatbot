import React from "react"
import styled from "styled-components"

import TokenCounter from "./TokenCounter"
import ModelSelector from "./ModelSelector"
import ResetButton from "./ResetButton"
import ModeSelector from "./ModeSelector"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  background-color: #131313;
`

const SelectorsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

const TokenContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

const TopBar = ({ model, setModel, mode, setMode, tokensUsage, reset }) => {
  return (
    <>
      <Container>
        <SelectorsContainer>
          <ModelSelector model={model} setModel={setModel} />
          <ModeSelector mode={mode} setMode={setMode} />
        </SelectorsContainer>
        <TokenContainer>
          <ResetButton reset={reset} />
          {/* <TokenCounter count={tokensUsage.prompt_tokens} />
          <TokenCounter count={tokensUsage.completion_tokens} /> */}
        </TokenContainer>
      </Container>
    </>
  )
}

export default TopBar
