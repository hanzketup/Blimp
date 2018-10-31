import React from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { configureFontAwesomePro } from 'react-native-fontawesome-pro'
import reducer from './reducers/index'
import Navigator from './Navigator'

const store = createStore(reducer, applyMiddleware(thunk))
configureFontAwesomePro('solid')

export default () =>
  <SafeAreaView style={styles.container}>
    <Provider store={store}>
      <Navigator />
    </Provider>
  </SafeAreaView>

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
