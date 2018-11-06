import React from 'react'
import styled from 'styled-components'

export default props =>
  <Wrap>
    <Address href={`mailto:${props.address}`}>{props.address}</Address>
  </Wrap>

const Wrap = styled.div`
  padding: 0.7rem 1rem 1.1rem 1rem;
  margin: 3rem 0;
  background: #eee;
  border-radius: 6px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

  @media (${x => x.theme.viewport.phone}){
      margin: 1.5rem 0;
    background: none;
    box-shadow: none;
  }
  
`

const Address = styled.a`
  color: #333;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  font-size: 1.8rem;
  line-height: 0.7;
  font-weight: lighter;
  padding: 0.5rem;
  @media (${x => x.theme.viewport.phone}){
    font-size: 1.4rem;
  }
`
