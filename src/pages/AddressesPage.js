import React, { useEffect, useState } from "react";
import { getAllAddresses } from "../api/addressApi";

function AddressesPage() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    getAllAddresses().then(setAddresses);
  }, []);

  return (
    <div>
      <h2>All Addresses</h2>
      <ul>
        {addresses.map(addr => (
          <li key={addr.id}>{addr.city}, {addr.state}</li>
        ))}
      </ul>
    </div>
  );
}

export default AddressesPage;
