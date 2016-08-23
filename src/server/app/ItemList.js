import React from 'react'
import Item from './Item'

const ItemList = (props) => {
  return (
    <div>
      {props.items.length} items are tracked!!!
      <ul className='list-group'>
        {props.items.map((item, i) => (
          <Item key={i}
            itemName={item.name}
            deleteItem={props.deleteItem(item) } />
        )) }
      </ul>
    </div>
  )
}

ItemList.propTypes = {
  items: React.PropTypes.array.isRequired,
  deleteItem: React.PropTypes.func.isRequired
}

export default ItemList
