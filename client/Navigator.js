import React from 'react'
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation'
import CustomDrawer from './containers/CustomDrawer'

import Auth from './screens/Auth'
import AuthComplete from './screens/AuthComplete'
import Permissions from './screens/Permissions'

import Map from './screens/Map'
import Store from './screens/Store'
import Editor from './screens/Editor'
import Settings from './screens/Settings'
import RadarModeration from './screens/RadarModeration'

const DrawerNav = createDrawerNavigator({
  Map: {
    screen: Map
  },
  // Store: {
  //  screen: createStackNavigator({Store: {screen: Store}})
  // },
  Settings: {
    screen: createStackNavigator({Settings: {screen: Settings}})
  }
}, {
  initialRouteName: 'Map',
  contentComponent: props => <CustomDrawer {...props} />
})

export default createAppContainer(createSwitchNavigator({
  Main: {
    screen: DrawerNav,
    defaultNavigationOptions: {header: null}
  },
  Auth: {
    screen: Auth
  },
  AuthComplete: {
    screen: AuthComplete
  },
  Permissions: {
    screen: Permissions
  },
  RadarModeration: {
    screen: createStackNavigator({RadarModeration: {screen: RadarModeration}})
  }
}, {
  initialRouteName: 'Main'
})
)
