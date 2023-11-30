import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
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
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/${resourceType}/${resourceId}`)
      .then((res) => {
        setResource(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [resourceId, resourceType]);

  //   update resource data

  //   handle form input
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  const resetPopup = () => {
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  const handleSubmit = () => {
    axios
      .put(`${API_BASE_URL}/api/${resourceType}/${resourceId}`, resource, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsSuccess(true);
        resetPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   delete resource data

  const handleDelete = () => {
    axios
      .delete(`${API_BASE_URL}/api/${resourceType}/${resourceId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        window.location.href = `/resources/update/${resourceType}/${resource.subject}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="resources section">
      {/* popup */}
      {isSuccess && (
        <div className={`popup`}>
          <div className="popup-content">
            <div className="popup-message">
              <p className="popup-status">Success</p>
              <p className="popup-title">Resource updated</p>
            </div>
            <div className="popup-icon">
              <i
                onClick={() => {
                  setIsSuccess(false);
                }}
                className="fa-sharp fa-regular fa-circle-check"
              ></i>
            </div>
          </div>
        </div>
      )}
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
        <Link
          className="breadcrumbs-item"
          to={`/resources/update/${resourceType}/`}
        >
          {resourceType}
        </Link>
        <i className="fas fa-chevron-right breadcrumbs-item"></i>
        <span className="breadcrumbs-item selected">{resource.title}</span>
      </div>
      <h2 className="section-title">Update File</h2>
      {/* input fields and submit button */}
      <div className="form">
        <div className="form-input-group">
          <div className="form-input">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={resource.title}
              onChange={handleInput}
            />
          </div>
          <div className="form-input">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={resource.description}
              onChange={handleInput}
            ></textarea>
          </div>
        </div>
        <div className="form-btns">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Update
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
    </div>
  );
};

export default UpdateFile;
