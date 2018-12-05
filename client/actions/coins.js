import geolib from 'geolib'
import { Audio } from 'expo'

import fetcher from '../helpers/fetcher'
import { toGeoJson, toLatLing } from '../helpers/geoLatLing'

import { coin_pickup_distance } from '../constants/globals'

export const getCoins = (position) => {
  return async dispatch => {
    let response = await fetcher(
      `/api/coins/nearby/`,
      'POST',
      {
        position: toGeoJson(position.coords)
      }
    ).catch(err => null)

    remapped_coins = response.json.map(cn => {
      return {...cn, position: toLatLing(cn.position)}
    })
    dispatch({type: 'ADD_COINS', payload: remapped_coins})
  }
}

export const shouldPickup = (position, coins) => {
  return async dispatch => {
    let close_coins = coins.filter(cn => geolib.getDistanceSimple(cn.position, position.coords) < coin_pickup_distance)

    close_coins.forEach(async cn => {
      let response = await fetcher(
        `/api/coins/${cn.id}/pickup/`,
        'POST'
      ).catch(err => null)

      dispatch({type: 'PICKUP_COIN', payload: cn.id})
      if (response.successful) {
        Audio.Sound.createAsync(require('../assets/sounds/cash.mp3'), { shouldPlay: true })
        dispatch({type: 'APPEND_COINS', payload: cn.reward})
      }
    })
  }
}
