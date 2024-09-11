import React from "react"
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import styled from "styled-components"

import models from "./other/models"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModelSelector = ({ model, setModel }) => {
  const handleChange = (event) => {
    setModel(models[event.target.value])
  }
  return (
    <Container>
      <FormControl sx={{ minWidth: "100px" }}>
        <InputLabel id="demo-simple-select-label" sx={{ fontSize: "1.5rem" }}>
          Model
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={models.indexOf(model)}
          label="Model"
          onChange={handleChange}
        >
          {models.map((mdl, index) => (
            <MenuItem key={index} value={index}>
              {mdl}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  )
}

export default ModelSelector
