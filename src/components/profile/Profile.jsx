// src/components/Profile.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../redux/authSlice';
// import { fetchCurrentUser } from '../../redux/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === 'idle') {
      // dispatch(fetchCurrentUser());
      dispatch(fetchUserProfile());
      
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    user ? (
      <div>
        <img src={user.image} alt={user.displayName} />
        <h2>{user.displayName}</h2>
        <p>{user.email}</p>
      </div>
    ) : (
      <p>No user is signed in</p>
    )
  );
};

export default Profile;
