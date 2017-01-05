import ItemClient from '../common/apiClient'
const client = new ItemClient('api')

export function saveItem(item) {
  return (dispatch) => {
    const createOrUpdate = item._id ? client.items().update(item) : client.items().create(item)
    createOrUpdate.then((item) => {
      dispatch({ type: 'SAVED_ITEM', item })
    })
  }
}

export function deleteItem(item) {
  return (dispatch) => {
    client.items().delete(item)
  }
}
export function focusItem(item) {
  return { type: 'FOCUS_ITEM', item }
}

export function unFocusItem(item) {
  return { type: 'UNFOCUS_ITEM', item }
}

export function addItem(item) {
  return { type: 'ADD_ITEM', item }
}

export function loadItems(items) {
  return { type: 'LOAD_ITEMS', items }
}

export function saveBot(bot) {
  return (dispatch) => {
    const createOrUpdate = bot._id ? client.bots().update(bot) : client.bots().create(bot)
    createOrUpdate.then(item => {
      dispatch({ type: 'SAVED_BOT', bot })
    })
  }
}

export function deleteBot(bot) {
  return (dispatch) => {
    client.bots().delete(bot)
  }
}

export function loadBots(bots) {
  return { type: 'LOAD_BOTS', bots }
}

export function focusBot(bot) {
  return { type: 'FOCUS_BOT', bot }
}

export function unFocusBot(bot) {
  return { type: 'UNFOCUS_BOT', bot }
}

export function addBot(bot) {
  return { type: 'ADD_BOT', bot }
}

export function doQuery(query) {
  return (dispatch) => {
    dispatch({type: 'QUERY_RESULT', result: undefined})
    client.query().run({inputs: [query.input]})
      .then(r => dispatch({type: 'QUERY_RESULT', result: r}))
  }
}

export function initialize() {
  return (dispatch) => {
    const refresh = () => {
      client.items().list().then((items) =>
        dispatch(loadItems(items))
      )

      client.bots().list().then((bots) =>
        dispatch(loadBots(bots))
      )
    }
    refresh()
    client.openRTM(refresh)
  }
}

