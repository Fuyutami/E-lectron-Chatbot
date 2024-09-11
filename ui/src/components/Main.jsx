import React, { useEffect, useState } from "react"
import styled from "styled-components"

import TopBar from "./TopBar"
import Conversation from "./Conversation"
import Input from "./Input"
import modes from "./other/modes"
import models from "./other/models"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
  background-color: #2c2c2c;
`

const Main = () => {
  const [model, setModel] = useState(models[0])
  const [mode, setMode] = useState(0)

  const [messages, setMessages] = useState([])
  // const [tokensUsed, setTokensUsed] = useState({
  //   completion_tokens: 0,
  //   prompt_tokens: 0,
  //   total_tokens: 0,
  // })

  useEffect(() => {
    reset()
  }, [mode, model])

  // connect to AI
  useEffect(() => {
    window.electronAPI.connectToAI(model)
  }, [model])

  // message AI
  const messageAI = (messageText) => {
    const formattedMessage = {
      role: "user",
      content: messageText,
    }
    const newMessages = [...messages]
    if (model.toLowerCase().startsWith("gpt") && newMessages.length === 0) {
      const roleMessage = {
        role: "system",
        content: modes[mode].description,
      }
      newMessages.push(roleMessage)
    } else if (
      model.toLowerCase().startsWith("claude") &&
      newMessages.length === 0
    ) {
      formattedMessage.content = modes[mode].description + " " + messageText
    }
    newMessages.push(formattedMessage)
    window.electronAPI
      .messageAI(model, newMessages)
      .then((response) => {
        update(response)
      })
      .catch((error) => console.error(error))
  }

  const update = (newMessages) => {
    setMessages(newMessages)
  }

  const reset = () => {
    setMessages([])
  }

  return (
    <>
      <Container>
        <TopBar
          model={model}
          setModel={setModel}
          mode={mode}
          setMode={setMode}
          tokensUsage={0}
          reset={reset}
        />
        <Conversation
          conversationData={messages}
          model={model}
          trimCount={modes[mode].description.length}
        />
        <Input sendMessage={messageAI} />
      </Container>
    </>
  )
}
export default Main
