import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-fontawesome-pro'

export default props =>
  <TouchableOpacity onPress={props.onPress} activeOpacity={0.5} style={[
    style.round,
    {
      backgroundColor: props.color,
      borderColor: (props.selected ? '#fafafa' : props.color)
    }
  ]}>

    <Icon style={style.icon} name={props.icon} color='#fff5ea' type='regular' size={25} />

  </TouchableOpacity>

const style = StyleSheet.create({
  round: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    elevation: 10
  }
})
