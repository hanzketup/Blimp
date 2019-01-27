let init = {
  editor_mode: 'chat',
  editor_loading: false,
  editor_text: '',

  editor_deal_code: '',
  editor_stars: 5,
  editor_expiry: 259200

}

export default (state = init, action) => {
  switch (action.type) {

    case 'CHANGE_EDITOR_MODE':
      return {...state, editor_mode: action.payload}

    case 'SET_EDITOR_LOADING':
      return {...state, editor_loading: action.payload}

    case 'SET_EDITOR_TEXT':
      return {...state, editor_text: action.payload}

    case 'SET_EDITOR_DEAL_CODE':
      return {...state, editor_deal_code: action.payload}

    case 'SET_EDITOR_STARS':
      return {...state, editor_stars: action.payload}

    case 'SET_EDITOR_COUNTDOWN':
      return {...state, editor_countdown: action.payload}

    default:
      return state
  }
}
