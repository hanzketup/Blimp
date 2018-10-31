import React, { Component } from "react"
import { StyleSheet } from "react-native"
import { MapView } from "expo"
import MapStyle from "../style/map.json"

class MainMap extends Component {

  componentDidUpdate(){
    this.props.follow
    ? this.map._component.animateToCoordinate(this.props.coords)
    : null
  }

  render() {
    return (
      <MapView.Animated
      provider="google"
      ref={component => {this.map = component}}
      zoomControlEnabled={false}
      scrollEnabled={true}
      minZoomLevel={19.5}
      maxZoomLevel={20}
      showsCompass={false}
      toolbarEnabled={false}
      loadingEnabled={true}
      customMapStyle={MapStyle}
      style={style.map}
      initialRegion={{
        latitude: 68.5,
        longitude: 21.5,
        latitudeDelta: 8,
        longitudeDelta: 8,
      }}
      >
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
