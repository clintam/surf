import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const crudReducer = (name, newItem) => {
  const pluralName = name + 's'
  const capsName = name.toUpperCase()
  const capsPluralName = pluralName.toUpperCase()
  const initialState = {}
  initialState[pluralName] = []
  return (state = initialState, action) => {
    switch (action.type) {
      case `LOAD_${capsPluralName}`:
        let items = action[pluralName]
        if (state.edit && !state.edit._id) {
          items = items.concat(state.edit)
        }
        const loadChange = {}
        loadChange[pluralName] = items
        return Object.assign({}, state, loadChange)
      case `ADD_${capsName}`:
        const change = {
          edit: newItem
        }
        change[pluralName] = state[pluralName].concat(newItem)
        return Object.assign({}, state, change)
      case `FOCUS_${capsName}`:
        return Object.assign({}, state, {
          edit: action[name]
        })
      case `UNFOCUS_${capsName}`:
        return Object.assign({}, state, { edit: null })
      case `SAVED_${capsName}`:
        return Object.assign({}, state, { edit: null })
      default:
        return state
    }
  }
}

const queryReducer = (state = {}, action) => {
  switch (action.type) {
    case 'QUERY_RESULT':
      return Object.assign({}, state, {result: action.result})
    default:
      return state
  }
}

const items = crudReducer('item', { name: '', selector: 'h1' })
const bots = crudReducer('bot', { name: 'SurfBot' })

const rootReducer = combineReducers({
  items,
  bots,
  query: queryReducer,
  form: formReducer
})

export default rootReducer
