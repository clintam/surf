import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

let ItemForm = (props) => {
  const item = props.item

  const deleteItem = (e) => props.actions.deleteItem(item)
  const unFocusItem = (e) => props.actions.unFocusItem(item)
  const onSubmit = (item) => props.actions.saveItem(item)

  const id = item._id


  return (
    <form onSubmit={props.handleSubmit(onSubmit) } className='form-horizontal'>
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
          <Field name='name' component='input' type='text' className='form-control' />
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

ItemForm = reduxForm({
  form: 'item'
})(ItemForm)

ItemForm = connect(
  (state) => ({
  }),
  {},
  (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, { initialValues: ownProps.item })
  }
)(ItemForm)

export default ItemForm
