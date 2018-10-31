import React, {Component} from "react"

import AuthControl from '../containers/AuthControl'

class AuthScreen extends Component {

  render(){
    return(
      <AuthControl navigation={this.props.navigation} />
    )
  }

}

export default AuthScreen
