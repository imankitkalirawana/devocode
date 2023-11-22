import { useParams, Link } from "react-router-dom";
import data from "../Data";
import { useState } from "react";

interface Subject {
  id: string;
  code: string;
  title: string;
  folder: string;
  // Add other properties based on the actual structure of your data
}

interface File {
  name: string;
  unit: string;
  description: string;
  // Add other properties based on the actual structure of your data
}

const Files: React.FC = () => {
  // Get the subjectCode from the URL parameter
  const [searchQuery, setSearchQuery] = useState("");

  const { subjectCode, fileName } = useParams();
  const selectedSubject = data.subjects.find(
    (subject) => subject.code === subjectCode
  ) as Subject | undefined;

  if (!selectedSubject) {
    return (
      <div className="section resources">
        <div className="breadcrumbs">
          <Link className="breadcrumbs-item" to="/">
            Home
          </Link>
          <i className="fas fa-chevron-right breadcrumbs-item"></i>
          <Link className="breadcrumbs-item" to="/resources">
            Subjects
          </Link>
          <i className="fas fa-chevron-right breadcrumbs-item"></i>
          <Link to={`/resources/${subjectCode}`} className="breadcrumbs-item">
            {subjectCode}
          </Link>
          <i className="fas fa-chevron-right breadcrumbs-item"></i>
          <span className="breadcrumbs-item selected">{fileName}</span>
        </div>
        <div className="section-error">
          <img src="/error404.png" alt="" />
          <p>The content you are trying to access will be available soon...</p>
        </div>
      </div>
    );
  }

  if (!fileName) {
    return (
      <div className="section resources">
        <div className="breadcrumbs">
          <Link className="breadcrumbs-item" to="/">
            Home
          </Link>
          <i className="fas fa-chevron-right breadcrumbs-item"></i>
          <Link className="breadcrumbs-item" to="/resources">
            Subjects
          </Link>
          <i className="fas fa-chevron-right breadcrumbs-item"></i>
          <Link to={`/resources/${subjectCode}`} className="breadcrumbs-item">
            {subjectCode}
          </Link>
          <i className="fas fa-chevron-right breadcrumbs-item"></i>
          <span className="breadcrumbs-item selected">{fileName}</span>
        </div>
        <div className="section-error">
          <img src="/error404.png" alt="" />
          <p>The content you are trying to access will be available soon...</p>
        </div>
      </div>
    );
  }

  const selectedFile = (selectedSubject as any)[fileName] as File[] | undefined;

  if (!selectedFile) {
    return (
      <div className="section resources">
        <div className="breadcrumbs">
          <Link className="breadcrumbs-item" to="/">
            Home
          </Link>
          <i className="fas fa-chevron-right breadcrumbs-item"></i>
          <Link className="breadcrumbs-item" to="/resources">
            Subjects
          </Link>
          <i className="fas fa-chevron-right breadcrumbs-item"></i>
          <Link to={`/resources/${subjectCode}`} className="breadcrumbs-item">
            {subjectCode}
          </Link>
          <i className="fas fa-chevron-right breadcrumbs-item"></i>
          <span className="breadcrumbs-item selected">{fileName}</span>
        </div>
        <div className="section-error">
          <img src="/error404.png" alt="" />
          <p>The content you are trying to access will be available soon...</p>
        </div>
      </div>
    );
  }

  // sort selected file
  selectedFile.sort((a, b) => a.unit.localeCompare(b.unit));
  return (
    <>
      <div className="section resources">
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
          <Link to={`/resources/${subjectCode}`} className="breadcrumbs-item">
            {subjectCode}
          </Link>
          <i className="fas fa-chevron-right breadcrumbs-item"></i>
          <span className="breadcrumbs-item selected">{fileName}</span>
        </div>

        <h2 className="section-title">{fileName}</h2>
        <input
          className="input"
          type="text"
          placeholder={`Search ${fileName}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="section-content">
          {selectedFile.length > 0 ? (
            <div className="section-menu">
              {selectedFile
                .filter((file) =>
                  file.unit.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((file, index) => (
                  <a
                    href={`/resources/${selectedSubject.folder}/${file.name}`}
                    target="_blank"
                    key={index}
                    className="section-list-item"
                  >
                    <div className="section-list-item-mini-details">
                      <i className="fas fa-book"></i>
                    </div>
                    <div className="section-list-item-main-details">
                      <h3 className="section-list-item-title">{file.unit}</h3>
                      <p className="section-list-item-description">
                        {file.description}
                      </p>
                    </div>
                    <div className="section-list-item-btn">
                      <a
                        href={`/resources/${selectedSubject.folder}/${file.name}`}
                        download
                        className="btn btn-primary"
                      >
                        <i className="fa-regular fa-arrow-down"></i>
                        Download
                      </a>
                    </div>
                  </a>
                ))}
            </div>
          ) : (
            <div className="section-error">
              <img src="/error404.png" alt="" />
              <p>
                The content you are trying to access will be available soon...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Files;
