import React, { PropTypes } from 'react'
import ItemList from '../components/ItemList'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'

const App = (props) => {
  const { items, formProvider, actions } = props
  return (
    <div className='container'>
      <ItemList actions={actions} items={items} formProvider={formProvider} />
    </div>
  )
}

App.propTypes = {
  items: PropTypes.array.isRequired,
  formProvider: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    items: state.items.items,
    formProvider: (item) => {
      return state.items.formItem === item ? state.items.form : undefined
    }
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
