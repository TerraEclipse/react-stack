import React from 'react'
import bbox from '@turf/bbox'
import {MapGL, InteractiveLayer} from '../'
import defaults from './defaults'

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).addWithInfo('Interactive Polygons',
    `
      A map with interactive polygons.
    `,
    () => {
      class Story extends React.Component {
        state = {
          activeFeature: null,
          bbox: defaults.bbox
        }
        render () {
          return (
            <MapGL {...defaults} bbox={this.state.bbox}>
              <InteractiveLayer
                id='states'
                uid='name'
                activeUid={this.state.activeFeature && this.state.activeFeature.properties.name}
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
                  console.log('Over', feature.properties.name)
                }}
                onHoverOut={(e, feature) => {
                  console.log('Out', feature.properties.name)
                }}
              />
            </MapGL>
          )
        }
      }

      return (
        <Story />
      )
    }
  )
}
