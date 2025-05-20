import React from 'react';

function ReportTable({ reports }) {
  return (
    <table className="report-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>DOB</th>
          <th>Life Path</th>
          <th>Expression</th>
          <th>Soul Urge</th>
          <th>Personality</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report, index) => (
          <tr key={index}>
            <td>{report.name}</td>
            <td>{report.dob}</td>
            <td>{report.lifePathNumber}</td>
            <td>{report.expressionNumber}</td>
            <td>{report.soulUrgeNumber}</td>
            <td>{report.personalityNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReportTable;
