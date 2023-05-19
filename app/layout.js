import "../styles/globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      <video
        autoPlay
        loop
        muted
        className="fixed z-0 w-auto min-h-full min-w-full"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <source src="/blockchain.mp4" type="video/mp4" />

        <body>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}
            <Footer />
          </main>
        </body>
      </video>
    </>
  );
};

export default RootLayout;
