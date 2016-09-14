/* global describe it before*/

import React from 'react'
import { expect } from 'chai'
import ItemList from './ItemList'
import { shallow } from 'enzyme'

describe('<ItemList />', () => {
  let wrapper, items, isEditingItem, actions
  before(() => {
    items = [{}, {}]
    isEditingItem = () => false
    actions = {}
    wrapper = shallow(<ItemList
      items={items}
      isEditingItem={isEditingItem}
      actions={actions} />
    )
  })

  it('contains N Items', () => {
    expect(wrapper.find('Item')).to.have.length(items.length)
  })
})
