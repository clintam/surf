import ItemClient from '../../client/itemClient'
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

