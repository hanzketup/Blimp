let init = {
  app_ready: false,
  show_map_interface: true,
  show_editor: false,
  fonts_ready: false
}

export default (state = init, action) => {
  switch (action.type) {

    case 'APP_READY':
      return {...state, app_ready: true}

    case 'TOGGLE_EDITOR':
      return {...state, show_editor: typeof (action.payload) === 'boolean' ? action.payload : !state.show_editor}

    case 'TOGGLE_MAP_INTERFACE':
      return {...state, show_map_interface: typeof (action.payload) === 'boolean' ? action.payload : !state.show_map_interface}

    case 'FONTS_ARE_READY':
      return {...state, fonts_ready: true}

    default:
      return state
  }
}
