const FilterInput = ({ handleChange, value, title, name, color }) => {
    return (
      <label className="filter-label flex items-center gap-3 mt-3">
      <input onChange={handleChange} type="radio" value={value} name={name} id="" className="filter-radio-select" />
      <div className="filter-checkmark" style={{ backgroundColor: color }}/>
      {title}
    </label>
    );
  };
  
  export default FilterInput;