import React, { useEffect, useState } from 'react';
import { getAllCount, getCountByZone } from '../../services/ApiService';

export default function DashCards() {
  const [allCount, setAllCount] = useState(0);
  const [zoneACount, setZoneACount] = useState(0);
  const [zoneBCount, setZoneBCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const allCountResponse = await getAllCount();
        const zoneACountResponse = await getCountByZone('ZONE A');
        const zoneBCountResponse = await getCountByZone('ZONE B');

        setAllCount(allCountResponse);
        setZoneACount(zoneACountResponse);
        setZoneBCount(zoneBCountResponse);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <ul className="box-info">
        <li>
          <i className='bx bxs-user'></i>
          <span className="text">
            <h3>{allCount}</h3>
            <p>Total People</p>
          </span>
        </li>
        <li>
          <i className='bx bxs-group'></i>
          <span className="text">
            <h3>{zoneACount}</h3>
            <p>People in Zone A</p>
          </span>
        </li>
        <li>
          <i className='bx bx-group'></i>
          <span className="text">
            <h3>{zoneBCount}</h3>
            <p>People in Zone B</p>
          </span>
        </li>
      </ul>
    </>
  );
}
