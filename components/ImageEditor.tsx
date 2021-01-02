import React, { useState, useRef, useEffect, useCallback } from "react";
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import { stat } from "fs";

const defaultSrc = "/placeholder.jpg";

type IE = {
  preventDefault: () => void;
  dataTransfer: { files: any };
  target: { files: any };
};

export const ImageEditor: React.FC = () => {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const imageRef = useRef<HTMLImageElement>(null);
  const [cropper, setCropper] = useState<Cropper>();
  const [exportedState, setExportedState] = useState(null);

  // ╦ ╦┌─┐┬  ┌─┐┌─┐┬─┐  ┌─┐┬ ┬┌┐┌┌─┐┌┬┐┬┌─┐┌┐┌┌─┐┬
  // ╠═╣├┤ │  ├─┘├┤ ├┬┘  ├┤ │ │││││   │ ││ ││││└─┐│
  // ╩ ╩└─┘┴─┘┴  └─┘┴└─  └  └─┘┘└┘└─┘ ┴ ┴└─┘┘└┘└─┘o

  /**
   *
   * @param e
   */
  const onChange = (e: IE | any) => {
    e.preventDefault();
    let files: Blob[];
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

  /**
   *
   */
  const importJSON = () => {
    // auto set the default states
    // prettier-ignore
    const { canvasData, cropBoxData } = JSON.parse(localStorage.getItem("exportedState")) ?? {};

    cropper?.setCropBoxData(cropBoxData);
    cropper?.setCanvasData(canvasData);
  };

  /**
   *
   */
  const exportJSON = () => {
    const canvasData = cropper.getCanvasData();
    const cropBoxData = cropper.getCropBoxData();

    const state = {
      //! There's a bug in the aspectRatio of the canvas
      canvasData: Object.assign(canvasData, { aspectRatio: 1 }),
      cropBoxData,
    };

    // This may not even be relevant for now..
    setExportedState(state);

    // for now, save to localdb
    localStorage.setItem("exportedState", JSON.stringify(state));

    //TODO: use `sweetAlert` or something else .. snackbar?
    alert("Exported to localstorage..");
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
          // preview=".img-preview"
          guides={true}
          src={image}
          ref={imageRef}
          dragMode={"move"}
          checkOrientation={true} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance: Cropper) => setCropper(instance)}
        />
      </div>

      <div className="flex-auto flex space-x-3 mt-6 mb-6">
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

      <p>These exports and imports are read directly from localstorage </p>
      <div className="flex-auto flex space-x-3 mt-2">
        <button
          onClick={exportJSON}
          className="w-1/2 flex items-center justify-center rounded-md bg-black text-white"
          type="submit"
        >
          Export state JSON
        </button>
        <button
          onClick={() => importJSON()}
          className="w-1/2 flex items-center justify-center rounded-md bg-black text-white"
          type="submit"
        >
          Import state JSON
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
