import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTitle from "./DashboardTitle";
import AddAdminForm from "./AddAdminForm";
import AdminTeamList from "./AdminTeamList";
import { useLocation } from "react-router-dom";
import Toast from "../Toast/Toast";
import { Helmet } from "react-helmet";

export default function DashboardTeam() {
  const [isSidebarHidden, setSidebarHidden] = useState(false);
  const [adminForm, setAdminForm] = useState(false);
  const location = useLocation();
  const { message, visible } = location.state || {};

  const toggleSidebar = () => {
    setSidebarHidden(!isSidebarHidden);
  };

  const toggleAdminForm = () => {
    setAdminForm(true);
  };
  return (
    <>
    <Helmet>
      <title>Admin Team - Aapli Mahiti</title>
    </Helmet>
      <DashboardSidebar isSidebarHidden={isSidebarHidden} />
      <div className="dashboard-body">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        <main>
          <DashboardTitle heading={"Team"} breadcumb={"Add Admin"} />
          <hr className="horizontal-line" />
          {adminForm ? (<AddAdminForm/>) : (
			<div className="team-container">
			<h4>
			  You can maintain a team who will be called as Admins.(Maximum
			  Number of Members in a Team: 4 members){" "}
			</h4>
			<button className="admin-btn" onClick={toggleAdminForm}>
			  &#10010; Add Admin
			</button>
		  </div>
          )}
          <hr className="horizontal-line" />
		  {adminForm ? null: (
			<AdminTeamList/>
		  )}
        </main>
      </div>
      <Toast message={message} visible={visible} />
    </>
  );
}
