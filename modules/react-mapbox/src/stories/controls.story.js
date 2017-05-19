import React from 'react'
import {MapGL, Control} from '../'
import defaults from './defaults'

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).addWithInfo('Controls',
    `
      Basic map with a geojson layer.
    `,
    () => (
      <MapGL {...defaults}>
        <Control type='Navigation' position='top-left' />
        <Control type='Geolocate' position='top-left' watchPosition />
        <Control type='Scale' position='bottom-right' maxWidth={300} unit='imperial' />
        <Control type='Fullscreen' position='top-left' />
      </MapGL>
    )
  )
}
