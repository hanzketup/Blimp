import React from 'react'
import { bindActionCreators } from 'redux'
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-fontawesome-pro'

import * as cloudConstants from '../constants/clouds'
import MiniMap from '../components/MiniMap'

export default props =>

  <View style={style.header}>

    <View style={style.topWrap}>
      <Icon containerStyle={style.arrow} onPress={props.prev} name='chevron-left' color={props.hasNeighbors ? '#eee' : 'rgba(0, 0, 0, 0.05)'} type={'regular'} size={38} />

      <View style={style.mapWrap}>
        <Image style={style.cloud} source={cloudConstants[props.type].icon} resizeMode={'contain'} />
        <MiniMap coords={props.coords} />
      </View>

      <Icon containerStyle={style.arrow} onPress={props.next} name='chevron-right' color={props.hasNeighbors ? '#eee' : 'rgba(0, 0, 0, 0.05)'} type={'regular'} size={38} />
    </View>

    <View style={style.stats}>

      <View style={style.visits}>
        <Text style={style.statTitle}>Visits</Text>
        <Text style={style.statValue}>{props.visits}</Text>
      </View>

      <View style={style.created}>
        <Text style={style.statTitle}>Created</Text>
        <Text style={style.statValue}>{moment(props.timestamp, 'X').fromNow()}</Text>
      </View>

    </View>
  </View>

const style = StyleSheet.create({
  header: {
    width: '100%',
    paddingTop: 60,
    paddingBottom: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrow: {
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  cloud: {
    height: '100%',
    width: '80%',
    alignSelf: 'center',
    position: 'absolute',
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto',
    zIndex: 10
  },
  stats: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingBottom: 25
  },
  visits: {
    paddingRight: '10%',
    alignItems: 'center'
  },
  created: {
    paddingLeft: '12%',
    alignItems: 'center'
  },
  statTitle: {
    fontSize: 15,
    color: '#fff'
  },
  statValue: {
    fontSize: 20,
    color: '#fff'
  }
})
