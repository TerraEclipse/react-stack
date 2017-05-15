import _ from 'lodash'

/**
 * Debounce decorator. Automatically binds method to instance.
 *
 * Use like:
 *
 *   @debounce(250)
 *   myFunction () {
 *     // Probably does something.
 *   }
 */
export default function debounce (delay, options = {}) {
  return function debounceDecorator (target, name, descriptor) {
    let method = descriptor.value

    if (typeof method !== 'function') {
      throw new Error(`@debounce decorator can only be applied to methods not: ${typeof method}`)
    }

    // In IE11 calling Object.defineProperty has a side-effect of evaluating the
    // getter for the property which is being replaced. This causes infinite
    // recursion and an "Out of stack space" error.
    let definingProperty = false

    return {
      configurable: true,
      get () {
        if (definingProperty || this === target.prototype || this.hasOwnProperty(name)) {
          return method
        }

        let debouncedMethod = _.debounce(method.bind(this), delay, options)

        definingProperty = true
        Object.defineProperty(this, name, {
          value: debouncedMethod,
          configurable: true,
          writable: true
        })
        definingProperty = false

        return debouncedMethod
      }
    }
  }
}
