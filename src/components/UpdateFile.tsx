import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import CustomPopup from "./Popup";
import API_BASE_URL from "../config";

interface Resource {
  _id: string;
  title: string;
  url: string;
  description: string;
  file: string;
  subject: {
    $oid: string;
  };
}

const UpdateFile = () => {
  const { resourceId, resourceType } = useParams();
  const [resource, setResource] = useState<Resource>({} as Resource);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/resources/${resourceType}/get/${resourceId}`)
      .then((res) => {
        setResource(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [resourceId, resourceType]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  const resetPopup = () => {
    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  const handleSubmit = () => {
    if (resource.title === "") {
      setStatus("error");
      setMessage("Please fill all fields");
      setTitle("Error");
      resetPopup();
      return;
    }
    axios
      .put(
        `${API_BASE_URL}/api/resources/${resourceType}/${resourceId}`,
        resource,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setStatus("success");
        setMessage("Updated");
        setTitle("Success");
        resetPopup();
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
        setMessage("Error");
        setTitle("Error");
        resetPopup();
      });
  };

  //   delete resource data

  const handleDelete = () => {
    axios
      .delete(`${API_BASE_URL}/api/resources/${resourceType}/${resourceId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        deleteFile();
        setStatus("success");
        setMessage("Deleted");
        setTitle("Success");
        resetPopup();
        window.location.href = `/resources/update/${resourceType}/${resource.subject}`;
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
        setMessage("Error");
        setTitle("Error");
        resetPopup();
      });
  };

  // delete file from server
  const deleteFile = () => {
    axios
      .delete(`${API_BASE_URL}/uploads/${resource.file}`, {
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
  };

  return (
    <div className="container-fluid">
      {status === "success" ? (
        <CustomPopup
          status="success"
          message={`${message}`}
          title={title ? `${title}` : `${resource.title}`}
        />
      ) : status === "error" ? (
        <CustomPopup status="error" message="Error" title={`${title}`} />
      ) : null}
      <div className="container-stack">
        <div
          className="btn btn-slim btn-faded"
          onClick={() =>
            navigate(`/resources/${resourceType}/${resource.subject}`)
          }
        >
          <i className="fa-regular fa-arrow-left icon-left"></i>Back
        </div>
        <div className="container-narrative">
          <h1>Update File</h1>
          <p>
            Use this form to update a file. You can update the title, file, and
            description.
          </p>
        </div>
      </div>
      <div className="container-stack-horizontal">
        <div className="container-sidebar">
          <div className="stack-title-card">
            <i className="fa-regular fa-file"></i>
            <h1>{resource.title}</h1>
          </div>
          <div className="divider-horizontal"></div>
          <div className="stack-details">
            <div className="stack-progress">
              <div className="progress-circle"></div>
              <div className="progress-line"></div>
              <span className="stack-name">{resource.title}</span>
            </div>
            <div className="stack-progress">
              <div className="progress-circle"></div>
              <div className="progress-line"></div>
              <span className="stack-name">Update</span>
            </div>
            <div className="stack-progress">
              <div className="progress-circle"></div>
              <div className="progress-line"></div>
              <span className="stack-name">{resourceType}</span>
            </div>
          </div>
        </div>
        <div className="container-card">
          <div className="container-card-header">
            <h2>Update File</h2>
          </div>
          <hr className="divider-horizontal" />
          <div className="container-card-form form">
            <div className="form-input">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="my-file"
                value={resource.title}
                onChange={handleInput}
              />
            </div>
            <div className="form-input">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="This is my file."
                value={resource.description}
                onChange={handleInput}
              />
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

export default UpdateFile;
