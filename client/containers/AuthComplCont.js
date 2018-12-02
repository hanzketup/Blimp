import React, {Component} from 'react'
import { Permissions, LinearGradient } from 'expo'
import { StyleSheet, View, Image, Text, TextInput, KeyboardAvoidingView, Linking } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as userActions from '../actions/user'
import { required_permissions } from '../constants/globals'
import FancyTitle from '../containers/FancyTitle'
import AuthButton from '../components/AuthButton'

class AuthComplCon extends Component {
  constructor (props) {
    super(props)
    this.state = { text: '' }
  }

  componentDidMount () {
    Permissions.getAsync(...required_permissions)
  }

  render () {
    return (
      <LinearGradient colors={['#38ada9', '#079992']}>
        <KeyboardAvoidingView style={style.container} behavior='padding'>

          <FancyTitle
            title={'Awesome!'}
            subTitle={'Its time to name yourself. Keep it clean, friendly and under 40 charachters.'}
          />

          <TextInput
            style={style.input}
            placeholder={'Username'}
            underlineColorAndroid={'transparent'}
            onChangeText={(text) => this.setState({text})}
            editable
            autoFocus
          />

          <Text style={style.legal}>
            By clicking the button below you confirm that you have read and agree to our
            <Text onPress={() => Linking.openURL('http://getblimp.co/terms-of-service/')} style={style.link}> terms of service </Text>
            and
            <Text onPress={() => Linking.openURL('https://getblimp.co/privacy-policy/')} style={style.link}> privacy policy</Text>
            . You also agree to follow our
            <Text onPress={() => Linking.openURL('https://getblimp.co/c-o-c/')} style={style.link}> community rules </Text>.
          </Text>

          <View style={style.buttonWrap}>
            <AuthButton
              onPress={
                () => this.props.actions.completeSignup(this.state.text)
                .then(resp => resp.continue && this.props.navigation.navigate('Permissions'))
              }
              title={'Looks good!'}
              icon={'check-circle'}
              color={'#3c6382'}
            />
          </View>

          <View style={style.buttonWrap} />
        </KeyboardAvoidingView>
      </LinearGradient>
    )
  }

}

const mapStateToProps = state => ({
  state: state.user
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...userActions}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthComplCon)

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginBottom: '0%'
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
  legal: {
    width: '85%',
    marginTop: '6%',
    marginBottom: '1%',
    fontSize: 14,
    color: '#fff'
  },
  link: {
    color: '#eee',
    textDecorationLine: 'underline'
  },
  buttonWrap: {
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    marginTop: '6%',
    marginBottom: 0
  }
})
