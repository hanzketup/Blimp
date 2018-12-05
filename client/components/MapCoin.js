import React from 'react'
import { MapView } from 'expo'

import icon from '../assets/icons/coin.png'

export default props =>
  <MapView.Marker.Animated
    coordinate={props.coords}
    image={icon}
    onPress={props.onPress}
  />
