import React from 'react'

const Item = (props) => (
  <li key={props.itemName} className='list-group-item'>
    <h4 className='list-group-item-heading'>
      {props.itemName}
    </h4>
    <button type='button' className='btn btn-default'
      onClick={props.deleteItem}>
      remove
    </button>
  </li>
)
Item.propTypes = {
  itemName: React.PropTypes.string.isRequired,
  deleteItem: React.PropTypes.func.isRequired
}

export default Item
