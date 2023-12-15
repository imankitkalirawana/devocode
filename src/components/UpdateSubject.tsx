import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import API_BASE_URL from "../config";
import CustomPopup from "./Popup";
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
  const [status, setStatus] = useState("idle");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const resetPopup = () => {
    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  const redirect = () => {
    setTimeout(() => {
      navigate("/resources");
    }, 6000);
  };

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
    if (subject.code === "" || subject.title === "") {
      setStatus("error");
      setTitle("Error");
      setMessage("Empty Fields");
      resetPopup();
      return;
    }
    axios
      .put(`${API_BASE_URL}/api/resources/subjects/${subjectId}`, subject, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setStatus("success");
        setTitle("Updated");
        setMessage("Subject updated successfully");
        resetPopup();
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
        setTitle("Error");
        setMessage("Something went wrong");
        resetPopup();
      });
    redirect();
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
        setStatus("success");
        setTitle("Deleted");
        setMessage("Subject deleted successfully");
        resetPopup();
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
        setTitle("Error");
        setMessage("Something went wrong");
        resetPopup();
      });
    redirect();
  };

  return (
    <div className="container-fluid">
      {status === "success" && (
        <CustomPopup title={title} message={message} status={status} />
      )}
      {status === "error" && (
        <CustomPopup title={title} message={message} status={status} />
      )}

      <div className="container-stack">
        <div className="btn btn-slim btn-faded">
          <Link to="/resources">
            <i className="fa-regular fa-arrow-left icon-left"></i>Back
          </Link>
        </div>
        <div className="container-narrative">
          <h1>Update Subject</h1>
          <p>
            Use this form to update a subject. You can update the code, title,
            and description.
          </p>
        </div>
      </div>
      <div className="container-stack-horizontal">
        <div className="container-sidebar">
          <div className="stack-title-card">
            <i className="fa-regular fa-file"></i>
            <h1>{subject.code}</h1>
          </div>
          <div className="divider-horizontal"></div>
          <div className="stack-details">
            <div className="stack-progress">
              <div className="progress-circle"></div>
              <div className="progress-line"></div>
              <span className="stack-name">{subject.code}</span>
            </div>
            <div className="stack-progress">
              <div className="progress-circle"></div>
              <div className="progress-line"></div>
              <span className="stack-name">Update</span>
            </div>
            <div className="stack-progress">
              <div className="progress-circle"></div>
              <div className="progress-line"></div>
              <span className="stack-name">Subject</span>
            </div>
          </div>
        </div>
        <div className="container-card">
          <div className="container-card-header">
            <h2>Update Subject</h2>
          </div>
          <hr className="divider-horizontal" />
          <div className="container-card-form form">
            <div className="form-input">
              <label htmlFor="code">Code</label>
              <input
                type="text"
                name="code"
                id="code"
                className="form-control"
                value={subject.code}
                onChange={(e) =>
                  setSubject({ ...subject, code: e.target.value })
                }
              />
            </div>
            <div className="form-input">
              <label htmlFor="title">Title</label>
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
            <div className="form-input">
              <label htmlFor="description">Description</label>
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
            <div className="form-input form-btns">
              <Popup
                trigger={<button className="btn btn-danger">Delete</button>}
              >
                <>
                  <div className="popup">
                    <div className="popup-upper">
                      <div className="popup-title">Delete</div>
                      <div className="popup-message">Are you sure?</div>
                    </div>
                    <hr className="divider-horizontal" />
                    <div className="popup-btns">
                      <button className="btn btn-danger" onClick={handleDelete}>
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              </Popup>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubject;
