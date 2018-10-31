
export const togglePopout = (state) => {
  return dispatch => {
    dispatch({type: 'TOGGLE_MAP_INTERFACE', payload: !state})
    dispatch({type: 'TOGGLE_POPOUT', payload: state})
  }
}

export const setSelectedCloud = (id) => {
  return {type: 'SET_SELECTED_BALLOON', payload: id}
}

export const setSelectedCloudAndPopout = (id) => {
  return dispatch => {
    dispatch({type: 'SET_SELECTED_CLOUD', payload: id})
    dispatch({type: 'TOGGLE_POPOUT', payload: true})
    dispatch({type: 'TOGGLE_MAP_INTERFACE'})
  }
}

export const reportCloudPost = (id) => {
  return dispatch => {
    console.log(id)
  }
}
