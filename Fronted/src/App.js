import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportForm from './components/ReportForm';
import ReportTable from './components/ReportTable';
import './components/style.css';

function App() {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await axios.get('http://localhost:3002/api/getallreports');
      setReports(res.data);
    } catch (error) {
      alert('Error fetching reports');
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="app-container">
      <h1>Numerology Prediction</h1>
      <ReportForm fetchReports={fetchReports} />
      <h2>Past Reports</h2>
      <ReportTable reports={reports} />
    </div>
  );
}

export default App;
