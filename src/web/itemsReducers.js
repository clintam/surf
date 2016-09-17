import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const handleLoadItems = (state, action) => {
  let items = action.items
  if (state.editItem && !state.editItem._id) {
    items = items.concat(state.editItem)
  }
  return Object.assign({}, state, {
    items: items
  })
}

const items = (state = { items: [] }, action) => {
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
      return Object.assign({}, state, { editItem: null })
    default:
      return state
  }
}

const bots = (state = { bots: [] }, action) => {
  switch (action.type) {
    case 'LOAD_BOTS':
      return Object.assign({}, state, {
        bots: action.bots
      })
    case 'ADD_BOT':
      const newBot = { name: 'SurfBot' }
      return Object.assign({}, state, {
        bots: state.bots.concat(newBot),
        edit: newBot
      })
    case 'FOCUS_BOT':
      return Object.assign({}, state, {
        edit: action.bot
      })
    case 'UNFOCUS_BOT':
      return Object.assign({}, state, { edit: null })
    case 'SAVED_BOT':
      return Object.assign({}, state, { edit: null })

    default:
      return state
  }
}

const rootReducer = combineReducers({
  items,
  bots,
  form: formReducer
})

export default rootReducer
