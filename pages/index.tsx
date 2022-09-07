import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Nitai Charan | Portifolio</title>
        <meta name="description" content="Nitai Charan portifolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="mb-20 text-7xl font-bold">Nitai Charan</h1>
              <h2 className="text-5xl font-thin">Full-stack engineer</h2>
      </main>
    </div>
  );
};

export default Home;
