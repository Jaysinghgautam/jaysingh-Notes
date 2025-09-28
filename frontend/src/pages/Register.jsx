import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/ApiEndPoint";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const request = await post(`${API_URL}/auth/register`, value, {
        withCredentials: true,
      });
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light px-3">
      <div className="form-container bg-white p-5 rounded-4 shadow-lg w-100" style={{ maxWidth: "480px" }}>
        <h2 className="text-center mb-5 fw-bold">Register</h2>

        <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="Name" className="form-label fw-semibold">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="userName"
              onChange={handleChange}
              value={value.userName}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={value.email}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
              value={value.password}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100 py-2 fw-bold">
            Register
          </button>

          {/* Login Link */}
          <p className="text-center mt-3">
            Already have an account? <Link to="/login" className="text-decoration-none text-primary fw-semibold">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
