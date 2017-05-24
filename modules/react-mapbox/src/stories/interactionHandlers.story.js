import React from 'react'
import WithSource from './components/WithSource'
import Story from './interactionHandlers.story.source'
import source from '!!prismjs?lang=jsx!./interactionHandlers.story.source' // eslint-disable-line

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).add('Interaction Handlers', () => (
    <WithSource
      title='Turn Map Interaction Handlers On/Off'
      description='Toggle any of the map interaction handlers.'
      source={source}
    >
      <Story />
    </WithSource>
  ))
}
