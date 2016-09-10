import React from 'react'
import Item from './Item'

const ItemList = (props) => {
  const deleteItem = (item) => (e) => props.actions.deleteItem(item)
  const focusItem = (item) => (e) => props.actions.focusItem(item)
  const doneItemCount = props.items.filter((i) => i.done).length
  return (
    <div>
      {props.items.length > 0 &&
        <span>
          {doneItemCount} of {props.items.length} items are done
        </span>
      }
      <ul className='list-group'>
        {props.items.map((item, i) => (
          <Item key={i}
            item={item}
            focus={focusItem(item) }
            isFocused={props.isFocused(item) }
            deleteItem={ deleteItem(item) }
            updateItem={ props.actions.updateItem } />
        )) }.
      </ul>
    </div>
  )
}

ItemList.propTypes = {
  items: React.PropTypes.array.isRequired,
  isFocused: React.PropTypes.func.isRequired,
  actions: React.PropTypes.object.isRequired
}

export default ItemList
