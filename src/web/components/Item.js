import React from 'react'
import {changeColor} from '../../common/itemDomain'
const classNames = require('classnames')

const Item = (props) => {
  const updateColor = (e) => {
    const newItem = Object.assign({}, props.item)
    changeColor(newItem)
    props.updateItem(newItem)
  }
  const toggleDone = (e) => {
    const newItem = Object.assign({}, props.item, {done: !props.item.done})
    props.updateItem(newItem)
  }
  const id = props.item._id
  return (
    <li key={props.item._id} className={classNames({
      'list-group-item': true,
      container: true,
      active: props.isFocused
    })}
      onClick={props.focus} >
      <div className='col-sm-1'>
        <button type='button' id={`toggle-${id}`} className='btn btn-default'
          onClick={toggleDone} title={props.item.done ? 'Reopen' : 'Done' }>
          <span className={classNames({
            glyphicon: true,
            'glyphicon-ok': !props.item.done,
            'glyphicon-repeat': props.item.done
          })} style={{ color: props.item.color }} />
        </button>
      </div>
      <div className='col-sm-6'>
        <span className='name'>{props.item.name}</span>
      </div>
      { props.isFocused &&
        <div className='col-sm-5'>
          <div className='btn-group pull-right'>
            <button type='button' id={`update-${id}`} className='btn btn-default btn'
              onClick={updateColor} title='Change color'>
              <span className='glyphicon glyphicon-asterisk'
                style={{ color: props.item.color }} />
            </button>
            <button type='button' id={`delete-${id}`} className='btn btn-default pull-right'
              onClick={props.deleteItem} title='Delete'>
              <span className='glyphicon glyphicon-trash' />
            </button>
          </div>
        </div>
      }
    </li>
  )
}
Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  focus: React.PropTypes.func.isRequired,
  isFocused: React.PropTypes.bool.isRequired,
  deleteItem: React.PropTypes.func.isRequired,
  updateItem: React.PropTypes.func.isRequired
}

export default Item
