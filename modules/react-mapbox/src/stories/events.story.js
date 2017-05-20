import React from 'react'
import _ from 'lodash'
import {MapGL, MapEvents} from '../'
import Overlay from './components/Overlay'
import Checkbox from './components/Checkbox'
import defaults from './defaults'

export default function ({storiesOf, action}) {
  storiesOf('Mapbox', module).addWithInfo('Events',
    `
      Bind event handlers to map.
    `,
    () => {
      const eventHandlers = _.mapValues(MapEvents.propTypes, (_, name) => {
        return (e) => {
          console.log(name, e)
        }
      })

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
              <Overlay>
                {_.map(eventHandlers, (_, name) => (
                  <Checkbox
                    key={name}
                    name={name}
                    onChange={(e) => {
                      this.setState({[name]: e.currentTarget.checked})
                    }}
                    checked={this.state[name] || false}
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
