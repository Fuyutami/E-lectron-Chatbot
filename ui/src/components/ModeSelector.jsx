import React from "react"
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import styled from "styled-components"

import modes from "./other/modes.js"
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModeSelector = ({ mode, setMode }) => {
  const handleChange = (event) => {
    setMode(event.target.value)
  }
  return (
    <Container>
      <FormControl>
        <InputLabel id="demo-simple-select-label" sx={{ fontSize: "1.5rem" }}>
          Mode
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mode}
          label="Mode"
          onChange={handleChange}
        >
          {modes.map((mode, index) => (
            <MenuItem key={index} value={index}>
              {mode.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  )
}

export default ModeSelector
