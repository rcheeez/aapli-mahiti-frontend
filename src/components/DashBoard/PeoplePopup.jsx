import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UpdateDataForm from "./UpdateDataForm";
import { deletePeopleData } from "../../services/ApiService";

export default function PeoplePopup({ data, onClose }) {

	const [selectedPerson, setSelectedPerson] = useState(null);
  const [person, setPerson] = useState(null);
	const [showPopup, setShowPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const navigate = useNavigate();

	const handleRowClick = (person) => {
		setSelectedPerson(person);
	  };

  const handleClick = (person) => {
    setPerson(person);
    setDeletePopup(true);
  }

  const closeDeletePopup = () => {
    setDeletePopup(false);
    setPerson(null);
  }

	  const closePopup = () => {
		setShowPopup(false);
		setSelectedPerson(null);
	  };

    const removeUserHandle = async (id) => {
      try {
        const response = await deletePeopleData(id);
        console.log(response);
        setTimeout(() => {
          navigate('/dashboard', {state: {message: "Data Deleted Successfully!", visible: true}});
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }


  return (
    <>
      <div className="people-popup">
        <h3 className="people-popup-title">Person Details</h3>
        <div className="people-close-btn" onClick={onClose}>
          &#10005;
        </div>
        <table className="people-table">
          <tbody>
            <tr>
              <td>Full Name: </td>
              <td>{data.fullName}</td>
            </tr>
            <tr>
              <td>Phone Number: </td>
              <td>{data.phoneNumber}</td>
            </tr>
            <tr>
              <td>Address: </td>
              <td>{data.address}</td>
            </tr>
            <tr>
              <td>Zone: </td>
              <td>{data.zone}</td>
            </tr>
          </tbody>
        </table>
        <div className="people-btn-container">
          <Link onClick={() => handleRowClick(data)} style={{textAlign: 'center'}} className="update-people-btn">
            &#9998; &nbsp;Edit
          </Link>
          <button className="delete-people-btn" onClick={() => handleClick(data)} >&#10006; &nbsp;Delete</button>
        </div>
      </div>
	  {selectedPerson && !showPopup && <UpdateDataForm data={selectedPerson} onClose={closePopup}/>}
    {deletePopup && (
      <div className='delete-popup'>
        <p style={{color: 'black'}}>Are you sure you want to remove the Person's Data?</p>
        <button className='yes-btn' onClick={() => removeUserHandle(person.id)}>Yes</button>
        <button className='no-btn' onClick={() => closeDeletePopup()}>No</button>
    </div>
    )}
    </>
  );
}
