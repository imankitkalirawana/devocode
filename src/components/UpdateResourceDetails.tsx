import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Popup from "./Popup";
import API_BASE_URL from "../config";

interface Subject {
  code: string;
  name: string;
  description: string;
  _id: string;
}

interface File {
  _id: string;
  title: string;
  url: string;
  description: string;
  file: string;
}
const UpdateResourceDetails = () => {
  const { subjectId, resourceType } = useParams();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState(0);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [newData, setNewData] = useState({
    title: "",
    description: "",
    file: "",
    subject: {
      $oid: "",
    },
  });

  const resetPopup = () => {
    setTimeout(() => {
      setStatus("idle");
    }, 3000);
  };

  useEffect(() => {
    // Fetch subject data
    axios
      .get(`${API_BASE_URL}/api/subjects/${subjectId}`)
      .then((res) => {
        setSubject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // Fetch files data
    axios
      .get(`${API_BASE_URL}/api/resources/${resourceType}/${subjectId}`)
      .then((res) => {
        setFiles(res.data);
        if (res.data.length === 0) {
          setError(1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [subjectId, resourceType]);

  //   handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var file = e.target.files![0];
    var extension = file.name.split(".").pop();
    var dataTitle = newData.title.split(" ").join("_");
    file = new File(
      [file],
      `${
        subject?.code
      }_${resourceType}_${dataTitle}_${Date.now()}.${extension}`,
      {
        type: file.type,
      }
    );

    setFile(file);
    setNewData((prevData) => ({
      ...prevData,
      file: file.name,
    }));
  };

  // handle form submit
  const handleFormSubmit = () => {
    if (newData.title === "") {
      setStatus("error");
      setMessage("Error");
      setTitle("Empty Fields");
      resetPopup();
      return;
    }

    axios
      .post(
        `${API_BASE_URL}/api/resources/${resourceType}/${subjectId}`,
        newData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        uploadFile();
        setStatus("success");
        setMessage("Added");
        resetPopup();
        setFiles([...files, res.data]);
        setNewData({
          title: "",
          description: "",
          file: "",
          subject: {
            $oid: "",
          },
        });

        // Fetch updated data
        axios
          .get(`${API_BASE_URL}/api/resources/${resourceType}/${subjectId}`)
          .then((res) => {
            setFiles(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   upload file
  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${API_BASE_URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log("File uploaded successfully");
      })
      .catch((err) => {
        console.log(err);
        console.log("Error uploading file");
      });
  };

  // sort files
  files.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <>
      {subject && (
        <div className="section resources">
          {/* popup */}
          {status === "success" ? (
            <Popup
              status="success"
              message={`${message}`}
              title={title ? `${title}` : `${newData.title}`}
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
            <Link className="breadcrumbs-item" to="/resources/update">
              Update
            </Link>
            <i className="fas fa-chevron-right breadcrumbs-item"></i>
            <Link
              className="breadcrumbs-item"
              to={`/resources/update/${subjectId}`}
            >
              {subject.code}
            </Link>
            <i className="fas fa-chevron-right breadcrumbs-item"></i>
            <span className="breadcrumbs-item selected">{resourceType}</span>
          </div>

          {/* Updation Form with Input */}
          <h2 className="section-title">Add {resourceType}</h2>
          <div className="section-content">
            <form className="form">
              <div className="form-input-group">
                <div className="form-input">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newData.title}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={newData.description}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="file">File</label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="form-input-group">
                <div className="form-input">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleFormSubmit}
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>

          {!error ? (
            <>
              <h2 className="section-title">Files</h2>
              {/* search */}
              <div className="form-input">
                <label htmlFor="search">Search</label>
                <input
                  id="search"
                  className="input"
                  type="text"
                  placeholder="Unit etc."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {files
                .filter((file) =>
                  file.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((file, index) => (
                  <div className="section-list-item" key={index}>
                    <div className="section-list-item-mini-details">
                      <i className="fa-solid fa-file"></i>
                    </div>
                    <div className="section-list-item-main-details">
                      <h3 className="section-list-item-title">{file.title}</h3>
                      <p className="section-list-item-description">
                        {file.description}
                      </p>
                    </div>
                    <div className="section-list-item-btn">
                      <Link
                        className="btn btn-primary"
                        to={`/resources/update/${resourceType}/update/${file._id}`}
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default UpdateResourceDetails;
