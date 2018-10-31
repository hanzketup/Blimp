import React, {Component} from "react"
import Expo, { LinearGradient } from 'expo'
import { StyleSheet, View, Image, TextInput, KeyboardAvoidingView } from "react-native"

import { required_permissions } from '../constants/globals'
import LargeTitle from '../components/LargeTitle'
import AuthButton from '../components/AuthButton'

class AuthCompleteScreen extends Component {

  componentDidMount(){
    Expo.Permissions.getAsync(...required_permissions)
  }

  render(){
    return(
      <LinearGradient colors={['#38ada9', '#079992']}>
        <KeyboardAvoidingView style={style.container} keyboardVerticalOffset={136} behavior='padding'>


          <LargeTitle
            title={'Just a few \n more things...'}
            subTitle={''}
          />

          <TextInput
            style={style.input}
            placeholder={'Username'}
            underlineColorAndroid={'transparent'}
            editable={true}
            autoFocus={true}
          />

          <View style={style.buttonWrap}>
            <AuthButton
              onPress={() => this.props.navigation.navigate('Permissions')}
              title={'Looks good!'}
              icon={'check-circle'}
              color={'#3c6382'}
            />
          </View>

          <View style={style.buttonWrap}>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    )
  }

}

export default AuthCompleteScreen

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginBottom: '0%',
  },
  input: {
    height: 65,
    width: '90%',
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    elevation: 2,
    fontSize: 18
  },
  buttonWrap: {
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    marginTop: '6%',
  },
})
