import React, { Component } from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-fontawesome-pro'
import TextTicker from 'react-native-text-ticker'

export default props =>
  <View style={style.wrap}>
    <View>
      {
    props.editable
    ? <TextInput style={style.content} maxLength={20} placeholder={'code'.toUpperCase()} value={props.value} onChangeText={text => props.setValue(text)} editable autoCapitalize='characters' autoCorrect={false} underlineColorAndroid={'transparent'} />
    : <TextTicker duration={props.value.length * 400} marqueeDelay={300} bounce style={style.content}>{props.value.toUpperCase()}</TextTicker>
    }
    </View>
  </View>

const style = StyleSheet.create({
  wrap: {
    maxWidth: 150,
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 4,
    marginTop: 1
  },
  content: {
    color: '#e66767',
    fontSize: 25,
    fontWeight: 'bold',
    padding: 12,
    paddingTop: 0,
    paddingBottom: 0,
    textDecorationLine: 'none',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 3
  }
})
