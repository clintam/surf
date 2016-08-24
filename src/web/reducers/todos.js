
const initialState = [
  {
    name: 'What a hack'
  }
]

// import ItemClient from '../../client/itemClient'

// const client = new ItemClient('items')



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





export default function todos(state = initialState, action) {
  switch (action.type) {

    default:
      return state
  }
}
