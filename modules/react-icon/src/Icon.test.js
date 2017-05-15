/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'
import Icon from './'

describe('react-icon', () => {
  it('supports "type" prop', () => {
    let wrapper = shallow(<Icon type='pencil' />)
    expect(wrapper.hasClass('icon')).toBeTruthy()
    expect(wrapper.hasClass('fa')).toBeTruthy()
    expect(wrapper.hasClass('fa-pencil')).toBeTruthy()
  })

  it('supports "className" prop', () => {
    let wrapper = shallow(<Icon type='pencil' className='foo' />)
    expect(wrapper.hasClass('icon')).toBeTruthy()
    expect(wrapper.hasClass('fa')).toBeTruthy()
    expect(wrapper.hasClass('fa-pencil')).toBeTruthy()
    expect(wrapper.hasClass('foo')).toBeTruthy()
  })

  it('supports "spin" prop', () => {
    let wrapper = shallow(<Icon type='pencil' spin />)
    expect(wrapper.hasClass('icon')).toBeTruthy()
    expect(wrapper.hasClass('fa')).toBeTruthy()
    expect(wrapper.hasClass('fa-pencil')).toBeTruthy()
    expect(wrapper.hasClass('fa-spin')).toBeTruthy()
  })
})
