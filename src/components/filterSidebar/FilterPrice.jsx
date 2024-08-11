import React from "react";
import FilterInput from "./FilterInput";

export const FilterPrice = ({ handlePriceRangeChange }) => {

  const handlePriceRangeChangeWrapper = (min, max) => {
    handlePriceRangeChange(min, max);
  };
  return (
    <>
      <h3 className="text-sx title-font text-gray-600 font-bold pt-3">Price</h3>
      <label className="filter-label flex items-center gap-3 mt-3">
        <input
          type="radio"
          onChange={() => handlePriceRangeChangeWrapper(0, Infinity)}
          name="price"
          value=""
          className="filter-radio-select"
        />
        <div className="filter-checkmark" />
        All
      </label>

      <label className="filter-label flex items-center gap-3 mt-3">
        <input
          type="radio"
          onChange={() => handlePriceRangeChangeWrapper(0, 100)}
          name="price"
          value=""
          className="filter-radio-select"
        />
        <div className="filter-checkmark" />
        $0 - $100
      </label>

      <label className="filter-label flex items-center gap-3 mt-3">
        <input
          type="radio"
          onChange={() => handlePriceRangeChangeWrapper(100, 200)}
          name="price"
          value=""
          className="filter-radio-select"
        />
        <div className="filter-checkmark" />
        $100 - $200
      </label>

      <label className="filter-label flex items-center gap-3 mt-3">
        <input
          type="radio"
          onChange={() => handlePriceRangeChangeWrapper(200, 300)}
          name="price"
          value=""
          className="filter-radio-select"
        />
        <div className="filter-checkmark" />
        $200 - $300
      </label>

      <label className="filter-label flex items-center gap-3 mt-3">
        <input
          type="radio"
          onChange={() => handlePriceRangeChangeWrapper(300, 400)}
          name="price"
          value=""
          className="filter-radio-select"
        />
        <div className="filter-checkmark" />
        $300 - $400
      </label>

      <label className="filter-label flex items-center gap-3 mt-3">
        <input
          type="radio"
          onChange={() => handlePriceRangeChangeWrapper(400, Infinity)}
          name="price"
          value=""
          className="filter-radio-select"
        />
        <div className="filter-checkmark" />
        $400+
      </label>
    </>
  );
};
