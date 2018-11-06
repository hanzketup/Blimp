import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { renderToStaticMarkup } from 'react-dom/server'
import { withLocalize } from 'react-localize-redux'

import uiLocale from '../localize/ui.json'
import tosLocale from '../localize/tos.json'
import ppLocale from '../localize/pp.json'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHome
  } from '@fortawesome/pro-light-svg-icons'

class Root extends Component {
  constructor (props) {
    super(props)
    this.BuildIconLibrary()
    this.props.initialize({
      languages: [
        { name: 'English', code: 'en' },
        { name: 'Swedish', code: 'sv' }
      ],
      options: {
        renderInnerHtml: true,
        renderToStaticMarkup
      }
    })

    this.props.addTranslation(uiLocale)
    this.props.addTranslation(tosLocale)
    this.props.addTranslation(ppLocale)

    if (navigator.languages !== undefined) {
      let langCode = navigator.languages[0].slice(0, 2)
      if (langCode === 'sv') { this.props.setActiveLanguage('sv') } else { this.props.setActiveLanguage('en') }
    }
  }

  BuildIconLibrary () {
    library.add(
      faHome,
    )
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
})

export default withLocalize(connect(
  mapStateToProps,
  mapDispatchToProps
)(Root))
