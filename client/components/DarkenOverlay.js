import React, { Component } from 'react'
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native'
import { BlurView } from 'expo'

import Fade from '../components/Fade'

export default props =>
  <Fade style={style.container} visible={props.visible}>
    <BlurView tint='dark' intensity={70} style={{flex: 1, width: '100%'}}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={style.inside}>
          {props.children}
        </View>
      </TouchableWithoutFeedback>
    </BlurView>
  </Fade>

const style = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 500,
    elevation: 25
  },
  inside: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
