import React from 'react'
import {MapGL, Hover, Source, Layer} from '../'
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
        <Hover layer='state-fills' uid='name'>
          {({features}) => (
            <Layer
              id='state-hovers'
              type='fill'
              source='states'
              paint={{
                'fill-color': '#627BC1',
                'fill-opacity': 1
              }}
              filter={['==', 'name', features.length ? features[0].properties.name : '']}
            />
          )}
        </Hover>
      </MapGL>
    )
  )
}
