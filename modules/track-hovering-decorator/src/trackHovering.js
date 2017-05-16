import React from 'react'
import PropTypes from 'prop-types'
import getDisplayName from 'react-display-name'

/**
 * A Higher-Order component that monitors the hover status of the
 * component it wraps.
 */
function trackHovering (Component) {
  // Wrapper Component.
  class TrackHovering extends React.Component {
    static displayName = `TrackHovering(${getDisplayName(Component)})`
    static WrappedComponent = Component

    static propTypes = {
      onMouseEnter: PropTypes.func,
      onMouseLeave: PropTypes.func
    }

    state = {
      isHovering: false
    }

    constructor () {
      super()
      this.handleMouseEnter = this.handleMouseEnter.bind(this)
      this.handleMouseLeave = this.handleMouseLeave.bind(this)
    }

    handleMouseEnter (e) {
      this.setState({isHovering: true})
      if (this.props.onMouseEnter) {
        this.props.onMouseEnter(e)
      }
    }

    handleMouseLeave (e) {
      this.setState({isHovering: false})
      if (this.props.onMouseLeave) {
        this.props.onMouseLeave(e)
      }
    }

    render () {
      return (
        <Component
          {...this.props}
          isHovering={this.state.isHovering}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          handleHover={{
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave
          }}
        />
      )
    }
  }

  // Return the wrapper.
  return TrackHovering
}

export default trackHovering
