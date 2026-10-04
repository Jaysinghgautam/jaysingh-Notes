import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/ApiEndPoint";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/AuthSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const hanldeChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.email.trim() || !value.password) {
      toast.error("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      const request = await post("/auth/login", {
        email: value.email.trim(),
        password: value.password,
      });

      const response = request.data;
      if (response.success) {
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
        dispatch(addUser(response.user));
        toast.success(response.message || "User login successfully");
        navigate("/", { replace: true });
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center ">
      <div className="form-container border shadow p-5 rounded-4 bg-white">
        <h2 className="text-center mb-4 fw-bold">Login</h2>
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>

            <input
              type="email"
              value={value.email}
              onChange={hanldeChange}
              name="email"
              className="form-control"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon2"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={value.password}
              onChange={hanldeChange}
              name="password"
              className="form-control"
              placeholder="Enter your password"
              id="password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center">
            <p>
              Don't have an account? <Link to={"/register"}>Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
