import React from 'react'
import {MapGL, Layer} from './'

const defaults = {
  accessToken: 'pk.eyJ1IjoidGVycmEiLCJhIjoiVmNta3lMSSJ9.V4vST11PV1hulV2Mf9DqdQ',
  style: 'mapbox://styles/mapbox/streets-v9',
  bbox: [[-123.881836, 25.063209], [-65.170898, 48.848451]],
  center: [-95.844727, 39.620499],
  zoom: [3],
  padding: 30,
  containerStyle: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  renderUnsupported: () => (
    <p>Just switch back and forth to this tab to see the map</p>
  )
}

export default function ({storiesOf, action}) {
  storiesOf('Mapbox GL', module).add('Basic Map', () => {
    return (
      <MapGL {...defaults}>
        <Layer
          id='points-markers'
          type='symbol'
          source={{
            id: 'points',
            type: 'geojson',
            data: {
              'type': 'FeatureCollection',
              'features': [{
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-77.03238901390978, 38.913188059745586]
                },
                'properties': {
                  'title': 'Mapbox DC',
                  'icon': 'monument'
                }
              }, {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-122.414, 37.776]
                },
                'properties': {
                  'title': 'Mapbox SF',
                  'icon': 'harbor'
                }
              }]
            }
          }}
          layout={{
            'icon-image': '{icon}-15',
            'text-field': '{title}',
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top'
          }}
        />
      </MapGL>
    )
  })
}
