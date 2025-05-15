import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../api/employeeApi";
import { getAllAddresses } from "../api/addressApi";

function EmployeeAddressesPage() {
  // State to store combined employee + address data
  const [data, setData] = useState([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);

  // useEffect runs once when the component loads
  useEffect(() => {
    // Use Promise.all to wait for both API calls to finish
    Promise.all([getAllEmployees(), getAllAddresses()])
      .then(([employees, addresses]) => {
        console.log("Raw addresses from API:", addresses);
        // Step 1: Create an object that groups addresses by employeeId
        // This makes it easy to find all addresses for a specific employee
        const addressesByEmployeeId = addresses.reduce((acc, address) => {
          // If this employeeId key doesn't exist yet, create it as an empty array
          if (!acc[address.employee_id]) {
            acc[address.employee_id] = [];
          }
          // Add this address to the employee's array
          acc[address.employee_id].push(address);
          return acc; // Return the updated accumulator for next iteration
        }, {});

        // Step 2: Map over employees to add their addresses from the grouped object
        const employeesWithAddresses = employees.map(employee => {
          return {
            ...employee, // keep existing employee data (id, name, email, age)
            addresses: addressesByEmployeeId[employee.id] || [] // get addresses or empty array if none
          };
        });

        // Save the combined data in the component state
        setData(employeesWithAddresses);
        // Loading is done
        setLoading(false);
      })
      .catch(err => {
        // If an error occurs (like network failure), save the error message
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      });
  }, []); // empty dependency array means this runs only once when component mounts

  // If still loading data, show a simple loading message
  if (loading) return <div>Loading...</div>;

  // If there was an error, show the error message
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  // Render the list of employees with their addresses
  return (
    <div>
      <h2>Employees and Their Addresses</h2>
      {data.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul>
          {data.map(employee => (
            <li key={employee.id}>
              <strong>{employee.name}</strong> (ID: {employee.id})
              <ul>
                {employee.addresses.length > 0 ? (
                  employee.addresses.map(address => (
                    <li key={address.id}>
                      {address.city}, {address.state}
                    </li>
                  ))
                ) : (
                  <li><i>No addresses found</i></li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmployeeAddressesPage;
