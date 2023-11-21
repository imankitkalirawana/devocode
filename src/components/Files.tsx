import { useParams, Link } from "react-router-dom";
import data from "../Data";
const Files = () => {
  // Get the subjectCode from the URL parameter
  const { subjectCode, fileName } = useParams();
  const selectedSubject = data.subjects.find(
    (subject) => subject.code === subjectCode
  );
  if (!selectedSubject) {
    return <h1>No Data found</h1>;
  }

  // Use type assertion to tell TypeScript that fileName is a valid key
  const selectedFile =
    selectedSubject[fileName as keyof typeof selectedSubject];

  if (!selectedFile) {
    return <h1>No Data found</h1>;
  }

  if (Array.isArray(selectedFile)) {
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
            <Link className="breadcrumbs-item" to={`/resources/${subjectCode}`}>
              {subjectCode}
            </Link>
            <i className="fas fa-chevron-right breadcrumbs-item"></i>
            <span className="breadcrumbs-item selected">{fileName}</span>
          </div>
          <h2 className="section-title">{fileName}</h2>
          <div className="section-content">
            <div className="section-menu">
              {selectedFile.map((file, index) => (
                <li key={index} className="section-list-item">
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
                      href={`/resources/${file.name}`}
                      download
                      className="btn btn-primary"
                    >
                      <i className="fa-regular fa-arrow-down"></i>
                      Download
                    </a>
                  </div>
                </li>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Files;
