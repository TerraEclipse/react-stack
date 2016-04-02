import React from 'react'
import {render} from 'react-dom'
import Portal from '../../src/Portal'

class Demo extends React.Component {
  render () {
    return <div>
      <h1>Portal</h1>
      <Portal>
        <h2>Portal Content</h2>
      </Portal>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
