import React, { Component } from 'react'
import geolib from 'geolib'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Location } from 'expo'

import { sig_pos_distance } from '../constants/globals'
import * as movementActions from '../actions/movement'
import AvatarMarker from '../components/AvatarMarker'

class UserMarker extends Component {

  componentDidMount () {
    console.log('__ usermarker mounted __')
    Location.watchPositionAsync({enableHighAccuracy: true, distanceInterval: 4}, location => {
      console.log('####  POSITION UPDATED ####')
      this.props.actions.setUserPosition(location)
      this.SigPosCalculate(location)
    })
  }

  SigPosCalculate (location) {
    if (this.props.state.last_sig_pos) {
      // fetch (poll) location based data from the server when the user has moved sig_pos_distance (meters)
      // to not flood the server with request
      // TODO make polling slower when speed is high
      if (geolib.getDistance(location.coords, this.props.state.last_sig_pos) > sig_pos_distance) {
        this.props.actions.sigPoll(location)
      }
    } else {
      // set the first sigPos if sigPos == null and poll the server
      this.props.actions.setLastSigPos(location)
      this.props.actions.sigPoll(location)
    }
  }

  render () {
    return typeof this.props.state.me.avatar === 'number' ? (
      <AvatarMarker
        avatar={this.props.state.me.avatar}
        coords={{...this.props.state.position}}
      />
    ) : null
  }

}

const mapStateToProps = state => ({
  state: {
    ...state.user,
    ...state.ui
  }
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(movementActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMarker)
