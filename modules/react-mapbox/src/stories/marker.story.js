import React from 'react'
import {MapGL, Marker} from '../'
import defaults from './defaults'
import Overlay from './components/Overlay'

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).addWithInfo('Marker',
    `
      Basic map with some markers.
    `,
    () => {
      const geojson = {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {
              'message': 'Foo',
              'iconSize': [60, 60]
            },
            'geometry': {
              'type': 'Point',
              'coordinates': [
                -66.324462890625,
                -16.024695711685304
              ]
            }
          },
          {
            'type': 'Feature',
            'properties': {
              'message': 'Bar',
              'iconSize': [50, 50]
            },
            'geometry': {
              'type': 'Point',
              'coordinates': [
                -61.2158203125,
                -15.97189158092897
              ]
            }
          },
          {
            'type': 'Feature',
            'properties': {
              'message': 'Baz',
              'iconSize': [40, 40]
            },
            'geometry': {
              'type': 'Point',
              'coordinates': [
                -63.29223632812499,
                -18.28151823530889
              ]
            }
          }
        ]
      }

      class Story extends React.Component {
        state = {
          size: 1
        }
        render () {
          let {size} = this.state
          return (
            <MapGL
              {...defaults}
              bbox={null}
              center={[-65.017, -16.457]}
              zoom={[5]}
            >
              {geojson.features.map((feature, i) => {
                let [x, y] = feature.properties.iconSize
                return (
                  <Marker key={i} coordinates={feature.geometry.coordinates}>
                    <div
                      style={{
                        width: Math.floor(x * size),
                        height: Math.floor(y * size),
                        backgroundImage: `url('https://placekitten.com/g/${([x, y]).join('/')}/')`,
                        backgroundSize: 'cover',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={window.alert.bind(window, feature.properties.message)}
                    />
                  </Marker>
                )
              })}
              <Overlay>
                Icons:&nbsp;
                <button onClick={() => {
                  this.setState((s) => {
                    s.size = s.size * 1.33333
                    return s
                  })
                }}>
                  Bigger
                </button>
              </Overlay>
            </MapGL>
          )
        }
      }
      return <Story />
    }
  )
}
