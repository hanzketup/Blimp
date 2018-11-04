import React from 'react'
import styled from 'styled-components'
import { Translate } from 'react-localize-redux'

export default props =>
  <Wrap>

    <Feature color='#8398f3' inverted>
      <div>
        <img src='/static/images/avatar.png' alt='Blimp avatar with selfie stick' />
      </div>
      <h1><Translate id='pages.home.feature_one.title' /></h1>
      <p><Translate id='pages.home.feature_one.desc' /></p>
    </Feature>

    <Feature color='#8398f3'>
      <div>
        <img src='/static/images/clouds.png' alt='stack of clouds' />
      </div>
      <h1><Translate id='pages.home.feature_two.title' /></h1>
      <p><Translate id='pages.home.feature_two.desc' /></p>
    </Feature>

  </Wrap>

const Wrap = styled.div`
    position: relative;
    width: 100%;
    background-color: #8398f3;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:space-around;
    overflow: hidden;
    box-shadow: inset 0 6px 8px rgba(0, 0, 0, 0.12), inset 0 -6px 8px rgba(0, 0, 0, 0.12);
  `

const Feature = styled.div`
  height: 100%;
  flex-basis: 50%;
  padding: 4rem 0;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;

  background: ${x => x.inverted && 'rgba(0, 0, 0, 0.1)'};

  > div{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 12rem;
    width: 12rem;
    padding: 0rem;
    border-radius: 50%;
    //box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05), -1px -1px 4px rgba(0, 0, 0, 0.02);
    //background: ${x => x.inverted ? x.color : 'rgba(0, 0, 0, 0.1)'};
    > img{height: 75%;}
  }

  h1{
    font-size: 4rem;
    font-weight: lighter;
    font-family: 'Grand Hotel', cursive;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    margin: 0 0 0.2rem 0;
  }

  p {
    width: 75%;
    font-size: 1.2rem;
    font-family: 'Oswald', cursive;
  }

`
