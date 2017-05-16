import React from 'react'
import throttleRAF from './'

class Story extends React.Component {
  state = {
    throttled: 0,
    unthrottled: 0
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.throttled()
      this.unthrottled()
    }, 5)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  @throttleRAF
  throttled () {
    this.setState((state) => {
      state.throttled++
      return state
    })
  }

  unthrottled () {
    this.setState((state) => {
      state.unthrottled++
      return state
    })
  }

  render () {
    return (
      <div>
        <p>
          The counters below try to increment every 5ms, one is throttle one is not.
        </p>
        <p>
          Throttled: <strong>{this.state.throttled}</strong>
          <span style={{display: 'inline-block', width: 50}} />
          Unthrottled: <strong>{this.state.unthrottled}</strong>
        </p>
      </div>
    )
  }
}

export default function ({storiesOf, action}) {
  storiesOf('throttle-raf-decorator', module).add('usage', () => (
    <Story />
  ))
}
