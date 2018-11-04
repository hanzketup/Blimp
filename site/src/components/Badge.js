import React from 'react'
import styled from 'styled-components'
import { withLocalize } from 'react-localize-redux'

const Wrap = styled.a`
  display: flex;
  height: ${x => x.type === 'ios' ? '4.15rem' : '6rem'};
  margin: 0rem;
  transition: 0.4s ease;
  z-index: 50;

  &:hover{
    transform: translateY(-4px);
  }
  
`

const Image = styled.img`
  height: 100%;
`

export default withLocalize(
  props => {
    // localization service needs to load before accessing props.activeLanguage
    return (
      <Wrap href={props.link} type={props.type}>
        {props.activeLanguage && <Image src={`/static/images/badges/${props.activeLanguage.code}/${props.type}.svg`} />}
      </Wrap>
    )
  }
)
