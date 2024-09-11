import React from "react"
import Button from "@mui/material/Button"
import styled from "styled-components"
import { Typography } from "@mui/material"

const ResetBtn = styled(Button)`
  padding: 0;
`

const ResetButton = ({ reset }) => {
  const handleClick = () => {
    reset()
  }

  return (
    <>
      <ResetBtn variant="contained" onClick={handleClick}>
        <Typography sx={{ fontWeight: "bold" }} variant="button">
          Clean
        </Typography>
      </ResetBtn>
    </>
  )
}

export default ResetButton
