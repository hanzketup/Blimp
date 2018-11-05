import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Translate, getLanguages, withLocalize } from 'react-localize-redux'
import LocaleToggle from '../components/LocaleToggle'

let Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.4rem 1rem;

  > a{
    font-size: 1.1rem;
    color: #fff;
    font-family: 'Oswald', sans-serif;
    text-decoration: none;
    margin: 0 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0);
    &:hover{
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
    @media (${x => x.theme.viewport.phone}){
        font-size: 0.8rem;
        margin: 0 0.2rem;
    }
  }

  @media (${x => x.theme.viewport.phone}){
      padding: 0.4rem 0.2rem;
  }
  
`

class Footer extends Component {

  render () {
    return (
      <Wrapper>
        <a href='/t-o-s'><Translate id='pages.tos.title' /></a>
        <a href='/c-o-c'><Translate id='pages.coc.title' /></a>

        {this.props.activeLanguage && <LocaleToggle
          selectAction={this.props.setActiveLanguage}
          selected={this.props.activeLanguage}
          languages={this.props.languages}
        />}

      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  languages: getLanguages(state.localize)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
})

export default withLocalize(connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer))
