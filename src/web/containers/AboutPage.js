import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import {Jumbotron, Button} from 'react-bootstrap'

const AboutPage = () => {
  return (
    <div className='container'>
      <Jumbotron>
        <h1>I surf the web so you don't have to!</h1>
        <p>Setup your websites and I can keep an eye on them for you</p>
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
