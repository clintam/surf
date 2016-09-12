import ItemClient from '../common/itemClient'
const client = new ItemClient('items')

export function updateForm(item) {
  return { type: 'UPDATE_FORM', item }
}

export function saveItem(item) {
  return (dispatch) => {
    const createOrUpdate = item._id ? client.update(item) : client.create(item)
    createOrUpdate.then((item) => {
      dispatch({ type: 'SAVED_ITEM', item })
    })
  }
}

export function deleteItem(item) {
  return (dispatch) => {
    client.delete(item)
  }
}

export function loadItems(items) {
  return { type: 'LOAD_ITEMS', items }
}

export function listItems() {
  return (dispatch) => {
    const refresh = () => {
      client.list().then((items) =>
        dispatch(loadItems(items))
      )
    }
    refresh()
    client.openRTM(refresh)
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
