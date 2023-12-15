import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isEmpty, setIsEmpty] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setIsEmpty(true);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
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
    <div className="section resources login-form">
      <h1 className="section-title">Log in to Devocode</h1>
      <form className="form">
        <div className="form-input">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
              setIsEmpty(false);
            }}
          />
        </div>
        <div className="form-input">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              setIsEmpty(false);
            }}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={handleLogin}
          type="submit"
          disabled={isEmpty}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
