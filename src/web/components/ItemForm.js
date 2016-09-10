import React from 'react'

const ItemForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    props.actions.createItem(props.form.item)
  }

  const updateForm = (e) => props.actions.updateForm(
    Object.assign({}, props.form.item, { name: e.target.value })
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <div className='input-group'>
          <input type='text'
            className='form-control'
            id='name'
            placeholder='Add another item...'
            value={props.form.item.name}
            onChange={updateForm}
            />
          <span className='input-group-btn'>
            <button type='submit'
              id='create'
              className='btn btn-default'
              disabled={!props.form.isValid}>
              Create
            </button>
          </span>
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
