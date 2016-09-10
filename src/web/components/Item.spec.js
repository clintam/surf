/* global describe it*/

import React from 'react'
import { expect } from 'chai'
import Item from './Item'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('<Item />', () => {
  const item = { _id: 1 }
  const actions = {
    saveItem: sinon.spy()
  }
  const wrapper = shallow(<Item
    item={item}
    actions={actions}
    itemForm={{}}
    />)

  it('can toggle done with button click', () => {
    wrapper.find('#toggle-1').simulate('click', {stopPropagation: sinon.spy()})
    expect(actions.saveItem).to.have.property('callCount', 1)
  })
})
