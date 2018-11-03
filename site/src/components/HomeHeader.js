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
`

const Badges = styled.div`
  width: 100%;
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
`

const TagTitle = styled.h3`
  width: 60%;
  color: #fff;
  opacity: 0.92;
  font-size: 2.4rem;
  text-align:center;
  font-weight: lighter;
  font-family: 'Knewave', cursive;
  margin: 0.8rem;
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
