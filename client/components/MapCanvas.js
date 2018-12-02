import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { MapView } from 'expo'
import MapStyle from '../style/map.json'

class MainMap extends Component {

  componentDidUpdate () {
    this.props.follow
    ? this.map._component.animateToCoordinate(this.props.coords)
    : null
  }

  render () {
    return (
      <MapView.Animated
        provider='google'
        ref={component => this.map = component}
        zoomControlEnabled={false}
        scrollEnabled
        minZoomLevel={19.5}
        maxZoomLevel={20}
        showsCompass={false}
        toolbarEnabled={false}
        customMapStyle={MapStyle}
        style={style.map}
        initialRegion={{
          latitude: 58.360438,
          longitude: 15.619863,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03
        }}>
        {this.props.children}
      </MapView.Animated>
    )
  }

}

export default MainMap

const style = StyleSheet.create({
  map: {
    height: '104%',
    width: '100%',
    zIndex: 2
  }
})
