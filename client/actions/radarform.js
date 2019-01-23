import fetcher from '../helpers/fetcher'
import NavigationService from '../NavigationService'
import * as radarActions from './radar'

export const changePinPosition = pos => {
  return {type: 'CHANGE_RADAR_PIN_POSITION', payload: pos}
}

export const changeRadius = value => {
  return {type: 'CHANGE_RADAR_FORM_RADIUS', payload: value}
}

export const setIssuer = value => {
  return {type: 'SET_RADAR_FORM_ISSUER', payload: value}
}

export const setTitle = value => {
  return {type: 'SET_RADAR_FORM_TITLE', payload: value}
}

export const setShort = value => {
  return {type: 'SET_RADAR_FORM_SHORT', payload: value}
}

export const setBody = value => {
  return {type: 'SET_RADAR_FORM_BODY', payload: value}
}

export const toggleDoNotify = value => {
  return {type: 'TOGGLE_RADAR_FORM_DO_NOTIFY', payload: value}
}

export const tryRadar = (title, body) => {
  return dispatch => {
    NavigationService.navigate('Main')
    dispatch(radarActions.toggleRadarModal(true))
    dispatch(radarActions.setTitle(title))
    dispatch(radarActions.setBody(body))
  }
}

export const checkRadarYield = (position, radius) => {
  return async dispatch => {
    let response = await fetcher(
      '/api/business/check/',
      'POST',
      {
        position: toGeoJson(position.coords),
        radius: radius
      }
    )

    dispatch({type: 'SET_RADAR_FORM_YIELD', payload: response.json.value})
  }
}
