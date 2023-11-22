import { Link, Outlet } from "react-router-dom";
import "../css/Resources.css";
import { useState } from "react";

type Props = {
  subjects: Array<{
    id: string;
    code: string;
    title: string;
    description: string;
    url: string;
    image: string;
    folder: string;
    syllabus?: string | Array<any>;
    reference?: Array<any>;
    moocs?: Array<any>;
    notes?: Array<any>;
    assignments?: Array<any>;
    ppts?: Array<any>;
    mcqs?: Array<any>;
    ca?: Array<any>;
    midterm?: Array<any>;
    endterm?: Array<any>;
  }>;
};

const ResourcesHome = ({ subjects }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  // sort subjects
  subjects.sort((a, b) => (a.code > b.code ? 1 : -1));

  return (
    <>
      <div className="section resources">
        {/* breadcrumbs */}
        <div className="breadcrumbs">
          <Link className="breadcrumbs-item" to="/">
            Home
          </Link>
          <i className="fas fa-chevron-right breadcrumbs-item"></i>
          <span className="breadcrumbs-item selected">Subjects</span>
        </div>
        <h2 className="section-title">Subjects</h2>
        <input
          className="input"
          type="text"
          placeholder={`Search Subjects...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
                    .includes(searchQuery.toLowerCase())
              )
              .map((subject, index) => (
                <Link
                  to={`/resources/${subject.code}`}
                  key={index}
                  className="section-list-item"
                >
                  <div className="section-list-item-mini-details">
                    <i className="fa-solid fa-folder"></i>
                  </div>
                  <div className="section-list-item-main-details">
                    <h3 className="section-list-item-title">{subject.code}</h3>
                    <p className="section-list-item-description">
                      {subject.title}
                    </p>
                  </div>
                  <div className="section-list-item-btn">
                    <Link
                      to={`/resources/${subject.code}`}
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
    </>
  );
};

const Resources = ({ subjects }: Props) => {
  return (
    <>
      <ResourcesHome subjects={subjects} />
      <Outlet />
    </>
  );
};

export default Resources;
