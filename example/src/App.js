import React, { useRef } from "react";
import { ImageCropper } from "react-bootstrap-image-cropper";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // if you don't care the onChange event, you can use a ref to retrieve the cropped file
  const fileRef = useRef();

  function handleChange(croppedFile) {
    console.log(croppedFile);
    console.log(fileRef.current);
    // croppedFile === fileRef.current
  }

  return (
    <ImageCropper
      fileRef={fileRef}
      onChange={handleChange}
      cropOptions={{ aspect: 4 / 3, maxZoom: 10 }}
      outputOptions={{ maxWidth: 400, maxHeight: 300 }}
      previewOptions={{ width: 400, height: 300 }}
    />
  );
}

export default App;
