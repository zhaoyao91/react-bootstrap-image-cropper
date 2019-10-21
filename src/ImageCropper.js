import React, { useEffect, useRef, useState } from "react";

import CropImageInput from "./CropImageInput";
import CropImageModal from "./CropImageModal";

export default function ImageCropper({
  fileRef,
  onChange,
  inputOptions,
  cropOptions,
  outputOptions,
  displayOptions,
  previewOptions
}) {
  const [imageFile, setImageFile] = useState(null);
  const [cropState, setCropState] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [croppedFile, setCroppedFile] = useState(null);
  const confirmedCropState = useRef(cropState);
  const confirmedImageFile = useRef(imageFile);

  // maintain the state of fileRef. no need to care it in other places
  useEffect(() => {
    fileRef && (fileRef.current = croppedFile);
  }, [croppedFile, fileRef]);

  // notify cropped file changed
  useEffect(() => {
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
    setShowModal(false);

    // save confirmed state
    confirmedImageFile.current = imageFile;
    confirmedCropState.current = cropState;

    // setup cropped file
    setCroppedFile(croppedFile);
  }

  function handleCancel() {
    setShowModal(false);

    // restore state
    setCropState(confirmedCropState.current);
    setImageFile(confirmedImageFile.current);
  }

  function handleRemove() {
    setShowModal(false);

    // clear working state
    setCropState(null);
    setImageFile(null);

    // clear confirmed state
    confirmedImageFile.current = null;
    confirmedCropState.current = null;

    // removed cropped file
    setCroppedFile(null);
  }

  return (
    <ControlledImageCropper
      imageFile={imageFile}
      onSelectImageFile={handleSelectImageFile}
      showModal={showModal}
      cropState={cropState}
      onChangeCropState={setCropState}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onRemove={handleRemove}
      inputOptions={inputOptions}
      cropOptions={cropOptions}
      outputOptions={outputOptions}
      displayOptions={displayOptions}
      previewOptions={{ ...previewOptions, imageFile: croppedFile }}
    />
  );
}

export function ControlledImageCropper({
  imageFile,
  onSelectImageFile,
  showModal,
  cropState,
  onChangeCropState,
  onConfirm,
  onCancel,
  onRemove,
  inputOptions = {},
  cropOptions = {},
  outputOptions = {},
  displayOptions = {},
  previewOptions = {}
}) {
  const fileInputRef = useRef();

  function handleFileChange(e) {
    const file = e.target.files[0];
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

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        value=""
        onChange={handleFileChange}
        hidden
      />
      <CropImageInput {...previewOptions} onClick={handleClick} />
      <CropImageModal
        show={showModal}
        imageFile={imageFile}
        value={cropState}
        onChange={onChangeCropState}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onRemove={onRemove}
        inputOptions={inputOptions}
        cropOptions={cropOptions}
        outputOptions={outputOptions}
        displayOptions={displayOptions}
      />
    </>
  );
}
