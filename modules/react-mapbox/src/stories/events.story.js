import React from 'react'
import WithSource from './components/WithSource'
import Story from './events.story.source'
import source from '!!raw-loader!./events.story.source' // eslint-disable-line

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).add('Events', () => (
    <WithSource
      title='Map Events'
      description='Toggle any of the possible map events to start logging them.'
      source={source}
    >
      <Story />
    </WithSource>
  ))
}
