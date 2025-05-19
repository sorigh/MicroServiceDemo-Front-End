import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import EmployeesPage from "./pages/EmployeesPage";
import AddressesPage from "./pages/AddressesPage";
import EmployeeAddressesPage from "./pages/EmployeeAddressesPage";
import LoginPage from "./pages/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth } from "./useAuth";

function Navigation() {
  return (
    <nav>
      <Link to="/employees">Employees</Link> |{" "}
      <Link to="/addresses">Addresses</Link> |{" "}
      <Link to="/employee-addresses">All Content</Link>
    </nav>
  );
}

function Dashboard() {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <Navigation />
    </div>
  );
}

function App() {
  const auth = useAuth();

  return (
    <Router>
      <Routes>
        {/* Ruta pentru login - afișează doar pagina login */}
        <Route path="/login-page" element={<LoginPage />} />

        {/* Ruta dashboard - accesibilă doar după login */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Rutele protejate pentru paginile efective */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER"]}>
              <EmployeesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addresses"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER"]}>
              <AddressesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-addresses"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER"]}>
              <EmployeeAddressesPage />
            </ProtectedRoute>
          }
        />

        {/* Redirect implicit: dacă ești logat du-te la dashboard, altfel la login */}
        <Route
          path="/"
          element={auth ? <Navigate to="/dashboard" replace /> : <Navigate to="/login-page" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
