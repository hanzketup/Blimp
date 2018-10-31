import React from 'react'
import { bindActionCreators } from 'redux'
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native'
import Icon from 'react-native-fontawesome-pro'

import PopOutHeader from '../components/PopOutHeader'
import CreateReplyButton from '../components/CreateReplyButton'
import Fade from '../components/Fade'

export default props =>
  <Fade style={style.container} visible={props.open}>
    <ScrollView style={style.scroller} contentContainerStyle={{}}>
      <Icon containerStyle={style.close} onPress={props.close} name='times' color={'#fff'} type={'light'} size={35} />
      <PopOutHeader
        coords={props.coords}
        type={props.type}
        timestamp={props.timestamp}
        visits={props.visits}
        hasNeighbors={props.hasNeighbors}
        prev={props.prev}
        next={props.next}
      />
      {props.children}
      <CreateReplyButton />
    </ScrollView>
  </Fade>

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 100
  },
  scroller: {
    height: '100%',
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center'
  },
  close: {
    position: 'absolute',
    top: 45,
    right: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  }
})
