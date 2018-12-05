import fetcher from '../helpers/fetcher'
import { Audio } from 'expo'

export const toggleFeed = (state) => {
  return dispatch => {
    dispatch({type: 'TOGGLE_FEED', payload: state})
  }
}

export const setHighlighted = (id) => {
  return {type: 'SET_HIGHLIGHTED', payload: id}
}

export const setHighlightedAndOpen = (id) => {
  return dispatch => {
    Audio.Sound.createAsync(require('../assets/sounds/plop.mp3'), { shouldPlay: true })
    dispatch({type: 'SET_HIGHLIGHTED', payload: id})
    dispatch({type: 'TOGGLE_FEED', payload: true})
  }
}

export const voteCloud = (me, id) => {
  return async dispatch => {
    fetcher(
      `/api/clouds/${id}/vote/`,
      'POST',
    ).catch(err => null)
    dispatch({type: 'TOGGLE_VOTE', payload: {me: me, id: id}})
  }
}

export const reportCloud = (id) => {
  return async dispatch => {
    fetcher(
      `/api/clouds/${id}/report/`,
      'POST',
    ).catch(err => null)
  }
}
