import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageCrop
);

// Our app
function uploadFilePage() {
  const [files, setFiles] = useState([]);
  return (
    <Fragment>
      <div>
        <div className="container">
          Your coding challenge is to build a web-based UI that allows
          manipulating image in a container based on the following
          specifications:
          <ol>
            <li>
              The UI should accept the image using either file select or
              drag-and-drop. ✅
            </li>
            <li>
              The UI should support resizing and repositioning of the image
              using mouse drag or touchmove(for mobile).
            </li>
            <li>
              The UI should support rotating the image up to 359 deg either
              clockwise or counterclockwise.
            </li>
            <li>
              The UI state should be exportable to JSON, and importable from the
              previously exported JSON.
            </li>
            <li>
              The UI should work on both Desktop and Mobile ie be responsive.
            </li>
          </ol>
          <br />
          <br />
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={true}
            instantUpload={false}
            maxFiles={3}
            allowReorder={true}
            allowProcess={true}
            // server="/api"
            name="files"
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
          {/* sets the file input name, it's filepond by default */}
        </div>
      </div>
    </Fragment>
  );
}

export default React.memo(uploadFilePage);
