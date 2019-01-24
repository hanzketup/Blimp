import React, { Component } from 'react'
import { AppState } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Location, TaskManager } from 'expo'

import * as movementActions from '../actions/movement'

TaskManager.defineTask('background_location', ({ data: { locations }, error }) => {
  if (error) { return 0 }
  if (AppState.currentState !== 'active') {
    this.props.actions.logPosition(locations[0], false, true)
    Expo.Notifications.presentLocalNotificationAsync({
      title: 'background geolocation recorded',
      body: `${locations}`
    })
  }
})

class BackgroundListner extends Component {

  async componentDidMount () {
    await Location.startLocationUpdatesAsync('background_location')
    console.log('background GEO-listener attached', await TaskManager.isTaskRegisteredAsync('background_location'))
  }

  render () {
    return (null)
  }

}

const mapStateToProps = state => ({
  state: {}
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...movementActions}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundListner)
