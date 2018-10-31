let init = {
  mode: '',
  char_count: 0
}

export default (state = init, action) => {
  switch (action.type) {

    case "CHANGE_EDITOR_MODE":
      return {...state, mode: action.payload}

    case "UPDATE_EDITOR_CHAR_COUNT":
      return {...state, char_count: action.payload}

    default:
      return state
  }
}
