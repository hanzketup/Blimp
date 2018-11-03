import styled from 'styled-components'

export const Page = styled.div`
  height: 100%;
`

export const Content = styled.div`
  width: 100%;
  min-height: 85%;
  padding-bottom: 12%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (${x => x.theme.viewport.tablet}){
    padding-top: 0;
    height: auto;
    min-height: 20vh;
  }

`
