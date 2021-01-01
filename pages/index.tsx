import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>FRONT END DEVELOPER CHALLENGE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h4 className="title">
          Welcome to <a href="https://nextjs.org">DEVELOPER CHALLENGE</a>
        </h4>
      </main>
    </div>
  );
}
