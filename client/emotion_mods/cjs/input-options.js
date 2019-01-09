"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioOption = exports.CheckboxOption = exports.inputOptionStyles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

//var _emotion = require("emotion");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _reactSelect = require("react-select");

var _radio = _interopRequireDefault(require("@atlaskit/icon/glyph/radio"));

var _checkbox = _interopRequireDefault(require("@atlaskit/icon/glyph/checkbox"));

var _theme = require("@atlaskit/theme");

// maintains function shape
var backgroundColor = (0, _theme.themed)({
  light: _theme.colors.N40A,
  dark: _theme.colors.DN10
});
var transparent = (0, _theme.themed)({
  light: 'transparent',
  dark: 'transparent'
}); // state of the parent option

// the primary color represents the outer or background element
var getPrimaryColor = function getPrimaryColor(_ref) {
  var isActive = _ref.isActive,
      isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused,
      isSelected = _ref.isSelected,
      rest = (0, _objectWithoutProperties2.default)(_ref, ["isActive", "isDisabled", "isFocused", "isSelected"]);
  var color = backgroundColor;

  if (isDisabled && isSelected) {
    color = (0, _theme.themed)({
      light: _theme.colors.B75,
      dark: _theme.colors.DN200
    });
  } else if (isDisabled) {
    color = (0, _theme.themed)({
      light: _theme.colors.N20A,
      dark: _theme.colors.DN10
    });
  } else if (isActive) {
    color = (0, _theme.themed)({
      light: _theme.colors.B75,
      dark: _theme.colors.B200
    });
  } else if (isFocused && isSelected) {
    color = (0, _theme.themed)({
      light: _theme.colors.B300,
      dark: _theme.colors.B75
    });
  } else if (isFocused) {
    color = (0, _theme.themed)({
      light: _theme.colors.N50A,
      dark: _theme.colors.DN30
    });
  } else if (isSelected) {
    color = _theme.colors.blue;
  } // $FlowFixMe - theme is not found in props


  return color(rest);
}; // the secondary color represents the radio dot or checkmark


var getSecondaryColor = function getSecondaryColor(_ref2) {
  var isActive = _ref2.isActive,
      isDisabled = _ref2.isDisabled,
      isSelected = _ref2.isSelected,
      rest = (0, _objectWithoutProperties2.default)(_ref2, ["isActive", "isDisabled", "isSelected"]);
  var color = (0, _theme.themed)({
    light: _theme.colors.N0,
    dark: _theme.colors.DN10
  });

  if (isDisabled && isSelected) {
    color = (0, _theme.themed)({
      light: _theme.colors.N70,
      dark: _theme.colors.DN10
    });
  } else if (isActive && isSelected && !isDisabled) {
    color = (0, _theme.themed)({
      light: _theme.colors.B400,
      dark: _theme.colors.DN10
    });
  } else if (!isSelected) {
    color = transparent;
  } // $FlowFixMe - theme is not found in props


  return color(rest);
};

var ControlOption =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ControlOption, _Component);

  function ControlOption() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, ControlOption);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ControlOption)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      isActive: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onMouseDown", function () {
      return _this.setState({
        isActive: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onMouseUp", function () {
      return _this.setState({
        isActive: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onMouseLeave", function () {
      return _this.setState({
        isActive: false
      });
    });
    return _this;
  }

  (0, _createClass2.default)(ControlOption, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          getStyles = _this$props.getStyles,
          Icon = _this$props.Icon,
          isDisabled = _this$props.isDisabled,
          isFocused = _this$props.isFocused,
          isSelected = _this$props.isSelected,
          children = _this$props.children,
          innerProps = _this$props.innerProps,
          rest = (0, _objectWithoutProperties2.default)(_this$props, ["getStyles", "Icon", "isDisabled", "isFocused", "isSelected", "children", "innerProps"]);
      var isActive = this.state.isActive; // styles

      var bg = 'transparent';
      if (isFocused) bg = _theme.colors.N20;
      if (isActive) bg = _theme.colors.B50;
      var style = {
        alignItems: 'center',
        backgroundColor: bg,
        color: 'inherit',
        display: 'flex '
      }; // prop assignment

      var props = (0, _objectSpread2.default)({}, innerProps, {
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp,
        onMouseLeave: this.onMouseLeave,
        style: style
      });
      return _react.default.createElement(_reactSelect.components.Option, (0, _extends2.default)({}, rest, {
        isDisabled: isDisabled,
        isFocused: isFocused,
        isSelected: isSelected,
        getStyles: getStyles,
        innerProps: props
      }), _react.default.createElement("div", {
        // className: (0, _emotion.css)(iconWrapperCSS())
        className: ''
      }, _react.default.createElement(Icon, {
        primaryColor: getPrimaryColor((0, _objectSpread2.default)({}, this.props, this.state)),
        secondaryColor: getSecondaryColor((0, _objectSpread2.default)({}, this.props, this.state))
      })), _react.default.createElement("div", {
        // className: (0, _emotion.css)(truncateCSS())
        className: ''
      }, children));
    }
  }]);
  return ControlOption;
}(_react.Component);

var iconWrapperCSS = function iconWrapperCSS() {
  return {
    alignItems: 'center',
    display: 'flex ',
    flexShrink: 0,
    paddingRight: '4px'
  };
};
/* TODO:
  to be removed
  the label of an option in the menu
  should ideally be something we can customise
  as part of the react-select component API
  at the moment we are hardcoding it into
  the custom input-option components for Radio and Checkbox Select
  and so this behaviour is not customisable / disableable
  by users who buy into radio / checkbox select.
*/


var truncateCSS = function truncateCSS() {
  return {
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
    flexGrow: 1,
    whiteSpace: 'nowrap'
  };
};

var inputOptionStyles = function inputOptionStyles(css, _ref3) {
  var isFocused = _ref3.isFocused;
  return (0, _objectSpread2.default)({}, css, {
    backgroundColor: isFocused ? _theme.colors.N30 : 'transparent',
    color: 'inherit',
    cursor: 'pointer',
    paddingLeft: "".concat((0, _theme.gridSize)() * 2, "px"),
    paddingTop: '4px',
    paddingBottom: '4px',
    ':active': {
      backgroundColor: _theme.colors.B50
    }
  });
};

exports.inputOptionStyles = inputOptionStyles;

var CheckboxOption = function CheckboxOption(props) {
  return _react.default.createElement(ControlOption, (0, _extends2.default)({
    Icon: _checkbox.default
  }, props));
};

exports.CheckboxOption = CheckboxOption;

var RadioOption = function RadioOption(props) {
  return _react.default.createElement(ControlOption, (0, _extends2.default)({
    Icon: _radio.default
  }, props));
};

exports.RadioOption = RadioOption;