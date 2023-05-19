import React from "react";

const about = () => {
  return (
    <section className="w-full flex flex-col items-center px-4 md:px-8 lg:px-16 py-8">
      <h1 className=" orange_gradient head_text text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Legalization of documents in blockchain
        <br className="hidden md:inline" />
        <span className="text-orange-200 block mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl">
          - ZRCHAIN -
          <br className="hidden md:inline" />
          <span className="text-white block mt-4 text-lg sm:text-xl md:text-2xl lg:text-xl">
            This decentralized application (dApp), built on the blockchain,
            utilizes smart contracts to facilitate the creation, authentication,
            verification, legalization and management of documents. This
            innovative dApp empowers users to mint documents directly onto the
            blockchain, providing a secure, transparent, and immutable record.
            The use of smart contracts automates the process, enabling a
            trustless environment for the verification and validation of these
            digital documents. This dApp not only revolutionizes how we handle
            documents but also increases their reliability and accessibility
            within the blockchain ecosystem.
          </span>
        </span>
      </h1>
    </section>
  );
};

export default about;
