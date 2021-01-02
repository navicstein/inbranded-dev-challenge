import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>FRONT END DEVELOPER CHALLENGE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex-auto text-xl font-semibold">
        <h1>
          Welcome to <a href="https://nextjs.org">DEVELOPER CHALLENGE</a>
        </h1>
      </div>
    </div>
  );
}
