import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import * as userActions from '../actions/user'
import ArrowMarker from '../components/ArrowMarker'

class UserMarker extends Component {

  componentWillMount() {
    this.props.actions.getUserLocation()
    Expo.Location.watchPositionAsync(
      {enableHighAccuracy: true},
      this.props.actions.setUserLocation
    )
  }

  render() {
    return (
      <ArrowMarker
        coords={{...this.props.state.position}}
      />
    )
  }

}

const mapStateToProps = state => ({
  state: state.user
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMarker)
