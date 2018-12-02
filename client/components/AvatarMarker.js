import React from 'react'
import { bindActionCreators } from 'redux'
import { MapView } from 'expo'

import { avatarIcons } from '../constants/avatars'

export default props =>
  <MapView.Marker.Animated
    coordinate={props.coords}
    image={avatarIcons[props.avatar]}
    onPress={props.onPress}
  />
