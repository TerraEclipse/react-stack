import React from 'react'
import {render} from 'react-dom'
import <%= componentName %> from '../../src/<%= componentName %>'

class Demo extends React.Component {
  render () {
    return (
      <div>
        <h1><%= projectName %></h1>
        <<%= componentName %>/>
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
