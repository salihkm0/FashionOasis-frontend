// src/components/Login.js
import React from 'react';

const GithubLogin = () => {
  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:5555/api/v1/auth/github';
  };

  return (
    <div>
        <button onClick={handleGitHubLogin} className="w-full p-2 border rounded-md flex justify-center items-center gap-2 shadow-xl">
        <img
        className="w-[20px]"
        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
        alt="google"
      />

      Login with Github
    </button>
    </div>
  );
};


export default GithubLogin;
