/* global describe it before*/

import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { expect } from 'chai'
import ItemForm from './ItemForm'
import sinon from 'sinon'
import { mount } from 'enzyme'
import jsdom from 'mocha-jsdom'

describe('<ItemForm />', () => {
  jsdom()

  let store, connectedApp, actions, item
  before(() => {
    store = configureMockStore()({
    })
    item = { _id: '1' }
    actions = {
      saveItem: sinon.spy(),
      deleteItem: sinon.spy()
    }

    connectedApp = mount(<Provider store={store}>
      <ItemForm
        actions={actions}
        item={item}
        initialValues={item}
        />
    </Provider>)
  })

  it('can toggle delete with button click', () => {
    connectedApp.find('#delete-1').simulate('click')
    expect(actions.deleteItem.calledOnce).to.equal(true)
  })
})
