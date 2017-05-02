/* eslint-env mocha */
import {expect} from 'chai'
import {shallow} from 'enzyme'
import React from 'react'
import Icon from 'src/Icon'

// Tests
describe('Icon', () => {
  it('supports "type" prop', () => {
    let wrapper = shallow(<Icon type='pencil' />)
    expect(wrapper.hasClass('icon')).to.be.ok
    expect(wrapper.hasClass('fa')).to.be.ok
    expect(wrapper.hasClass('fa-pencil')).to.be.ok
  })

  it('supports "className" prop', () => {
    let wrapper = shallow(<Icon type='pencil' className='foo' />)
    expect(wrapper.hasClass('icon')).to.be.ok
    expect(wrapper.hasClass('fa')).to.be.ok
    expect(wrapper.hasClass('fa-pencil')).to.be.ok
    expect(wrapper.hasClass('foo')).to.be.ok
  })

  it('supports "spin" prop', () => {
    let wrapper = shallow(<Icon type='pencil' spin />)
    expect(wrapper.hasClass('icon')).to.be.ok
    expect(wrapper.hasClass('fa')).to.be.ok
    expect(wrapper.hasClass('fa-pencil')).to.be.ok
    expect(wrapper.hasClass('fa-spin')).to.be.ok
  })
})
