import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      fetchProfilePicture();
    }
  }, [user]);

  const fetchProfilePicture = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${user.id}`);
      if (response.data && response.data.profilePicture) {
        setProfilePicture(response.data.profilePicture);
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      try {
        await axios.patch(`http://localhost:5000/users/${user.id}`, {
          profilePicture: base64
        });
        setProfilePicture(base64);
      } catch (error) {
        console.error('Error updating profile picture:', error);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <div className="profile-info">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Profile"
            className="profile-picture"
            onClick={() => document.getElementById('profilePicInput').click()}
          />
        ) : (
          <button onClick={() => document.getElementById('profilePicInput').click()}>
            Add Profile Picture
          </button>
        )}
        <input
          type="file"
          accept="image/*"
          id="profilePicInput"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <div className="user-details">
          <h3>{user?.username}</h3>
          <p>User ID: {user?.id}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;