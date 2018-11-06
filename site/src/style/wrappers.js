import styled from 'styled-components'

export const Page = styled.div`
  position: relative;
  height: 100%;
`

export const SubContent = styled.div`
  position: relative;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 4rem auto;

  color: #333;
  font-size: 1.6rem;
  font-weight: lighter;
  font-family: 'Oswald', sans-serif;

  @media (${x => x.theme.viewport.tablet}){

  }

  @media (${x => x.theme.viewport.phone}){
    min-height: 10rem;
      margin: 2rem auto;
    width: 90%;
    font-size: 1.1rem;
  }

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
