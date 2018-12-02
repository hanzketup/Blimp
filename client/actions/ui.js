
export const appReady = () => {
  return {type: 'APP_READY'}
}

export const toggleEditor = (state) => {
  return dispatch => {
    dispatch({type: 'TOGGLE_MAP_INTERFACE', payload: !state})
    dispatch({type: 'TOGGLE_EDITOR', payload: state})
  }
}

export const fontsAreReady = () => {
  return {type: 'FONTS_ARE_READY'}
}
