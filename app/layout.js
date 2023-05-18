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
        <link rel="icon" href="public/assetss/images/favicon.ico" />
        {/* You can add more head tags here as needed */}
      </Head>
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
    </>
  );
};

export default RootLayout;
