import React from 'react'
import {MapGL, Click, Hover, Source, Layer, Children} from '../'
import defaults from './defaults'

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).addWithInfo('Polygons',
    `
      A map with interactive polygons.
    `,
    () => (
      <MapGL {...defaults}>
        <Source
          id='states'
          type='geojson'
          data='https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson'
        />
        <Layer
          id='state-fills'
          type='fill'
          source='states'
          paint={{
            'fill-color': '#627BC1',
            'fill-opacity': 0.5
          }}
        />
        <Layer
          id='state-borders'
          type='line'
          source='states'
          paint={{
            'line-color': '#627BC1',
            'line-width': 2
          }}
        />
        <Click
          layer='state-fills'
          avoidDoubleClick
          onClick={(e, features) => console.log('Click', features[0].properties.name)}
        />
        <Hover
          layer='state-fills'
          uid='name'
          onHoverOver={(e, feature) => console.log('Over', feature.properties.name)}
          onHoverOut={(e, feature) => console.log('Out', feature.properties.name)}
        >
          {({features}) => (
            <Children>
              <Layer
                id='state-hover'
                type='fill'
                source='states'
                paint={{
                  'fill-color': '#627BC1',
                  'fill-opacity': 1
                }}
                filter={['==', 'name', features.length ? features[0].properties.name : '']}
              />
              <Layer
                id='state-hover-border'
                type='line'
                source='states'
                paint={{
                  'line-color': '#425BA1',
                  'line-width': 2
                }}
                filter={['==', 'name', features.length ? features[0].properties.name : '']}
              />
            </Children>
          )}
        </Hover>
      </MapGL>
    )
  )
}
