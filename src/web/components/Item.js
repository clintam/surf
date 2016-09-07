import React from 'react'

const Item = (props) => (
  <li key={props.item._id} className='list-group-item container'>
    <h4 className='list-group-item-heading'>
      <span className='name'>{props.item.name}</span>
      <button type='button' id={`delete-${props.item._id}`} className='btn btn-default pull-right'
        onClick={props.deleteItem}>
        <span className='glyphicon glyphicon-trash' />
      </button>
    </h4>
  </li>
)
Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  deleteItem: React.PropTypes.func.isRequired
}

export default Item
