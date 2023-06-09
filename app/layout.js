import "../styles/globals.css";

import Navbar from "./components/Navbar";

import Head from "next/head";

export const metadata = {
  title: "Official ZR Chain Decentralized Application",
  description: "Official ZR Chain Decentralized Application",
};

const RootLayout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* You can add more head tags here as needed */}
      </Head>

      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Navbar />
          {children}
        </main>
      </body>
    </>
  );
};

export default RootLayout;
