import React from 'react'
import styled from 'styled-components'

const Phone = styled.img`
  position: absolute;
  left: 0%;
  bottom: 0;
  height: 90%;
  margin: auto auto 0 4rem;

  @media (${x => x.theme.viewport.laptop}){
    left: -10%;
  }

  @media (${x => x.theme.viewport.tablet}){
    left: -25%;
    bottom: -40%;
  }

  @media (${x => x.theme.viewport.phone}){
      height: 60%;
      left: -25%;
      bottom: -25%;
  }
  
`

export default props =>
  <Phone src={'/static/images/phone_flat.png'} />
