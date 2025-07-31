import { useState } from "react";
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

export default SignupForm;
