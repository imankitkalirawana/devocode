import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Popup from "./Popup";
import API_BASE_URL from "../config";

interface Subject {
  code: string;
  title: string;
  description: string;
  _id: string;
}

interface File {
  _id: string;
  title: string;
  url: string;
  description: string;
  file: string;
  filesize: string;
}
const UpdateResourceDetails = () => {
  const { subjectId, resourceType } = useParams();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<any>(null);

  const [newData, setNewData] = useState({
    title: "",
    description: "",
    file: "",
    filesize: "",
    subject: {
      $oid: "",
    },
  });

  const resetPopup = () => {
    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  useEffect(() => {
    // Fetch subject data
    axios
      .get(`${API_BASE_URL}/api/resources/subjects/${subjectId}`)
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
    const selectedFile = e.target.files![0];

    // Check if a file is selected
    if (selectedFile) {
      // Get the file size in bytes
      const fileSize = selectedFile.size;
      const fileSizeInMB = (fileSize / (1024 * 1024)).toFixed(2);

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
        filesize: fileSizeInMB,
      }));
    }
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
        setTitle("Success");
        resetPopup();
        setFiles([...files, res.data]);
        setNewData({
          title: "",
          description: "",
          file: "",
          filesize: "",
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
        <div className="container-fluid">
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
          <div className="container-stack">
            <div className="btn btn-slim btn-faded">
              <Link to={`/resources/${resourceType}/${subjectId}`}>
                <i className="fa-regular fa-arrow-left icon-left"></i>Back
              </Link>
            </div>
            <div className="container-narrative">
              <h1>Add {resourceType}</h1>
              <p>
                Use this form to add a subject. You can add the title,
                description and file.
              </p>
            </div>
          </div>
          <div className="container-stack-horizontal">
            <div className="container-sidebar">
              <div className="stack-title-card">
                <i className="fa-regular fa-file"></i>
                <h1>{newData.title}</h1>
              </div>
              <div className="divider-horizontal"></div>
              <div className="stack-details">
                <div className="stack-progress">
                  <div className="progress-circle"></div>
                  <div className="progress-line"></div>
                  <span className="stack-name">{newData.title}</span>
                </div>
                <div className="stack-progress">
                  <div className="progress-circle"></div>
                  <div className="progress-line"></div>
                  <span className="stack-name">Add</span>
                </div>
                <div className="stack-progress">
                  <div className="progress-circle"></div>
                  <div className="progress-line"></div>
                  <span className="stack-name">{resourceType}</span>
                </div>
                <div className="stack-progress">
                  <div className="progress-circle"></div>
                  <div className="progress-line"></div>
                  <span className="stack-name">{subject.code}</span>
                </div>
                <div className="stack-progress">
                  <div className="progress-circle"></div>
                  <div className="progress-line"></div>
                  <span className="stack-name">Subjects</span>
                </div>
              </div>
            </div>
            <div className="container-card">
              <div className="container-card-header">
                <h2>Add {resourceType}</h2>
              </div>
              <hr className="divider-horizontal" />
              <div className="container-card-form form">
                <div className="form-input">
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    className="input"
                    type="text"
                    name="title"
                    placeholder="Unit 1, Unit 2, etc."
                    value={newData.title}
                    onChange={handleInputChange}
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
                    id="file"
                    className="input"
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="form-input form-btns">
                  <Link
                    className="btn btn-secondary"
                    to={`/resources/${resourceType}/${subjectId}`}
                  >
                    Cancel
                  </Link>
                  <button
                    className="btn btn-primary"
                    onClick={handleFormSubmit}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateResourceDetails;
