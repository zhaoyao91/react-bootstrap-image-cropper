"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CropImageModal;

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _useObjectUrl = _interopRequireDefault(require("use-object-url"));

var _CropImagePanel = _interopRequireDefault(require("./CropImagePanel"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function CropImageModal(_ref) {
  var show = _ref.show,
      imageFile = _ref.imageFile,
      value = _ref.value,
      onChange = _ref.onChange,
      onConfirm = _ref.onConfirm,
      onCancel = _ref.onCancel,
      onRemove = _ref.onRemove,
      _ref$cropOptions = _ref.cropOptions,
      cropOptions = _ref$cropOptions === void 0 ? {} : _ref$cropOptions,
      _ref$outputOptions = _ref.outputOptions,
      outputOptions = _ref$outputOptions === void 0 ? {} : _ref$outputOptions,
      _ref$displayOptions = _ref.displayOptions,
      displayOptions = _ref$displayOptions === void 0 ? {} : _ref$displayOptions;
  var aspect = cropOptions.aspect,
      maxZoom = cropOptions.maxZoom;
  var _outputOptions$maxWid = outputOptions.maxWidth,
      maxWidth = _outputOptions$maxWid === void 0 ? Infinity : _outputOptions$maxWid,
      _outputOptions$maxHei = outputOptions.maxHeight,
      maxHeight = _outputOptions$maxHei === void 0 ? Infinity : _outputOptions$maxHei,
      _outputOptions$mimeTy = outputOptions.mimeType,
      mimeType = _outputOptions$mimeTy === void 0 ? "image/jpeg" : _outputOptions$mimeTy,
      quality = outputOptions.quality;
  var _displayOptions$title = displayOptions.title,
      title = _displayOptions$title === void 0 ? "Crop Image" : _displayOptions$title,
      _displayOptions$remov = displayOptions.removeButtonText,
      removeButtonText = _displayOptions$remov === void 0 ? "Remove" : _displayOptions$remov,
      _displayOptions$confi = displayOptions.confirmButtonText,
      confirmButtonText = _displayOptions$confi === void 0 ? "Confirm" : _displayOptions$confi;
  var imageUrl = (0, _useObjectUrl["default"])(imageFile);
  var cropResultRef = (0, _react.useRef)();

  function handleCropComplete(croppedArea, croppedAreaPixels) {
    cropResultRef.current = {
      croppedArea: croppedArea,
      croppedAreaPixels: croppedAreaPixels
    };
  }

  function handleConfirm() {
    (0, _utils.getCroppedFile)(imageUrl, cropResultRef.current.croppedAreaPixels, maxWidth, maxHeight, mimeType, quality).then(onConfirm);
  }

  return _react["default"].createElement(_reactBootstrap.Modal, {
    show: show,
    onHide: onCancel,
    size: "lg"
  }, _react["default"].createElement(_reactBootstrap.Modal.Header, {
    closeButton: true
  }, _react["default"].createElement(_reactBootstrap.Modal.Title, null, title)), _react["default"].createElement(_reactBootstrap.Modal.Body, {
    style: {
      minHeight: "50vh"
    }
  }, imageUrl && _react["default"].createElement(_CropImagePanel["default"], {
    imageUrl: imageUrl,
    value: value,
    onChange: onChange,
    onCropComplete: handleCropComplete,
    aspect: aspect,
    maxZoom: maxZoom
  })), _react["default"].createElement(_reactBootstrap.Modal.Footer, null, _react["default"].createElement(_reactBootstrap.Button, {
    variant: "danger",
    className: "mr-auto",
    onClick: onRemove
  }, removeButtonText), _react["default"].createElement(_reactBootstrap.Button, {
    variant: "primary",
    onClick: handleConfirm
  }, confirmButtonText)));
}