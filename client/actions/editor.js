import { Alert } from 'react-native'
import makeNoise from '../helpers/makeNoise'
import fetcher from '../helpers/fetcher'
import { toGeoJson, toLatLing } from '../helpers/geoLatLing'
import { Audio } from 'expo'

import * as uiActions from './ui'

export const changeEditorMode = (mode) => {
  return {type: 'CHANGE_EDITOR_MODE', payload: mode}
}

export const setEditorText = (text) => {
  return {type: 'SET_EDITOR_TEXT', payload: text}
}

export const setEditorDealCode = (value) => {
  return {type: 'SET_EDITOR_DEAL_CODE', payload: value}
}

export const setEditorStars = (value) => {
  return {type: 'SET_EDITOR_STARS', payload: value}
}

export const setEditorCountDown = (value) => {
  return {type: 'SET_EDITOR_COUNTDOWN', payload: value}
}

export const createCloud = (data) => {
  return async dispatch => {
    // pre-post checks
    dispatch({type: 'SET_EDITOR_LOADING', payload: true})

    if (data.body.length <= 3) {
      Alert.alert(
        'uh-oh',
        `Please write atleast a sentence`,
     )
      dispatch({type: 'SET_EDITOR_LOADING', payload: false})
      return false
    }

    if (data.type === 'deal' && !data.code) {
      Alert.alert(
        'uh-oh',
        `Please provide a code in the dashed field`,
      )
      dispatch({type: 'SET_EDITOR_LOADING', payload: false})
      return false
    }

    // post to the api
    let cloudResponse = await fetcher(
    '/api/clouds/',
    'POST',
      {
        ...data,
        position: toGeoJson(data.position),
        ...(data.type === 'deal' && {code: data.code}),
        ...(data.type === 'review' && {stars: data.stars}),
        ...(data.type === 'countdown' && {expiry: Math.floor(Date.now() / 1000) + data.expiry})
      }
    )

    if (cloudResponse.successful) {
      let remapped_cloud = {...cloudResponse.json, position: toLatLing(cloudResponse.json.position)}

      dispatch({type: 'APPEND_CLOUDS', payload: [remapped_cloud]})
      makeNoise('woo', true)
      // close editor
      dispatch({type: 'TOGGLE_MAP_INTERFACE', payload: true})
      dispatch({type: 'TOGGLE_EDITOR', payload: false})

      // hightlight the new cloud
      dispatch({type: 'TOGGLE_FEED', payload: true})
      dispatch({type: 'SET_HIGHLIGHTED', payload: remapped_cloud.id})
      dispatch({type: 'SET_EDITOR_LOADING', payload: false})

      // Reset the editor when message has been sent.
      dispatch(setEditorText(''))
      dispatch(setEditorDealCode(''))
      dispatch(setEditorStars(5))
    } else {
      dispatch({type: 'SET_EDITOR_LOADING', payload: false})
      Alert.alert(
        `Something went wrong ${cloudResponse.json}`,
     )
    }
  }
}
