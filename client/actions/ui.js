
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

export const setWelcomeActive = (state) => {
  console.log('welocme active: ' + state)
  return {type: 'SET_WELCOME_ACTIVE', payload: state}
}

export const setWelcomeStep = (step) => {
  console.log('step: ' + step)
  return {type: 'SET_WELCOME_STEP', payload: step}
}
