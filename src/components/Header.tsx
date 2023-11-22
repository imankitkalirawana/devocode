import "../css/Header.css";
import { Link } from "react-router-dom";
import data from "../Data";

const Header = () => {
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
              <a
                className="list-items-link"
                href="https://divinelydeveloper.me#contact"
              >
                Contact
              </a>
            </li>
            <li className="list-items-item">
              <a
                className="list-items-link"
                href="https://divinelydeveloper.me"
              >
                About
              </a>
            </li>
            <li className="list-items-item">
              <Link to="/resources" className="list-items-link">
                Resources
              </Link>
              <i className="fa-regular fa-angle-down"></i>
              <ul className="dropdown-list-items">
                {data.subjects.map((subject, index) => (
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
          <a
            href="https://github.com/imankitkalirawana"
            className="btn login-btn"
          >
            Github
          </a>
          <a
            href="https://divinelydeveloper.me"
            className="btn btn-primary register-btn"
          >
            Portfolio
          </a>
        </div>
        {/* Toggler */}
        <div className="toggler">
          <i className="fa-regular fa-bars-staggered"></i>
        </div>
      </header>
    </>
  );
};

export default Header;
