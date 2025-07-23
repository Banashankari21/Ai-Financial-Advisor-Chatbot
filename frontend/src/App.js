import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute'; // ✅ Import PrivateRoute

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <h1 className="text-primary">AI Financial Advisor Chatbot</h1>
        <p className="lead">React + Bootstrap setup with Authentication</p>

        <nav className="mb-3">
          <Link to="/signup" className="btn btn-outline-primary me-2">Signup</Link>
          <Link to="/login" className="btn btn-outline-success me-2">Login</Link>
          <Link to="/dashboard" className="btn btn-outline-info">Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* ✅ Protected Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
