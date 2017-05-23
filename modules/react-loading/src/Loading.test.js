/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import Loading from './'

describe('Loading', () => {
  it('renders', () => {
    const component = renderer.create(<Loading />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
