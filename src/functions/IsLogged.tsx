// IsLogged.tsx

import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL from "../config";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const IsLogged = () => {
  const [isToken, setIsToken] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const decodeToken = (token: any) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsToken(true);
      const decodedToken = decodeToken(token);
      const userId = localStorage.getItem("userId");

      if (decodedToken) {
        // Fetch user details from the server using the token
        axios
          .get(`${API_BASE_URL}/api/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const userDetails = response.data;
            setLoggedInUser(userDetails);
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
            // Handle error, e.g., redirect to login page
            setLoggedInUser(null);
          });
      }
    } else {
      setLoggedInUser(null);
      setIsToken(false);
    }
  }, []);

  // Return the values you want to use in other components
  return { isToken, loggedInUser };
};

export default IsLogged;
