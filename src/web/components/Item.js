import React from 'react'
import {changeColor} from '../../common/itemDomain'

const Item = (props) => {
  const updateColor = (e) => {
    const newItem = Object.assign({}, props.item)
    changeColor(newItem)
    props.updateItem(newItem)
  }
  return (
    <li key={props.item._id} className='list-group-item container'>
      <h4 className='list-group-item-heading'>
        <button type='button' id={`update-${props.item._id}`} className='btn btn-default btn'
          onClick={updateColor} >
          <span className='glyphicon glyphicon-asterisk'
            style={{ color: props.item.color }} />
        </button>
        <span className='name'>{props.item.name}</span>
        <button type='button' id={`delete-${props.item._id}`} className='btn btn-default pull-right'
          onClick={props.deleteItem}>
          <span className='glyphicon glyphicon-trash' />
        </button>
      </h4>
    </li>
  )
}
Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  deleteItem: React.PropTypes.func.isRequired,
  updateItem: React.PropTypes.func.isRequired
}

export default Item
