import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import API_BASE_URL from "../config";
// import "reactjs-popup/dist/index.css";

interface Subject {
  _id: string;
  title: string;
  code: string;
  description: string;
}

const UpdateSubject = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState<Subject>({} as Subject);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/resources/subjects/${subjectId}`)
      .then((res) => {
        setSubject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [subjectId]);

  // update subject data
  const handleSubmit = () => {
    axios
      .put(`${API_BASE_URL}/api/resources/subjects/${subjectId}`, subject, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    window.location.href = "/resources/update";
  };

  //   delete subject data
  const handleDelete = () => {
    axios
      .delete(`${API_BASE_URL}/api/resources/subjects/${subjectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    window.location.href = "/resources/update";
  };

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
      <h2 className="section-title">Update Subject</h2>
      <div className="form">
        <div className="form-input-group">
          <div className="form-input">
            <label htmlFor="code">Subject Code</label>
            <input
              type="text"
              name="code"
              id="code"
              className="form-control"
              value={subject.code}
              onChange={(e) => setSubject({ ...subject, code: e.target.value })}
            />
          </div>
          <div className="form-input">
            <label htmlFor="title">Subject Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              value={subject.title}
              onChange={(e) =>
                setSubject({ ...subject, title: e.target.value })
              }
            />
          </div>
        </div>
        <div className="form-input-group">
          <div className="form-input">
            <label htmlFor="description">Subject Description</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={subject.description}
              onChange={(e) =>
                setSubject({ ...subject, description: e.target.value })
              }
            ></textarea>
          </div>
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Update Subject
        </button>
        <Popup trigger={<button className="btn btn-danger">Delete</button>}>
          <>
            <div className={`popup`}>
              <div className="popup-content">
                <div className="popup-message">
                  <p className="popup-status">Delete</p>
                  <p className="popup-title">Are you sure?</p>
                </div>
                <div className="popup-icon">
                  <i
                    onClick={handleDelete}
                    className="fa-sharp fa-regular fa-circle-check"
                  ></i>
                </div>
              </div>
            </div>
          </>
        </Popup>
      </div>
    </div>
  );
};

export default UpdateSubject;
