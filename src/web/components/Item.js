import React from 'react'
import {changeColor} from '../../common/itemDomain'
import ItemForm from './ItemForm'
const classNames = require('classnames')

const Item = (props) => {
  const deleteItem = (e) => props.actions.deleteItem(props.item)

  const updateColor = (e) => {
    const newItem = Object.assign({}, props.item)
    changeColor(newItem)
    props.actions.saveItem(newItem)
  }
  const toggleDone = (e) => {
    e.stopPropagation()
    const newItem = Object.assign({}, props.item, { done: !props.item.done })
    props.actions.saveItem(newItem)
  }
  const id = props.item._id
  const isEditMode = !!props.itemForm
  const focusItem = (e) => !isEditMode && props.actions.focusItem(props.item)

  return (
    <li key={props.item._id} className='list-group-item container'
      onClick={focusItem} >
      <div className='col-sm-1'>
        <button type='button' id={`toggle-${id}`} className='btn btn-default'
          onClick={toggleDone} title={props.item.done ? 'Reopen' : 'Done' }>
          <span className={classNames({
            glyphicon: true,
            'glyphicon-unchecked': !props.item.done,
            'glyphicon-ok-sign': props.item.done
          }) } style={{ color: props.item.color }} />
        </button>
      </div>
      <div className='col-sm-6'>
        { isEditMode &&
          <ItemForm form={props.itemForm} actions={props.actions} />
        }
        {!isEditMode &&
          <span className='name'>{props.item.name}</span>
        }
      </div>
      { isEditMode &&
        <div className='col-sm-5'>
          <div className='btn-group pull-right'>
            <button type='button' id={`update-${id}`} className='btn btn-default btn'
              onClick={updateColor} title='Change color'>
              <span className='glyphicon glyphicon-asterisk'
                style={{ color: props.item.color }} />
            </button>
            <button type='button' id={`delete-${id}`} className='btn btn-default pull-right'
              onClick={deleteItem} title='Delete'>
              <span className='glyphicon glyphicon-remove-circle' />
            </button>
          </div>
        </div>
      }
    </li>
  )
}
Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  itemForm: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired
}

export default Item
