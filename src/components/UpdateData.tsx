import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config";

interface Subject {
  _id: string;
  title: string;
  code: string;
  description: string;
}

const UpdateData = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
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
          <span className="breadcrumbs-item selected">Update</span>
        </div>
        <h2 className="section-title">Title</h2>
        {/* search */}
        <div className="form-input">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            className="input"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="section-content">
          <div className="section-menu">
            {subjects
              .filter((subject) =>
                subject.code.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((subject, index) => (
                <Link
                  to={`/resources/update/${subject._id}`}
                  key={index}
                  className="section-list-item"
                >
                  <div className="section-list-item-mini-details">
                    <i className="fa-solid fa-folder"></i>
                  </div>
                  <div className="section-list-item-main-details">
                    <h3 className="section-list-item-title">{subject.code}</h3>
                    <p className="section-list-item-description"></p>
                  </div>
                  <div className="section-list-item-btn">
                    <Link
                      className="btn btn-primary"
                      to={`/resources/update/subject/${subject._id}`}
                    >
                      Update
                    </Link>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateData;
