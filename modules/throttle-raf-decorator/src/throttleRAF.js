import raf from 'raf'

/**
 * Throttle via requestAnimationFrame. Automatically binds method to instance.
 *
 * Use like:
 *
 *   @throttleRAF
 *   myFunction () {
 *     // Probably does something.
 *   }
 */
export default function throttleRAF (target, name, descriptor) {
  if (typeof descriptor === 'undefined') {
    throw new Error('@throttleRAF decorator can only be applied to class methods')
  }

  let method = descriptor.value
  if (typeof method !== 'function') {
    throw new Error('@throttleRAF decorator can only be applied to class methods')
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

      let throttledMethod = function (...args) {
        if (this._throttleRAFWait) return
        method.apply(this, args)
        this._throttleRAFWait = true
        raf(() => {
          this._throttleRAFWait = false
        })
      }.bind(this)

      definingProperty = true
      Object.defineProperty(this, name, {
        value: throttledMethod,
        configurable: true,
        writable: true
      })
      definingProperty = false

      return throttledMethod
    }
  }
}
