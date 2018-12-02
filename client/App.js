import React, { Component } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { configureFontAwesomePro } from 'react-native-fontawesome-pro'
import reducer from './reducers/index'
import Navigator from './Navigator'
import { Font } from 'expo'

import NavigationService from './NavigationService'
import Root from './containers/Root'
configureFontAwesomePro('light')

const store = createStore(reducer, applyMiddleware(thunk))

export default () =>
  <Provider store={store}>
    <Root>
      <Navigator ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)} />
    </Root>
  </Provider>
