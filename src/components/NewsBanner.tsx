import { Link } from "react-router-dom";
import "../css/Banner.css";

const NewsBanner = () => {
  return (
    <div className="news-banner">
      <span className="news-banner-icon success-icon">New</span>
      <span className="news-banner-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas provident
        impedit, error, consequuntur dolorem mollitia et voluptatibus molestias
        ea nulla earum. Quo, corrupti nisi, commodi soluta iusto atque officiis
        nemo non vero molestias nihil beatae cupiditate aspernatur dolorum
        laborum
      </span>
      <Link to={"/blogs/"} className="news-banner-btn btn btn-slim btn-round ">
        <span className="btn-txt">Read the news </span>
        <i className="fa-regular fa-arrow-right"></i>
      </Link>
    </div>
  );
};

export default NewsBanner;
