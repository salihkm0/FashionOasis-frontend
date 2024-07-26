import React from "react";
import FilterInput from "./FilterInput";

export const FilterColors = ({handleColorChange}) => {
  return (
    <>
      <h3 className="text-sx title-font text-gray-600 font-bold pt-3">Colors</h3>
      <label className="filter-label flex items-center gap-3 mt-3">
        <input type="radio" onChange={handleColorChange} name="color" value= "" id="" className="filter-radio-select" />
        <div className="filter-checkmark allColor" />
        All
      </label>

      <FilterInput 
      handleChange={handleColorChange}
      value="blue"
      title="Blue"
      name="color"
      color="blue"
      />
      <FilterInput 
      handleChange={handleColorChange}
      value="red"
      title="Red"
      name="color"
      color="red"
      />
      <FilterInput 
      handleChange={handleColorChange}
      value="green"
      title="Green"
      name="color"
      color="green"
      />
      <FilterInput 
      handleChange={handleColorChange}
      value="yellow"
      title="Yellow"
      name="color"
      color="yellow"
      />
      <FilterInput 
      handleChange={handleColorChange}
      value="orange"
      title="Orange"
      name="color"
      color="orange"
      />



      {/* <label className="filter-label flex items-center gap-3 mt-3">
        <input
          type="radio"
          name="color"
          id=""
          className="filter-radio-select"
        />
        <div className="filter-checkmark" />
        Blue
      </label>
      <label className="filter-label flex items-center gap-3 mt-3">
        <input
          type="radio"
          name="color"
          id=""
          className="filter-radio-select"
        />
        <div className="filter-checkmark" />
        Red
      </label>
      <label className="filter-label flex items-center gap-3 mt-3">
        <input
          type="radio"
          name="color"
          id=""
          className="filter-radio-select"
        />
        <div className="filter-checkmark" />
        Green
      </label>
      <label className="filter-label flex items-center gap-3 mt-3">
        <input
          type="radio"
          name="color"
          id=""
          className="filter-radio-select"
        />
        <div className="filter-checkmark" />
        Yellow
      </label>
      <label className="filter-label flex items-center gap-3 mt-3">
        <input
          type="radio"
          name="color"
          id=""
          className="filter-radio-select"
        />
        <div className="filter-checkmark" />
        Purple
      </label>
      <label className="filter-label flex items-center gap-3 mt-3">
        <input
          type="radio"
          name="color"
          id=""
          className="filter-radio-select"
        />
        <div className="filter-checkmark" />
        Pink
      </label>
      <label className="filter-label flex items-center gap-3 mt-3">
        <input
          type="radio"
          name="color"
          id=""
          className="filter-radio-select"
        />
        <div className="filter-checkmark" />
        Orange
      </label> */}
    </>
  );
};
