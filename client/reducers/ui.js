let init = {
  show_new_dialog: false,
  show_map_interface: true
}

export default (state = init, action) => {
  switch (action.type) {

    case "TOGGLE_NEW_DIALOG":
      return {...state, show_new_dialog: typeof(action.payload) === "boolean" ? action.payload : !state.show_new_dialog}

    case "TOGGLE_MAP_INTERFACE":
      return {...state, show_map_interface: typeof(action.payload) === "boolean" ? action.payload : !state.show_map_interface}


    default:
      return state
  }
}
