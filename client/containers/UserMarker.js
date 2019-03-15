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
        this.props.actions.setUserPosition(current_position)
      }
    }, timed_poll_interval)

    Location.watchPositionAsync({accuracy: 5}, async position => {
      // runs on every position change
      await this.SigPosCalculate(position)
      this.props.actions.setUserPosition(position)
      this.props.actions.shouldPickup(position, this.props.state.coins)
    })
  }

  SigPosCalculate (position) {
    if (this.props.state.last_sig_pos) {
      // fetch (poll) position based data from the server when the user has moved sig_pos_distance (meters)
      // to not flood the server with request TODO make polling slower when speed is high
      let since_last_distance = geolib.getDistance(position.coords, this.props.state.last_sig_pos)
      if (position.coords.accuracy < max_accepted_accuracy && since_last_distance > sig_pos_distance) {
        this.props.actions.setLastSigPos(position)
        this.sigPoll(false, position)
      }
    } else {
      // set the first sigPos if sigPos == null, and poll the server
      this.props.actions.setLastSigPos(position)
      this.sigPoll(true, position)
    }
  }

  sigPoll (isInitial = false, position) {
    this.props.actions.getClouds(position)
    this.props.actions.getCoins(position)
    this.props.actions.logPosition(position, isInitial, false)
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
