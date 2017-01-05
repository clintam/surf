import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import { Field, reduxForm } from 'redux-form'

export const QueryForm = ({actions, query, handleSubmit}) => {
  const onSubmit = (input) => actions.doQuery(input)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit) } className='form-horizontal'>
        <div className='form-group'>
          <label htmlFor='name' className='col-sm-1 control-label'>Input</label>
          <div className='col-sm-8'>
            <Field id='input' name='input' component='input' type='text' className='form-control' />
          </div>
          <div className='col-sm-2'>
            <button id='save' type='submit' className='btn btn-primary'>
              Query
            </button>
          </div>
        </div>
      </form>
      {
        query.result &&
        (<div className='alert alert-success'>
          {query.result[0]}
        </div>)
      }
    </div>
  )
}

QueryForm.propTypes = {
  actions: React.PropTypes.object.isRequired,
  query: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
}

export default compose(
  // use different form state for different items
  connect((state, props) => ({ form: 'query' })),
  reduxForm({}))(QueryForm)
