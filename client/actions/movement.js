import { Location } from 'expo'
import fetcher from '../helpers/fetcher'
import { toGeoJson, toLatLing } from '../helpers/geoLatLing'

// Not used right now, kept for potential future use.
export const getUserPosition = () => {
  return async dispatch => {
    let position = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
    position.mocked && dispatch({
      type: 'SET_USER_LOCATION',
      payload: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    })
  }
}

export const logPosition = (position, isInitial) => {
  return async dispatch => {
    await fetcher(
      '/api/levels/log_position/',
      'POST',
      {
        position: toGeoJson(position),
        initial: isInitial
      }
    )
  }
}

export const setUserPosition = position => {
  return async dispatch => {
    if (position.mocked) { return 0 }
    dispatch({
      type: 'SET_USER_POSITION',
      payload: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    })
  }
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

export const getClouds = position => {
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
