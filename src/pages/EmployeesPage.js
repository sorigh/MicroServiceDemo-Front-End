import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../api/employeeApi";

const token = localStorage.getItem("jwtToken");

const res = await fetch("http://localhost:8080/employee-service/employees", {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});




function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllEmployees()
      .then(employeesData => {
        console.log("Employees from API:", employeesData);  // This line will show the data in browser console
        setEmployees(employeesData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching employees", err);
        setLoading(false);
      });
  }, []);
  if (loading) return <div>Loading employees...</div>;
  return (
    <div>
      <h2>All Employees</h2>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>{emp.name} (Address Email: {emp.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeesPage;
