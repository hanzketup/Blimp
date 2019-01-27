import { Location } from 'expo'
import fetcher from '../helpers/fetcher'
import { toGeoJson, toLatLing } from '../helpers/geoLatLing'

import { max_accepted_accuracy } from '../constants/globals'
import { setDistanceTraveled } from './user'

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

export const logPosition = (position, isInitial, background) => {
  return async dispatch => {
    let response = await fetcher(
      '/api/levels/log_position/',
      'POST',
      {
        position: toGeoJson(position.coords),
        background: background,
        initial: isInitial,
        // metadata
        speed: position.coords.speed,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude
      }
    )

    if (response.successful) {
      setDistanceTraveled(response.json.distance_traveled)
    }
  }
}

export const setUserPosition = position => {
  return async dispatch => {
    // reject mock locations or too low ("shits fucked") accuracy
    if (position.mocked || position.coords.accuracy > max_accepted_accuracy) { return 0 }
    console.log(position)

    // Display a badge for the user if gps accuract is too low
    if (position.coords.accuracy > 30) { dispatch(toggleLowAccuracy(true)) } else { dispatch(toggleLowAccuracy(false)) }

    // Display a badge for the user if the user is moving over max walk/run speed (m/s)
    if (position.coords.speed > 4.5) { dispatch(toggleOverspeed(true)) } else { dispatch(toggleOverspeed(false)) }

    // dispatch the actual map update
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

export const setPollTimestamp = () => {
  let ts = Math.round(new Date().getTime() / 1000)
  return {type: 'SET_LAST_SIG_POLL_TIMESTAMP', payload: ts}
}

export const toggleOverspeed = state => {
  return {type: 'SET_OVERSPEED', payload: state}
}

export const toggleLowAccuracy = state => {
  return {type: 'SET_LOW_ACCURACY', payload: state}
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
