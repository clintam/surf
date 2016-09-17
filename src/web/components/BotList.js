import React, { PropTypes } from 'react'
import Bot from './Bot'

const BotList = ({bots, isEditing, actions}) => {
  return (
    <div>
      {bots.length > 0 &&
        <span>
          {bots.length} bots {bots.length === 1 ? 'is' : 'are'} configured
        </span>
      }
      <ul className='list-group'>
        {bots.map((bot, i) => (
          <Bot key={i}
            bot={bot}
            isEditMode={isEditing(bot) }
            actions={actions} />
        )) }
      </ul>
      <button type='button' id='create' className='btn btn-link'
        onClick={actions.addBot}>
        <span className='glyphicon glyphicon-plus' />
        Add another bot
      </button>
    </div>
  )
}

BotList.propTypes = {
  bots: PropTypes.array.isRequired,
  isEditing: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
}

export default BotList
