import React, { Component, PropTypes } from 'react'
import ItemForm from '../components/ItemForm'
import ItemList from '../components/ItemList'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../actions'

class App extends Component { // TODO make pure function
  render() {
    const { items, actions } = this.props
    return (
      <div className='container'>
        <ItemForm actions={actions} />
        <ItemList actions={actions} items={items} />
      </div>
    )
  }
}

App.propTypes = {
  items: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    items: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
