/**
 * Decorators - throttle-decorator
 *
 * ## Throttle class method calls.
 */
import React from 'react'
import throttle from './'

class Story extends React.Component {
  state = {
    count: 0
  }

  @throttle(500)
  handleClick (e) {
    this.setState((state) => {
      state.count++
      return state
    })
  }

  render () {
    return (
      <div>
        <p>
          The click handler on the button will only fire every 500ms.
        </p>
        <p>
          Clicked <strong>{this.state.count}</strong> time(s)
        </p>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    )
  }
}

export default Story
