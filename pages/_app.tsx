import "../public/styles.css";
import { useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div id="noise">
      <Head>
        <title>FRONT END DEVELOPER CHALLENGE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="container">
        <Component {...pageProps} />;
      </div>
    </div>
  );
}

export default MyApp;
