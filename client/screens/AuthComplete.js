import React, {Component} from 'react'

import AuthComplCont from '../containers/AuthComplCont'

class AuthCompleteScreen extends Component {

  render () {
    return (
      <AuthComplCont navigation={this.props.navigation} />
    )
  }

}

export default AuthCompleteScreen
