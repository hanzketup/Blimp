import React, { Component } from 'react'
import { View, Text, Alert, Image, StyleSheet } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { LinearGradient, Facebook } from 'expo'

import * as userActions from '../actions/user'
import FancyTitle from '../containers/FancyTitle'
import AuthButton from '../components/AuthButton'

class AuthControl extends Component {

  render () {
    return (
      <LinearGradient colors={['#f3a683', '#f39d83']} style={style.container}>

        <View style={style.top}>
          <Image source={require('../assets/blimp.png')} style={{height: '32%', marginBottom: '1%'}} resizeMode={'contain'} />
          <FancyTitle
            title={'Hey!'}
            subTitle={'Sign in with your Google or Facebook account to proceed.'}
            />
        </View>

        <View style={style.buttonWrap}>
          <AuthButton
            onPress={
              () => this.props.actions.authWithGoogle()
              .then(resp => resp.isNewUser ? this.props.navigation.navigate('AuthComplete') : this.props.navigation.navigate('Permissions'))
            }
            style={style.button}
            title={'Sign in with Google'}
            icon={'google'}
            type={'brands'}
            color={'#d85b4b'}
          />
          <AuthButton
            onPress={
              () => this.props.actions.authWithFacebook()
              .then(resp => resp.isNewUser ? this.props.navigation.navigate('AuthComplete') : this.props.navigation.navigate('Permissions'))
            }
            style={style.button}
            title={'Sign in with Facebook'}
            icon={'facebook-f'}
            type={'brands'}
            color={'#3b5998'}
          />
        </View>
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
)(AuthControl)

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    paddingBottom: '5%',
    backgroundColor: '#ffeedb'
  },
  top: {
    width: '75%',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: -20
  },
  buttonWrap: {
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '85%'
  }
})
