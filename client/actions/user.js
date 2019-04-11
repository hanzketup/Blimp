import { AsyncStorage, Alert } from 'react-native'
import { Location, Facebook, Google } from 'expo'

import fetcher from '../helpers/fetcher'

export const toggleFollow = () => {
  return {type: 'TOGGLE_USER_FOLLOW'}
}

export const setMe = data => {
  return {type: 'SET_ME', payload: data}
}

export const setDistanceTraveled = value => {
  return {type: 'SET_DISTANCE_TRAVELED', payload: value}
}

export const completeSignup = (username) => {
  return async dispatch => {
    let response = await fetcher(
      '/api/accounts/complete_signup/',
      'POST',
      {
        'username': username
      }
    )
    if (response.successful) {
      dispatch({type: 'SET_USERNAME', payload: username})
      return {continue: true}
    } else {
      Alert.alert(
         `nuh-uh`,
         response.json.non_field_errors[0],
       )
      return {continue: false}
    }
  }
}

export const authWithGoogle = () => {
  return async dispatch => {
    let auth_request = null
    try {
      auth_request = await Google.logInAsync({
        behavior: 'web',
        androidClientId: '140145899902-9qd4cmde6hhdmuk829gndj4eu7i84u7u.apps.googleusercontent.com',
        iosClientId: '140145899902-j1ie0ck7f682d3iqh4g50so7f288dks0.apps.googleusercontent.com',
        androidStandaloneAppClientId: '140145899902-9qd4cmde6hhdmuk829gndj4eu7i84u7u.apps.googleusercontent.com',
        iosStandaloneAppClientId: '140145899902-ogsbi9cq0i0rbqpe3f83bvrbhjja31m4.apps.googleusercontent.com'
      })
    } catch (err) {
      throw new Error('auth_request failed: ' + err)
    }

    if (auth_request.type !== 'success' || !auth_request.idToken) {
      throw new Error('auth_request failed')
    }

    let verify_request = await fetcher(
      '/api/accounts/auth_google/',
      'POST',
      {token: auth_request.idToken},
      {unauthorized: true}
    )

    if (verify_request.successful) {
      // dump token to storage
      await AsyncStorage.setItem('authToken', verify_request.json.token)
      // populate state with auth data TODO
      dispatch({type: 'SET_ME', payload: verify_request.json.account})
      dispatch({type: 'SET_AUTHENTICATED', payload: true})
      return {isNewUser: !verify_request.json.account.username}
    }
  }
}

export const authWithFacebook = () => {
  return async dispatch => {
    let auth_request = await Facebook.logInWithReadPermissionsAsync('257885001592015', {
      permissions: ['public_profile', 'email']
    })

    if (auth_request.type !== 'success') {
      throw new Error('auth_request failed')
    }

    let verify_request = await fetcher(
      '/api/accounts/auth_facebook/',
      'POST',
      {
        token: auth_request.token
      },
      {unauthorized: true}
    )

    if (verify_request.successful) {
      // dump token to storage
      await AsyncStorage.setItem('authToken', verify_request.json.token)
      // populate state with auth data TODO
      dispatch({type: 'SET_ME', payload: verify_request.json.account})
      dispatch({type: 'SET_AUTHENTICATED', payload: true})
      return {isNewUser: !verify_request.json.account.username}
    }
  }
}
