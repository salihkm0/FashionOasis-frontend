// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Box,
//   TablePagination,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { fetchOrders } from "../../redux/ordersSlice";
// import { useDispatch, useSelector } from "react-redux";

// export const AllOrders = () => {
//   const [orderPage, setOrderPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const dispatch = useDispatch();
//   const { orders, loading, error } = useSelector((state) => state.orders);

//   useEffect(() => {
//     dispatch(fetchOrders());
//   }, [dispatch]);

//   const handleChangePage = (event, newPage, setPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setOrderPage(0);
//   };

//   console.log(orders);

//   const renderTable = (title, data, page, setPage) => (
//     <Box mb={4}>
//       <Typography variant="h6" gutterBottom>
//         {title}
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Order Id</TableCell>
//               {/* <TableCell>Customer</TableCell> */}
//               <TableCell>Products Count</TableCell>
//               <TableCell>Total Amount</TableCell>
//               <TableCell>Payment Status</TableCell>
//               <TableCell>Total Quantity</TableCell>
//               <TableCell>Total Tax</TableCell>
//               <TableCell>Payment Method</TableCell>
//               <TableCell>Order Status</TableCell>
//               {/* <TableCell>shippingAddress</TableCell> */}
//               <TableCell>Shipping Method</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((order) => (
//                 <TableRow key={order._id}>
//                   <TableCell>{order._id}</TableCell>
//                   <TableCell>{order.products.length}</TableCell>
//                   <TableCell>{order.totalAmount}</TableCell>
//                   <TableCell>{order.paymentStatus}</TableCell>
//                   <TableCell>{order.totalQuantity}</TableCell>
//                   <TableCell>{order.totalTax}</TableCell>
//                   <TableCell>{order.paymentMethod}</TableCell>
//                   <TableCell>{order.orderStatus}</TableCell>
//                   <TableCell>{order.shippingMethod}</TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={data.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={(event, newPage) =>
//             handleChangePage(event, newPage, setPage)
//           }
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </TableContainer>
//     </Box>
//   );

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         height="100vh"
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box p={2}>{renderTable("Orders", orders, orderPage, setOrderPage)}</Box>
//   );
// };


// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Box,
//   TablePagination,
//   Typography,
// } from "@mui/material";
// import { fetchOrders } from "../../redux/ordersSlice";
// import { useDispatch, useSelector } from "react-redux";

// export const AllOrders = () => {
//   const [orderPage, setOrderPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const dispatch = useDispatch();
//   const { orders, loading, error } = useSelector((state) => state.orders);

//   useEffect(() => {
//     dispatch(fetchOrders());
//   }, [dispatch]);

//   const handleChangePage = (event, newPage, setPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setOrderPage(0);
//   };

//   const renderTable = (title, data, page, setPage) => (
//     <Box mb={4}>
//       <Typography variant="h6" gutterBottom>
//         {title}
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Order Id</TableCell>
//               <TableCell>Customer Name</TableCell>
//               <TableCell>Customer Email</TableCell>
//               <TableCell>Products</TableCell>
//               <TableCell>Total Amount</TableCell>
//               <TableCell>Payment Status</TableCell>
//               <TableCell>Total Quantity</TableCell>
//               <TableCell>Total Tax</TableCell>
//               <TableCell>Payment Method</TableCell>
//               <TableCell>Order Status</TableCell>
//               <TableCell>Shipping Method</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((order) => (
//                 <TableRow key={order._id}>
//                   <TableCell>{order._id}</TableCell>
//                   <TableCell>{order.user.name}</TableCell>
//                   <TableCell>{order.user.email}</TableCell>
//                   <TableCell>
//                     {order.products.map((product) => (
//                       <Box key={product.product._id}>
//                         {product.product.name} (Qty: {product.quantity})
//                       </Box>
//                     ))}
//                   </TableCell>
//                   <TableCell>{order.totalAmount}</TableCell>
//                   <TableCell>{order.paymentStatus}</TableCell>
//                   <TableCell>{order.totalQuantity}</TableCell>
//                   <TableCell>{order.totalTax}</TableCell>
//                   <TableCell>{order.paymentMethod}</TableCell>
//                   <TableCell>{order.orderStatus}</TableCell>
//                   <TableCell>{order.shippingMethod}</TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={data.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={(event, newPage) =>
//             handleChangePage(event, newPage, setPage)
//           }
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </TableContainer>
//     </Box>
//   );

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         height="100vh"
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // Filter orders by status
//   const orderPlacedOrders = orders.filter(order => order.orderStatus === "order-placed");
//   const processingOrders = orders.filter(order => order.orderStatus === "processing");
//   const onTheWayOrders = orders.filter(order => order.orderStatus === "on-the-way");
//   const deliveredOrders = orders.filter(order => order.orderStatus === "delivered");
//   const cancelledOrders = orders.filter(order => order.orderStatus === "cancelled");

//   return (
//     <Box p={2}>
//       {renderTable("Order Placed", orderPlacedOrders, orderPage, setOrderPage)}
//       {renderTable("Processing", processingOrders, orderPage, setOrderPage)}
//       {renderTable("On The Way", onTheWayOrders, orderPage, setOrderPage)}
//       {renderTable("Delivered", deliveredOrders, orderPage, setOrderPage)}
//       {renderTable("Cancelled", cancelledOrders, orderPage, setOrderPage)}
//     </Box>
//   );
// };

// export default AllOrders;




import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  TablePagination,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchOrders } from "../../redux/ordersSlice";
import { useDispatch, useSelector } from "react-redux";

export const AllOrders = () => {
  const [orderPage, setOrderPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  // Menu state management
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleMenuOpen = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleEditOrder = () => {
    handleMenuClose();
    // Logic for editing the order
    console.log("Edit order:", selectedOrderId);
  };

  const handleDeleteOrder = () => {
    handleMenuClose();
    // Logic for deleting the order
    console.log("Delete order:", selectedOrderId);
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleChangePage = (event, newPage, setPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setOrderPage(0);
  };

  const renderTable = (title,hcolor, data, page, setPage) => (
    <Box mb={4}>

        <Typography variant="h6" sx={{color : hcolor}} gutterBottom>
        {title}
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Customer Email</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Total Quantity</TableCell>
              <TableCell>Total Tax</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Shipping Method</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>{order.user.email}</TableCell>
                  <TableCell>
                    {order.products.map((product) => (
                      <Box key={product.product._id}>
                        {product.product.name} (Qty: {product.quantity})
                      </Box>
                    ))}
                  </TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>{order.paymentStatus}</TableCell>
                  <TableCell>{order.totalQuantity}</TableCell>
                  <TableCell>{order.totalTax}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                  <TableCell>{order.shippingMethod}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleMenuOpen(event, order._id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleEditOrder}>Edit</MenuItem>
                      <MenuItem onClick={handleDeleteOrder}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) =>
            handleChangePage(event, newPage, setPage)
          }
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Filter orders by status
  const orderPlacedOrders = orders.filter(order => order.orderStatus === "order-placed");
  const processingOrders = orders.filter(order => order.orderStatus === "processing");
  const onTheWayOrders = orders.filter(order => order.orderStatus === "on-the-way");
  const deliveredOrders = orders.filter(order => order.orderStatus === "delivered");
  const cancelledOrders = orders.filter(order => order.orderStatus === "cancelled");

  return (
    <Box p={2}>
      {renderTable("Order Placed",'blue', orderPlacedOrders, orderPage, setOrderPage)}
      {renderTable("Processing", 'blue',processingOrders, orderPage, setOrderPage)}
      {renderTable("On The Way", 'blue',onTheWayOrders, orderPage, setOrderPage)}
      {renderTable("Delivered", 'green',deliveredOrders, orderPage, setOrderPage)}
      {renderTable("Cancelled", 'red',cancelledOrders, orderPage, setOrderPage)}
    </Box>
  );
};

export default AllOrders;