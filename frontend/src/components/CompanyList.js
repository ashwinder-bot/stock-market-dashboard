import React from "react";

function CompanyList({ companies, onSelect }) {
  return (
    <div style={{ width: "200px", borderRight: "1px solid #ccc", padding: "10px" }}>
      <h2>Companies</h2>
      {companies.length > 0 ? (
        <ul>
          {companies.map((c) => (
            <li
              key={c.id}
              style={{ cursor: "pointer", margin: "5px 0" }}
              onClick={() => onSelect(c.name)}
            >
              {c.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No companies found</p>
      )}
    </div>
  );
}

export default CompanyList;
