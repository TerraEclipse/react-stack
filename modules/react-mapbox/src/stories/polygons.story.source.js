import React from 'react'
import bbox from '@turf/bbox'
import {MapGL, InteractiveLayer} from '../'
import {defaults} from './_utils'

class Story extends React.Component {
  state = {
    activeFeature: null,
    hoveredFeature: null,
    bbox: defaults.bbox
  }
  render () {
    let {activeFeature} = this.state
    return (
      <MapGL {...defaults} bbox={this.state.bbox}>
        <InteractiveLayer
          id='states'
          property='name'
          activeProperty={activeFeature && activeFeature.properties.name}
          source={{
            id: 'states',
            type: 'geojson',
            data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson'
          }}
          base={{
            type: 'fill',
            paint: {
              'fill-color': '#627BC1',
              'fill-opacity': 0.5
            }
          }}
          borders={{
            type: 'line',
            paint: {
              'line-color': '#627BC1',
              'line-width': 2
            }
          }}
          hover={{
            type: 'fill',
            paint: {
              'fill-color': '#627BC1',
              'fill-opacity': 1
            }
          }}
          hoverBorder={{
            type: 'line',
            paint: {
              'line-color': '#425BA1',
              'line-width': 2
            }
          }}
          active={{
            type: 'fill',
            paint: {
              'fill-color': '#ff0e0e',
              'fill-opacity': 0.4
            }
          }}
          activeBorder={{
            type: 'line',
            paint: {
              'line-color': '#ff0e0e',
              'line-width': 2
            }
          }}
          avoidDoubleClick
          onClick={(e, [feature]) => {
            let {activeFeature} = this.state
            if (activeFeature &&
               (activeFeature.properties.name === feature.properties.name)) {
              this.setState({
                activeFeature: null,
                bbox: defaults.bbox
              })
            } else {
              this.setState({
                activeFeature: feature,
                bbox: bbox(feature)
              })
            }
          }}
          onHoverOver={(e, feature) => {
            this.setState({hoveredFeature: feature})
          }}
          onHoverOut={(e, feature) => {
            this.setState({hoveredFeature: null})
          }}
        />
        {this.state.hoveredFeature ? (
          <h2 style={{
            position: 'absolute',
            top: 10,
            left: 10,
            margin: 0,
            padding: 10,
            backgroundColor: '#333',
            color: '#ddd',
            boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)',
            zIndex: 10
          }}>
            {this.state.hoveredFeature.properties.name}
          </h2>
        ) : null}
      </MapGL>
    )
  }
}

export default Story
