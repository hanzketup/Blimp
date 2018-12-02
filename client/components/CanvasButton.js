import React from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'
import Icon from 'react-native-fontawesome-pro'

export default props =>
  <TouchableHighlight
    onPress={props.onPress}
    underlayColor={'#ffa776'}
    style={[style.button, (props.placement === 'left' ? style.left : style.right)]}>
    <Icon style={style.icon} name={props.icon} color='#fff5ea' type='light' size={35} />
  </TouchableHighlight>

const style = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -2,
    height: 75,
    width: 75,
    backgroundColor: '#ffbe76',
    zIndex: 50,
    borderWidth: 3,
    borderColor: '#ffd6a9'
  },
  left: {
    left: -4,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  right: {
    right: -4,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30
  }
})
