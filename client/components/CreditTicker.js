import React from 'react'
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native'
import Icon from 'react-native-fontawesome-pro'

export default props =>
  <TouchableHighlight
    onPress={props.onPress}
    underlayColor={'#ffa776'}
    style={style.button} >
    <View style={style.wrapper}>
      <Image style={{height: 26, width: 26, marginRight: 'auto'}} resizeMode='contain' source={require('../assets/icons/coin.png')} />
      <Text style={style.count}>18 320</Text>
    </View>
  </TouchableHighlight>

const style = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '5%',
    left: '2.5%',
    height: 50,
    width: 130,
    borderRadius: 30,
    backgroundColor: '#ffbe76',
    zIndex: 10,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOffset: {width: -1, height: 1},
    shadowRadius: 6,
    borderWidth: 6,
    borderColor: '#ffd6a9'
  },
  wrapper: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  count: {
    height: '100%',
    color: '#fff5ea',
    fontWeight: '700',
    fontSize: 18,
    marginLeft: '6%',
    marginRight: 'auto',
    alignSelf: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.12)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 6
  }
})
