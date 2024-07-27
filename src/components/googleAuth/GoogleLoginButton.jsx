// src/components/LoginButton.js
import React from 'react';

const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5555/api/v1/auth/google';
  };

  return <button onClick={handleLogin}>Log In with Google</button>;
};

export default GoogleLoginButton;
