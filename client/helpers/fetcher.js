import { AsyncStorage, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'

import NavigationService from '../NavigationService'
import { base_url } from '../constants/globals'

// Helper function to handle exceptions
// and include the users auth token
// TODO send accept-langugage header
// unauthorized should be passed in on auth functions to prevent sending expired auth tokens
export default async (slug, method = 'GET', body = null, options = {}) => {
  defaults = { unauthorized: false}
  const settings = Object.assign(defaults, options)

  const token = await AsyncStorage.getItem('authToken')
  let jsonBody = (method !== 'GET') ? JSON.stringify(body) : null

  let response = await fetch((base_url + slug), {
    method: method,
    headers: {
      'Authorization': ((token && !settings.unauthorized) && `Token ${token}`),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: jsonBody
  })

  console.log(response)
  // auth token rejected / not provided, redirect back to auth page
  if (response.status === 401) { NavigationService.navigate('Auth') }
  // handles client-server connection error
  if (response.status === 500) {
    console.log(await response.text())
    Alert.alert('Server error', 'Please try again later')
  }

  return {
    successful: response.ok,
    json: await response.json()
  }
}
