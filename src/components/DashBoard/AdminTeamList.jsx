import React, { useEffect, useState } from 'react'
import { deleteAdmin, getAllAdmins } from '../../services/ApiService';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../Toast/Toast';

export default function AdminTeamList() {

	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [showPopup, setShowPopup] = useState(false);
  	const [selectedAdmin, setSelectedAdmin] = useState(null);
	const [toastMessage, setToastMessage] = useState('');
	const [toastVisible, setToastVisible] = useState(false);


	useEffect( () => {

		const fetchAllAdmins = async () => {
			try {
				const response = await getAllAdmins();
				setData(response);
			} catch (error) {
				console.error(error);
			}
		}

		fetchAllAdmins();

	}, []);

	const handleDeleteClick = (admin) => {
		setSelectedAdmin(admin);
		setShowPopup(true);
	  };

	const removeAdminHandle = async (id) => {
		try {
			const response = await deleteAdmin(id);
			if (response) {
				setToastMessage('Admin deleted successfully');
				setToastVisible(true);
				setShowPopup(false);
				navigate('/dashboard/team');
				window.location.reload();
			}
		} catch (error) {
			console.error(error);
			setToastMessage('Admin deleted failed!');
		}
	}

  return (
	<div className='admin-team-list'>
		<h3 className='admin-list-title'>Team Admin List</h3>
		{data.map((admin, index) => (
			<div className='admin-list-item' key={index + 1}>
				<div key={index + 1} className='admin-list-item'>{admin.username}</div>
				<Link onClick={() => handleDeleteClick(admin)} ><abbr title="Delete Admin"><i className='bx bx-user-minus'></i></abbr></Link>
				<hr className='admin-hr-line' />
			</div>
		))}
		{showPopup && (
        <div className='delete-popup'>
          <p>Are you sure you want to remove the admin?</p>
          <button className='yes-btn' onClick={() => removeAdminHandle(selectedAdmin.id)}>Yes</button>
          <button className='no-btn' onClick={() => setShowPopup(false)}>No</button>
        </div>
      )}
	  <Toast message={toastMessage} visible={toastVisible} />
	</div>
  )
}
