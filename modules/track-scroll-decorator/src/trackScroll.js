import React from 'react'
import throttleRAF from '@terraeclipse/throttle-raf-decorator'
import getDisplayName from 'react-display-name'

export default function trackScroll (Component) {
  class ScrollTracker extends React.Component {
    static displayName = `TrackScroll(${getDisplayName(Component)})`
    static WrappedComponent = Component
    static getScrollPosition = getScrollPosition

    state = {scroll: 0}

    componentDidMount () {
      this.setState(ScrollTracker.getScrollPosition())
      window.addEventListener('scroll', this.onScroll)
    }

    componentWillUnmount () {
      window.removeEventListener('scroll', this.onScroll)
    }

    @throttleRAF
    onScroll () {
      this.setState(ScrollTracker.getScrollPosition())
    }

    render () {
      return <Component scroll={this.state.scroll} {...this.props} />
    }
  }

  return ScrollTracker
}

export function getScrollPosition () {
  let scrollElement = document.scrollingElement || document.documentElement
  return {
    scroll: typeof document !== 'undefined'
      ? scrollElement.scrollTop
      : 0
  }
}
