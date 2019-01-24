let init = {
  authenticated: false, // TODO not used
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

    case 'SET_DISTANCE_TRAVELED':
      return {...state, me: {...state.me, distance_traveled: action.payload}}

    case 'SET_USERNAME':
      return {
        ...state,
        me: {...state.me, username: action.payload}
      }

    case 'SET_USER_POSITION':
      return {...state, position: action.payload}

    case 'SET_LAST_SIG_POS':
      return {...state, last_sig_pos: action.payload}

    case 'TOGGLE_USER_FOLLOW':
      return {...state, follow: typeof (action.follow) === 'boolean' ? action.payload : !state.follow}

    case 'APPEND_COINS':
      return {
        ...state,
        me: {...state.me, coins: (state.me.coins + action.payload)}
      }

    default:
      return state
  }
}
