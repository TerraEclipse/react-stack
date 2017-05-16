/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react'
import {mount} from 'enzyme'
import measure from './'

describe('measure', () => {
  @measure
  class Box extends React.Component {
    render () {
      return (
        <div
          style={{
            width: this.props.width,
            height: this.props.height
          }}
        />
      )
    }
  }

  // @todo can't really measure in jsdom but we can make sure the lifecycles
  // at least work without error.
  it('can measure bounds', () => {
    let wrapper = mount(<Box width={200} height={150} />)
    expect(wrapper.state().bounds).toBeDefined()
  })
})
