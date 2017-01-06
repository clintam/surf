import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import {Jumbotron, Button} from 'react-bootstrap'

const AboutPage = () => {
  return (
    <div className='container'>
      <Jumbotron>
        <h1><em>Surf</em> websites and analyze the <em>sentiments</em></h1>
        <p>
          Configure websites and an AI will visit them and let you know which phrases have positive
          or negative sentiment. This prediction was trained on
          <a target='new' href='http://www.cs.cornell.edu/people/pabo/movie-review-data/'>
            &nbsp;movie review data from Rotten Tomatoes
          </a>.
          The machine learning approach was taken from
          <a target='new'
             href='http://www.wildml.com/2015/12/implementing-a-cnn-for-text-classification-in-tensorflow/'>
            &nbsp;WildML
          </a>.
        </p>
        <p>
          Advanced users can configure new sentiment data sources (training data),
          and I will train on them to learn new types of sentiments.
        </p>
        <p><Button bsStyle='primary' href='#/'>Setup Sites</Button></p>
      </Jumbotron>
    </div>
  )
}

AboutPage.propTypes = {
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
)(AboutPage)
