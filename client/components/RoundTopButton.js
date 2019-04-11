import React from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'
import Icon from 'react-native-fontawesome-pro'

export default props =>
  <TouchableHighlight
    onPress={props.onPress}
    underlayColor={props.color || '#ffa776'}
    style={[style.button, {backgroundColor: props.color, borderColor: props.borderColor}, props.style]}>
    {props.children}
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
    borderWidth: 5,
    borderColor: '#ffd6a9',
    shadowColor: '#000',
    shadowOffset: {
    	width: 0,
    	height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6
  }
})
