/**
 * Decorators - ismobile-decorator
 *
 * ## Adds an `isMobile` prop to a component.
 * Powered by `ismobilejs`.
 *
 * Usage:
 *
 *   1. Add an `IsMobileProvider` somewhere higher up in your app. The mobile
 *      feature detection is separate from the decorator so we can support
 *      server-side rendering via user-agent parsing.
 *   2. Use the `isMobile` decorator to make the `isMobile` prop avaialable to
 *      your component.
 */
import React from 'react'
import {isMobile, IsMobileProvider} from './'

const App = () => (
  <IsMobileProvider>
    <Detector />
  </IsMobileProvider>
)

@isMobile
class Detector extends React.Component {
  render () {
    return (
      <div>
        IsMobile: {this.props.isMobile ? 'Yes' : 'No'}
      </div>
    )
  }
}

export default App
