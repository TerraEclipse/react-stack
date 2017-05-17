import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Source extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    type: PropTypes.oneOf([
      'canvas',
      'geojson',
      'image',
      'raster',
      'vector',
      'video'
    ]),
    data: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    url: PropTypes.string,
    tiles: PropTypes.array,
    tileSize: PropTypes.number,
    minzoom: PropTypes.number,
    maxzoom: PropTypes.number,
    coordinates: PropTypes.array,
    buffer: PropTypes.number,
    tolerance: PropTypes.number,
    cluster: PropTypes.bool,
    clusterRadius: PropTypes.number,
    clusterMaxZoom: PropTypes.number,
    canvas: PropTypes.string,
    animate: PropTypes.bool
  }

  static contextTypes = {
    map: PropTypes.object
  }

  componentDidMount () {
    let {map} = this.context
    let options = {}

    // Grab basic options from props.
    _.extend(options, _.pick(this.props, [
      'type',
      'data',
      'url',
      'tiles',
      'tileSize',
      'minzoom',
      'maxzoom',
      'coordinates',
      'buffer',
      'tolerance',
      'cluster',
      'clusterRadius',
      'clusterMaxZoom',
      'canvas',
      'animate'
    ]))

    // Add the source.
    map.addSource(this.props.id, options)
    map.fire('_addSource', this.props.id)
  }

  componentWillUnmount () {
    let {map} = this.context
    map.removeSource(this.props.id)
    map.fire('_removeSource', this.props.id)
  }

  render () {
    return null
  }
}

export default Source
