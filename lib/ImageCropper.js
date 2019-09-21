"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ImageCropper;
exports.ControlledImageCropper = ControlledImageCropper;

var _react = _interopRequireWildcard(require("react"));

var _CropImageInput = _interopRequireDefault(require("./CropImageInput"));

var _CropImageModal = _interopRequireDefault(require("./CropImageModal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ImageCropper(_ref) {
  var fileRef = _ref.fileRef,
      onChange = _ref.onChange,
      cropOptions = _ref.cropOptions,
      outputOptions = _ref.outputOptions,
      displayOptions = _ref.displayOptions,
      previewOptions = _ref.previewOptions;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      imageFile = _useState2[0],
      setImageFile = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      cropState = _useState4[0],
      setCropState = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showModal = _useState6[0],
      setShowModal = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      croppedFile = _useState8[0],
      setCroppedFile = _useState8[1];

  var confirmedCropState = (0, _react.useRef)(cropState);
  var confirmedImageFile = (0, _react.useRef)(imageFile); // maintain the state of fileRef. no need to care it in other places

  (0, _react.useEffect)(function () {
    fileRef && (fileRef.current = croppedFile);
  }, [croppedFile, fileRef]); // notify cropped file changed

  (0, _react.useEffect)(function () {
    onChange && onChange(croppedFile);
  }, [croppedFile, onChange]);

  function handleSelectImageFile(file) {
    if (file === confirmedImageFile.current) {
      // continue to edit
      setImageFile(confirmedImageFile.current);
      setCropState(confirmedCropState.current);
    } else {
      // edit new file
      setImageFile(file);
      setCropState(null);
    }

    setShowModal(true);
  }

  function handleConfirm(croppedFile) {
    setShowModal(false); // save confirmed state

    confirmedImageFile.current = imageFile;
    confirmedCropState.current = cropState; // setup cropped file

    setCroppedFile(croppedFile);
  }

  function handleCancel() {
    setShowModal(false); // restore state

    setCropState(confirmedCropState.current);
    setImageFile(confirmedImageFile.current);
  }

  function handleRemove() {
    setShowModal(false); // clear working state

    setCropState(null);
    setImageFile(null); // clear confirmed state

    confirmedImageFile.current = null;
    confirmedCropState.current = null; // removed cropped file

    setCroppedFile(null);
  }

  return _react["default"].createElement(ControlledImageCropper, {
    imageFile: imageFile,
    onSelectImageFile: handleSelectImageFile,
    showModal: showModal,
    cropState: cropState,
    onChangeCropState: setCropState,
    onConfirm: handleConfirm,
    onCancel: handleCancel,
    onRemove: handleRemove,
    cropOptions: cropOptions,
    outputOptions: outputOptions,
    displayOptions: displayOptions,
    previewOptions: _objectSpread({}, previewOptions, {
      imageFile: croppedFile
    })
  });
}

function ControlledImageCropper(_ref2) {
  var imageFile = _ref2.imageFile,
      onSelectImageFile = _ref2.onSelectImageFile,
      showModal = _ref2.showModal,
      cropState = _ref2.cropState,
      onChangeCropState = _ref2.onChangeCropState,
      onConfirm = _ref2.onConfirm,
      onCancel = _ref2.onCancel,
      onRemove = _ref2.onRemove,
      _ref2$cropOptions = _ref2.cropOptions,
      cropOptions = _ref2$cropOptions === void 0 ? {} : _ref2$cropOptions,
      _ref2$outputOptions = _ref2.outputOptions,
      outputOptions = _ref2$outputOptions === void 0 ? {} : _ref2$outputOptions,
      _ref2$displayOptions = _ref2.displayOptions,
      displayOptions = _ref2$displayOptions === void 0 ? {} : _ref2$displayOptions,
      _ref2$previewOptions = _ref2.previewOptions,
      previewOptions = _ref2$previewOptions === void 0 ? {} : _ref2$previewOptions;
  var fileInputRef = (0, _react.useRef)();

  function handleFileChange(e) {
    var file = e.target.files[0];

    if (file) {
      onSelectImageFile(file);
    }
  }

  function handleClick() {
    if (imageFile) {
      onSelectImageFile(imageFile);
    } else {
      fileInputRef.current.click();
    }
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("input", {
    ref: fileInputRef,
    type: "file",
    value: "",
    onChange: handleFileChange,
    hidden: true
  }), _react["default"].createElement(_CropImageInput["default"], _extends({}, previewOptions, {
    onClick: handleClick
  })), _react["default"].createElement(_CropImageModal["default"], {
    show: showModal,
    imageFile: imageFile,
    value: cropState,
    onChange: onChangeCropState,
    onConfirm: onConfirm,
    onCancel: onCancel,
    onRemove: onRemove,
    cropOptions: cropOptions,
    outputOptions: outputOptions,
    displayOptions: displayOptions
  }));
}