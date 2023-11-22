import { useParams, Link } from "react-router-dom";
import data from "../Data";

const fileNames = [
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

const ResourcesDetails = () => {
  // Get the subjectCode from the URL parameter
  const { subjectCode } = useParams();
  const selectedSubject = data.subjects.find(
    (subject) => subject.code === subjectCode
  );

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
          <span className="breadcrumbs-item selected">{subjectCode}</span>
        </div>
        <div className="section-error">
          <img src="/error404.png" alt="" />
          <p>
            Oops!!! Seems like you're trying to access a subject that doesn't
            exist...
          </p>
        </div>
      </div>
    );
  }

  return (
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
        <span className="breadcrumbs-item selected">{subjectCode}</span>
      </div>
      <h2 className="section-title">
        {selectedSubject.code}: {selectedSubject.title}
      </h2>
      <div className="section-content">
        <div className="section-menu">
          {fileNames.sort().map((file, index) => (
            <Link
              to={`/resources/${selectedSubject.code}/${file}`}
              key={index}
              className="section-list-item"
            >
              <div className="section-list-item-mini-details">
                <i className="fa-solid fa-folder"></i>
              </div>
              <div className="section-list-item-main-details">
                <h3
                  className="section-list-item-title"
                  style={file.length <= 4 ? { textTransform: "uppercase" } : {}}
                >
                  {file}
                </h3>{" "}
                <p className="section-list-item-description"></p>
              </div>
              <div className="section-list-item-btn">
                <Link
                  to={`/resources/${selectedSubject.code}/${file}`}
                  className="btn btn-primary"
                >
                  View
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesDetails;
