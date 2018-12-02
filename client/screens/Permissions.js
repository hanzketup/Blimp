import React, {Component} from 'react'
import { Permissions, LinearGradient } from 'expo'
import { StyleSheet, View, Image } from 'react-native'

import { required_permissions } from '../constants/globals'
import LargeTitle from '../components/LargeTitle'

class PermissionsScreen extends Component {

  componentDidMount () {
    Permissions.askAsync(...required_permissions)
    .then(result => {
      console.log(result)
      result.status === 'granted' && this.props.navigation.navigate('Main')
    })
  }

  render () {
    return (
      <LinearGradient colors={['#786fa6', '#574b90']} style={style.container}>

        <Image source={require('../assets/permissions.png')} style={{height: '16%', marginBottom: '5%'}} resizeMode={'contain'} />

        <LargeTitle
          title={'Time for some Permissions'}
          subTitle={'Blimp needs access to notifications and location access to make sure everything runs smoothly.'}
        />

        <View style={style.buttonWrap} />
      </LinearGradient>
    )
  }

}

export default PermissionsScreen

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginBottom: '0%'
  }
})
