import React from 'react'
import Item from './Item'

const ItemList = (props) => {
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
            itemForm={props.formProvider(item)}
            actions={props.actions} />
        )) }
      </ul>
      <button type='button' id='create' className='btn btn-link'
        onClick={props.actions.addItem}>
        <span className='glyphicon glyphicon-plus' />
        Add another item
      </button>
    </div>
  )
}

ItemList.propTypes = {
  items: React.PropTypes.array.isRequired,
  formProvider: React.PropTypes.func,
  actions: React.PropTypes.object.isRequired
}

export default ItemList
