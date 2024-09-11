import React, { useEffect, useState } from "react"
import { Typography } from "@mui/material"

import styled from "styled-components"

const TokenWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2f2f2f;
  width: 50px;
  padding: 0.5rem;
  border-radius: 5px;
`

const TokenCounter = ({ count }) => {
  const [accumulatedCount, setAccumulatedCount] = useState(0)

  useEffect(() => {
    setAccumulatedCount(accumulatedCount + count)
  }, [count])

  return (
    <>
      <TokenWrapper>
        <Typography>{accumulatedCount}</Typography>
      </TokenWrapper>
    </>
  )
}

export default TokenCounter
