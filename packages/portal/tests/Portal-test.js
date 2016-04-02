import expect from 'expect'
import React from 'react'
import ReactDOM from 'react-dom'
import Portal from 'src/Portal'

describe('Component', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node)
  })

  it('body contains portal content'/*, () => {
    ReactDOM.render(<Portal/>, node, () => {
      expect(node.innerHTML).toContain('Welcome to React components')
    })
  }*/)
})
