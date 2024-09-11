import React from "react"
import styled from "styled-components"
import Button from "@mui/material/Button"

const Container = styled.div`
  width: 100%;
  position: relative;
`
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
`

const ImageBlock = ({ url }) => {
  const handleClick = () => {
    window.electronAPI.download(url)
  }
  return (
    <Container>
      <Header>
        <Button variant="outlined" sx={{}} onClick={handleClick}>
          Save
        </Button>
      </Header>
      <Image src={url} alt="AI response" />
    </Container>
  )
}

export default ImageBlock
