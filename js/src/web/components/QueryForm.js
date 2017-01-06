import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import { Field, reduxForm } from 'redux-form'
import classNames from 'classnames'

export const QueryForm = ({actions, query, handleSubmit}) => {
  const onSubmit = (input) => actions.doQuery(input)
  const result = query.result && query.result[0]

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit) } className='form-horizontal'>
        <div className='form-group'>
          <label htmlFor='name' className='col-sm-1 control-label'>Phrase</label>
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
        result &&
        (<div className={classNames({
          'alert': true,
          'alert-success': result === 'positive',
          'alert-warning': result === 'negative'
        })}>
          {result === 'positive' ? 'Seems positive' : 'Seems negative'}
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
  connect((state, props) => ({ form: 'query' })),
  reduxForm({}))(QueryForm)
