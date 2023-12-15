import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import Loading from "./Loading";
import ServerError from "./ServerError";
import AddedTime from "../functions/AddedTime";
import IsLogged from "../functions/IsLogged";
import Popup from "reactjs-popup";
import CustomPopup from "./Popup";
interface Subject {
  code: string;
  title: string;
  description: string;
  addedDate: Date;
  _id: string;
}

const Resources = () => {
  const { isToken } = IsLogged();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("idle");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // get subjects from api
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/resources/subjects`)
      .then((res) => {
        setSubjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setServerError(true);
      });
  }, []);

  const resetPopup = () => {
    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  // delete subject data with id

  const handleDelete = (id: string) => {
    axios
      .delete(`${API_BASE_URL}/api/resources/subjects/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        axios
          .get(`${API_BASE_URL}/api/resources/subjects`)
          .then((res) => {
            setSubjects(res.data);
            setStatus("success");
            setTitle("Deleted");
            setMessage("Subject deleted successfully");
            resetPopup();
            navigate("/resources");
          })
          .catch((err) => {
            console.log(err);
            setStatus("error");
            setTitle("Error");
            setMessage("Error deleting subject");
            resetPopup();
          });
      });
  };

  return (
    <div>
      <div className="section resources">
        {loading ? (
          serverError ? (
            <ServerError />
          ) : (
            <Loading />
          )
        ) : (
          <>
            {/* Popup */}
            {status === "success" ? (
              <CustomPopup status="success" title={title} message={message} />
            ) : status === "error" ? (
              <CustomPopup status="error" title={title} message={message} />
            ) : null}
            {/* breadcrumbs */}
            <div className="breadcrumbs">
              <Link className="breadcrumbs-item" to="/">
                Home
              </Link>
              <i className="fas fa-chevron-right breadcrumbs-item"></i>
              <span className="breadcrumbs-item selected">Subjects</span>
            </div>
            <div className="add-btn">
              {isToken && (
                <Link className="btn btn-primary" to="/resources/add">
                  Add Subject
                </Link>
              )}
            </div>
            {/* search */}
            <div className="form-input">
              <label htmlFor="search">Search</label>
              <input
                id="search"
                className="input"
                type="text"
                placeholder="CSE101, CSE102, etc."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="section-content">
              <div className="section-menu">
                {subjects
                  .filter(
                    (subject) =>
                      subject.code
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      subject.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      subject.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .map((subject, index) => (
                    <div
                      onClick={() => navigate(`/resources/${subject._id}`)}
                      key={index}
                      className="section-card"
                    >
                      <div className="section-card-upper">
                        <div className="section-card-upper-left">
                          <i className="fa-solid fa-folder"></i>
                          <div className="section-card-details">
                            <h3 className="section-card-title-short">
                              {subject.code}
                            </h3>
                            <p className="section-card-title">
                              {subject.title}
                            </p>
                          </div>
                        </div>
                        {isToken && (
                          <div
                            className="section-card-btn"
                            onClick={(event) => {
                              event.stopPropagation();
                              console.log("Performing other action");
                            }}
                          >
                            <button className="btn btn-faded">
                              <i className="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <div className="section-dropdown-content">
                              <Link
                                className="section-dropdown-item"
                                to={`/resources/update/subject/${subject._id}`}
                              >
                                Edit
                              </Link>
                              <Popup
                                trigger={
                                  <a className="section-dropdown-item btn-danger">
                                    Delete
                                  </a>
                                }
                              >
                                <div className="popup">
                                  <div className="popup-upper">
                                    <div className="popup-title">Delete</div>
                                    <div className="popup-message">
                                      Are you sure?
                                    </div>
                                  </div>
                                  <hr className="divider-horizontal" />
                                  <div className="popup-btns">
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => handleDelete(subject._id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </Popup>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="section-card-lower">
                        <AddedTime dateString={subject.addedDate} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Resources;
