import React, { useState } from "react"
import styled from "styled-components"
import { TextField, IconButton, FormControl } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: transparent;
  padding: 1rem;
`

const Form = styled.form`
  width: 100%;
  max-width: 1000px;
`

const Input = ({ sendMessage }) => {
  const [input, setInput] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === "") {
      console.log("your message is empty")
      return
    }
    sendMessage(input)
    setInput("")
  }

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              id="standard-name"
              label="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton type="submit">
                    <SendIcon />
                  </IconButton>
                ),
              }}
            />
          </FormControl>
        </Form>
      </Container>
    </>
  )
}

export default Input
