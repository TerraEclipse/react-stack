import React from 'react'
import WithSource from './components/WithSource'
import Story from './toggle.story.source'
import source from '!!prismjs?lang=jsx!./toggle.story.source' // eslint-disable-line

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).add('Toggle', () => (
    <WithSource
      title='Toggle Features in a Layer'
      description={'\'Toggles\' features in a layer, using them in a children render function to add a fill color.'}
      source={source}
    >
      <Story />
    </WithSource>
  ))
}
