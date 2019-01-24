let init = {
  feed_open: false,
  hightlighted_cloud: null,
  clouds: []
}

export default (state = init, action) => {
  switch (action.type) {
    case 'SET_SELECTED_CLOUD':
      return {...state, selected_cloud: action.payload}

    case 'TOGGLE_FEED':
      return {...state, feed_open: typeof (action.payload) === 'boolean' ? action.payload : !state.feed_open}

    case 'ADD_CLOUDS':
      return {...state, clouds: action.payload}

    case 'APPEND_CLOUDS':
      return {...state, clouds: [...state.clouds, ...action.payload]}

    case 'TOGGLE_VOTE':
      let voted_cloud = state.clouds.filter(i => i.id === action.payload.id)[0]
      voted_cloud.votes = voted_cloud.votes.filter(i => i.user === action.payload.me).length > 0
      ? voted_cloud.votes.filter(i => i.user !== action.payload.me)
      : [...voted_cloud.votes, {user: action.payload.me}]
      return {...state, clouds: [...(state.clouds.filter(i => i.id !== action.payload.id)), voted_cloud]}

    case 'SET_HIGHLIGHTED':
      return {...state, hightlighted_cloud: action.payload}

    case 'RESET_HIGHLIGHTED':
      return {...state, hightlighted_cloud: null}

    default:
      return state

  }
}
