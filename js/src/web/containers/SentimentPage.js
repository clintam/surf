import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import {Jumbotron} from 'react-bootstrap'
import QueryForm from '../components/QueryForm'

const SentimentPage = ({actions, query}) => {
  return (
    <div className='container'>
      <Jumbotron>
        <h1>I'm running some Tensorflow ML to classify the sites we have configured</h1>
        <p>Type a phrase, and I will attempt to predict the site!</p>
      </Jumbotron>
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
