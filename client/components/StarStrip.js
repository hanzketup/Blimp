import React, { Component } from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-fontawesome-pro'

export default props =>
  <View style={style.wrap}>
    <Icon style={style.icon} name='star' onPress={() => props.editable && props.setValue(1)} color={props.color || '#f5cd79'} type={props.value >= 1 ? 'solid' : 'light'} size={props.editable ? 35 : 25} />
    <Icon style={style.icon} name='star' onPress={() => props.editable && props.setValue(2)} color={props.color || '#f5cd79'} type={props.value >= 2 ? 'solid' : 'light'} size={props.editable ? 35 : 25} />
    <Icon style={style.icon} name='star' onPress={() => props.editable && props.setValue(3)} color={props.color || '#f5cd79'} type={props.value >= 3 ? 'solid' : 'light'} size={props.editable ? 35 : 25} />
    <Icon style={style.icon} name='star' onPress={() => props.editable && props.setValue(4)} color={props.color || '#f5cd79'} type={props.value >= 4 ? 'solid' : 'light'} size={props.editable ? 35 : 25} />
    <Icon style={style.icon} name='star' onPress={() => props.editable && props.setValue(5)} color={props.color || '#f5cd79'} type={props.value >= 5 ? 'solid' : 'light'} size={props.editable ? 35 : 25} />
  </View>

const style = StyleSheet.create({
  wrap: {
    flexDirection: 'row'
  }
})
