export function createItem(item) {
  return { type: 'CREATE_ITEM', item }
}

export function deleteItem(item) {
  return { type: 'DELETE_ITEM', item }
}
