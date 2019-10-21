import React, { useRef, useState } from "react";

import CropImageModal from "./CropImageModal";

export default function HiddenCropper({
  triggerRef, // ref.current.trigger()
  onCropped, // (croppedFile) => void
  inputOptions = {},
  cropOptions = {},
  outputOptions = {},
  displayOptions = {}
}) {
  const inputRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [cropState, setCropState] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setShowModal(true);
      setImageFile(file);
      setCropState(null);
    }
  }

  function handleConfirm(croppedFile) {
    setShowModal(false);
    setImageFile(null);
    setCropState(null);
    onCropped(croppedFile);
  }

  function handleCancel() {
    setShowModal(false);
    setImageFile(null);
    setCropState(null);
  }

  triggerRef.current = {
    trigger() {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        value=""
        onChange={handleFileChange}
        hidden
      />
      <CropImageModal
        show={showModal}
        imageFile={imageFile}
        value={cropState}
        onChange={setCropState}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        inputOptions={inputOptions}
        cropOptions={cropOptions}
        outputOptions={outputOptions}
        displayOptions={{ ...displayOptions, showRemoveButton: false }}
      />
    </>
  );
}
