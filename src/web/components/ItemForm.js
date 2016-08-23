import React from 'react'

const ItemForm = (props) => {
  let input // Better way for binding hack?
  const bindInput = (n) => { input = n }
  const handleSubmit = (e) => {
    e.preventDefault()
    const item = {
      name: input.value.trim()
    }
    props.createItem(item)
      .then(() => { input.value = '' })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='name'>Name</label>
        <input type='text'
          className='form-control'
          id='name'
          placeholder='Name'
          ref={bindInput}
          />
      </div>
      <button type='submit' className='btn btn-default'>
        Create
      </button>
    </form>
  )
}

ItemForm.propTypes = {
  createItem: React.PropTypes.func.isRequired
}

export default ItemForm
