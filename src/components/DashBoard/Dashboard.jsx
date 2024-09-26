import React, { useState } from 'react'
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import DashTable from './DashTable';
import '../../styles/dashboard.css';
import DashCards from './DashCards';
import DashboardTitle from './DashboardTitle';
import Toast from '../Toast/Toast';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Dashboard() {

	const [isSidebarHidden, setSidebarHidden] = useState(false);
	const location = useLocation();

	const toggleSidebar = () => {
		setSidebarHidden(!isSidebarHidden);
	}

	const {message , visible } = location.state || {};
	console.log("See here: ",message);


  return (
	<>
	<Helmet>
		<title>Dashboard - Aapli Mahiti</title>
        <meta name="description" content="Access and manage your data efficiently on the Dashboard page of the Aapli Mahiti app." />
        <meta name="keywords" content="Aapli Mahiti, Dashboard, Data Management, User Dashboard, Data Analytics" />
        <meta name="author" content="Aapli Mahiti" />
	</Helmet>
	  <DashboardSidebar isSidebarHidden={isSidebarHidden}/>
	   <div className='dashboard-body'>
          <DashboardHeader toggleSidebar={toggleSidebar}/>
          <main>
		  <DashboardTitle heading={'Dashboard'} breadcumb={'Home'}/>
		  <DashCards/>
		  <DashTable/>
		  </main>
	</div>
	{visible && <Toast message={message}  visible={visible}/>}
	</>
  )
}
