"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CropImagePanel;

var _reactEasyCrop = _interopRequireDefault(require("react-easy-crop"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function CropImagePanel(_ref) {
  var imageUrl = _ref.imageUrl,
      value = _ref.value,
      onChange = _ref.onChange,
      onCropComplete = _ref.onCropComplete,
      aspect = _ref.aspect,
      maxZoom = _ref.maxZoom;

  var _ref2 = value || {
    crop: {
      x: 0,
      y: 0
    },
    zoom: 1
  },
      crop = _ref2.crop,
      zoom = _ref2.zoom;

  function handleCropChange(crop) {
    onChange({
      crop: crop,
      zoom: zoom
    });
  }

  function handleZoomChange(zoom) {
    onChange({
      crop: crop,
      zoom: zoom
    });
  }

  return _react["default"].createElement(_reactEasyCrop["default"], {
    image: imageUrl,
    maxZoom: maxZoom,
    aspect: aspect,
    crop: crop,
    zoom: zoom,
    onCropChange: handleCropChange,
    onZoomChange: handleZoomChange,
    onCropComplete: onCropComplete
  });
}