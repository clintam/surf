import React, { PropTypes } from 'react'
import ItemList from '../components/ItemList'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'

const App = (props) => {
  const { items, isEditingItem, actions } = props
  return (
    <div className='container'>
      <ItemList actions={actions} items={items} isEditingItem={isEditingItem} />
    </div>
  )
}

App.propTypes = {
  items: PropTypes.array.isRequired,
  isEditingItem: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    items: state.items.items,
    isEditingItem: (item) => item === state.items.editItem
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
