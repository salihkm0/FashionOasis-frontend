import React, { useEffect, useState } from "react";
import { Button, IconButton, Menu, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const SellerProducts = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  const fetchSellerProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5555/api/v1/products`,{
        withCredentials : true
      });
      if (res.data.products) {
        setAllProducts(res.data.products);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
      console.log(error);
    }
  };
  const handleProductDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5555/api/v1/product/delete/${id}`, { withCredentials: true });
      if (res.data.success) {
        toast.success("Product Successfully Deleted");
        fetchSellerProducts();
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
    fetchSellerProducts();
  }, []);

  return (
    <div className="mx-[5%] my-[50px]">
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>Seller Product List</h2>
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

export default SellerProducts;
