import React from 'react'
import ItemList from './ItemList'
import ItemForm from './ItemForm'
import ItemClient from '../../client/itemClient'

const client = new ItemClient('items')

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { items: [], itemName: '' }
    this.refresh()
    this.updateName = this.updateName.bind(this) // FIXME ??
    this.createItem = this.createItem.bind(this)
    this.refresh = this.refresh.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  refresh() {
    client.list().then((items) => {
      this.setState({ items: items })
    })
  }

  updateName(e) {
    this.setState({ itemName: e.target.value })
  }

  createItem(item) {
    return client.create(item)
      .then(this.refresh)
  }

  deleteItem(item) {
    return (e) => {
      e.preventDefault()
      client.delete(item).then(this.refresh)
    }
  }

  render() {
    return (
      <div className='container'>
        <ItemForm createItem={this.createItem} />
        <ItemList items={this.state.items} deleteItem={this.deleteItem} />
      </div>
    )
  }
}
