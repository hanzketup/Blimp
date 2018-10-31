import React, { Component } from 'react'
import { TouchableHighlight, View, StyleSheet } from 'react-native'
import Icon from 'react-native-fontawesome-pro'

export default props =>
  <View style={style.container}>

    <TouchableHighlight style={style.item}>
      <Icon name='bomb' color='#f3a683' type='light' size={22} />
    </TouchableHighlight>

    <TouchableHighlight style={[style.item, style.lastItem]}>
      <Icon name='camera-alt' color='#f3a683' type='light' size={28} />
    </TouchableHighlight>

  </View>

const style = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    marginBottom: '8%'
  },
  item: {
    paddingLeft: '10%',
    paddingRight: '10%',
    borderColor: '#f3a683',
    borderRightWidth: 1
  },
  lastItem: {
    width: '50%',
    borderRightWidth: 0
  }
})
