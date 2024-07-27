import "./Products.css";
import { useNavigate } from "react-router-dom";
import { FilterButton } from "./FilterButton";
import CustomPagination from "../pagination/CustomPagination.jsx";
import { useState } from "react";

const Products = ({
  result,
  handleMainCategoryClick,
  handlePriceSortChange,
  priceSort,
}) => {
  // const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const itemsPerPage = productsPerPage;

  const handleProductsPerPage = (e) => {
    setProductsPerPage(e.target.value);
  };


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Paginate the result data
  const paginatedResult = result.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(result.length / itemsPerPage);

  return (
    <>
      {/* <section className="card-container">{result}</section> */}
      <div className="w-3/4 sm:w-full">
        <div className="filter-controller-flex md:flex justify-between items-center">
          <div className="flex gap-5 px-4 w-1/2">
            <FilterButton
              handleClick={handleMainCategoryClick}
              title="All"
              value=""
            />
            <FilterButton
              handleClick={handleMainCategoryClick}
              title="Men"
              value="men"
            />
            <FilterButton
              handleClick={handleMainCategoryClick}
              title="Women"
              value="women"
            />
            <FilterButton
              handleClick={handleMainCategoryClick}
              title="Kids"
              value="kids"
            />
          </div>
          <div className="filter-dropdown ">
            <select
              name="filter-dropdown"
              id="filter-dropdown"
              onChange={handlePriceSortChange}
              value={priceSort}
            >
              <option value="">Select</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>
        {paginatedResult.length > 0 ? (
          <>
            <div className="flex flex-wrap sm:p-1 gap-2 mt-10">
              {paginatedResult}
            </div>
            <CustomPagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              handleProductsPerPage = {handleProductsPerPage}
            />
          </>
        ) : (
          <p className="w-full h-full flex justify-center items-center font-bold text-lg">
            Products not Available Now. Please check later....
          </p>
        )}

        
      </div>
    </>
  );
};

export default Products;
