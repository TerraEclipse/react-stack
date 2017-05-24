import React from 'react'
import WithSource from './components/WithSource'
import Story from './popup.story.source'
import source from '!!raw-loader!./popup.story.source' // eslint-disable-line

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).add('Popup', () => (
    <WithSource
      title='Add Popups to the Map'
      description='Adds text, html, and react children Popups to the map.'
      source={source}
    >
      <Story />
    </WithSource>
  ))
}
