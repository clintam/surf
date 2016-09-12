import React from 'react'
import classNames from 'classnames'

const ItemForm = (props) => {
  const item = props.form.item
  const handleSubmit = (e) => {
    e.preventDefault()
    props.actions.saveItem(item)
  }
  const saveOnBlur = (prop) => (e) => {
    updateForm(e)
    handleSubmit(e)
  }
  const updateForm = (prop) => (e) => {
    const update = {}
    update[prop] = e.target.value
    props.actions.updateForm(Object.assign({}, item, update))
  }

  const deleteItem = (e) => props.actions.deleteItem(item)

  const unFocusItem = (e) => props.actions.unFocusItem(item)

  const id = item._id

  return (
    <form onSubmit={handleSubmit} className='form-horizontal'>
      <div className='form-group'>
        <div className='col-xs-1 col-md-1'>
          <button type='button' id='unfocus' className='btn btn-default'
            onClick={unFocusItem} title='Done Editing'>
            <span className='glyphicon glyphicon-ok' />
          </button>
        </div>
        <div className='col-xs-offset-9 col-xs-2 col-md-offset-10 col-md-1'>
          <button type='button' id={`delete-${id}`} className='btn btn-link'
            onClick={deleteItem} title='Delete'>
            <span className='glyphicon glyphicon-remove-circle' />
          </button>
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='name' className='col-sm-1 control-label'>Question</label>
        <div className='col-sm-10'>
          <input type='text'
            className='form-control'
            id='name'
            placeholder='Question'
            value={item.name || ''}
            onChange={updateForm('name') }
            onBlur={saveOnBlur('name') }
            />
        </div>
      </div>
      <div className={classNames({ 'form-group': true, 'has-error': !item.url }) }>
        <label htmlFor='url' className='col-sm-1 control-label'>Url</label>
        <div className='col-sm-5'>
          <input type='text'
            className='form-control'
            id='url'
            placeholder='Web Url to watch'
            value={item.url || ''}
            onChange={updateForm('url') }
            onBlur={saveOnBlur('url') }
            />
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='selector' className='col-sm-1 control-label'>Selector</label>
        <div className='col-sm-5'>
          <input type='text'
            className='form-control'
            id='selector'
            placeholder='CSS selector'
            value={item.selector || ''}
            onChange={updateForm('selector') }
            onBlur={saveOnBlur('selector') }
            />
        </div>
        <div className='col-sm-5'>
          <a target='new' href='http://webdriver.io/guide/usage/selectors.html'>
            Selector Help
          </a>
        </div>
      </div>
    </form>
  )
}

ItemForm.propTypes = {
  form: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
}

export default ItemForm
