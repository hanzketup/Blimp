import fetcher from '../helpers/fetcher'
import { toGeoJson, toLatLing } from '../helpers/geoLatLing'

export const toggleRadarModal = (value) => {
  return {type: 'TOGGLE_RADAR_MODAL', payload: value}
}

export const setTitle = value => {
  return {type: 'SET_RADAR_TITLE', payload: value}
}

export const setBody = value => {
  return {type: 'SET_RADAR_BODY', payload: value}
}
