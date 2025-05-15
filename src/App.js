import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EmployeesPage from "./pages/EmployeesPage";
import AddressesPage from "./pages/AddressesPage";
import EmployeeAddressesPage from "./pages/EmployeeAddressesPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/employees">Employees</Link> | <Link to="/addresses">Addresses</Link> | <Link to="/employee-addresses">All Content</Link>
      </nav>
      <Routes>
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/addresses" element={<AddressesPage />} />
        <Route path="/employee-addresses" element={<EmployeeAddressesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
