import React from 'react'
import WithSource from './components/WithSource'
import Story from './marker.story.source'
import source from '!!raw-loader!./marker.story.source' // eslint-disable-line

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).add('Markers', () => (
    <WithSource
      title='Add Markers to a Map'
      description='While not as performant as Layers for large data-sets, markers make it easy to add arbitrary HTML to the map.'
      source={source}
    >
      <Story />
    </WithSource>
  ))
}
