import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


export default function DashboardSidebar({ isSidebarHidden }) {

	  const location = useLocation();

	  const navigate = useNavigate();

  const logoutHandle = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  }

  return (
	<section id="sidebar" className={isSidebarHidden ? 'hide': ''}>
		<Link to={'#'} className="brand">
			<i className='bx bxs-data'></i>
			<span className="text">Admin Panel</span>
		</Link>
		<ul className="side-menu top">
			<li className={location.pathname === '/dashboard' ? 'active': ''}>
				<Link to={'/dashboard'}>
					<i className='bx bxs-dashboard'></i>
					<span className="text">Dashboard</span>
				</Link>
			</li>
			<li className={location.pathname === '/dashboard/add' ? 'active': ''}>
				<Link to={'/dashboard/add'}>
				    <i className='bx bx-user-plus'></i>
					<span className="text">Add Details</span>
				</Link>
			</li>
			<li className={location.pathname === '/dashboard/analytics' ? 'active': ''}>
				<Link to={'/dashboard/analytics'}>
					<i className='bx bxs-doughnut-chart' ></i>
					<span className="text">Analytics</span>
				</Link>
			</li>
			<li className={location.pathname === '/dashboard/team' ? 'active': ''}>
				<Link to={'/dashboard/team'}>
					<i className='bx bxs-group' ></i>
					<span className="text">Team</span>
				</Link>
			</li>
		</ul>
		<ul className="side-menu">
			<li>
				<Link onClick={logoutHandle} className="logout">
					<i className='bx bxs-log-out-circle' ></i>
					<span className="text">Logout</span>
				</Link>
			</li>
		</ul>
	</section>
  )
}
