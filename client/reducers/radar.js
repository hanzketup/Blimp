let init = {
  show_radar_modal: false,
  show_radar_directions: false,

  image: '',
  title: '',
  body: '',
  position: ''

}

export default (state = init, action) => {
  switch (action.type) {

    case 'TOGGLE_RADAR_MODAL':
      return {...state, show_radar_modal: typeof (action.payload) === 'boolean' ? action.payload : !state.show_radar_modal}

    case 'SET_RADAR_TITLE':
      return {...state, title: action.payload}

    case 'SET_RADAR_BODY':
      return {...state, body: action.payload}

    default:
      return state
  }
}
