let init = {
  authenticated: false,
  me: {},
  position: {latitude: 0, longitude: 0},
  last_sig_pos: null,
  follow: true
}

export default (state = init, action) => {
  switch (action.type) {

    case 'SET_AUTHENTICATED':
      return {...state, authenticated: action.payload}

    case 'SET_ME':
      return {...state, me: action.payload}

    case 'SET_USER_POSITION':
      return {...state, position: action.payload}

    case 'SET_LAST_SIG_POS':
      return {...state, last_sig_pos: action.payload}

    case 'TOGGLE_USER_FOLLOW':
      return {...state, follow: typeof (action.follow) === 'boolean' ? action.payload : !state.follow}

    default:
      return state
  }
}
