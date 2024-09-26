import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profile from '../../assets/images/bx-user-circle.svg';
import NotificationBoard from "./NotificationBoard";
import { token } from "../../App";
import { jwtDecode } from "jwt-decode";
import UserDetails from "./UserDetails";
import { getAdminByUsername } from "../../services/ApiService";

export default function DashboardHeader({ toggleSidebar }) {

	const [isDarkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState({});

	const handleModeChange = (e) => {
		setDarkMode(e.target.checked);
		if (e.target.checked) {
		  document.body.classList.add('dark');
		} else {
		  document.body.classList.remove('dark');
		}
	  };

    const toggleNotification = () => {
      setShowNotifications(!showNotifications);
    }
    
    const toggleUserProfile = () => {
      setShowUserProfile(!showUserProfile);
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (token) {
            const decodedToken = jwtDecode(token);
            setUsername(decodedToken.sub);
          }
          
          const data = await getAdminByUsername(username);
          setUser(data);

        } catch (error) {
          console.error(error);
        }
      }

      fetchData();
    }, [username]);

    console.log(user);

  return (
    <nav>
      <i className="bx bx-menu" onClick={toggleSidebar}></i>
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn">
            <i className="bx bx-search"></i>
          </button>
        </div>
      </form>
      <input type="checkbox" id="switch-mode" checked={isDarkMode} onChange={handleModeChange} hidden />
      <label htmlFor="switch-mode" className="switch-mode"></label>
      <div className="notification-wrapper">
          <Link to={'#'} className="notification" onClick={toggleNotification}>
            <i className="bx bxs-bell"></i>
          </Link>
      {showNotifications && (<NotificationBoard/>)}
      </div>
      <div className="profile-wrapper">
          <Link to={'#'} className="profile" onClick={toggleUserProfile}>
	          <img src={profile} alt="profile" />
            {showUserProfile && <UserDetails username={user.username} />}
          </Link>
      </div>
    </nav>
  );
}
