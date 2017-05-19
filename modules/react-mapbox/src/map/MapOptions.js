import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class MapOptions extends React.Component {
  static propTypes = {
    // Map options.
    style: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.array,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    maxBounds: PropTypes.array,
    bearing: PropTypes.number,
    pitch: PropTypes.number,
    attributionControl: PropTypes.object,
    interactive: PropTypes.bool,
    hash: PropTypes.bool,
    preserveDrawingBuffer: PropTypes.bool,
    scrollZoom: PropTypes.bool,

    // Custom options.
    bbox: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    padding: PropTypes.number,
    movingMethod: PropTypes.oneOf([
      'jumpTo',
      'easeTo',
      'flyTo'
    ])
  }

  static defaultProps = {
    // Default map options.
    center: [
      -0.2416815,
      51.5285582
    ],
    zoom: [11],
    minZoom: 0,
    maxZoom: 20,
    bearing: 0,
    pitch: 0,
    attributionControl: {
      position: 'bottom-right'
    },
    interactive: true,
    hash: false,
    preserveDrawingBuffer: false,
    scrollZoom: true,

    // Default custom options.
    movingMethod: 'flyTo'
  }

  static contextTypes = {
    map: PropTypes.object
  }

  // Called when the map is initally created.
  static getOptions (props) {
    return _.omit(
      _.pick(props, _.keys(MapOptions.propTypes)),
      [
        'bbox',
        'padding',
        'movingMethod'
      ]
    )
  }

  componentDidMount () {
    let {map} = this.context
    if (this.props.bbox) {
      map.fitBounds(this.props.bbox, {
        padding: this.props.padding || 0
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    const {map} = this.context

    if (!map) {
      return null
    }

    const center = map.getCenter()
    const zoom = map.getZoom()
    const bearing = map.getBearing()

    const didZoomUpdate = (
      this.props.zoom !== nextProps.zoom &&
      nextProps.zoom !== zoom
    )

    const didCenterUpdate = (
      this.props.center !== nextProps.center && (
        nextProps.center[0] !== center.lng ||
        nextProps.center[1] !== center.lat
      )
    )

    const didBearingUpdate = (
      this.props.bearing !== nextProps.bearing &&
      nextProps.bearing !== bearing
    )

    if (didZoomUpdate || didCenterUpdate || didBearingUpdate) {
      map[nextProps.movingMethod]({
        zoom: didZoomUpdate ? nextProps.zoom : zoom,
        center: didCenterUpdate ? nextProps.center : center,
        bearing: didBearingUpdate ? nextProps.bearing : bearing
      })
    }

    if (!_.isEqual(this.props.bbox, nextProps.bbox)) {
      map.fitBounds(nextProps.bbox, {
        padding: nextProps.padding || 0
      })
    }

    if (!_.isEqual(this.props.style, nextProps.style)) {
      map.setStyle(nextProps.style)
    }
  }

  render () {
    return null
  }
}

export default MapOptions
