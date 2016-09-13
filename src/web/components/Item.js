import React from 'react'
import ItemForm from './ItemForm'
import { connect } from 'react-redux'
import moment from 'moment'

let Item = (props) => {
  const id = props.item._id
  const isEditMode = props.isEditMode
  const focusItem = (e) => !isEditMode && props.actions.focusItem(props.item)
  const lastFetchDate = props.item.lastFetch && moment(props.item.lastFetch.date)
  const lastFetchError = props.item.lastFetch && props.item.lastFetch.error
  const lastFetchHash = props.item.lastFetch && props.item.lastFetch.hash
  const lastFetchSuccess = lastFetchDate && !lastFetchError
  return (
    <li key={props.item._id} className='list-group-item container'
      onClick={focusItem} >
      <div className='row'>
        { !isEditMode &&
          <div className='col-sm-2'>
            <span className='glyphicon glyphicon-edit' />
          </div>
        }
        { isEditMode &&
          <div className='col-sm-11'>
            <ItemForm item={props.item} actions={props.actions} />
          </div>
        } {!isEditMode &&
          <div id={`name-${id}`} className='col-sm-8'>
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
              : 'Not yet processed'}
          </span>
          {lastFetchError &&
            <div className='alert alert-warning'>
              {lastFetchError}
            </div>
          }
          {lastFetchSuccess &&
            <div className='well'>
              {props.item.fullText}
            </div>
          }
        </div>
        {lastFetchSuccess &&
          <div className='col-sm-6'>
            <h4> {props.item.title} </h4>
            {/* props.item.fullText*/}
            <a target='new' href={props.item.url} className='thumbnail'>
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

Item = connect(
  (state) => ({
    editItem: state.items.editItem
  }),
  {},
  (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, 
    {isEditMode: ownProps.item === stateProps.editItem})
  }
)(Item)

export default Item
