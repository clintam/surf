import React from 'react'
import ItemForm from './ItemForm'
import classNames from 'classnames'
import moment from 'moment'

const Item = (props) => {
  const toggleDone = (e) => {
    e.stopPropagation()
    const newItem = Object.assign({}, props.item, { done: !props.item.done })
    props.actions.saveItem(newItem)
  }
  const id = props.item._id
  const isEditMode = !!props.itemForm
  const focusItem = (e) => !isEditMode && props.actions.focusItem(props.item)
  const lastFetchDate = props.item.lastFetch && moment(props.item.lastFetch.date)
  const lastFetchError = props.item.lastFetch && props.item.lastFetch.error

  return (
    <li key={props.item._id} className='list-group-item container'
      onClick={focusItem} >
      <div className='row'>
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

        { isEditMode &&
          <div className='col-sm-11'>
            <ItemForm form={props.itemForm} actions={props.actions} />
          </div>
        } {!isEditMode &&
          <div id={`name-${id}`} className='col-sm-10'>
            {props.item.name}
          </div>
        } {!isEditMode &&
          <div className='col-sm-2'>
            <a target='new' href={props.item.url} className='url'>
              {props.item.url}
            </a>
          </div>
        }
      </div>
      <div className='row' style={{
        maxHeight: '500px'
      }}>
        <div className='col-sm-6'>
          <span>
            {lastFetchDate
              ? `Last updated: ${lastFetchDate.fromNow()}`
              : 'Not yet updated'}
          </span>
          {lastFetchError &&
            <div className='alert alert-warning'>
              {lastFetchError}
            </div>
          }
          {lastFetchDate &&
            <div className='well'>
              {props.item.fullText}
            </div>
          }
        </div>
        { lastFetchDate &&
          <div className='col-sm-6'>
            <h4> {props.item.title} </h4>
            {/* props.item.fullText*/}
            <a target='new' href={props.item.url} className='thumbnail'>
              <img src={`items/${id}/image.png?random=${moment().valueOf()}`}
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
  itemForm: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired
}

export default Item
