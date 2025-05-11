import Head from "next/head";
import Header from "../components/Header";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>InfraFix: Report Broken Public Infrastructure</title>
        <meta
          name="description"
          content="Report and locate broken public infrastructure."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
