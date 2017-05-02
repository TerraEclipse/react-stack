import React from 'react'
import {render} from 'react-dom'
import debounce from '../../src/debounce'

class Demo extends React.Component {

  state = {
    count: 0
  }

  @debounce(1000, {leading: true})
  handleClick (e) {
    this.setState((state) => {
      state.count++
      return state
    })
  }

  render () {
    return (
      <div>
        <h1>DebounceDecorator</h1>
        <p>
          The click handler on the button will only fire after 1000ms of no clicks.
        </p>
        <p>
          Clicked <strong>{this.state.count}</strong> time(s)
        </p>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
