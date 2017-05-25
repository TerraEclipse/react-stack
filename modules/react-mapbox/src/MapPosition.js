import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class MapPosition extends React.Component {
  static propTypes = {
    // Map position options.
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    maxBounds: PropTypes.array,
    bearing: PropTypes.number,
    pitch: PropTypes.number,

    // Custom position options.
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
    zoom: 11,
    minZoom: 0,
    maxZoom: 20,
    bearing: 0,
    pitch: 0,

    // Default custom options.
    moveMethod: 'flyTo',
    moveAround: null
  }

  static contextTypes = {
    map: PropTypes.object
  }

  // Called when the map is initally created.
  static getOptions (props) {
    return _.omit(
      _.pick(props, _.keys(MapPosition.propTypes)),
      [
        'bbox',
        'padding',
        'moveMethod',
        'moveAround'
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
    const center = map.getCenter()
    const didCenterUpdate = (
      this.props.center !== nextProps.center && (
        nextProps.center[0] !== center.lng ||
        nextProps.center[1] !== center.lat
      )
    )

    const zoom = map.getZoom()
    const didZoomUpdate = (
      this.props.zoom !== nextProps.zoom &&
      nextProps.zoom !== zoom
    )

    const bearing = map.getBearing()
    const didBearingUpdate = (
      this.props.bearing !== nextProps.bearing &&
      nextProps.bearing !== bearing
    )

    const pitch = map.getPitch()
    const didPitchUpdate = (
      this.props.pitch !== nextProps.pitch &&
      nextProps.pitch !== pitch
    )

    if (didZoomUpdate || didCenterUpdate || didBearingUpdate || didPitchUpdate) {
      map[nextProps.movingMethod]({
        center: didCenterUpdate ? nextProps.center : center,
        zoom: didZoomUpdate ? nextProps.zoom : zoom,
        bearing: didBearingUpdate ? nextProps.bearing : bearing,
        pitch: didPitchUpdate ? nextProps.pitch : pitch,
        around: nextProps.moveAround
      })
    }

    if (!_.isEqual(this.props.bbox, nextProps.bbox)) {
      map.fitBounds(nextProps.bbox, {
        padding: nextProps.padding || 0,
        linear: nextProps.moveMethod !== 'flyTo'
      })
    }
  }

  render () {
    return null
  }
}

export default MapPosition
