import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_BASE_URL from "../config";

const resourceType = [
  // "assignments",
  // "ppts",
  "mcqs",
  // "ca",
  "midterm",
  "endterm",
  "notes",
  "syllabus",
  // "moocs",
];

interface Subject {
  code: string;
  name: string;
  description: string;
  _id: string;
}

const UpdateResources = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState<Subject>({} as Subject);
  // get selected subject from api
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/subjects/${subjectId}`)
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
      <h2 className="section-title">CSE101: Introduction to Programming</h2>
      <div className="section-content">
        <div className="section-menu">
          {resourceType.sort().map((resource, index) => (
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
