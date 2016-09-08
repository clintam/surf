import React, { PropTypes } from 'react'
import ItemForm from '../components/ItemForm'
import ItemList from '../components/ItemList'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'

const App = (props) => {
  const { items, form, actions } = props
  return (
    <div className='container'>
      <ItemForm actions={actions} form={form} />
      <ItemList actions={actions} items={items} />
    </div>
  )
}

App.propTypes = {
  items: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    items: state.items.items,
    form: state.items.form
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
