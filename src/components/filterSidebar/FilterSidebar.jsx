import React from "react";
import "./FilterSidebar.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import { FilterCategory } from "./FilterCategory";
import { FilterPrice } from "./FilterPrice";
import { FilterColors } from "./FilterColors";
export const FilterSidebar = ({ handleCategoryChange,handleColorChange,handlePriceRangeChange }) => {

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sx title-font text-gray-600">Fliters</p>
        <p className="text-sx title-font text-gray-600">
          <FilterListIcon />
        </p>
      </div>
      <div className=" ">
        <FilterCategory handleCategoryChange ={handleCategoryChange}/>
        <FilterPrice  handlePriceRangeChange = {handlePriceRangeChange}/>
        <FilterColors handleColorChange = {handleColorChange}/>
      </div>
    </>
  );
};
