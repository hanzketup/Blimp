  import React, { Component } from 'react'
  import { MapView } from 'expo'

  import { avatarIcons } from '../constants/avatars'

  class AvatarMarker extends Component {

    // componentDidUpdate () {
    //   this.props.coords && this.marker._component.animateMarkerToCoordinate({
    //     coordinate: {
    //       latitude: this.props.coords.latitude,
    //       longitude: this.props.coords.longitude
    //     }
    //   })
    // }

    render () {
      return (
        <MapView.Marker.Animated
          ref={component => this.marker = component}
          style={{zIndex: 4}}
          coordinate={this.props.coords || {latitude: 0, longitude: 0}}
          image={avatarIcons[this.props.avatar]}
          onPress={this.props.onPress}
      />
      )
    }

  }

  export default AvatarMarker
