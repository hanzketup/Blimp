import React, {Component} from 'react'

import SettingsList from '../containers/SettingsList'

class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
  return {
    title: 'Settings'
    }
  }

  render () {
    return (
      <SettingsList navigation={this.props.navigation} />
    )
  }

}

export default SettingsScreen
