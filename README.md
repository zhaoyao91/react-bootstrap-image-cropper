# React Bootstrap Image Cropper

Select, crop, preview, edit, all in one!

## Introduction

Based on [react-bootstrap modal](https://react-bootstrap.github.io/components/modal/) and [react-easy-crop](https://github.com/ricardo-ch/react-easy-crop),
this package provides an all-in-one component which handles all of image selecting, cropping, previewing and editing.

All the rest left for you is to get the final file and upload it to your server.

## Demo & Example

[Demo](https://zhaoyao91.github.io/react-bootstrap-image-cropper/)

[Example](./example/src/App.js)

![demo](https://user-images.githubusercontent.com/3808838/65366436-64537500-dc56-11e9-8754-f4566e90ebdc.gif)

## Installation

```bash
npm i react-bootstrap-image-cropper
```

You also need the depended packages:

```bash
npm i react react-bootstrap
```

## API

Options with `*` prefix are recommended to set.

### Common Options

- `inputOptions` ? : object
  - \* `maxWidth` = Infinity
  - \* `maxHeight` = Infinity
  - `mimeType` = 'image/jpeg'
  - `quality` ? : number
- `cropOptions` ? : object
  - \* `aspect` ? : number
  - `maxZoom` ? : number
- `outputOptions` ? : object
  - \* `maxWidth` = Infinity
  - \* `maxHeight` = Infinity
  - `mimeType` = 'image/jpeg'
  - `quality` ? : number
- `displayOptions` ? : object
  - `title` = 'Crop Image',
  - `removeButtonText` = 'Remove'
  - `confirmButtonText` = 'Confirm'

### ImageCropper specific Options

- \* `fileRef` ? : ref // ref for cropped file
- `onChange` ? : (croppedFile) => void
- `previewOptions` ? : object
  - \* `width` : number
  - \* `height` : number
  - `children` = 'Select Image'

### HiddenCropper specific Options

- \* `triggerRef` : ref // use `ref.current.trigger()` to trigger hidden input
- \* `onCropped` : (croppedFile) => void

### License

MIT
