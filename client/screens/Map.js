import React, {Component} from 'react'
import { Permissions } from 'expo'

import MainMap from '../containers/MainMap'
import { required_permissions } from '../constants/globals'

class MapScreen extends Component {

  componentWillMount () {
    Permissions.getAsync(...required_permissions)
    .then(result => {
      !result.status === 'granted' && this.props.navigation.navigate('Permissions')
    })
    .catch(res => this.props.navigation.navigate('Permissions'))
  }

  render () {
    return (
      <MainMap navigation={this.props.navigation} />
    )
  }

}

export default MapScreen
