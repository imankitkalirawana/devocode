import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        username,
        password,
      });

      const { data } = response;

      // Assuming the server returns a JWT token upon successful login
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        window.location.href = "/";
      } else {
        // Handle authentication failure
        console.error("Authentication failed");
      }
    } catch (err) {
      // Handle other errors (e.g., network issues or invalid credentials)
      console.error("Authentication failed");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check the validity of the token on the client side or request a new token
    if (!token) {
      // Redirect to the login page if no token is present
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className="section resources">
      <h1>Login</h1>
      <form className="form">
        <div className="form-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={handleLogin} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
