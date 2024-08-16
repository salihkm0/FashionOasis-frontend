
// import axios from "axios";
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

// export const FetchAllUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [adminPage, setAdminPage] = useState(0);
//   const [sellerPage, setSellerPage] = useState(0);
//   const [customerPage, setCustomerPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:5555/api/v1/admin/all-users", {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         setUsers(res.data.users);
//         setLoading(false);
//       } else {
//         alert(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const admins = users.filter(user => user.role === 'admin');
//   const sellers = users.filter(user => user.role === 'seller');
//   const customers = users.filter(user => user.role === 'customer');

//   const handleChangePage = (event, newPage, setPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setAdminPage(0);
//     setSellerPage(0);
//     setCustomerPage(0);
//   };

//   const renderTable = (title, data, page, setPage) => (
//     <Box mb={4}>
//       <Typography variant="h6" gutterBottom>{title}</Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Role</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
//               <TableRow key={user._id}>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={data.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={(event, newPage) => handleChangePage(event, newPage, setPage)}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </TableContainer>
//     </Box>
//   );

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box p={2}>
//       {renderTable("Admins", admins, adminPage, setAdminPage)}
//       {renderTable("Sellers", sellers, sellerPage, setSellerPage)}
//       {renderTable("Customers", customers, customerPage, setCustomerPage)}
//     </Box>
//   );
// };

// export default FetchAllUsers;



import axios from "axios";
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

export const FetchAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adminPage, setAdminPage] = useState(0);
  const [sellerPage, setSellerPage] = useState(0);
  const [customerPage, setCustomerPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5555/api/v1/admin/all-users", {
        withCredentials: true,
      });
      if (res.data.success) {
        setUsers(res.data.users);
        setLoading(false);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const admins = users.filter(user => user.role === 'admin');
  const sellers = users.filter(user => user.role === 'seller');
  const customers = users.filter(user => user.role === 'customer');

  const handleChangePage = (event, newPage, setPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setAdminPage(0);
    setSellerPage(0);
    setCustomerPage(0);
  };

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleEdit = () => {
    // Implement your edit functionality here
    console.log("Edit user:", selectedUser);
    handleMenuClose();
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:5555/api/v1/admin/delete-user/${selectedUser._id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setUsers(users.filter(user => user._id !== selectedUser._id));
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    handleMenuClose();
  };

  const renderTable = (title, data, page, setPage) => (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(event) => handleMenuOpen(event, user)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
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
          onPageChange={(event, newPage) => handleChangePage(event, newPage, setPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={2}>
      {renderTable("Admins", admins, adminPage, setAdminPage)}
      {renderTable("Sellers", sellers, sellerPage, setSellerPage)}
      {renderTable("Customers", customers, customerPage, setCustomerPage)}
    </Box>
  );
};

export default FetchAllUsers;
