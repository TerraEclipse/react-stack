import React from 'react'
import WithSource from './components/WithSource'
import Story from './basic.story.source'
import source from '!!raw-loader!./basic.story.source' // eslint-disable-line

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).add('Basic', () => (
    <WithSource
      title='Basic Map with Features'
      description='Render a map with geojson features.'
      source={source}
    >
      <Story />
    </WithSource>
  ))
}
