import React, { Component } from 'react'
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Font, Notifications, Image, AppLoading, Asset, Audio } from 'expo'
import { AsyncStorage } from 'react-native'

import NavigationService from '../NavigationService'
import fetcher from '../helpers/fetcher'
import BackgroundListener from '../containers/BackgroundListener'

import * as cloudConstants from '../constants/clouds'
import { avatarIcons } from '../constants/avatars'

import * as userActions from '../actions/user'
import * as uiActions from '../actions/ui'

class Root extends Component {

  async preflight () {
    // check if user has a authToken stored
    let tokenValue = await AsyncStorage.getItem('authToken')
    if (!tokenValue) { NavigationService.navigate('Auth') }

    // dispatch notification token once
    let hsn_token = await AsyncStorage.getItem('HasSentNotificationToken')
    if (hsn_token !== 'done') {
      let token = await Notifications.getExpoPushTokenAsync()
      await fetcher(
        '/api/accounts/register_notification_token/',
        'POST',
        {notification_token: token}
      )
      await AsyncStorage.setItem('HasSentNotificationToken', 'done')
    }

    // load in fonts
    await Font.loadAsync({
      'grand-hotel': require('../assets/fonts/GrandHotel-Regular.ttf')
    })
    this.props.actions.fontsAreReady()

    // Setup expo sound
    await Audio.setAudioModeAsync({
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: true,
      playsInSilentModeIOS: false,
      allowsRecordingIOS: false,
      playThroughEarpieceAndroid: false
    })

    // get user from backend
    let response = await fetcher('/api/accounts/me/')
    .catch(() => null)
    if (response.successful) { this.props.actions.setMe(response.json) }
  }

  render () {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar hidden />
        <BackgroundListener />

        {!this.props.state.app_ready &&
          <AppLoading
            startAsync={this.preflight.bind(this)}
            onFinish={this.props.actions.appReady}
            onError={console.warn} />
        }

        {this.props.children}
      </SafeAreaView>
    )
  }

}

const mapStateToProps = state => ({
  state: state.ui
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({...uiActions, ...userActions}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)
