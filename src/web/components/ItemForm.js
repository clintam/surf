import React from 'react'

const ItemForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    props.actions.saveItem(props.form.item)
  }
  const onBlur = (e) => {
    updateForm(e)
    handleSubmit(e)
  }
  const updateForm = (e) => props.actions.updateForm(
    Object.assign({}, props.form.item, { name: e.target.value })
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input type='text'
          className='form-control'
          id='name'
          placeholder='Name...'
          value={props.form.item.name}
          onChange={updateForm}
          onBlur={onBlur}
          />
      </div>
    </form>
  )
}

ItemForm.propTypes = {
  form: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
}

export default ItemForm
