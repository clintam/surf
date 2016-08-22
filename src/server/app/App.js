import React from 'react'
import styles from './App.css'
import ItemClient from '../../client/itemClient'

const client = new ItemClient('items')

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { items: [], itemName: '' }
    this.refresh()
    this.updateName = this.updateName.bind(this) // FIXME ??
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleSubmit(e) {
    e.preventDefault()
    const item = {
      name: this.state.itemName.trim()
    }
    client.create(item).then(this.refresh)
    this.setState({ itemName: '' })
  }

  deleteItem(item) {
    return (e) => {
      e.preventDefault()
      client.delete(item).then(this.refresh)
    }
  }

  render() {
    return (
      <div className={styles.app}>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input type='text'
              className='form-control'
              id='name'
              placeholder='Name'
              value={this.state.itemName}
              onChange={this.updateName}
              />
          </div>
          <button type='submit' className='btn btn-default'>
            Create
          </button>
        </form>
        {this.state.items.length} items are tracked!!!
        <ul className='list-group'>
          {this.state.items.map((item, i) => (
            <li key={item._id} className='list-group-item'>
              <h4 className='list-group-item-heading'>
                <span className='text-muted'>{i + 1}</span> {item.name}
              </h4>
              <button type='button' className='btn btn-default'
                onClick={this.deleteItem(item) }>
                remove
              </button>
            </li>
          )) }
        </ul>
      </div>
    )
  }
}
