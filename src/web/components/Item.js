import React from 'react'
import ItemForm from './ItemForm'
import FetchResult from './FetchResult'

const Item = ({item, isEditMode, actions}) => {
  const id = item._id
  const focusItem = (e) => !isEditMode && actions.focusItem(item)

  return (
    <li key={item._id} className='list-group-item container'>
      { isEditMode &&
        <ItemForm item={item} initialValues={item} actions={actions} />
      } {!isEditMode &&
        <div className='list-group-item-heading'>
          <div className='col-sm-1'>
            <button type='button' id={`focus-${id}`} className='btn btn-default'
              onClick={focusItem} >
              <span className='glyphicon glyphicon-edit' />
            </button>
          </div>
          <h4 id={`name-${id}`}>
            {item.name} <small> from </small>
            <small> <a target='new' href={item.url} className='url'>
              {item.url}
            </a>
            </small>
          </h4>
        </div>
      }
      <FetchResult item={item} />
    </li>
  )
}
Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  isEditMode: React.PropTypes.bool.isRequired,
  actions: React.PropTypes.object.isRequired
}

export default Item
