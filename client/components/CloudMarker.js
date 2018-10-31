import React from 'react'
import { bindActionCreators } from 'redux'
import { MapView } from 'expo'

import * as cloudConstants from '../constants/clouds'

export default props =>
  <MapView.Marker
    coordinate={props.coords}
    onPress={props.onPress}
    image={cloudConstants[props.type].icon}
  />
