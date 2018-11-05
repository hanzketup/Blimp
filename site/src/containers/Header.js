import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Menu from '../components/Menu'

let Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 2rem 5rem;

  @media (${x => x.theme.viewport.tablet}){
      justify-content: center;
      padding: 2rem 0;
  }
  
`

class Header extends Component {

  render () {
    return (
      <Wrapper>
        <Menu />
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
)(Header)
