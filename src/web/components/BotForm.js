import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import { Field, reduxForm } from 'redux-form'

export const BotForm = ({actions, bot, handleSubmit}) => {
  const deleteBot = (e) => actions.deleteBot(bot)
  const unFocusBot = (e) => actions.unFocusBot(bot)
  const onSubmit = (bot) => actions.saveBot(bot)

  const id = bot._id

  return (
    <form onSubmit={handleSubmit(onSubmit) } className='form-horizontal'>
      <div className='form-group'>
        <div className='col-xs-6 col-md-4'>
          <button id='save' type='submit' className='btn btn-primary'>
            Save
          </button>
          <button type='button' id='cancel' className='btn btn-default'
            onClick={unFocusBot}>
            Cancel
          </button>
        </div>
        <div className='col-xs-offset-4 col-xs-1 col-md-offset-7 col-md-1'>
          <button type='button' id={`delete-${id}`} className='btn btn-default'
            onClick={deleteBot} title='Delete'>
            <span className='glyphicon glyphicon-trash' />
          </button>
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='name' className='col-sm-1 control-label'>Name</label>
        <div className='col-sm-5'>
          <Field id='name' name='name' component='input' type='text' className='form-control' />
        </div>
      </div>
      <div className='form-group'>
        <label htmlFor='token' className='col-sm-1 control-label'>Token</label>
        <div className='col-sm-5'>
          <Field name='token' component='input' type='text' className='form-control' />
        </div>
      </div>
    </form>
  )
}

BotForm.propTypes = {
  bot: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
}

export default compose(
  // use different form state for different items
  connect((state, props) => ({ form: props.bot._id || 'new-bot' })),
  reduxForm({}))(BotForm)
