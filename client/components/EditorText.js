import React, { Component } from 'react'
import { TouchableWithoutFeedback, View, TextInput, StyleSheet } from 'react-native'

export default props =>
  <TextInput
    style={style.input}
    underlineColorAndroid={'transparent'}
    textAlignVertical={'top'}
    multiline
    editable
    autoFocus
  />

const style = StyleSheet.create({
  input: {
    width: '100%',
    height: '40%',
    padding: '3%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fafafa',
    fontSize: 19,
    color: '#333',
    marginTop: 'auto'
  }
})
