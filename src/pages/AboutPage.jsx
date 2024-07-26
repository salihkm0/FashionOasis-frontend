import React from "react";

const About = () => {
  return (
    <section className="h-[100vh] bg-gray-100 py-12 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mt-[40px] mb-4">
          About FashionOasis
        </h1>
        <p className="text-lg text-gray-700 mb-6 mt-[40px]">
          Welcome to{" "}
          <span className="font-semibold text-indigo-600">FashionOasis</span> –
          your ultimate destination for the latest trends and timeless classics
          in fashion. Our e-commerce platform offers a curated selection of
          high-quality clothing, accessories, and footwear for every style and
          occasion.
        </p>
        <p className="text-lg text-gray-700 mb-6 mt-[40px]">
          At FashionOasis, we believe that fashion should be both stylish and
          accessible. That’s why we’ve designed our website to provide a
          seamless shopping experience, from discovering your favorite pieces to
          checking out with ease. Explore our diverse range of products, from
          chic outfits and elegant accessories to casual wear and trendy
          footwear.
        </p>
        <p className="text-lg text-gray-700 mt-[40px]">
          Our commitment to quality and customer satisfaction sets us apart. We
          partner with top brands and designers to bring you the best in
          fashion, all while offering exceptional customer service. Whether
          you're shopping for a special event or updating your everyday
          wardrobe, FashionOasis is here to make your fashion journey effortless
          and enjoyable.
        </p>
        <p className="mt-8 text-lg font-semibold text-gray-900 mt-[40px]">
          Join us at FashionOasis and find your fashion oasis today!
        </p>
      </div>
    </section>
  );
};

export default About;
