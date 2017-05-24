import React from 'react'
import WithSource from './components/WithSource'
import Story from './controls.story.source'
import source from '!!prismjs?lang=jsx!./controls.story.source' // eslint-disable-line

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).add('Controls', () => (
    <WithSource
      title='Map With Controls'
      description='An example map with all of the possible mapbox-gl-js controls added.'
      source={source}
    >
      <Story />
    </WithSource>
  ))
}
