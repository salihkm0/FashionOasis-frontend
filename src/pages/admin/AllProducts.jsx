// import { Button, Stack } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   ListBtn,
//   ListBtnWrapper,
//   ListPageBarWrpper,
//   ListPageHead,
//   ListTable,
//   ListWrapper,
// } from "../../styles/ListStyle";

// export const AllProducts = () => {
//   const [allProducts, setAllProducts] = useState({});

//   const { products, productStatus, error } = useSelector(
//     (state) => state.products
//   );

//   const handleSetProducts = () => {
//     setAllProducts(products);
//   };

//   const handelProductDelete = async (id) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:5555/api/v1/product/delete/${id}`,
//         {
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         toast.success("Product Successfully Deleted");
//         handleSetProducts();
//       }
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     handleSetProducts();
//   }, [allProducts, products]);

//   return (
//     <div className="mx-[5%] my-[50px]">
//       <ListPageBarWrpper>
//         <ListPageHead>Product List</ListPageHead>
//         <Link
//           to={"/products/add"}
//           className="text-xl p-2 rounded-[4px] bg-green-500 text-white hover:bg-green-600"
//         >
//           Add Product
//         </Link>
//       </ListPageBarWrpper>
//       <ListWrapper>
//         <ListTable>
//           <thead>
//             <tr>
//               <th scope="col">Index</th>
//               <th scope="col">Title</th>
//               <th scope="col">Description</th>
//               <th scope="col">Sizes</th>
//               <th scope="col">Brand</th>
//               <th scope="col">Price</th>
//               <th scope="col">offerPrice</th>
//               <th scope="col">isFeatured</th>
//               <th scope="col">isTaxable</th>
//               <th scope="col">Sold</th>
//               <th scope="col">Category</th>
//               <th scope="col">Seller</th>
//               <th scope="col">Offer</th>
//               <th scope="col">Edit/Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((prod, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{prod.name}</td>
//                 <td>{prod.description}</td>
//                 <td>
//                   {prod.sizes &&
//                     prod.sizes.map(
//                       (size) => `${size.size} : ${size.quantity} , `
//                     )}
//                 </td>
//                 <td>{prod.brand}</td>
//                 <td>{prod.price.toFixed(2)}</td>
//                 <td>{prod.offerPrice.toFixed(2)}</td>
//                 <td>{prod.isFeatured ? "Yes" : "No"}</td>
//                 <td>{prod.isTaxable ? "Yes" : "No"}</td>
//                 <td>{prod.sold}</td>
//                 <td>{prod.category}</td>
//                 <td></td>
//                 <td>
//                   {prod.offer && `${prod.offer.type} : ${prod.offer.value}`}
//                 </td>
//                 <td>
//                   <ListBtnWrapper>
//                     <Link to={`/products/update/${prod._id}`}>
//                       <ListBtn $orange type="button" class="btn btn-primary">
//                         Edit
//                       </ListBtn>
//                     </Link>
//                     <ListBtn
//                       onClick={() => handelProductDelete(prod._id)}
//                       $red
//                       type="button"
//                       class="btn btn-primary"
//                     >
//                       Delete
//                     </ListBtn>
//                   </ListBtnWrapper>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </ListTable>
//       </ListWrapper>
//     </div>
//   );
// };



import React, { useEffect, useState } from "react";
import { Button, IconButton, Menu, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export const AllProducts = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  const { products, productStatus, error } = useSelector((state) => state.products);

  const handleSetProducts = () => {
    setAllProducts(products);
  };

  const handleProductDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5555/api/v1/product/delete/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Product Successfully Deleted");
        handleSetProducts();
      }
    } catch (error) {
      toast.error("Failed to delete the product");
      console.log(error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedProductId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProductId(null);
  };

  useEffect(() => {
    handleSetProducts();
  }, [products]);

  return (
    <div className="mx-[5%] my-[50px]">
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>Product List</h2>
        <Link to="/products/add">
          <Button variant="contained" color="primary">
            Add Product
          </Button>
        </Link>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((prod, index) => (
              <TableRow key={prod._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{prod.name}</TableCell>
                <TableCell>{prod.description}</TableCell>
                <TableCell>{prod.price.toFixed(2)}</TableCell>
                <TableCell>{prod.category}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuOpen(event, prod._id)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedProductId === prod._id}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleMenuClose()}>
                      <Link to={`/products/update/${prod._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        Edit
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={() => { handleProductDelete(prod._id); handleMenuClose(); }}>
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={allProducts.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};

export default AllProducts;
