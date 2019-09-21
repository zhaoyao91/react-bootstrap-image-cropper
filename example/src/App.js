import React, { useRef } from "react";
import { ImageCropper, HiddenCropper } from "react-bootstrap-image-cropper";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div style={{ padding: 16 }}>
      <ImageCropperDemo />
      <hr />
      <HiddenCropperDemo />
    </div>
  );
}

export default App;

function ImageCropperDemo() {
  // if you don't care the onChange event, you can use a ref to retrieve the cropped file
  const fileRef = useRef();

  function handleChange(croppedFile) {
    console.log(croppedFile);
    console.log(fileRef.current);
    // croppedFile === fileRef.current
  }

  return (
    <div>
      <h1>ImageCropper</h1>
      <ImageCropper
        fileRef={fileRef}
        onChange={handleChange}
        cropOptions={{ aspect: 4 / 3, maxZoom: 10 }}
        outputOptions={{ maxWidth: 400, maxHeight: 300 }}
        previewOptions={{ width: 400, height: 300 }}
      />
    </div>
  );
}

function HiddenCropperDemo() {
  const triggerRef = useRef();

  function handleCropped(file) {
    console.log(file);
  }

  return (
    <div>
      <h1>HiddenCropper</h1>
      <button onClick={() => triggerRef.current.trigger()}>
        trigger hidden cropper
      </button>
      <HiddenCropper
        triggerRef={triggerRef}
        onCropped={handleCropped}
        cropOptions={{ aspect: 4 / 3, maxZoom: 10 }}
        outputOptions={{ maxWidth: 400, maxHeight: 300 }}
        previewOptions={{ width: 400, height: 300 }}
      />
    </div>
  );
}
