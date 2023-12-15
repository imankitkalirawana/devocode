import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import Loading from "./Loading";
import ServerError from "./ServerError";
import Popup from "reactjs-popup";
import CustomPopup from "./Popup";
import IsLogged from "../functions/IsLogged";

interface Subject {
  code: string;
  title: string;
  description: string;
  addedDate: Date;
  _id: string;
}

interface File {
  _id: string;
  title: string;
  url: string;
  description: string;
  file: string;
  filesize: string;
}

const Files: React.FC = () => {
  const { isToken } = IsLogged();
  const { subjectId, resourceType } = useParams();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState(0);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const resetPopup = () => {
    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  useEffect(() => {
    // Fetch subject data
    axios
      .get(`${API_BASE_URL}/api/resources/subjects/${subjectId}`)
      .then((res) => {
        setSubject(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setServerError(true);
      });

    // Fetch files data
    axios
      .get(`${API_BASE_URL}/api/resources/${resourceType}/${subjectId}`)
      .then((res) => {
        setFiles(res.data);
        setLoading(false);

        if (res.data.length === 0) {
          setError(1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [subjectId, resourceType]);

  // sort files
  files.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    } else {
      return 1;
    }
  });

  const handleDownload = async (file: any) => {
    const response = await fetch(`${API_BASE_URL}/uploads/${file}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${file}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setStatus("success");
    setMessage("Downloaded");
    setTitle("Success");
    resetPopup();
  };

  // delete file data with id

  const handleDelete = (id: string) => {
    return () => {
      axios
        .delete(`${API_BASE_URL}/api/resources/${resourceType}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          axios
            .get(`${API_BASE_URL}/api/resources/${resourceType}/${subjectId}`)
            .then((res) => {
              setFiles(res.data);
              setStatus("success");
              setMessage("Deleted");
              setTitle("Success");
              resetPopup();
            })
            .catch((err) => {
              console.log(err);
              setStatus("error");
              setMessage("Error deleting file");
              setTitle("Error");
              resetPopup();
            });
        });
    };
  };

  return (
    <>
      {subject && (
        <div className="section resources">
          {loading ? (
            serverError ? (
              <ServerError />
            ) : (
              <Loading />
            )
          ) : (
            <>
              {status === "success" ? (
                <CustomPopup
                  status="success"
                  message={`${message}`}
                  title={title}
                />
              ) : status === "error" ? (
                <CustomPopup
                  status="error"
                  message="Error"
                  title={`${title}`}
                />
              ) : null}{" "}
              {/* breadcrumbs */}
              <div className="breadcrumbs">
                <Link className="breadcrumbs-item" to="/">
                  Home
                </Link>
                <i className="fas fa-chevron-right breadcrumbs-item"></i>
                <Link className="breadcrumbs-item" to="/resources">
                  Subjects
                </Link>
                <i className="fas fa-chevron-right breadcrumbs-item"></i>
                <Link
                  className="breadcrumbs-item"
                  to={`/resources/${subjectId}`}
                >
                  {subject.code}
                </Link>
                <i className="fas fa-chevron-right breadcrumbs-item"></i>
                <span className="breadcrumbs-item selected">
                  {resourceType}
                </span>
              </div>
              <div className="add-btn">
                {isToken && (
                  <Link
                    className="btn btn-primary"
                    to={`/resources/update/${resourceType}/${subjectId}`}
                  >
                    Add {resourceType}
                  </Link>
                )}
              </div>
              {!error ? (
                <>
                  <h2 className="section-title">{resourceType}</h2>

                  <div className="form-input">
                    <label htmlFor="search">Search</label>
                    <input
                      id="search"
                      className="input"
                      type="text"
                      placeholder={`Search ${resourceType}`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  {files
                    .filter((file) =>
                      file.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((file, index) => (
                      <div
                        onClick={() => (
                          window.open(`${API_BASE_URL}/uploads/${file.file}`),
                          "_blank"
                        )}
                        key={index}
                        className="section-card"
                      >
                        <div className="section-card-upper">
                          <div className="section-card-upper-left">
                            <i className="fa-solid fa-folder"></i>
                            <div className="section-card-details">
                              <h3 className="section-card-title-short">
                                {file.title}
                              </h3>
                              <p className="section-card-title">
                                {/* {subject.title} */}
                              </p>
                            </div>
                          </div>

                          <div
                            className="section-card-btn"
                            onClick={(event) => {
                              event.stopPropagation();
                            }}
                          >
                            <button className="btn btn-faded">
                              <i className="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <div className="section-dropdown-content">
                              <a
                                className="section-dropdown-item"
                                href={`${API_BASE_URL}/uploads/${file.file}`}
                                target="_blank"
                              >
                                View
                              </a>
                              <a
                                className="section-dropdown-item"
                                // href={`${API_BASE_URL}/uploads/${file.file}`}
                                onClick={() => handleDownload(file.file)}
                              >
                                Download
                              </a>

                              {isToken && (
                                <>
                                  <Link
                                    className="section-dropdown-item"
                                    to={`/resources/update/${resourceType}/update/${file._id}`}
                                  >
                                    Edit
                                  </Link>
                                  <Popup
                                    trigger={
                                      <span className="section-dropdown-item btn-danger">
                                        Delete
                                      </span>
                                    }
                                  >
                                    <>
                                      <div className="popup">
                                        <div className="popup-upper">
                                          <div className="popup-title">
                                            Delete
                                          </div>
                                          <div className="popup-message">
                                            Are you sure?
                                          </div>
                                        </div>
                                        <hr className="divider-horizontal" />
                                        <div className="popup-btns">
                                          <button
                                            className="btn btn-danger"
                                            onClick={handleDelete(file._id)}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  </Popup>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="section-card-lower">
                          {file.filesize ? `${parseInt(file.filesize)}MB` : ""}
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <div className="section-error">
                  <img src="/error404.png" alt="" />
                  <p>
                    The content you are trying to access will be available
                    soon...
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Files;
