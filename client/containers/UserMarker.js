import React, { Component } from 'react'
import geolib from 'geolib'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AppState } from 'react-native'
import { Location } from 'expo'

import {
    sig_pos_distance,
    max_accepted_accuracy,
    timed_poll_interval
  } from '../constants/globals'
import * as coinActions from '../actions/coins'
import * as movementActions from '../actions/movement'
import AvatarMarker from '../components/AvatarMarker'

class UserMarker extends Component {

  componentDidMount () {
    setInterval(async () => {
      let now = Math.round(new Date().getTime() / 1000)
      if (
        this.props.state.last_sig_pos
        && AppState.currentState === 'active'
        && (this.props.state.polling_timestamp + timed_poll_interval > now)
      ) {
        current_position = await Location.getCurrentPositionAsync({accuracy: 5})
        this.sigPoll(false, current_position)
      }
    }, timed_poll_interval)

    Location.watchPositionAsync({accuracy: 5}, async location => {
      // runs on every position change
      await this.SigPosCalculate(location)
      this.props.actions.setUserPosition(location)
      this.props.actions.shouldPickup(location, this.props.state.coins)
    })
  }

  SigPosCalculate (location) {
    if (this.props.state.last_sig_pos) {
      // fetch (poll) location based data from the server when the user has moved sig_pos_distance (meters)
      // to not flood the server with request TODO make polling slower when speed is high
      let since_last_distance = geolib.getDistance(location.coords, this.props.state.last_sig_pos)
      if (location.coords.accuracy < max_accepted_accuracy && since_last_distance > sig_pos_distance) {
        this.props.actions.setLastSigPos(location)
        this.sigPoll(false, location)
      }
    } else {
      // set the first sigPos if sigPos == null, and poll the server
      this.props.actions.setLastSigPos(location)
      this.sigPoll(true, location)
    }
  }

  sigPoll (isInitial = false, location) {
    this.props.actions.getClouds(location)
    this.props.actions.getCoins(location)
    this.props.actions.logPosition(location, isInitial, false)
    this.props.actions.setPollTimestamp()
  }

  render () {
    return typeof this.props.state.me.avatar === 'number' ? (
      <AvatarMarker
        avatar={this.props.state.me.avatar}
        coords={this.props.state.position}
      />
    ) : null
  }

}

const mapStateToProps = state => ({
  state: {
    ...state.user,
    ...state.ui,
    ...state.coins,
    ...state.polling
  }
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...movementActions, ...coinActions}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMarker)
