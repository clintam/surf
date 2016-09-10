import React, { PropTypes } from 'react'
import ItemForm from '../components/ItemForm'
import ItemList from '../components/ItemList'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'

const App = (props) => {
  const { items, form, isFocused, actions } = props
  return (
    <div className='container'>
      <ItemForm actions={actions} form={form} className='row' />
      <ItemList actions={actions} items={items} isFocused={isFocused} />
    </div>
  )
}

App.propTypes = {
  items: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  isFocused: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    items: state.items.items,
    form: state.items.form,
    isFocused: (item) => state.items.updateForm && item._id === state.items.updateForm.item._id
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
