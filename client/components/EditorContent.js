import React, { Component } from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'

export default props =>
  <View style={style.wrap}>

    <TextInput
      style={style.input}
      underlineColorAndroid={'transparent'}
      textAlignVertical={'top'}
      maxLength={200}
      onChangeText={text => props.setText(text)}
      value={props.text}
      multiline editable autoFocus />
    <Text style={[style.count, {color: (props.text.length > 180 ? '#e66767' : 'rgba(0, 0, 0, 0.4)')}]}>{props.text.length}/200</Text>
    <View style={style.payloadWrap}>
      <Text style={style.payloadTitle}>{props.payloadString}</Text>
      {props.children}
    </View>

  </View>

const style = StyleSheet.create({
  wrap: {
    width: '100%',
    height: '30%',
    borderRadius: 6,
    padding: '3%',
    paddingBottom: '1%',
    backgroundColor: '#fafafa',
    elevation: 10
  },
  input: {
    flex: 1,
    width: '100%',
    fontSize: 19,
    color: '#333'
  },
  count: {
    fontSize: 11,
    position: 'absolute',
    top: 3,
    right: 8
  },
  payloadTitle: {
    fontSize: 11,
    color: 'rgba(0, 0, 0, 0.4)',
    textAlign: 'center',
    marginBottom: 1
  },
  payloadWrap: {
    alignSelf: 'center',
    paddingTop: '3%'
  }
})
