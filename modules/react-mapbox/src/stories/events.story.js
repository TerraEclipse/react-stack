import React from 'react'
import _ from 'lodash'
import {MapGL} from '../'
import MapEvents from '../map/MapEvents'
import defaults from './defaults'

const eventHandlers = _.mapValues(MapEvents.propTypes, (_, name) => {
  return (e) => {
    console.log(name, e)
  }
})

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).addWithInfo('Events',
    `
      Bind event handlers to map.
    `,
    () => {
      class Story extends React.Component {
        state = {}
        render () {
          return (
            <div>
              <MapGL
                {...defaults}
                {..._.pickBy(eventHandlers, (_, name) => {
                  return this.state[name]
                })}
              />
              <div style={{
                position: 'fixed',
                top: 20,
                left: 20,
                padding: 5,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)'
              }}>
                {_.map(eventHandlers, (_, name) => (
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
