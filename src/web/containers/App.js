import React, { Component, PropTypes } from 'react'
import ItemForm from '../components/ItemForm'
import ItemList from '../components/ItemList'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'

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
    items: state.items.items
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
)(App)
