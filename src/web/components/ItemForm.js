import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import classNames from 'classnames'
import { Field, reduxForm } from 'redux-form'

export const ItemForm = ({actions, item, handleSubmit}) => {
  const deleteItem = (e) => actions.deleteItem(item)
  const unFocusItem = (e) => actions.unFocusItem(item)
  const onSubmit = (item) => actions.saveItem(item)

  const id = item._id

  return (
    <form onSubmit={handleSubmit(onSubmit) } className='form-horizontal'>
      <div className='form-group'>
        <div className='col-xs-offset-9 col-xs-2 col-md-offset-10 col-md-1'>
          <button type='button' id={`delete-${id}`} className='btn btn-link'
            onClick={deleteItem} title='Delete'>
            <span className='glyphicon glyphicon-remove-circle' />
          </button>
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='name' className='col-sm-1 control-label'>Question</label>
        <div className='col-sm-5'>
          <Field id='name' name='name' component='input' type='text' className='form-control' />
        </div>
      </div>
      <div className={classNames({ 'form-group': true, 'has-error': !item.url }) }>
        <label htmlFor='url' className='col-sm-1 control-label'>Url</label>
        <div className='col-sm-5'>
          <Field name='url' component='input' type='text' className='form-control' />
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='selector' className='col-sm-1 control-label'>Selector</label>
        <div className='col-sm-5'>
          <Field name='selector' component='input' type='text' className='form-control' />
        </div>
        <div className='col-sm-5'>
          <a target='new' href='http://webdriver.io/guide/usage/selectors.html'>
            Selector Help
          </a>
        </div>
      </div>
      <div className='form-group'>
        <div className='col-sm-offset-2 col-sm-4'>
          <button id='save' type='submit' className='btn btn-default'>Submit</button>
          <button type='button' id='cancel' className='btn btn-default'
            onClick={unFocusItem}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}

ItemForm.propTypes = {
  item: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
}

export default compose(
  // use different form state for different items
  connect((state, props) => ({ form: props.item._id || 'new-item' })),
  reduxForm({}))(ItemForm)
