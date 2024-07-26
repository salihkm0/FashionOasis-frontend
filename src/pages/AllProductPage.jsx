import React, { useState } from "react";
import Products from "../components/products/Products";
import { FilterSidebar } from "../components/filterSidebar/FilterSidebar";
import { productData } from "../Data/Data";
import { ProductCard } from "../components/productCard/ProductCard";

export const AllProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [priceSort, setPriceSort] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });



  // console.log('main cat:' ,selectedCategory , "sub: " ,selectedSubCategory , "color : ", selectedColor,"priceSort :" ,priceSort, "priceRange :" ,priceRange ) //for debug


  // ----------- Input Filter Search -----------
  // const handleInputChange = (event) => {
  //   setQuery(event.target.value);
  // };

  // const filteredItems = productData.filter(
  //   (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  // );


 // ------------ Button Filtering -----------
  const handleMainCategoryClick = (event) => {
    setSelectedCategory(event.target.value);
  };


  //---------Category Filtering------
  const handleCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value);
  };

  //---------Color Filtering------
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  //----------Dropdown Filtering------
  const handlePriceSortChange = (event) => {
    setPriceSort(event.target.value);
  };

 //--------Price Range Filtering------
  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
  };


  function filteredData(productData, selectedSubCategory, selectedColor, priceSort, priceRange,selectedCategory) {
    let filteredProducts = productData;

    // Applying category filter
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Applying sub category filter
    if (selectedSubCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.subCategory === selectedSubCategory
      );
    }

    // Applying color filter
    if (selectedColor) {
      filteredProducts = filteredProducts.filter(
        (product) => product.color === selectedColor
      );
    }

    //Applying price range filter
    if (priceRange.min !== null && priceRange.max !== null) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= priceRange.min && product.price <= priceRange.max
      );
    }

    // Applying price sorting
    if (priceSort) {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (priceSort === "low-to-high") {
          return a.price - b.price;
        } else if (priceSort === "high-to-low") {
          return b.price - a.price;
        }
        return 0;
      });
    }
    return filteredProducts.map(({ image, title, price ,color,subCategory,quantity,category}) => (
      <ProductCard
        key={Math.random()}
        image={image}
        title={title}
        price={price}
        color = {color}
        subCategory = {subCategory}
        quantity ={quantity}
        category ={category}
      />
    ));
  }



  const result = filteredData(productData, selectedSubCategory, selectedColor, priceSort, priceRange,selectedCategory);

  return (
    <>
      <section className="text-gray-600 body-font pt-5 mt-10">
        <h1 className="text-center text-xl title-font text-gray-600 font-bold">
          Our Shop
        </h1>
        <div className=" px-5 py-5 my-5 mx-auto flex w-full justify-center">
          <div className="w-1/4 xs:hidden sm:hidden md: px-5 sm:px-2 filter-controller">
            <FilterSidebar 
              handleCategoryChange={handleCategoryChange}
              handleColorChange={handleColorChange}
              handlePriceRangeChange={handlePriceRangeChange} 
              />
          </div>
          <Products handleMainCategoryClick={handleMainCategoryClick} result={result} handlePriceSortChange={handlePriceSortChange} priceSort = {priceSort}/>
        </div>
      </section>
    </>
  );
};
