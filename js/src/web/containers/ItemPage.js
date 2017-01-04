import React, { PropTypes } from 'react'
import ItemList from '../components/ItemList'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'

const ItemPage = (props) => {
  const { items, isEditingItem, actions } = props
  return (
    <div className='container'>
      <ItemList actions={actions} items={items} isEditingItem={isEditingItem} />
    </div>
  )
}

ItemPage.propTypes = {
  items: PropTypes.array.isRequired,
  isEditingItem: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    items: state.items.items,
    isEditingItem: (item) => !!state.items.edit &&
      item._id === state.items.edit._id
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
)(ItemPage)
