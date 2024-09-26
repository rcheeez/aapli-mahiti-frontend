import React, { useEffect, useState } from 'react';
import { fetchData } from '../../services/ApiService';
import PeoplePopup from './PeoplePopup';

export default function DashTable() {
  const [myData, setData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortColumn, setSortColumn] = useState('');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetchData(pageNo, pageSize);
        setData(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTableData();
  }, [pageNo, pageSize]);

  const handlePageChange = (newPageNo) => {
    if (newPageNo >= 0 && newPageNo < totalPages) {
      setPageNo(newPageNo);
    }
  };

  useEffect(() => {
    const lowercasedFilter = searchInput.toLowerCase();
    let filteredData = myData.filter(item => {
      return (
        item.fullName.toLowerCase().includes(lowercasedFilter) ||
        item.phoneNumber.includes(lowercasedFilter) ||
        item.address.toLowerCase().includes(lowercasedFilter) ||
        item.zone.toLowerCase().includes(lowercasedFilter)
      );
    });

   if (sortColumn) {
     filteredData = filteredData.sort((a, b) => {
      const columnA = a[sortColumn].toLowerCase();
      const columnB = b[sortColumn].toLowerCase();
      if (columnA < columnB) return sortDirection === 'asc' ? -1 : 1;
      if (columnA > columnB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
   }
    setFilteredData(filteredData);
  }, [searchInput, myData, sortDirection, sortColumn]);

  const handleRowClick = (person) => {
    setSelectedPerson(person);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedPerson(null);
  };

  return (
    <div className="table-data">
      <div className="order">
        <div className="head">
          <h3>People Data</h3>
          {showSearch && (
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          )}
          <i className='bx bx-search' onClick={() => setShowSearch(!showSearch)}></i>
          <div className="filter-container">
          <i className='bx bx-filter' onClick={() => setShowSortOptions(!showSortOptions)}></i>
          {showSortOptions && (
          <div className="sort-options">
            <label className='sort-label'>
              Sort by:
              <select onChange={(e) => setSortColumn(e.target.value)} value={sortColumn}>
                <option value="" selected>Select Option</option>
                <option value="fullName">Full Name</option>
                <option value="phoneNumber">Phone Number</option>
                <option value="address">Address</option>
                <option value="zone">Zone</option>
              </select>
            </label>
            <label>
              Direction:
              <select onChange={(e) => setSortDirection(e.target.value)} value={sortDirection}>
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </select>
            </label>
          </div>
        )}
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>S No.</th>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Zone</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((person, index) => (
              <tr key={person.id} onClick={() => handleRowClick(person)}>
                <td>{index + 1 + pageNo * pageSize}</td>
                <td>
                  <p>{person.fullName}</p>
                </td>
                <td>{person.phoneNumber}</td>
                <td>{person.address}</td>
                <td>{person.zone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => handlePageChange(pageNo - 1)} disabled={pageNo === 0}>Previous</button>
          <span>Page {pageNo + 1} of {totalPages}</span>
          <button onClick={() => handlePageChange(pageNo + 1)} disabled={pageNo === totalPages - 1}>Next</button>
        </div>
      </div>
      {showPopup && selectedPerson && (
        <PeoplePopup data={selectedPerson} onClose={closePopup}/>
      )}
    </div>
  );
}
