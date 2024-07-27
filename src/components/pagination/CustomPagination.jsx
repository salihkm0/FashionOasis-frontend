import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const CustomPagination = ({ count, page, onChange ,handleProductsPerPage}) => {
  return (
    <Stack spacing={2} direction={'row'} justifyContent={'center'} alignItems={'center'} className="mt-4">
      <>
        <div className="border rounded-[4px] border-gray-400 p-1">
          <label htmlFor="ProductsPerPage">Products Per Page:   </label>
          <select
            name="ProductsPerPage"
            id="ProductsPerPage"
            onChange={handleProductsPerPage}
          >
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
            <option value="20">20</option>
          </select>
        </div>
      </>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        variant="outlined"
        shape="rounded"
        color="secondary"
        className="mx-auto"
      />
      
    </Stack>
  );
};

export default CustomPagination;
