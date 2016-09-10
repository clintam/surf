import ItemClient from '../../common/itemClient'
const client = new ItemClient('items')

export function updateForm(item) {
  return { type: 'UPDATE_FORM', item }
}

export function createItem(item) {
  return (dispatch) => {
    client.create(item)
      .then(() => {
        dispatch({ type: 'CREATED_ITEM' })
      })
  }
}

export function updateItem(item) {
  return (dispatch) => {
    client.update(item)
      .then(() => {
        dispatch({ type: 'UPDATED_ITEM' })
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
