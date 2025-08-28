/*import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const LoginForm = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      login(res.data.token, res.data.user);
      alert("Login successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Login error");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="p-4 border rounded shadow-sm w-50 m-auto mt-4"
    >
      <h3>Login</h3>
      <input
        name="email"
        className="form-control mb-2"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        className="form-control mb-2"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button className="btn btn-success w-100">Log In</button>
    </form>
  );
};

export default LoginForm;*/

/*import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "./Auth.css";

const LoginForm = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      login(res.data.token);
    } catch (err) {
      alert("Login failed: " + err.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{" "}
        <span className="switch-link" onClick={onSwitch}>
          Sign up
        </span>
      </p>
    </div>
  );
};

export default LoginForm;*/


import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import "./Auth.css";

export default function LoginForm() {
  const { login, setIsSignupMode } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      login(res.data.token);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        Don’t have an account?{" "}
        <span onClick={() => setIsSignupMode(true)}>Signup</span>
      </p>
    </div>
  );
}


