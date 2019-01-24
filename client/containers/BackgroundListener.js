import React, { Component } from 'react'
import { AppState } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Location, TaskManager } from 'expo'

TaskManager.defineTask('background_location', ({ data: { locations }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return
  }
  console.log('Received new locations', locations, AppState.currentState !== 'active')
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
  actions: bindActionCreators({}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundListner)
