import React from 'react'
import ItemForm from './ItemForm'
import classNames from 'classnames'

const Item = (props) => {
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
      <div className='col-sm-11'>
        { isEditMode &&
          <ItemForm form={props.itemForm} actions={props.actions} />
        }
        {!isEditMode &&
          <span className='name'>
            {props.item.name}
          </span>
        }
      </div>
    </li>
  )
}
Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  itemForm: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired
}

export default Item
