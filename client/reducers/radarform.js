let init = {
  pinPosition: {latitude: 0, longitude: 0},
  radius: 500,
  issuer: '',

  image: '',
  title: '',
  short: '',
  body: '',
  position: '',
  do_notify: true
}

export default (state = init, action) => {
  switch (action.type) {

    case 'CHANGE_RADAR_PIN_POSITION':
      return {...state, pinPosition: action.payload}

    case 'CHANGE_RADAR_FORM_RADIUS':
      return {...state, radius: action.payload}

    case 'SET_RADAR_FORM_ISSUER':
      return {...state, issuer: action.payload}

    case 'SET_RADAR_FORM_ISSUER':
      return {...state, issuer: action.payload}

    case 'SET_RADAR_FORM_TITLE':
      return {...state, title: action.payload}

    case 'SET_RADAR_FORM_SHORT':
      return {...state, short: action.payload}

    case 'SET_RADAR_FORM_BODY':
      return {...state, body: action.payload}

    case 'TOGGLE_RADAR_FORM_DO_NOTIFY':
      return {...state, do_notify: typeof (action.payload) === 'boolean' ? action.payload : !state.show_radar_modal}

    default:
      return state
  }
}
