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
      const itemForForm = action.items.find((i) => i._id === state.formItemId)
      const itemForm = itemForForm && validateForm(itemForForm)
      return Object.assign({}, state, {
        items: action.items,
        form: itemForm
      })
    case 'UPDATE_FORM':
      return Object.assign({}, state, { form: validateForm(action.item) })
    case 'ADD_ITEM':
      const newItem = { name: '', selector: 'h1' }
      return Object.assign({}, state, {
        items: state.items.concat(newItem),
        form: validateForm(newItem),
        formItemId: undefined
      })
    case 'FOCUS_ITEM':
      return Object.assign({}, state, {
        form: validateForm(action.item),
        formItemId: action.item._id
      })
    case 'UNFOCUS_ITEM':
      return Object.assign({}, state, { form: null, formItemId: null })
    case 'SAVED_ITEM':
      return Object.assign({}, state, {formItemId: action.item._id})
    default:
      return state
  }
}

const rootReducer = combineReducers({
  items
})

export default rootReducer
