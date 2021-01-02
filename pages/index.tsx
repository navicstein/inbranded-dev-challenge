import Head from "next/head";
import ImageEditor from "../components/ImageEditor";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>FRONT END DEVELOPER CHALLENGE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-6 max-w-lg mt-12 mx-auto bg-white rounded-xl shadow-md  space-x-4">
        Your coding challenge is to build a web-based UI that allows
        manipulating image in a container based on the following specifications:
        <ol>
          <li>
            The UI should accept the image using either file select or
            drag-and-drop. ✅
          </li>
          <li>
            The UI should support resizing and repositioning of the image using
            mouse drag or touchmove(for mobile). ✅
          </li>
          <li>
            The UI should support rotating the image up to 359 deg either
            clockwise or counterclockwise. ✅
          </li>
          <li>
            The UI state should be exportable to JSON, and importable from the
            previously exported JSON. ✅
          </li>
          <li>
            The UI should work on both Desktop and Mobile ie be responsive. ✅
          </li>
        </ol>
        <br />
        <ImageEditor />
      </div>
    </div>
  );
}
