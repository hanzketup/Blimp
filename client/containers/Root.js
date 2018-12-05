import React, { Component } from 'react'
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Font, Notifications, Image, AppLoading, Asset } from 'expo'
import { AsyncStorage } from 'react-native'

import NavigationService from '../NavigationService'
import fetcher from '../helpers/fetcher'

import * as cloudConstants from '../constants/clouds'
import { avatarIcons } from '../constants/avatars'

import * as userActions from '../actions/user'
import * as uiActions from '../actions/ui'

class Root extends Component {

  async preflight () {
    // check if user has a authToken stored
    let tokenValue = await AsyncStorage.getItem('authToken')
    if (!tokenValue) { NavigationService.navigate('Auth') }

    // let token = await Notifications.getExpoPushTokenAsync()

    // preload images
    await Asset.loadAsync([
      ...Object.keys(cloudConstants).map(x => cloudConstants[x].icon),
      ...avatarIcons
    ])

    // load in fonts
    await Font.loadAsync({
      'grand-hotel': require('../assets/fonts/GrandHotel-Regular.ttf')
    })
    this.props.actions.fontsAreReady()

    // get user from backend
    let response = await fetcher('/api/accounts/me/')
    .catch(() => null)
    if (response.successful) { this.props.actions.setMe(response.json) }
  }

  render () {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar hidden />

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
