"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputButton = InputButton;
exports.InputPreview = InputPreview;
exports["default"] = CropImageInput;

var _react = _interopRequireDefault(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _useObjectUrl = _interopRequireDefault(require("use-object-url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function InputButton(_ref) {
  var width = _ref.width,
      height = _ref.height,
      _ref$children = _ref.children,
      children = _ref$children === void 0 ? "Select Image" : _ref$children,
      onClick = _ref.onClick;
  return _react["default"].createElement(_reactBootstrap.Button, {
    variant: "light",
    onClick: onClick,
    style: {
      width: width,
      height: height
    }
  }, children);
}

function InputPreview(_ref2) {
  var width = _ref2.width,
      height = _ref2.height,
      imageFile = _ref2.imageFile,
      onClick = _ref2.onClick;
  var url = (0, _useObjectUrl["default"])(imageFile);
  return _react["default"].createElement(_reactBootstrap.Image, {
    style: {
      width: width,
      height: height,
      cursor: "pointer",
      objectFit: "contain"
    },
    src: url,
    onClick: onClick
  });
}

function CropImageInput(_ref3) {
  var imageFile = _ref3.imageFile,
      children = _ref3.children,
      width = _ref3.width,
      height = _ref3.height,
      onClick = _ref3.onClick;

  if (imageFile) {
    return _react["default"].createElement(InputPreview, {
      imageFile: imageFile,
      width: width,
      height: height,
      onClick: onClick
    });
  } else {
    return _react["default"].createElement(InputButton, {
      children: children,
      width: width,
      height: height,
      onClick: onClick
    });
  }
}