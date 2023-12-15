import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import Loading from "./Loading";
import ServerError from "./ServerError";
import Popup from "reactjs-popup";
import AddedTime from "../functions/AddedTime";
import IsLogged from "../functions/IsLogged";

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
  addedDate: Date;
  _id: string;
}

const ResourcesDetails = () => {
  const { isToken } = IsLogged();
  const { subjectId } = useParams();
  const [subject, setSubject] = useState<Subject>({} as Subject);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  // get selected subject from api
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/resources/subjects/${subjectId}`)
      .then((res) => {
        setSubject(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setServerError(true);
      });
  }, [subjectId]);

  return (
    <div className="section resources">
      {/* breadcrumbs */}
      {loading ? (
        serverError ? (
          <ServerError />
        ) : (
          <Loading />
        )
      ) : (
        <>
          <div className="breadcrumbs">
            <Link className="breadcrumbs-item" to="/">
              Home
            </Link>
            <i className="fas fa-chevron-right breadcrumbs-item"></i>
            <Link className="breadcrumbs-item" to="/resources">
              Subjects
            </Link>
            <i className="fas fa-chevron-right breadcrumbs-item"></i>
            <span className="breadcrumbs-item selected">{subject.code}</span>
          </div>
          <h2 className="section-title">
            {subject.code}: {subject.title}
          </h2>
          <div className="form-input">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              className="input"
              type="text"
              placeholder="MCQs, Notes, etc."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="section-content">
            <div className="section-menu">
              {resourceType
                .filter((resource) =>
                  resource.includes(searchQuery.toLowerCase())
                )
                .sort()
                .map((resource, index) => (
                  <div
                    onClick={() =>
                      navigate(`/resources/${resource}/${subject._id}`)
                    }
                    key={index}
                    className="section-card"
                  >
                    <div className="section-card-upper">
                      <div className="section-card-upper-left">
                        <i className="fa-solid fa-folder"></i>
                        <div className="section-card-details">
                          <h3 className="section-card-title-short">
                            {resource}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ResourcesDetails;
