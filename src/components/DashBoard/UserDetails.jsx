import React from 'react'
import userprofile from '../../assets/images/user-profile.svg';
import { useNavigate } from 'react-router-dom';

export default function UserDetails({ username }) {

  const navigate = useNavigate();

  const logoutHandle = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  }

  return (
	<div className="user-profile-card">
      <div className="user-info">
        <img src={userprofile} alt="User Icon" className="user-icon" />
        <span className="username">{username}</span>
      </div>
      <button className="logout-btn" onClick={logoutHandle}>Logout</button>
    </div>
  )
}
