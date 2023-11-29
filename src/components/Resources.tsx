import { Link } from "react-router-dom";
import "../css/Resources.css";
import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL from "../config";

interface Subject {
  code: string;
  title: string;
  description: string;
  _id: string;
}

const Resources = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  // get subjects from api
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/subjects`)
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="section resources">
        {/* breadcrumbs */}
        <div className="breadcrumbs">
          <Link className="breadcrumbs-item" to="/">
            Home
          </Link>
          <i className="fas fa-chevron-right breadcrumbs-item"></i>
          <span className="breadcrumbs-item selected">Subjects</span>
        </div>
        <h2 className="section-title">Title</h2>
        <div className="section-content">
          <div className="section-menu">
            {subjects.map((subject, index) => (
              <Link
                to={`/resources/${subject._id}`}
                key={index}
                className="section-list-item"
              >
                <div className="section-list-item-mini-details">
                  <i className="fa-solid fa-folder"></i>
                </div>
                <div className="section-list-item-main-details">
                  <h3 className="section-list-item-title">{subject.code}</h3>
                  <p className="section-list-item-description">
                    {subject.title}
                  </p>
                </div>
                <div className="section-list-item-btn">
                  <button className="btn btn-primary">View</button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
