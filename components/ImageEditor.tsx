import React, { useState, useRef } from "react";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const ImageEditor: React.FC = () => {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const imageRef = useRef<HTMLImageElement>(null);
  const [cropper, setCropper] = useState<Cropper>();
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const rotate = (val: number) => {
    cropper.rotate(val);
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        <input type="file" onChange={onChange} />
        <button>Use default img</button>
        <br />
        <br />
        <Cropper
          style={{ height: 400, width: "100%" }}
          initialAspectRatio={16 / 9}
          preview=".img-preview"
          guides={true}
          src={image}
          ref={imageRef}
          dragMode={"move"}
          checkOrientation={true} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />
      </div>

      <div className="flex-auto flex space-x-3 mt-6">
        <button
          onClick={() => rotate(359)}
          className="w-1/2 flex items-center justify-center rounded-md bg-black text-white"
          type="submit"
        >
          Rotate 359 +
        </button>
        <button
          onClick={() => rotate(-359)}
          className="w-1/2 flex items-center justify-center rounded-md bg-black text-white"
          type="submit"
        >
          Rotate 359 -
        </button>
      </div>

      <div className="flex-auto flex space-x-3 mt-6">
        <button
          onClick={() => rotate(359)}
          className="w-1/2 flex items-center justify-center rounded-md bg-black text-white"
          type="submit"
        >
          Export state
        </button>
      </div>

      <br />
      <br />
      <br />
      <br />
      <div>
        <div className="box" style={{ width: "50%", float: "right" }}>
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: 300 }}
          />
        </div>
        <div className="box" style={{ width: "50%", float: "right" }}>
          <h1>
            <span>Crop</span>
            <button style={{ float: "right" }} onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <img style={{ width: "100%" }} src={cropData} alt="cropped image" />
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};

export default ImageEditor;
