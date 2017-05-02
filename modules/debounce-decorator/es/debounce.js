import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _typeof from 'babel-runtime/helpers/typeof';
import _ from 'lodash';

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
export default function debounce(delay) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function debounceDecorator(target, name, descriptor) {
    var method = descriptor.value;

    if (typeof method !== 'function') {
      throw new Error('@debounce decorator can only be applied to methods not: ' + (typeof method === 'undefined' ? 'undefined' : _typeof(method)));
    }

    // In IE11 calling Object.defineProperty has a side-effect of evaluating the
    // getter for the property which is being replaced. This causes infinite
    // recursion and an "Out of stack space" error.
    var definingProperty = false;

    return {
      configurable: true,
      get: function get() {
        if (definingProperty || this === target.prototype || this.hasOwnProperty(name)) {
          return method;
        }

        console.log('get');

        var debouncedMethod = _.debounce(method.bind(this), delay, options);

        definingProperty = true;
        _Object$defineProperty(this, name, {
          value: debouncedMethod,
          configurable: true,
          writable: true
        });
        definingProperty = false;

        return debouncedMethod;
      }
    };
  };
}