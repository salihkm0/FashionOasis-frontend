// src/components/LoginButton.js
import React from "react";

const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.location.href = "https://fashionoasis-backend.onrender.com/api/v1/auth/google";
  };

  return (
    <button onClick={handleLogin} className="w-full p-2 border rounded-md flex justify-center items-center gap-2 shadow-xl">
      <img
        className="w-[30px]"
        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        alt="google"
      />

      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
