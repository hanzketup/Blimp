import React, { Component } from "react"
import { View, ScrollView, StyleSheet, Image } from "react-native"
import {DrawerItems, DrawerNavigation} from 'react-navigation'

import Fade from '../components/Fade'

export default props =>
  <View style={{flex: 1}}>
    <View style={style.imgWrap}><Image style={style.img} resizeMode="contain" source={require('../assets/drawerLogo.png')} /></View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </View>



const style = StyleSheet.create({
  imgWrap: {
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffbe76'
  },
  img: {
    width: '70%',
    marginBottom: '-10%',
    marginLeft: '-8%',
  }
})
