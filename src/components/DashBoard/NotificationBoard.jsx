import React, { useEffect, useState } from 'react'
import { allNotifications } from '../../services/ApiService';

export default function NotificationBoard() {

	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const response = await allNotifications();
				setNotifications(response.reverse());
			} catch (error) {
				console.error(error);
			}
		}

		fetchNotifications();
	}, []);

  return (
	<div className='notification-card'>
		<h2>Notifications</h2>
		<div className='notification-list'>
			{notifications.length === 0 ? (
				<p>No Notifications found!</p>
			) : (
				notifications.map((notification, index) => (
					<div key={index} className='notification-item'>
						{notification.message}
					</div>
				))
			)}
		</div>
	</div>
  )
}
