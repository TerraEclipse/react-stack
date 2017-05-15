import React from 'react'
import isMobile, {IsMobileProvider} from './'

@isMobile
class Story extends React.Component {
  render () {
    return (
      <div>
        IsMobile: {this.props.isMobile ? 'Yes' : 'No'}
      </div>
    )
  }
}

export default function ({storiesOf, action}) {
  storiesOf('ismobile-decorator', module).addWithInfo(
    'usage',
    `
      Example usage of isMobile decorator.

      @isMobile
      class Story extends React.Component {
        render () {
          return (
            <div>
              IsMobile: {this.props.isMobile}
            </div>
          )
        }
      }

      <IsMobileProvider>
        <Story />
      </IsMobileProvider>
    `,
    () => (
      <IsMobileProvider>
        <Story />
      </IsMobileProvider>
    )
  )
}
