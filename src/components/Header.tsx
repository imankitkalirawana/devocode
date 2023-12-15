import "../css/Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
// import BottomBar from "./BottomBar";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const Header = () => {
  // sidebar functionality
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [isToken, setIsToken] = useState(false);
  const navigate = useNavigate();
  // get current url
  const location = useLocation();

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
    const userId = localStorage.getItem("userId");

    if (token) {
      setIsToken(true);
      const decodedToken = decodeToken(token);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedInUser(null);
    setIsToken(false);
    navigate("/login");
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <Link to="/" className="logo">
            <img className="logo-icon" src="/logo-dark.png" alt="logo" />
            <h1 className="logo-text">
              Devo<span className="color">Code</span>
            </h1>
          </Link>
          {/* dropdown menu */}
          <nav className="dropdown-menu">
            <ul className="list-items">
              <li className="list-items-item">
                <Link to="/" className="list-items-link">
                  Home
                </Link>
              </li>
              <li className="list-items-item">
                <Link to="/resources" className="list-items-link">
                  Resources
                </Link>
              </li>
              {loggedInUser ? (
                <>
                  <li className="list-items-item">
                    <Link to="/resources/add" className="list-items-link">
                      Add
                    </Link>
                  </li>
                  <li className="list-items-item">
                    <Link className="list-items-link" to="/resources/update">
                      Update
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="list-items-item">
                    <a
                      href="https://divinelydeveloper.me"
                      className="list-items-link"
                    >
                      About
                    </a>
                  </li>
                  <li className="list-items-item">
                    <a
                      href="https://github.com/imankitkalirawana"
                      className="list-items-link"
                    >
                      Github
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
        {/* login logout buttons */}
        <div className="auth">
          {isToken ? (
            <>
              <button
                className="btn login-register btn-slim"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <div className="btns">
              <Link
                to="/contact"
                className="btn login-register btn-faded faded"
              >
                Contact
              </Link>
              {location.pathname === "/login" ? (
                <Link to="/register" className="btn login-register btn-slim">
                  Signup
                </Link>
              ) : (
                <Link to="/login" className="btn login-register btn-slim">
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
        {/* Toggler */}
        <div className="toggler" onClick={toggleSidebar}>
          <i
            className={`fa-regular ${
              sidebarOpen ? "fa-xmark " : ""
            }fa-grip-lines`}
          ></i>
        </div>
      </header>

      {/* sidebar for mobiles */}
      <aside
        className="sidebar"
        style={{
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        {/* logo */}
        <Link to="/" className="logo">
          <img className="logo-icon" src="/logo-dark.png" alt="logo" />
          <h1 className="logo-text">
            Devo<span className="color">Code</span>
          </h1>
        </Link>
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <Link to="/" className="sidebar-list-link">
              <i className="fa-regular fa-home-lg-alt"></i>
              Home
            </Link>
          </li>

          <li className="sidebar-list-item">
            <Link to="/resources" className="sidebar-list-link">
              <i className="fa-regular fa-layer-group"></i>
              Resources
            </Link>
          </li>

          {loggedInUser ? (
            <>
              <li className="sidebar-list-item">
                <Link to="/resources/add" className="sidebar-list-link">
                  <i className="fa-regular fa-add"></i>
                  Add
                </Link>
              </li>
              <li className="sidebar-list-item">
                <Link className="sidebar-list-link" to="/resources/update">
                  <i className="fa-regular fa-file-arrow-up"></i>
                  Update
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="sidebar-list-item">
                <a
                  className="sidebar-list-link"
                  href="https://divinelydeveloper.me"
                >
                  <i className="fa-regular fa-user"></i>
                  About
                </a>
              </li>
              <li className="sidebar-list-item">
                <a
                  className="sidebar-list-link"
                  href="https://github.com/imankitkalirawana"
                >
                  <i className="fa-brands fa-github"></i>
                  Github
                </a>
              </li>
            </>
          )}
          <li className="sidebar-list-item">
            <a
              className="sidebar-list-link"
              href="https://divinelydeveloper.me#contact"
            >
              <i className="fa-regular fa-envelope"></i>
              Contact
            </a>
          </li>

          <li className="sidebar-list-item">
            <a
              className="sidebar-list-link"
              href="
              https://github.com/imankitkalirawana/devocode/issues"
              target="_blank"
            >
              <i className="fa-regular fa-bug"></i>
              Report Issue
            </a>
          </li>
        </ul>
        {isToken ? (
          <button
            className="btn login-register btn-slim"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary login-register btn-slim">
            Login
          </Link>
        )}
      </aside>
      {/* bottom mobile bar */}
      {/* <BottomBar /> */}
    </>
  );
};

export default Header;
