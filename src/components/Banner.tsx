import "../css/Banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <div className="banner">
        <h1 className="banner-title">Learn with ease...</h1>
        <p className="banner-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
        <div className="btns">
          <Link to="/resources" className="btn btn-primary">
            Explore!
          </Link>
          <a href="#" className="btn">
            Get Started
          </a>
        </div>
      </div>
    </>
  );
};

export default Banner;
