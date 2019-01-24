import React, { Component } from 'react'
import { Image, Text, View, StyleSheet, Platform } from 'react-native'
import { MapView } from 'expo'
import Icon from 'react-native-fontawesome-pro'
import * as cloudConstants from '../constants/clouds'

class MapMarker extends Component {

  render () {
    return (
      <MapView.Marker
        coordinate={this.props.coords}
        onPress={this.props.onPress}
        image={Platform.OS === 'android' ? cloudConstants[this.props.type].image : undefined}
        tracksViewChanges={false}>
        {Platform.OS === 'ios' && <Image style={{position: 'absolute', top: 0, height: 68, width: 90}} resizeMode='contain' source={cloudConstants[this.props.type].image} />}
        <View style={{position: 'relative', height: 75, width: 120}}>
          <View style={style.ticker}><Text style={{fontSize: 13, fontWeight: 'bold'}}>{this.props.votes}</Text></View>
          <View style={[style.icon, {backgroundColor: cloudConstants[this.props.type].color}]}>
            <Icon name={cloudConstants[this.props.type].icon} color='#000' type='regular' size={21} />
          </View>
          {false && <View style={style.camera}><Icon name={'images'} color='#000' type='regular' size={15} /></View>}
        </View>
      </MapView.Marker>
    )
  }
}

export default MapMarker

const style = StyleSheet.create({
  iconStyle: {
    resizeMode: 'contain',
    height: 75,
    width: 120
  },
  ticker: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 85,
    elevation: 5,
    position: 'absolute',
    top: 6,
    right: 32
  },
  icon: {
    position: 'absolute',
    top: '20%',
    right: '49%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 85,
    elevation: 5
  },
  camera: {
    height: 28,
    width: 28,
    position: 'absolute',
    bottom: '18%',
    left: '0%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#76c7ea',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 85,
    elevation: 5
  }
})
