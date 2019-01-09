import _extends from "@babel/runtime/helpers/extends";
// import { css as _css2 } from "emotion";
// import { css as _css } from "emotion";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React, { Component } from 'react';
import { components } from 'react-select';
import RadioIcon from '@atlaskit/icon/glyph/radio';
import CheckboxIcon from '@atlaskit/icon/glyph/checkbox';
import { colors, themed, gridSize } from '@atlaskit/theme';
// maintains function shape
var backgroundColor = themed({
  light: colors.N40A,
  dark: colors.DN10
});
var transparent = themed({
  light: 'transparent',
  dark: 'transparent'
}); // state of the parent option

// the primary color represents the outer or background element
var getPrimaryColor = function getPrimaryColor(_ref) {
  var isActive = _ref.isActive,
      isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused,
      isSelected = _ref.isSelected,
      rest = _objectWithoutProperties(_ref, ["isActive", "isDisabled", "isFocused", "isSelected"]);

  var color = backgroundColor;

  if (isDisabled && isSelected) {
    color = themed({
      light: colors.B75,
      dark: colors.DN200
    });
  } else if (isDisabled) {
    color = themed({
      light: colors.N20A,
      dark: colors.DN10
    });
  } else if (isActive) {
    color = themed({
      light: colors.B75,
      dark: colors.B200
    });
  } else if (isFocused && isSelected) {
    color = themed({
      light: colors.B300,
      dark: colors.B75
    });
  } else if (isFocused) {
    color = themed({
      light: colors.N50A,
      dark: colors.DN30
    });
  } else if (isSelected) {
    color = colors.blue;
  } // $FlowFixMe - theme is not found in props


  return color(rest);
}; // the secondary color represents the radio dot or checkmark


var getSecondaryColor = function getSecondaryColor(_ref2) {
  var isActive = _ref2.isActive,
      isDisabled = _ref2.isDisabled,
      isSelected = _ref2.isSelected,
      rest = _objectWithoutProperties(_ref2, ["isActive", "isDisabled", "isSelected"]);

  var color = themed({
    light: colors.N0,
    dark: colors.DN10
  });

  if (isDisabled && isSelected) {
    color = themed({
      light: colors.N70,
      dark: colors.DN10
    });
  } else if (isActive && isSelected && !isDisabled) {
    color = themed({
      light: colors.B400,
      dark: colors.DN10
    });
  } else if (!isSelected) {
    color = transparent;
  } // $FlowFixMe - theme is not found in props


  return color(rest);
};

var ControlOption =
/*#__PURE__*/
function (_Component) {
  _inherits(ControlOption, _Component);

  function ControlOption() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ControlOption);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ControlOption)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      isActive: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseDown", function () {
      return _this.setState({
        isActive: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseUp", function () {
      return _this.setState({
        isActive: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseLeave", function () {
      return _this.setState({
        isActive: false
      });
    });

    return _this;
  }

  _createClass(ControlOption, [{
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
          rest = _objectWithoutProperties(_this$props, ["getStyles", "Icon", "isDisabled", "isFocused", "isSelected", "children", "innerProps"]);

      var isActive = this.state.isActive; // styles

      var bg = 'transparent';
      if (isFocused) bg = colors.N20;
      if (isActive) bg = colors.B50;
      var style = {
        alignItems: 'center',
        backgroundColor: bg,
        color: 'inherit',
        display: 'flex '
      }; // prop assignment

      var props = _objectSpread({}, innerProps, {
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp,
        onMouseLeave: this.onMouseLeave,
        style: style
      });

      return React.createElement(components.Option, _extends({}, rest, {
        isDisabled: isDisabled,
        isFocused: isFocused,
        isSelected: isSelected,
        getStyles: getStyles,
        innerProps: props
      }), React.createElement("div", {
        // className: _css(iconWrapperCSS())
        className: ''
      }, React.createElement(Icon, {
        primaryColor: getPrimaryColor(_objectSpread({}, this.props, this.state)),
        secondaryColor: getSecondaryColor(_objectSpread({}, this.props, this.state))
      })), React.createElement("div", {
        // className: _css2(truncateCSS())
        className: ''
      }, children));
    }
  }]);

  return ControlOption;
}(Component);

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

export var inputOptionStyles = function inputOptionStyles(css, _ref3) {
  var isFocused = _ref3.isFocused;
  return _objectSpread({}, css, {
    backgroundColor: isFocused ? colors.N30 : 'transparent',
    color: 'inherit',
    cursor: 'pointer',
    paddingLeft: "".concat(gridSize() * 2, "px"),
    paddingTop: '4px',
    paddingBottom: '4px',
    ':active': {
      backgroundColor: colors.B50
    }
  });
};
export var CheckboxOption = function CheckboxOption(props) {
  return React.createElement(ControlOption, _extends({
    Icon: CheckboxIcon
  }, props));
};
export var RadioOption = function RadioOption(props) {
  return React.createElement(ControlOption, _extends({
    Icon: RadioIcon
  }, props));
};