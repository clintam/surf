import React, { PropTypes } from 'react'
import BotList from '../components/BotList'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'

const BotPage = (props) => {
  const { bots, isEditing, actions } = props
  return (
    <div className='container'>
      <BotList actions={actions} bots={bots} isEditing={isEditing} />
    </div>
  )
}

BotPage.propTypes = {
  bots: PropTypes.array.isRequired,
  isEditing: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    bots: state.bots.bots,
    isEditing: (bot) => !!state.bots.edit &&
      bot._id === state.bots.edit._id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BotPage)
