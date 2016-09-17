import React from 'react'
import BotForm from './BotForm'
import moment from 'moment'

const Bot = ({bot, isEditMode, actions}) => {
  const id = bot._id
  const focusItem = (e) => actions.focusBot(bot)
  return (
    <li key={bot._id} className='list-group-item container'>
      { isEditMode &&
        <BotForm bot={bot} initialValues={bot} actions={actions} />
      } {!isEditMode &&
        <div className='list-group-item-heading'>
          <div className='col-sm-2'>
            <button type='button' id={`focus-${id}`} className='btn btn-default'
              onClick={focusItem} >
              <span className='glyphicon glyphicon-edit' />
            </button>
          </div>
          <h4 id={`name-${id}`}>
            {bot.name}
          </h4>
        </div>
      }
      <div className='col-sm-8'>
        {bot.error &&
          <div className='alert alert-warning'>
            {bot.error}
          </div>
        }
        {!bot.error && !!bot.lastStart &&
          <div className='alert alert-success'>
            Started running as
            <b> {bot.lastStart.identity.name} </b>
            on the
            <b> {bot.lastStart.team_info.name} </b>
            team {moment(bot.lastStart.time).fromNow()}
            <p>
              <a target='new' href={`https://${bot.lastStart.team_info.domain}.slack.com`}>
                Chat now!
              </a>
            </p>
          </div>
      }
      </div>
    </li>
  )
}

Bot.propTypes = {
  bot: React.PropTypes.object.isRequired,
  isEditMode: React.PropTypes.bool.isRequired,
  actions: React.PropTypes.object.isRequired
}

export default Bot
