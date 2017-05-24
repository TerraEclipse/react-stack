import React from 'react'
import WithSource from './components/WithSource'
import Story from './readme.story.source'
import source from '!!raw-loader!./readme.story.source' // eslint-disable-line

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).add('Readme Example', () => (
    <WithSource
      title='Readme Example - Hoverable Polygons'
      description='Adds polygons to the map and changes the fill color on hover.'
      source={source}
    >
      <Story />
    </WithSource>
  ))
}
