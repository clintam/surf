import { combineReducers } from 'redux'

const initialState = {
  items: []
}

const validateForm = (item) => {
  return {
    isValid: !!item.name,
    item
  }
}

const items = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_ITEMS':
      return Object.assign({}, state, { items: action.items })
    case 'UPDATE_FORM':
      return Object.assign({}, state, { form: validateForm(action.item) })
    case 'SAVED_ITEM':
      return Object.assign({}, state, { form: null })
    case 'ADD_ITEM':
      const newItem = { name: '' }
      return Object.assign({}, state, {
        items: state.items.concat(newItem),
        form: validateForm(newItem),
        formItem: newItem
      })
    case 'FOCUS_ITEM':
      return Object.assign({}, state, {
        form: validateForm(action.item),
        formItem: action.item
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  items
})

export default rootReducer
