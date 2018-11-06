import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Translate } from 'react-localize-redux'

import Header from '../containers/Header'

let Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 28rem;
  background-color: #f38398;
  background-image: url("${x => x.theme.patterns.topo}");
  background-attachment: fixed;
  box-shadow: inset 0 -80px 120px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (${x => x.theme.viewport.phone}){
    height: 24rem;
  }

  > h1{
    color: #fff;
    font-size: 6rem;
    font-weight: lighter;
    font-family: 'Grand Hotel',cursive;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    @media (${x => x.theme.viewport.phone}){
      font-size: 3.5rem;
    }
  }

  &::before{
    content: '';
    position: absolute;
    bottom: -4rem;
    width: 140%;
    height: 5rem;
    background: #fff;
    transform: rotate(4deg);
  }

  &::after{
    content: '';
    position: absolute;
    bottom: -4rem;
    width: 140%;
    height: 5rem;
    background: #fff;
    transform: rotate(-4deg);
  }

`

class SubTop extends Component {

  render () {
    return (
      <Wrapper>
        <Header />
        <h1><Translate id={this.props.title} /></h1>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubTop)
