
const initialState = {
  items: []
}

export default function items(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_ITEMS':
      return Object.assign({}, state, {items: action.items})
    default:
      return state
  }
}
