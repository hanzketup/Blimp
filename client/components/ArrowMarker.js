import React from "react"
import { bindActionCreators } from "redux"
import { MapView } from "expo"

import icon from '../assets/icons/arrow.png'

export default props =>
  <MapView.Marker.Animated
    coordinate={props.coords}
    image={icon}
    onPress={props.onPress}
    flat={false}
  />
