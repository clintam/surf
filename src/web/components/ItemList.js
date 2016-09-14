import React, { PropTypes } from 'react'
import Item from './Item'

const ItemList = ({items, isEditingItem, actions}) => {
  return (
    <div>
      {items.length > 0 &&
        <span>
          {items.length} questions are configured
        </span>
      }
      <ul className='list-group'>
        {items.map((item, i) => (
          <Item key={i}
            item={item}
            isEditMode={isEditingItem(item)}
            actions={actions} />
        )) }
      </ul>
      <button type='button' id='create' className='btn btn-link'
        onClick={actions.addItem}>
        <span className='glyphicon glyphicon-plus' />
        Add another item
      </button>
    </div>
  )
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  isEditingItem: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
}

export default ItemList
