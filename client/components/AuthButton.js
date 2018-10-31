import React from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import Icon from "react-native-fontawesome-pro"

export default props =>
  <TouchableOpacity
    onPress={props.onPress}
    style={[style.button, props.style, {backgroundColor: props.color}]} >
      <View style={style.inner}>
        <Icon style={style.icon} name={props.icon} color="white" type={props.type} size={30} />
        <Text style={style.title}>{props.title}</Text>
      </View>
  </TouchableOpacity>

const style = StyleSheet.create({
  button: {
    height: 65,
    width: '100%',
    borderRadius: 6,
    elevation: 4,
    marginBottom: '4%'
  },
  inner: {
    height: '100%',
    width: '95%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '-0.7%'
  },
  icon: {
    color: '#fff',
  },
  title: {
    fontSize: 19,
    fontWeight: 'normal',
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '1%'
  }
})
