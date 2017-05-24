import React from 'react'
import _ from 'lodash'
import {MapGL} from '../'
import Overlay from './components/Overlay'
import Checkbox from './components/Checkbox'
import {defaults} from './_utils'

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).addWithInfo('Interaction Handlers',
    `
      Toggle interaction handlers on a map.
    `,
    () => {
      class Story extends React.Component {
        state = {
          scrollZoom: true,
          boxZoom: true,
          dragRotate: true,
          dragPan: true,
          keyboard: true,
          doubleClickZoom: true,
          touchZoomRotate: true
        }
        render () {
          return (
            <div>
              <MapGL
                {...defaults}
                {...this.state}
              />
              <Overlay>
                {_.map(this.state, (checked, name) => (
                  <Checkbox
                    key={name}
                    name={name}
                    onChange={(e) => {
                      action(name)(e.currentTarget.checked ? 'Enabled' : 'Disabled')
                      this.setState({[name]: e.currentTarget.checked})
                    }}
                    checked={checked}
                  />
                ))}
              </Overlay>
            </div>
          )
        }
      }

      return <Story />
    }
  )
}
