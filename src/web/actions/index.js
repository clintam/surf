import ItemClient from '../../client/itemClient'
const client = new ItemClient('items')

export function createItem(item) {
  return { type: 'CREATE_ITEM', item }
}

export function deleteItem(item) {
  return { type: 'DELETE_ITEM', item }
}

export function loadItems(items) {
  return { type: 'LOAD_ITEMS', items }
}

export function listItems() {
  return (dispatch) => {
    client.list().then((items) =>
      dispatch(loadItems(items))
    )
  }
}


//   refresh() {
//     client.list().then((items) => {
//       this.setState({ items: items })
//     })
//   }

//   updateName(e) {
//     this.setState({ itemName: e.target.value })
//   }

//   createItem(item) {
//     return client.create(item)
//       .then(this.refresh)
//   }

//   deleteItem(item) {
//     return (e) => {
//       e.preventDefault()
//       client.delete(item).then(this.refresh)
//     }
//   }
