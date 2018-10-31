import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { StyleSheet, Image, Text, View } from "react-native"
import { MapView } from "expo"
import MapStyle from "../style/map.json"

class MiniMap extends Component {

  componentDidMount(){this.map._component.animateToCoordinate(this.props.coords)}
  componentDidUpdate(){this.map._component.animateToCoordinate(this.props.coords)}

  render() {
    return(
      <View style={[style.container, this.props.style]}>
        <MapView.Animated
        provider="google"
        ref={component => {this.map = component}}
        zoomControlEnabled={false}
        scrollEnabled={false}
        showsCompass={false}
        toolbarEnabled={false}
        loadingEnabled={true}
        customMapStyle={MapStyle}
        style={style.map}
        minZoomLevel={17}
        >
          {this.props.children}
        </MapView.Animated>
      </View>
    )
  }

}

export default MiniMap

const style = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: 200,
    width: 200,
    borderRadius: 100,
    overflow: 'hidden'
  },
  map: {
    height: '107%',
    width: '100%',
  },
})
