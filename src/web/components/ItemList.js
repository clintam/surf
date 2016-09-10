import React from 'react'
import Item from './Item'

const ItemList = (props) => {
  const deleteItem = (item) => (e) => props.actions.deleteItem(item)
  const updateItem = (item) => props.actions.updateItem(item)

  return (
    <div>
      {props.items.length} items are tracked!!!
      <ul className='list-group'>
        {props.items.map((item, i) => (
          <Item key={i}
            item={item}
            deleteItem={ deleteItem(item) }
            updateItem={ updateItem } />
        )) }
      </ul>
    </div>
  )
}

ItemList.propTypes = {
  items: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
}

export default ItemList
