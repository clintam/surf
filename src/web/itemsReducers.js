import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const initialState = {
  items: []
}

const handleLoadItems = (state, action) => {
  let items = action.items
  if (state.editItem && !state.editItem._id) {
    items = items.concat(state.editItem)
  }
  return Object.assign({}, state, {
    items: items
  })
}

const items = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_ITEMS':
      return handleLoadItems(state, action)
    case 'ADD_ITEM':
      const newItem = { name: '', selector: 'h1' }
      return Object.assign({}, state, {
        items: state.items.concat(newItem),
        editItem: newItem
      })
    case 'FOCUS_ITEM':
      return Object.assign({}, state, {
        editItem: action.item
      })
    case 'UNFOCUS_ITEM':
      return Object.assign({}, state, { editItem: null })
    case 'SAVED_ITEM':
      return Object.assign({}, state, { editItem: null, formItemId: action.item._id })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  items,
  form: formReducer
})

export default rootReducer
