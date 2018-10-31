import React from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'
import Icon from 'react-native-fontawesome-pro'

export default props =>
  <TouchableHighlight
    onPress={props.onPress}
    underlayColor={'#ffa776'}
    style={style.button} >
    <Icon style={style.icon} name={props.icon} color='#fff5ea' type='light' size={26} />
  </TouchableHighlight>

const style = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 55,
    marginBottom: 10,
    borderRadius: 50,
    backgroundColor: '#ffbe76',
    zIndex: 10,
    borderWidth: 6,
    borderColor: '#ffd6a9'
  }
})
