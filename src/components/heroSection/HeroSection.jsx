// import React from "react";
// import heroImg from "../../assets/images/hero1.png"
// export const HeroSection = () => {
//   return (
//     <>
//       <img className=" h-40 lg:h-full" src={heroImg} alt="Hero Image" />
//     </>
//   );
// };

import React from "react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/02/41/43/18/360_F_241431868_8DFQpCcmpEPVG0UvopdztOAd4a6Rqsoo.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Welcome to Our Shop
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Discover the best products at amazing prices
        </p>
        <Link to="/shop" className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300">
          Shop Now
        </Link>
      </div>
    </section>
  );
};
