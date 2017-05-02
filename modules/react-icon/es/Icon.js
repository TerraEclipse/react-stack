import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
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

process.env.NODE_ENV !== "production" ? Icon.propTypes = {
  type: PropTypes.string,
  spin: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
} : void 0;


export default Icon;