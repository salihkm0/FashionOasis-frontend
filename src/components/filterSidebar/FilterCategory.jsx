import React from "react";
import FilterInput from "./FilterInput";

export const FilterCategory = ({ handleCategoryChange }) => {
  return (
    <>
      <h3 className="text-sx title-font text-gray-600 font-bold pt-3">
        Category
      </h3>
      <label className="filter-label flex items-center gap-3 mt-3">
        <input type="radio" onChange={handleCategoryChange} name="category" value= "" id="" className="filter-radio-select" />
        <div className="filter-checkmark" />
        All
      </label>

      <FilterInput 
      handleChange={handleCategoryChange}
      value="tshirts"
      title="T Shirt"
      name="category"
      />
      <FilterInput 
      handleChange={handleCategoryChange}
      value="shirts"
      title="Shirt"
      name="category"
      />
      <FilterInput 
      handleChange={handleCategoryChange}
      value="pants"
      title="Pants"
      name="category"
      />
      <FilterInput 
      handleChange={handleCategoryChange}
      value="shoes"
      title="Shoes"
      name="category"
      />
    </>
  );
};
