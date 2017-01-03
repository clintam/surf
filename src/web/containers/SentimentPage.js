import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import {Jumbotron} from 'react-bootstrap'

const SentimentPage = () => {
  return (
    <div className='container'>
      <Jumbotron>
        <h1>I'm running some Tensorflow ML to classify the sites we have configured</h1>
        <p>Type a phrase, and I will attempt to predict the site!</p>
      </Jumbotron>
    </div>
  )
}

SentimentPage.propTypes = {
}

function mapStateToProps(state) {
  return {
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
