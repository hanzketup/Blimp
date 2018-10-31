import React, {Component} from "react"
import Expo from 'expo'
import MainMap from '../containers/MainMap'

import { required_permissions } from '../constants/globals'

class MapScreen extends Component {

  componentWillMount(){
    Expo.Permissions.getAsync(...required_permissions)
    .then(result => {
      console.log(result)
      !result.status === 'granted' && this.props.navigation.navigate('Permissions')
    })
    .catch(res => this.props.navigation.navigate('Permissions'))

  }

  render(){
    return(
      <MainMap navigation={this.props.navigation} />
    )
  }

}

export default MapScreen
