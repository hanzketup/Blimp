import React from "react"
import { bindActionCreators } from "redux"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import Icon from "react-native-fontawesome-pro"

export default props =>
  <TouchableOpacity onPress={props.onPress} style={style.container}>
    <Icon containerStyle={style.icon} name="plus" color={"rgba(255, 255, 255, 0.8)"} type={"regular"} size={26} />
    <Text style={style.title}>Create a reply...</Text>
  </TouchableOpacity>

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '92%',
    marginBottom: 12,
    backgroundColor: '#778beb',
    borderRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  icon: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})
