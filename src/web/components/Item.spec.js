/* global describe it*/

import React from 'react'
import { expect } from 'chai'
import Item from './Item'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('<Item />', () => {
  const item = { _id: 1 }
  const actions = {
    deleteItem: sinon.spy(),
    saveItem: sinon.spy()
  }
  const wrapper = shallow(<Item
    item={item}
    actions={actions}
    itemForm={{}}
    />)

  it('can delete with button click', () => {
    wrapper.find('#delete-1').simulate('click')
    expect(actions.deleteItem).to.have.property('callCount', 1)
  })

  it('can update color with button click', () => {
    wrapper.find('#update-1').simulate('click')
    expect(actions.saveItem).to.have.property('callCount', 1)
  })
})
