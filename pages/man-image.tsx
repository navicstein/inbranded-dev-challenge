import React, { useState, Fragment } from "react";
import ImageEditor from "../components/ImageEditor";

// Our app
function uploadFilePage() {
  return (
    <Fragment>
      <div className="p-6 max-w-lg mt-12 mx-auto bg-white rounded-xl shadow-md  space-x-4">
        <br />
        <ImageEditor />
      </div>
    </Fragment>
  );
}

export default React.memo(uploadFilePage);
