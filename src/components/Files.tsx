import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import Loading from "./Loading";
import ServerError from "./ServerError";

interface Subject {
  code: string;
  name: string;
  description: string;
  _id: string;
}

interface File {
  title: string;
  url: string;
  description: string;
  file: string;
  filesize: string;
}

const Files: React.FC = () => {
  const { subjectId, resourceType } = useParams();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch subject data
    axios
      .get(`${API_BASE_URL}/api/subjects/${subjectId}`)
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

  // check window size
  useEffect(() => {
    if (window.innerWidth <= 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  // sort files
  files.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    } else {
      return 1;
    }
  });

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
                      <div className="section-list-item" key={index}>
                        <a
                          href={`${API_BASE_URL}/uploads/${file.file}`}
                          className={`section-list-item-mini-details ${
                            isMobile ? "section-mobile" : ""
                          }`}
                        >
                          <i
                            className={`fa-solid ${
                              !isMobile ? "fa-file" : "fa-arrow-down-to-line"
                            }`}
                          ></i>
                        </a>
                        <div className="section-list-item-main-details">
                          <h3 className="section-list-item-title">
                            {file.title}
                          </h3>
                          <p className="section-list-item-description">
                            {file.description}
                            {file.filesize
                              ? `(${parseInt(file.filesize)}MB)`
                              : ""}
                          </p>
                        </div>
                        <div className="section-list-item-btn">
                          <a
                            href={`${API_BASE_URL}/uploads/${file.file}`}
                            className="btn btn-primary"
                            target="__blank"
                            download
                          >
                            Download
                          </a>
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
