let init = {
  polling_timestamp: null

}

export default (state = init, action) => {
  switch (action.type) {

    case 'SET_LAST_SIG_POLL_TIMESTAMP':
      return {...state, polling_timestamp: action.payload}

    default:
      return state
  }
}
