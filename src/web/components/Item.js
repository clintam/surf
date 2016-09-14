import React from 'react'
import ItemForm from './ItemForm'
import moment from 'moment'

const Item = ({item, isEditMode, actions}) => {
  const id = item._id
  const focusItem = (e) => !isEditMode && actions.focusItem(item)
  const lastFetchDate = item.lastFetch && moment(item.lastFetch.date)
  const lastFetchError = item.lastFetch && item.lastFetch.error
  const lastFetchHash = item.lastFetch && item.lastFetch.hash
  const lastFetchSuccess = lastFetchDate && !lastFetchError
  return (
    <li key={item._id} className='list-group-item container'
      onClick={focusItem} >
      { isEditMode &&
        <ItemForm item={item} initialValues={item} actions={actions} />
      } {!isEditMode &&
        <div className='row'>
          <div className='col-sm-2'>
            <span className='glyphicon glyphicon-edit' />
          </div>
          <div id={`name-${id}`} className='col-sm-8'>
            {item.name}
          </div>
          <div className='col-sm-2'>
            <a target='new' href={item.url} className='url'>
              {item.url}
            </a>
          </div>
        </div>
      }
      <div className='row'>
        <div className='col-sm-6'>
          <span>
            {lastFetchDate
              ? `Last updated: ${lastFetchDate.fromNow()}`
              : 'Not yet processed'}
          </span>
          {lastFetchError &&
            <div className='alert alert-warning'>
              {lastFetchError}
            </div>
          }
          {lastFetchSuccess &&
            <div className='well' style={{
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {item.fullText}
            </div>
          }
        </div>
        {lastFetchSuccess &&
          <div className='col-sm-6'>
            <h4> {item.title} </h4>
            <a target='new' href={item.url} className='thumbnail'>
              <img src={`items/${id}/image.png?hash=${lastFetchHash}`}
                style={{
                  width: '200px',
                  height: 'auto'
                }} />
            </a>
          </div>
        }
      </div>
    </li>
  )
}
Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  isEditMode: React.PropTypes.bool.isRequired,
  actions: React.PropTypes.object.isRequired
}

export default Item
