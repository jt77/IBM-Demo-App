"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultComponents = exports.DummyControl = exports.MenuDialog = void 0;

//var _emotion = require("emotion");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reactSelect = require("react-select");

var _theme = require("@atlaskit/theme");

var _search = _interopRequireDefault(require("@atlaskit/icon/glyph/editor/search"));

var MenuDialog = function MenuDialog(_ref) {
  var maxWidth = _ref.maxWidth,
      minWidth = _ref.minWidth,
      props = (0, _objectWithoutProperties2.default)(_ref, ["maxWidth", "minWidth"]);
  var shadow = _theme.colors.N40A;
  return _react.default.createElement("div", (0, _extends2.default)({
    // className: (0, _emotion.css)({
    //   backgroundColor: 'white',
    //   borderRadius: 4,
    //   boxShadow: "0 0 0 1px ".concat(shadow, ", 0 4px 11px ").concat(shadow),
    //   maxWidth: maxWidth,
    //   minWidth: minWidth,
    //   zIndex: _theme.layers.layer()
    // })
    className: ''
  }, props));
}; // ==============================
// Custom Components
// ==============================


exports.MenuDialog = MenuDialog;
var _ref2 = {
  marginRight: 2,
  textAlign: 'center',
  width: 32
};

var DropdownIndicator = function DropdownIndicator() {
  return _react.default.createElement("div", {
    // className: (0, _emotion.css)(_ref2)
    className: ''
  }, _react.default.createElement(_search.default, null));
};

var _ref4 = {
  padding: '8px 8px 4px'
};

var Control = function Control(_ref3) {
  var innerRef = _ref3.innerRef,
      innerProps = _ref3.innerProps,
      props = (0, _objectWithoutProperties2.default)(_ref3, ["innerRef", "innerProps"]);
  return _react.default.createElement("div", {
    ref: innerRef,
    // className: (0, _emotion.css)(_ref4)
    className: ''
  }, _react.default.createElement(_reactSelect.components.Control, (0, _extends2.default)({}, props, {
    innerProps: innerProps
  })));
};

var _ref5 = {
  border: 0,
  clip: 'rect(1px, 1px, 1px, 1px)',
  height: 1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1
};

var DummyControl = function DummyControl(props) {
  return _react.default.createElement("div", {
    // className: (0, _emotion.css)(_ref5)
    className: ''
  }, _react.default.createElement(_reactSelect.components.Control, props));
}; // NOTE `props` intentionally omitted from `Fragment`
// eslint-disable-next-line


exports.DummyControl = DummyControl;

var Menu = function Menu(_ref6) {
  var key = _ref6.key,
      children = _ref6.children,
      innerProps = _ref6.innerProps,
      props = (0, _objectWithoutProperties2.default)(_ref6, ["key", "children", "innerProps"]);
  return _react.default.createElement("div", innerProps, children);
};

var defaultComponents = {
  Control: Control,
  DropdownIndicator: DropdownIndicator,
  Menu: Menu
};
exports.defaultComponents = defaultComponents;