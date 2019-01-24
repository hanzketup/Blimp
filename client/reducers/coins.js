let init = {
  coins: []
}

export default (state = init, action) => {
  switch (action.type) {

    case 'ADD_COINS':
      let keys = [...state.coins.map(i => i.id)]
      let updated_coins = [...state.coins, ...action.payload.filter(i => !keys.includes(i.id))]
      return {...state, coins: updated_coins}

    case 'PICKUP_COIN':
      return {...state, coins: state.coins.filter(i => i.id !== action.payload)}

    default:
      return state

  }
}
