import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTitle from "./DashboardTitle";
import DashCards from "./DashCards";

import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getCountByZone } from "../../services/ApiService";
import { Helmet } from "react-helmet";

Chart.register(...registerables);

export default function DashboardAnalytics() {

	const [isSidebarHidden, setSidebarHidden] = useState(false);

	const toggleSidebar = () => {
		setSidebarHidden(!isSidebarHidden);
	}

  const [zoneACount, setZoneACount] = useState(0);
  const [zoneBCount, setZoneBCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const zoneACountResponse = await getCountByZone('Zone A');
        const zoneBCountResponse = await getCountByZone('Zone B');
        setZoneACount(zoneACountResponse);
        setZoneBCount(zoneBCountResponse);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "New Entries Over Time",
        data: [0, 0, 0, 1, 2, 0, 4, 2,],
        fill: false,
        borderColor: "rgb(60, 145, 230)",
        tension: 0.1,
      },
    ],
  };

  const zoneData = {
    labels: ["Zone A", "Zone B"],
    datasets: [
      {
        label: "Number of People",
        data: [zoneACount, zoneBCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: "rgb(60, 145, 230)",
      },
    ],
  };

  return (
	<>
    <Helmet>
      <title>Analytics - Aapli Mahiti</title>  
    </Helmet>    
	   <DashboardSidebar isSidebarHidden={isSidebarHidden} />
    <div className="dashboard-body">
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <main>
        <DashboardTitle heading={"Analytics"} breadcumb={"Analytics"} />
        <DashCards />
        <div className="charts-container">
          <div className="chart-item">
            <div className="bar-chart-container">
              <h2>Zone Distribution</h2>
              <Bar data={zoneData} />
            </div>
          </div>
          <div className="chart-item">
            <div className="line-chart-container">
              <h2>Line Chart: New Entries Over Time</h2>
              <Line data={lineData} />
            </div>
          </div>
        </div>
      </main>
    </div>
	</>
  );
}
