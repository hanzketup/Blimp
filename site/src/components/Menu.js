import React from 'react'
import styled from 'styled-components'
import { Translate } from 'react-localize-redux'

const Wrap = styled.div`

  > a{
    font-size: 2.3rem;
    color: #fff;
    text-decoration: none;
    font-family: 'Grand Hotel', cursive;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    padding-bottom: -0.5rem;
    padding: 0.5rem;
    margin: 0 0.4rem;
    transition: 0.1s ease;
    opacity: 0.8;
    &:hover{opacity: 1;}
    @media (${x => x.theme.viewport.phone}){
        font-size: 1.6rem;
        padding: 0.3rem;
    }
  }
`

export default props =>
  <Wrap>
    <a href='/'><Translate id='nav.home' /></a>
    <a href='/advertise'><Translate id='nav.advertise' /></a>
    <a href='/contact'><Translate id='nav.contact' /></a>
  </Wrap>
