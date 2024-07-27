// src/components/LogoutButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { clearUser } from '../../redux/authSlice';

const GoogleLogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.post('http://localhost:5555/api/v1/logout',{
      withCredentials: true
    });
    dispatch(clearUser());
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default GoogleLogoutButton;
