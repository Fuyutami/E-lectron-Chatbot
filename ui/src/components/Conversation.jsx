import { Typography } from "@mui/material"
import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import CodeBlock from "./CodeBlock"
import ImageBlock from "./ImageBlock"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  width: 100%;
  background-color: transparent;
  overflow-y: scroll;
  padding: 1rem;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #2c2c2c;
  }

  &::-webkit-scrollbar-thumb {
    background: #131313;
    /* border-radius: 5px; */
  }
`

const Messager = styled.div`
  display: flex;
  margin-bottom: 1rem;
  user-select: none;
`

const Message = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 2rem;
  justify-self: flex-start;
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.$sender === "assistant" ? "#1e1e1e" : "transparent"};
  box-shadow: ${(props) =>
    props.$sender === "assistant" ? "5px 5px 5px 0px #00000013" : "none"};
  border-radius: 5px;

  ::selection {
    background-color: #3facb5;
    color: #333333;
  }
`

const Conversation = ({ conversationData, model, trimCount }) => {
  const messageContainerRef = useRef(null)
  const formatContent = (index, string) => {
    let content = string
    if (model.toLowerCase().startsWith("claude") && index === 0) {
      content = content.substring(trimCount, string.length)
    }
    content = content.split("```")
    return content
  }

  useEffect(() => {
    const secondToLastMessage =
      messageContainerRef.current?.children?.[
        messageContainerRef.current.children.length - 2
      ]
    secondToLastMessage?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }, [conversationData])

  return (
    <>
      <Container ref={messageContainerRef}>
        {conversationData &&
          conversationData
            .filter((item) => item.role !== "system")
            .map((item, i) => (
              <Message key={i} $sender={item.role}>
                <Messager>
                  <Typography
                    sx={{
                      color: "#808080",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {item.role === "user"
                      ? "You"
                      : model.toLowerCase().startsWith("gpt")
                        ? "GPT"
                        : model.toLowerCase().startsWith("claude")
                          ? "Claude"
                          : "DALL-E"}
                  </Typography>
                </Messager>
                {model.toLowerCase().startsWith("dall") ? (
                  i % 2 === 0 ? (
                    <Typography>{item.content}</Typography>
                  ) : (
                    <ImageBlock url={item.content} key={i} />
                  )
                ) : (
                  formatContent(i, item.content).map((content, i) =>
                    i % 2 === 0 ? (
                      <Typography key={i}>{content}</Typography>
                    ) : (
                      <CodeBlock code={content} key={i} />
                    )
                  )
                )}
              </Message>
            ))}
      </Container>
    </>
  )
}

export default Conversation
