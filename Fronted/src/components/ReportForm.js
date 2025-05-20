import React, { useState } from 'react';
import axios from 'axios';

function ReportForm({ fetchReports }) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !dob) return alert("Please enter both fields");

    try {
      const res = await axios.post('http://localhost:3002/api/createreport', { name, dob });
      alert(`Report Generated:\nLife Path Number: ${res.data.lifePathNumber}\nExpression Number: ${res.data.expressionNumber}\nSoul Urge Number: ${res.data.soulUrgeNumber}\nPersonality Number: ${res.data.personalityNumber}`);
      fetchReports();  // Fetch updated reports list
      setName('');
      setDob('');
    } catch (error) {
      alert('Error generating report');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="report-form">
      <input 
        type="text" 
        placeholder="Enter Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="date" 
        value={dob} 
        onChange={(e) => setDob(e.target.value)} 
        required 
      />
      <button type="submit">Generate Report</button>
    </form>
  );
}

export default ReportForm;
