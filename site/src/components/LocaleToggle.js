import React from 'react'
import styled from 'styled-components'

export default props =>
  <Wrap>
    {props.languages.map(lang =>
      <Option
        key={lang.code}
        onClick={() => props.selectAction(lang.code)}
        isSelected={props.selected.code === lang.code}>
        {lang.code}
      </Option>
    )}
  </Wrap>

const Wrap = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.1rem 0.2rem;
  border-radius: 3px;
  margin: 0.3rem;
`

const Option = styled.button`
  color: ${x => x.isSelected ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
  font-size: 0.9rem;
  outline: none;
  text-decoration: none;
  cursor: pointer;
  padding: 0.3rem;
  transition: 0.3s ease;
  background: none;
  border: none;
  &:hover{
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  }
  @media (${x => x.theme.viewport.phone}){
      font-size: 0.8rem;
      padding: 0.15rem;
  }
`
