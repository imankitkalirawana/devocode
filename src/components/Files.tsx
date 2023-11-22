import { useParams, Link } from "react-router-dom";
import data from "../Data";

interface Subject {
  id: string;
  code: string;
  title: string;
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
  const { subjectCode, fileName } = useParams();
  const selectedSubject = data.subjects.find(
    (subject) => subject.code === subjectCode
  ) as Subject | undefined;

  if (!selectedSubject) {
    return <h1>No Data found</h1>;
  }

  if (!fileName) {
    return <h1>Not defined</h1>;
  }

  const selectedFile = (selectedSubject as any)[fileName] as File[] | undefined;

  if (!selectedFile) {
    return <h1>No Data found</h1>;
  }

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

        <div className="breadcrumbs">{/* ... (unchanged) */}</div>
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
};

export default Files;
