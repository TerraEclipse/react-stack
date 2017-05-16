import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import getDisplayName from 'react-display-name'
import throttle from '@terraeclipse/throttle-decorator'

/**
 * A Higher-Order component that measures what it wraps and passes them as
 * props. Provided: `bounds`
 *
 * Optionally, only re-measure only when the specified props change. By default
 * does a shallow compare on the props.
 */
function measure (...filterProps) {
  function measureDecorator (Component) {
    class MeasuredComponent extends React.Component {
      static displayName = `Measure(${getDisplayName(Component)})`
      static WrappedComponent = Component

      state = {
        bounds: {
          bottom: 0,
          height: 0,
          left: 0,
          right: 0,
          top: 0,
          width: 0
        }
      }

      constructor () {
        super()
        this.onWindowResize = this.onWindowResize.bind(this)
      }

      componentDidMount () {
        window.addEventListener('resize', this.onWindowResize)
        this._updateMeasurements()
      }

      componentWillUnmount () {
        window.removeEventListener('resize', this.onWindowResize)
      }

      onWindowResize () {
        this._updateMeasurements()
      }

      componentDidUpdate (prevProps, prevState) {
        if (!filterProps.length) {
          for (let prop of Object.keys(this.props)) {
            if (prevProps[prop] !== this.props[prop]) {
              this._updateMeasurements()
              return
            }
          }
        } else {
          for (let prop of filterProps) {
            if (prevProps[prop] !== this.props[prop]) {
              this._updateMeasurements()
              return
            }
          }
        }
      }

      @throttle(1000 / 60, {leading: true, trailing: true})
      _updateMeasurements () {
        let node = ReactDOM.findDOMNode(this)
        if (node) {
          let rect = node.getBoundingClientRect()
          let bounds = _.pick(rect, 'bottom', 'height', 'left', 'right', 'top', 'width')
          if (!_.isEqual(this.state.bounds, bounds)) {
            this.setState({bounds})
          }
        }
      }

      render () {
        return (
          <Component
            {...this.state}
            {...this.props}
            remeasure={this._updateMeasurements}
          />
        )
      }
    }

    // Return the wrapper.
    return MeasuredComponent
  }

  // Support using @measure or @measure(...filterProps)
  if (filterProps.length > 0 && _.isString(filterProps[0])) {
    return measureDecorator
  } else {
    return measureDecorator.apply(null, arguments)
  }
}

export default measure
