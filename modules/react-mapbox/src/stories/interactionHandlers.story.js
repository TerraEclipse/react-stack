import React from 'react'
import _ from 'lodash'
import {MapGL} from '../'
import defaults from './defaults'

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
              <div style={{
                position: 'fixed',
                top: 20,
                left: 20,
                padding: 5,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)'
              }}>
                {_.map(this.state, (checked, name) => (
                  <label key={name} style={{
                    display: 'block',
                    padding: 5,
                    color: this.state[name] ? 'lime' : 'white'
                  }}>
                    <input
                      type='checkbox'
                      onChange={(e) => {
                        this.setState({[name]: e.currentTarget.checked})
                      }}
                      defaultChecked={checked}
                    /> {name}
                  </label>
                ))}
              </div>
            </div>
          )
        }
      }

      return <Story />
    }
  )
}
