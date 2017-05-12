function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

var Portal = function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal() {
    _classCallCheck(this, Portal);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Portal.prototype.mountPortal = function mountPortal(to, toRef) {
    var target = this.resolveTarget(to, toRef);
    this.portal = document.createElement('div');
    this.portal.className = 'portal';
    if (this.props.className) {
      this.portal.className += ' ' + this.props.className + '-portal';
    }
    if (this.props.to == null) {
      this.portal.style.display = 'block';
    } else {
      this.portal.style.display = 'inline-block';
    }
    target.appendChild(this.portal);
    this.renderPortal();
  };

  Portal.prototype.unmountPortal = function unmountPortal(to, toRef) {
    var target = void 0;
    target = this.resolveTarget(to, toRef);
    ReactDOM.unmountComponentAtNode(this.portal);
    this.component = null;
    if (target != null) {
      target.removeChild(this.portal);
    }
    this.portal = null;
  };

  Portal.prototype.componentDidMount = function componentDidMount() {
    this.mountPortal(this.props.to, this.props.toRef);
  };

  Portal.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unmountPortal(this.props.to, this.props.toRef);
  };

  Portal.prototype.resolveTarget = function resolveTarget(to, toRef) {
    var el = void 0;
    if (to != null) {
      if (typeof to === 'string') {
        el = document.getElementById(to);
        if (el == null) {
          throw new Error('Could not find portal with id ' + to + '!');
        }
        return el;
      } else {
        if (toRef) {
          return ReactDOM.findDOMNode(to.refs[toRef]);
        } else {
          return ReactDOM.findDOMNode(to);
        }
      }
    } else {
      return document.body;
    }
  };

  Portal.prototype.renderPortal = function renderPortal() {
    this.component = ReactDOM.unstable_renderSubtreeIntoContainer(this, React.createElement(
      'div',
      { className: 'portal-container' },
      this.props.children
    ), this.portal);
  };

  Portal.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevProps.to === this.props.to) {
      this.renderPortal();
    } else {
      this.unmountPortal(prevProps.to, prevProps.toRef);
      this.mountPortal(this.props.to, this.props.toRef);
    }
  };

  Portal.prototype.render = function render() {
    return null;
  };

  return Portal;
}(React.Component);

Portal.propTypes = {
  to: PropTypes.any,
  toRef: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};


export default Portal;