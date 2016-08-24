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
        <label htmlFor='name'>Name</label>
        <input type='text'
          className='form-control'
          id='name'
          placeholder='Name'
          value={props.form.item.name}
          onChange={updateForm}
          />
      </div>
      <button type='submit'
        className='btn btn-default'
        disabled={!props.form.isValid}>
        Create
      </button>
    </form>
  )
}

ItemForm.propTypes = {
  form: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
}

export default ItemForm
