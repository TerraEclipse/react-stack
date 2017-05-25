import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class MapOptions extends React.Component {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    attributionControl: PropTypes.object,
    hash: PropTypes.bool,
    preserveDrawingBuffer: PropTypes.bool
  }

  static defaultProps = {
    attributionControl: {
      position: 'bottom-right'
    },
    hash: false,
    preserveDrawingBuffer: false
  }

  static contextTypes = {
    map: PropTypes.object
  }

  // Called when the map is initally created.
  static getOptions (props) {
    return _.pick(props, _.keys(MapOptions.propTypes))
  }

  componentWillReceiveProps (nextProps) {
    const {map} = this.context
    if (!_.isEqual(this.props.style, nextProps.style)) {
      map.setStyle(nextProps.style)
    }
  }

  render () {
    return null
  }
}

export default MapOptions
