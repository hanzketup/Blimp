import React from 'react'
import styled from 'styled-components'

const Phone = styled.img`
  position: absolute;
  left: 0%;
  bottom: 0;
  height: 90%;
  margin: auto auto 0 4rem;
`

export default props =>
  <Phone src={'%PUBLIC_URL%/images/phone_flat.png'} />
