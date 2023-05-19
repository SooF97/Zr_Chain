import React from "react";

import Feed from "./components/Feed";

const Home = () => {
  return (
    <section className="w-full flex flex-col items-center px-4 md:px-8 lg:px-16 py-8">
      <h1 className=" orange_gradient head_text text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Welcome to ZR Chain
        <br className="hidden md:inline" />
        <span className="text-white block mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Securing Documents & empowering trust using blockchain technology
          <br className="hidden md:inline" />
          <span className="text-white block mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl">
            This project is part of the doctoral research being conducted by
            Hamza ZRAIMEK, under the supervision of Professor El Mehdi Ferrouhi.
          </span>
        </span>
      </h1>
      <p className="desc text-center mt-4 text-sm sm:text-base md:text-lg lg:text-xl">
        Laboratory of Economy and Management of Organizations
      </p>
      <Feed />
    </section>
  );
};

export default Home;
