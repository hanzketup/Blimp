import { Location } from 'expo'
import fetcher from '../helpers/fetcher'
import { toGeoJson, toLatLing } from '../helpers/geoLatLing'

export const getUserPosition = () => {
  console.log('## GET USER LOCATION ##')
  return async dispatch => {
    let position = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
    !position.mocked && dispatch({
      type: 'SET_USER_LOCATION',
      payload: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    })
  }
}

export const setUserPosition = position => {
  console.log('## SETTING USER LOCATION ##')
  return (!position.mocked && {
    type: 'SET_USER_POSITION',
    payload: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
  })
}

export const setLastSigPos = position => {
  return (!position.mocked && {
    type: 'SET_LAST_SIG_POS',
    payload: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
  })
}

export const sigPoll = position => {
  return async dispatch => {
    let clouds = await fetcher(
      '/api/clouds/nearby/',
      'POST',
      {position: toGeoJson(position.coords)}
    )

    if (clouds.successful) {
      let remapped_clouds = clouds.json.map(cld => {
        return {...cld, position: toLatLing(cld.position)}
      })

      dispatch({type: 'ADD_CLOUDS', payload: remapped_clouds})
    }
  }
}
