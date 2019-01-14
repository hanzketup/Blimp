import React, {Component} from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from "react-native-fontawesome-pro"

import RadarForm from '../containers/RadarForm'

class RadarModeration extends Component {

  static navigationOptions = ({ navigation }) => {
  return {
    title: 'Create Radar',
    headerLeft: <TouchableOpacity onPress={() => navigation.navigate('Main')} style={{height: '100%', justifyContent: 'center', marginTop: 2, paddingLeft: 23}}>
                  <Icon name="arrow-left" color="#333" type="light" size={26} />
                </TouchableOpacity>,
    }
  }

  
  render () {
    return (
      <RadarForm />
    )
  }

}

export default RadarModeration
