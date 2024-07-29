import React, { useState } from "react";
import Products from "../components/products/Products";
import { FilterSidebar } from "../components/filterSidebar/FilterSidebar";
import { productData } from "../Data/Data";
import { ProductCard } from "../components/productCard/ProductCard";
import { useSelector } from "react-redux";

export const AllProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [priceSort, setPriceSort] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  const { products} = useSelector((state) => state.products);

  console.log(products)


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


  function filteredData(products, selectedSubSubCategory, selectedColor, priceSort, priceRange,selectedCategory) {
    let filteredProducts = products;

    // Applying category filter
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Applying sub category filter
    if (selectedSubSubCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.subSubCategory === selectedSubSubCategory
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
        (product) => product.offerPrice >= priceRange.min && product.offerPrice <= priceRange.max
      );
    }

    // Applying price sorting
    if (priceSort) {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (priceSort === "low-to-high") {
          return a.offerPrice - b.offerPrice;
        } else if (priceSort === "high-to-low") {
          return b.offerPrice - a.offerPrice;
        }
        return 0;
      });
    }
    return filteredProducts.map(({ imageUrls, name, price ,color,subCategory,quantity,category,brand ,_id, offerPrice}) => (
      <ProductCard
        key={Math.random()}
        image={imageUrls[0]}
        name={name}
        price={price}
        color = {color}
        subCategory = {subCategory}
        quantity ={quantity}
        category ={category}
        brand = {brand}
        offerPrice ={offerPrice}
        id ={_id}
      />
    ));
  }

  const result = filteredData(products, selectedSubSubCategory, selectedColor, priceSort, priceRange,selectedCategory);

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
