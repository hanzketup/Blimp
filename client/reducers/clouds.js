let init = {
  popout_open: false,
  selected_cloud: 1,
  selected_has_neighbors: false,
  clouds_in_proximity: [],
  clouds: [
    {
      id: 1,
      type: 'msg',
      visits: 235,
      timestamp: 1540290530,
      coords: {
        latitude: 58.393027,
        longitude: 15.656470
      },
      posts: [

        {
          id: 23,
          user: { id: 3, name: 'Steffe', avatar: 3 },
          points: 3,
          body: 'Asså vem gillar ens messör? Så jävla äkligt!',
          timestamp: 1540290530
        },

        {
          id: 24,
          user: { id: 3, name: 'Hasse', avatar: 3 },
          points: 3,
          body: 'Asså vem gillar ens messör? Så jävla äkligt!',
          timestamp: 1540290530
        }
      ]
    },

    {
      id: 2,
      type: 'warn',
      visits: 235,
      timestamp: 1540290530,
      coords: {
        latitude: 58.393007,
        longitude: 15.656400
      },
      posts: [

        {
          id: 23,
          user: { id: 3, name: 'Steffe', avatar: 3 },
          points: 3,
          body: 'Asså vem gillar ens messör? Så jävla äkligt!',
          timestamp: 1540290530
        },

        {
          id: 24,
          user: { id: 3, name: 'Hasse', avatar: 3 },
          points: 3,
          body: 'Asså vem gillar ens messör? Så jävla äkligt!',
          timestamp: 1540290530
        }
      ]
    }

  ]
}

export default (state = init, action) => {
  switch (action.type) {
    case 'SET_SELECTED_CLOUD':
      return {...state, selected_cloud: action.payload}

    case 'TOGGLE_POPOUT':
      return {...state, popout_open: typeof (action.payload) === 'boolean' ? action.payload : !state.popout_open}

    case 'SET_SELECTED_CLOUD_AND_POPOUT':
      return {...state, popout_open: true, selected_cloud: action.payload}

    default:
      return state

  }
}
