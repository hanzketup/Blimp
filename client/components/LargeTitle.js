import React from "react"
import { StyleSheet, View, Text } from "react-native"
import Icon from "react-native-fontawesome-pro"

export default props =>
  <View style={{marginBottom: '8%'}}>
    <Text style={style.title}>{props.title}</Text>
    <Text style={style.subTitle}>{props.subTitle}</Text>
  </View>

const style = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 3
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 3,
    margin: '2%',
    marginLeft: '4%',
    marginRight: '4%'
  }
})
