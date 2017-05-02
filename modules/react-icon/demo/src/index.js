import React from 'react'
import {render} from 'react-dom'
import Icon from '../../src/Icon'

class Demo extends React.Component {
  render () {
    return <div>
      <h1>Portal</h1>
      <Icon type='pencil' />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
