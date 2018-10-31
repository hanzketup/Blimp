let init = {
  authenticated: false,
  userId: '',
  username: '',
  position: {latitude: 0, longitude: 0},
  follow: true,

}

export default (state = init, action) => {
  switch (action.type) {

    case "SET_USER_LOCATION":
      return {...state, position: action.payload}

    case "TOGGLE_USER_FOLLOW":
      return {...state, follow: typeof(action.follow) === "boolean" ? action.payload : !state.follow}


    default:
      return state
  }
}
