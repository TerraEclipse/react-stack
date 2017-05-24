import React from 'react'
import WithSource from './components/WithSource'
import Story from './images.story.source'
import source from '!!prismjs?lang=jsx!./images.story.source' // eslint-disable-line

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).add('Images', () => (
    <WithSource
      title='Load and Use Custom Images'
      description='Loads images into the map sprite (limited size), then use them in layer paint options. Assumes a webpack setup with `url-loader` for images.'
      source={source}
    >
      <Story />
    </WithSource>
  ))
}
