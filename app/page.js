import React from "react";

import Feed from "./components/Feed";

const Home = () => {
  return (
    <section className="w-full flex flex-col items-center px-4 md:px-8 lg:px-16 py-8">
      <h1 className=" orange_gradient head_text text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Welcome to ZR Chain
        {/* <br className="hidden md:inline" />
        <span className="orange_gradient block mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Legalization of documents in the blockchain
        </span> */}
      </h1>
      {/* <p className="desc text-center mt-4 text-sm sm:text-base md:text-lg lg:text-xl">
        This is a scientific project...
      </p> */}
      <Feed />
    </section>
  );
};

export default Home;
