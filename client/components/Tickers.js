import React from 'react'
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native'
import Icon from 'react-native-fontawesome-pro'

export default props =>
  <View style={style.wrap}>

    <TouchableHighlight
      onPress={props.onPress}
      underlayColor={'#ffa776'}
      style={[style.button, {backgroundColor: '#f5cd79', borderColor: '#f7d794'}]} >
      <View style={style.wrapper}>
        <Image style={{height: 26, width: 26, marginRight: 'auto'}} resizeMode='contain' source={require('../assets/icons/coin.png')} />
        <Text style={style.count}>{props.coins}</Text>
      </View>
    </TouchableHighlight>

    <TouchableHighlight
      onPress={props.onPress}
      underlayColor={'#ffa776'}
      style={[style.button, {backgroundColor: '#574b90', borderColor: '#786fa6'}]} >
      <View style={style.wrapper}>
        <Image style={{height: 23, width: 23, marginRight: 'auto'}} resizeMode='contain' source={require('../assets/icons/level.png')} />
        <Text style={style.count}>{props.traveled}km</Text>
      </View>
    </TouchableHighlight>

  </View>

const style = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: '2%',
    left: '2.5%',
    flexDirection: 'row',
    width: '60%'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 'auto',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: '#ffbe76',
    zIndex: 10,
    borderWidth: 6,
    borderColor: '#ffd6a9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  count: {
    color: '#fff5ea',
    fontWeight: '700',
    fontSize: 19,
    paddingLeft: 6,
    marginRight: 'auto',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.12)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 6
  }
})
