import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import QueryForm from '../components/QueryForm'

const SentimentPage = ({actions, query}) => {
  return (
    <div className='container'>
      <h3>Give me a phrase, and I will give you its sentiment </h3>
      <QueryForm actions={actions} query={query} />
    </div>
  )
}

SentimentPage.propTypes = {
  actions: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    query: state.query
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
)(SentimentPage)
