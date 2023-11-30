import "../css/Header.css";
import { Link } from "react-router-dom";
import data from "../Data";
import { useState } from "react";

const Header = () => {
  // sidebar functionality
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <header className="header">
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
              <Link to="/resources/add" className="list-items-link">
                Add
              </Link>
            </li>
            <li className="list-items-item">
              <Link className="list-items-link" to="/resources/update">
                Update
              </Link>
            </li>
            <li className="list-items-item">
              <Link to="/resources" className="list-items-link">
                Resources
              </Link>
              <i className="fa-regular fa-angle-down"></i>
              <ul className="dropdown-list-items">
                {data.subjects.slice(0, 8).map((subject, index) => (
                  <li key={index} className="dropdown-list-items-item">
                    <Link
                      to={`/resources/${subject.code}`}
                      className="dropdown-list-items-link"
                    >
                      {subject.code}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
        {/* login register buttons */}
        <div className="btns login-register">
          <Link to="/login" className="btn login-btn">
            Login
          </Link>
          <Link to={"/register"} className="btn btn-primary register-btn">
            Register
          </Link>
        </div>
        {/* Toggler */}
        <div className="toggler" onClick={toggleSidebar}>
          <i
            className={`fa-regular ${
              sidebarOpen ? "fa-xmark " : ""
            }fa-bars-staggered`}
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
              href="https://divinelydeveloper.me"
            >
              <i className="fa-regular fa-user"></i>
              About
            </a>
          </li>
          <li className="sidebar-list-item">
            <Link to="/resources" className="sidebar-list-link">
              <i className="fa-regular fa-book"></i>
              Resources
            </Link>
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
      </aside>
    </>
  );
};

export default Header;
