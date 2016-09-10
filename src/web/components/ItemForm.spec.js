/* global describe it*/

import React from 'react'
import { expect } from 'chai'
import ItemForm from './ItemForm'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('<ItemForm />', () => {
  const form = {item: {_id: 1}}
  const actions = {
    saveItem: sinon.spy(),
    deleteItem: sinon.spy()
  }
  const wrapper = shallow(<ItemForm
    actions={actions}
    form={form}
    />)

  it('can toggle delete with button click', () => {
    wrapper.find('#delete-1').simulate('click')
    expect(actions.deleteItem).to.have.property('callCount', 1)
  })
})
