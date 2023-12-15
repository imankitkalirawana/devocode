import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Popup from "./Popup";

import API_BASE_URL from "../config";

interface Subject {
  _id: string;
  title: string;
  code: string;
  description: string;
}

const Files: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const [newSubjectData, setNewSubjectData] = useState({
    title: "",
    code: "",
    description: "",
  });

  const resetPopup = () => {
    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  const handleNewSubjectInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewSubjectData({
      ...newSubjectData,
      [e.target.name]: e.target.value,
    });
  };

  //   get subjects from api
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/resources/subjects`)
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const checkSubjectCode = (code: string) => {
    for (let i = 0; i < subjects.length; i++) {
      if (subjects[i].code === code) {
        return true;
      }
    }
    return false;
  };

  const handleAddSubject = () => {
    // Send a POST request to add a new subject
    if (newSubjectData.title === "" || newSubjectData.code === "") {
      setStatus("error");
      setMessage("Error");
      setTitle("Empty Fields");
      resetPopup();
      return;
    }
    if (checkSubjectCode(newSubjectData.code)) {
      setStatus("error");
      setMessage("Error");
      setTitle("Subject already exists");
      resetPopup();
      return;
    }

    axios
      .post(`${API_BASE_URL}/api/resources/subjects`, newSubjectData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setStatus("success");
        setMessage("Added");
        resetPopup();
        console.log(res.data);
        // fetch updated subjects
        axios
          .get(`${API_BASE_URL}/api/resources/subjects`)
          .then((res) => {
            setSubjects(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.error("Error adding new subject:", err);
      });
  };

  return (
    <>
      <div className="container-fluid">
        {/* popup */}
        {status === "success" ? (
          <Popup
            status="success"
            message={`${message}`}
            title={title ? `${title}` : `${newSubjectData.code}`}
          />
        ) : status === "error" ? (
          <Popup status="error" message="Error" title={`${title}`} />
        ) : null}
        <div className="container-stack">
          <div className="btn btn-slim btn-faded">
            <Link to="/resources">
              <i className="fa-regular fa-arrow-left icon-left"></i>Back
            </Link>
          </div>
          <div className="container-narrative">
            <h1>Add Subject</h1>
            <p>
              Use this form to add a subject. You can add the code, title and
              description.
            </p>
          </div>
        </div>
        <div className="container-stack-horizontal">
          <div className="container-sidebar">
            <div className="stack-title-card">
              <i className="fa-regular fa-folder"></i>
              <h1>{newSubjectData.code}</h1>
            </div>
            <div className="divider-horizontal"></div>
            <div className="stack-details">
              <div className="stack-progress">
                <div className="progress-circle"></div>
                <div className="progress-line"></div>
                <span className="stack-name">{newSubjectData.code}</span>
              </div>
              <div className="stack-progress">
                <div className="progress-circle"></div>
                <div className="progress-line"></div>
                <span className="stack-name">Add</span>
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
              <h2>Add Subject</h2>
            </div>
            <hr className="divider-horizontal" /> 
            <div className="container-card-form form">
              <div className="form-input">
                <label htmlFor="code">Subject Code</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  placeholder="CSE101"
                  className="form-control"
                  value={newSubjectData.code}
                  onChange={handleNewSubjectInputChange}
                />
              </div>
              <div className="form-input">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Introduction to Computer Science"
                  className="form-control"
                  value={newSubjectData.title}
                  onChange={handleNewSubjectInputChange}
                />
              </div>
              <div className="form-input">
                <label>Description (Optional)</label>
                <input
                  type="text"
                  name="description"
                  value={newSubjectData.description}
                  onChange={handleNewSubjectInputChange}
                />
              </div>
              <div className="form-input form-btns">
                <Link className="btn btn-secondary" to="/resources">
                  Cancel
                </Link>
                <button className="btn btn-primary" onClick={handleAddSubject}>
                  Add Subject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Files;
