import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Avatar, Menu, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import GoogleLogoutButton from '../logoutButton/LogoutButton';

const Navbar2 = () => {
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {

    setAnchorEl(null);
  };

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', to: '/', current: true },
    { name: 'Shop', to: '/shop', current: false },
    { name: 'About', to: '/about', current: false },
    { name: 'Cart', to: '/user/cart', current: false },
  ];

  if (user) {
    navLinks.push({ name: 'Orders', to: '/user/my-orders', current: false });
    if (user.role === 'admin') {
      navLinks.push({ name: 'Admin Dashboard', to: '/admin/dashboard', current: false });
    } else if (user.role === 'seller') {
      navLinks.push({ name: 'Seller Dashboard', to: '/seller/dashboard', current: false });
    }
  }

  return (
    <AppBar position="fixed" sx={{bgcolor : "#2178c9r43"}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          FashionOasis
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Button key={link.name} component={Link} to={link.to} color="inherit">
              {link.name}
            </Button>
          ))}
        </Box>
        {/* <IconButton color="inherit" sx={{ ml: 2 }}>
          <SearchIcon />
        </IconButton> */}
        {user ? (
          <Box sx={{ ml: 2 }}>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar alt={user.name} src={user.avatarUrl} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{}}
            >
              <MenuItem onClick={handleMenuClose} component={Link} to="/user/profile">Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button component={Link} to="/login" color="inherit" sx={{ ml: 2 }}>
            Login
          </Button>
        )}
        <Box sx={{ display: { xs: 'flex', md: 'none' },}}>
          <IconButton color="inherit" onClick={handleMobileMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={mobileMenuOpen}
            onClose={handleMobileMenuClose}
          >
            {navLinks.map((link) => (
              <MenuItem key={link.name} onClick={handleMobileMenuClose} component={Link} to={link.to}>
                {link.name}
              </MenuItem>
            ))}
            {user && (
              <>
                <MenuItem onClick={handleMobileMenuClose} component={Link} to="/user/my-orders">
                  Orders
                </MenuItem>
                {user.role === 'admin' && (
                  <MenuItem onClick={handleMobileMenuClose} component={Link} to="/admin/dashboard">
                    Admin Dashboard
                  </MenuItem>
                )}
                {user.role === 'seller' && (
                  <MenuItem onClick={handleMobileMenuClose} component={Link} to="/seller/dashboard">
                    Seller Dashboard
                  </MenuItem>
                )}
                <MenuItem onClick={handleMobileMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMobileMenuClose}>
                <GoogleLogoutButton />
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar2;


