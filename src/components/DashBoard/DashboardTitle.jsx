import React from 'react'
import { Link } from 'react-router-dom'
import { downloadExcel } from '../../services/ApiService';

export default function DashboardTitle({ heading, breadcumb }) {

	const clickReload = () => {
		window.location.reload();
	}

	const handleDownload = async () => {
		try {
			const response = await downloadExcel();
			console.log(response);
			const url = window.URL.createObjectURL(new Blob([response]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "people_data.xlsx");
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.error(error);			
		}
	}
  return (
	<div className="head-title">
		<div className="left">
			<h1>{heading}</h1>
			<ul className="breadcrumb">
				<li>
					<Link to={'/dashboard'}>Dashboard</Link>
				</li>
				<li><i className='bx bx-chevron-right' ></i></li>
				<li>
					<Link className="active" onClick={clickReload} to={'#'}>{breadcumb}</Link>
				</li>
			</ul>
	    </div>
				{breadcumb === 'Home' && (
					<div to={'#'} onClick={handleDownload} className="btn-download">
					<i className='bx bx-download'></i>
						<span className="text">Export Data</span>
					</div>
				)}
	    </div>
  )
}
