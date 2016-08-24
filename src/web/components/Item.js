import React from 'react'

const Item = (props) => (
  <li key={props.itemName} className='list-group-item container'>
    <h4 className='list-group-item-heading'>{props.itemName}
      <button type='button' className='btn btn-default pull-right'
        onClick={props.deleteItem}>
        <span className='glyphicon glyphicon-trash' />
      </button>
    </h4>
  </li>
)
Item.propTypes = {
  itemName: React.PropTypes.string.isRequired,
  deleteItem: React.PropTypes.func.isRequired
}

export default Item
