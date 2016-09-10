import React from 'react'
import {validColors} from '../../common/itemDomain'

const ItemForm = (props) => {
  const item = props.form.item
  const handleSubmit = (e) => {
    e.preventDefault()
    props.actions.saveItem(item)
  }
  const onBlur = (e) => {
    updateForm(e)
    handleSubmit(e)
  }
  const updateForm = (e) => props.actions.updateForm(
    Object.assign({}, item, { name: e.target.value })
  )
  const deleteItem = (e) => props.actions.deleteItem(item)

  const setColor = (c) => (e) => {
    const newItem = Object.assign({}, item, {color: c})
    props.actions.saveItem(newItem)
  }
  const id = item._id

  return (
    <form onSubmit={handleSubmit} className='form-horizontal'>
      <div className='form-group'>
        <div className='col-sm-11'>
          <input type='text'
            className='form-control'
            id='name'
            placeholder='Name...'
            value={item.name}
            onChange={updateForm}
            onBlur={onBlur}
            />
        </div>
        <div className='com-sm-1'>
          <button type='button' id={`delete-${id}`} className='btn btn-lg btn-link pull-right'
            onClick={deleteItem} title='Delete'>
            <span className='glyphicon glyphicon-remove-circle' />
          </button>
        </div>
      </div>
      <div className='form-group'>
        <div className='col-sm-11'>
          <div className='btn-group btn-group-sm'>
            {validColors().map((c, i) =>
              <button type='button' className='btn btn-default'
                disabled={c === item.color}
                style={{ 'background-color': c }}
                key={i} onClick={setColor(c)} >
                <span className='glyphicon glyphicon glyphicon-text-color'
                  />
              </button>
            )}
          </div>
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
