import React from 'react'
import WithSource from './components/WithSource'
import Story from './polygons.story.source'
import source from '!!prismjs?lang=jsx!./polygons.story.source' // eslint-disable-line

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).add('Interactive Polygons', () => (
    <WithSource
      title='Interactive Map with Polygons'
      description={'Uses the InteractiveLayer \'meta component\' to add polygons with border, hover, and active states.'}
      source={source}
    >
      <Story />
    </WithSource>
  ))
}
