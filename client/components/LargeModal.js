import React, { Component } from 'react'
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo'

import DarkenOverlay from '../components/DarkenOverlay'

export default props =>
  <DarkenOverlay visible style={style.container}>
    <View style={style.inner}>
      <View style={style.box}>
        {props.children}
      </View>
    </View>
  </DarkenOverlay>

const style = StyleSheet.create({
  inner: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    width: '92%',
    minHeight: '20%',
    backgroundColor: '#fff',
    padding: '4%',
    borderRadius: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16
  }
})
