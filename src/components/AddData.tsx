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
    }, 3000);
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
      .get(`${API_BASE_URL}/api/subjects`)
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
      .post(`${API_BASE_URL}/api/subjects`, newSubjectData)
      .then((res) => {
        setStatus("success");
        setMessage("Added");
        resetPopup();
        console.log(res.data);
        // fetch updated subjects
        axios
          .get(`${API_BASE_URL}/api/subjects`)
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
      <div className="section resources">
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
          <span className="breadcrumbs-item selected">Add</span>
        </div>
        {/* Form to add a new subject */}
        <div className="form">
          <div className="form-input-group">
            <div className="form-input">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={newSubjectData.title}
                onChange={handleNewSubjectInputChange}
                required
              />
            </div>
            <div className="form-input">
              <label>Code</label>
              <input
                type="text"
                name="code"
                value={newSubjectData.code}
                onChange={handleNewSubjectInputChange}
                required
              />
            </div>
          </div>
          <div className="form-input-group">
            <div className="form-input">
              <label>Description (Optional)</label>
              <input
                type="text"
                name="description"
                value={newSubjectData.description}
                onChange={handleNewSubjectInputChange}
              />
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleAddSubject}>
            Add Subject
          </button>
        </div>
      </div>
    </>
  );
};

export default Files;
