
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
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // NOTE: Using a relative path for the API call is often better in a production build
      // if the frontend and backend are hosted on the same domain.
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const request = await post(`${API_URL}/auth/register`, value, {
        withCredentials: true,
      });
      const response = request.data;
      console.log(response);
      if (response.success) {
        toast.success(response.message);
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
         // Fallback for network errors, etc.
         toast.error("An unexpected error occurred.");
      }
    }
  };
  return (
    // min-vh-100 and d-flex center the content vertically and horizontally
    <div className="container min-vh-100 d-flex justify-content-center align-items-center p-3">
      {/* ✅ FIX: Using w-100 for phone and max-width for larger screens 
        w-100: Full width on phone
        w-sm-75: 75% width on small screens (tablets) and up
        w-md-50: 50% width on medium screens (desktop) and up
      */}
      <div className="form-container border shadow p-5 rounded-4 bg-white w-100 w-sm-75 w-md-50">
        <h2 className="text-center mb-4 fw-bold">Register</h2>
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>

            <input
              type="text"
              className="form-control"
              name="userName"
              onChange={handleChange}
              value={value.userName}
              placeholder="Name"
              aria-label="Name"
              aria-describedby="name-addon"
              required // Added 'required' attribute for basic validation
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={value.email}
              placeholder="Email"
              aria-label="Email"
              aria-describedby="email-addon"
              required // Added 'required' attribute for basic validation
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
              value={value.password}
              placeholder="Enter your password"
              id="password"
              required // Added 'required' attribute for basic validation
            />
          </div>

          <button type="submit" className="btn btn-success w-100 mb-3">
            Register
          </button>

          <div className="text-center">
            <p>
              Already have an account <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}