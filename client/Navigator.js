import React from 'react'
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation'
import CustomDrawer from './components/CustomDrawer'

import Auth from './screens/Auth'
import AuthComplete from './screens/AuthComplete'
import Permissions from './screens/Permissions'

import Map from './screens/Map'
import Store from './screens/Store'
import Editor from './screens/Editor'

const DrawerNav = createDrawerNavigator({
  Map: {
    screen: Map
  },
  Store: {
    screen: createStackNavigator({Store: {screen: Store}})
  },
  Settings: {
    screen: createStackNavigator({Settings: {screen: Store}})
  }
}, {
  initialRouteName: 'Map',
  contentComponent: props => <CustomDrawer {...props} />
})

export default createSwitchNavigator({
  Main: {
    screen: DrawerNav,
    navigationOptions: {header: null}
  },
  Editor: {
    screen: createStackNavigator({Settings: {screen:Editor}})
  },
  Auth: {
    screen: Auth
  },
  AuthComplete: {
    screen: AuthComplete
  },
  Permissions: {
    screen: Permissions
  }
}, {
  initialRouteName: 'Main'
})
