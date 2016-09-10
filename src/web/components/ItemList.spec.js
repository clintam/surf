/* global describe it*/

import React from 'react'
import { expect } from 'chai'
import ItemList from './ItemList'
import { shallow } from 'enzyme'

describe('<ItemList />', () => {
  const items = [{}, {}]
  const isFocused = (item) => false
  const wrapper = shallow(<ItemList
    items={items}
    isFocused={isFocused}
    actions={{}} />
  )

  it('contains N Items', () => {
    expect(wrapper.find('Item')).to.have.length(items.length)
  })
})
