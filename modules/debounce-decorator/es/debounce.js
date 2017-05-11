import _debounce from 'lodash/debounce';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

        var debouncedMethod = _debounce(method.bind(this), delay, options);

        definingProperty = true;
        Object.defineProperty(this, name, {
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