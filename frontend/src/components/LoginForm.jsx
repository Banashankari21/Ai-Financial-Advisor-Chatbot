import { useState } from "react";
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

export default LoginForm;
