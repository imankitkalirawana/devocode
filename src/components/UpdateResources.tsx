import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_BASE_URL from "../config";

const resourceType = [
  // "assignments",
  // "ppts",
  "mcqs",
  "ca",
  "midterm",
  "endterm",
  "notes",
  "syllabus",
  "reference",
  "moocs",
];

interface Subject {
  code: string;
  title: string;
  description: string;
  _id: string;
}

const UpdateResources = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState<Subject>({} as Subject);
  const [searchQuery, setSearchQuery] = useState("");
  // get selected subject from api
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/resources/subjects/${subjectId}`)
      .then((res) => {
        setSubject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [subjectId]);

  return (
    <div className="section resources">
      {/* breadcrumbs */}
      <div className="breadcrumbs">
        <Link className="breadcrumbs-item" to="/">
          Home
        </Link>
        <i className="fas fa-chevron-right breadcrumbs-item"></i>
        <Link className="breadcrumbs-item" to="/resources/update">
          Update
        </Link>
        <i className="fas fa-chevron-right breadcrumbs-item"></i>
        <span className="breadcrumbs-item selected">{subject.code}</span>
      </div>
      <h2 className="section-title">
        {subject.code} : {subject.title}
      </h2>
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
          {resourceType
            .filter((resource) =>
              resource.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort()
            .map((resource, index) => (
              <Link
                to={`/resources/update/${resource}/${subject._id}`}
                key={index}
                className="section-list-item"
              >
                <div className="section-list-item-mini-details">
                  <i className="fa-solid fa-folder"></i>
                </div>
                <div className="section-list-item-main-details">
                  <h3
                    className="section-list-item-title"
                    style={
                      resource.length <= 4 ? { textTransform: "uppercase" } : {}
                    }
                  >
                    {resource}
                  </h3>
                  <p className="section-list-item-description"></p>
                </div>
                <div className="section-list-item-btn">
                  <button className="btn btn-primary">View</button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UpdateResources;
