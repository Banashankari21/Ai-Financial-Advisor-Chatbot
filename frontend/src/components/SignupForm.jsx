/*import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const SignupForm = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);
      login(res.data.token, res.data.user);
      alert("Signup successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Signup error");
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="p-4 border rounded shadow-sm w-50 m-auto mt-4"
    >
      <h3>Signup</h3>
      <input
        name="name"
        className="form-control mb-2"
        placeholder="Name"
        onChange={handleChange}
        required
      />
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
      <button className="btn btn-primary w-100">Sign Up</button>
    </form>
  );
};

export default SignupForm;*/




/*import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

const SignupForm = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password,
      });
      alert("Signup successful, please login!");
      onSwitch();
    } catch (err) {
      alert("Signup failed: " + err.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <span className="switch-link" onClick={onSwitch}>
          Login
        </span>
      </p>
    </div>
  );
};

export default SignupForm;*/



import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import "./Auth.css";

export default function SignupForm() {
  const { setIsSignupMode } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      setMsg("Signup successful. Please login.");
      setTimeout(() => setIsSignupMode(false), 2000);
    } catch {
      setMsg("Signup failed.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Signup</button>
      </form>
      {msg && <p>{msg}</p>}
      <p>
        Already have an account?{" "}
        <span onClick={() => setIsSignupMode(false)}>Login</span>
      </p>
    </div>
  );
}


