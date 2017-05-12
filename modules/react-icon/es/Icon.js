function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import 'font-awesome/css/font-awesome.css';

var Icon = function (_React$Component) {
  _inherits(Icon, _React$Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Icon.prototype.render = function render() {
    return React.createElement('i', {
      className: cn('icon', 'fa', 'fa-' + this.props.type, this.props.className, { 'fa-spin': this.props.spin }),
      onClick: this.props.onClick
    });
  };

  return Icon;
}(React.Component);

Icon.propTypes = {
  type: PropTypes.string,
  spin: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};


export default Icon;