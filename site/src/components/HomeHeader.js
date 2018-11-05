import React from 'react'
import styled from 'styled-components'
import { Translate } from 'react-localize-redux'

import Badge from '../components/Badge'

const Call = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: 5%;
  z-index: 5;

  // special case
  @media (max-width: 1400px){
    width: 60%;
  }

  @media (${x => x.theme.viewport.tablet}){
    width: 100%;
    margin-right: 0%;
  }
  
`

const Badges = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const MainTitle = styled.h1`
  color: #fff;
  font-size: 6rem;
  font-weight: lighter;
  font-family: 'Knewave', cursive;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0

  @media (${x => x.theme.viewport.laptop}){
    font-size: 5rem;
  }
  
  @media (${x => x.theme.viewport.phone}){
      font-size: 3rem;
      line-height: 1.1;
      text-align: center;
  }
`

const TagTitle = styled.h3`
  width: 60%;
  color: #fff;
  opacity: 0.95;
  font-size: 2.4rem;
  text-align:center;
  font-weight: lighter;
  font-family: 'Knewave', cursive;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0.8rem;

  @media (${x => x.theme.viewport.phone}){
      width: 95%;
      font-size: 1.5rem;
  }
  
`

export default props =>
  <Call>
    <MainTitle><Translate id='pages.home.mainTitle' /></MainTitle>
    <TagTitle><Translate id='pages.home.tagTitle' /></TagTitle>
    <Badges>
      <Badge link='#' type='android' />
      <Badge link='#' type='ios' />
    </Badges>
  </Call>
