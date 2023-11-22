import "../css/Banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <div className="banner">
        <h1 className="banner-title">Learn with ease...</h1>
        <p className="banner-text">
          Get access to your study material in one go.
        </p>
        <div className="btns">
          <Link to="/resources" className="btn btn-primary">
            Resources
          </Link>
          <a href="https://github.com/imankitkalirawana" className="btn">
            Developer
          </a>
        </div>
      </div>
    </>
  );
};

export default Banner;
