import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";
import CustomPopup from "./Popup";
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  username: string;
}

const Profile = () => {
  const [userDetails, setUserDetails] = useState<User>({} as User);
  const [canDelete, setCanDelete] = useState(false);
  const [status, setStatus] = useState("idle");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [restoreInput, setRestoreInput] = useState<FileList | null>(null);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const resetPopup = () => {
    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/user/${localStorage.getItem("userId")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
        setTitle("Error");
        setMessage("Error getting user details");
        resetPopup();
      });
  }, []);

  //   handle restore input
  const handleRestoreInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Use e.target.files to get the selected file(s)
    setRestoreInput(e.target.files);
  };
  //   upload to /api/upload/zip

  const restore = async () => {
    try {
      if (restoreInput === null || restoreInput.length === 0) {
        // Handle the case where no file is selected
        console.error("No file selected for restore");
        setStatus("error");
        setTitle("Error");
        setMessage("No file selected for restore");
        resetPopup();
        return;
      }

      setStatus("success");
      setTitle("Restoring");
      setMessage("Files are restoring");
      resetPopup();

      const formData = new FormData();
      formData.append("file", restoreInput[0]);

      await axios.post(`${API_BASE_URL}/api/upload/zip`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setStatus("idle");
      setTimeout(() => {
        setStatus("success");
        setTitle("Restored");
        setMessage("Files restored");
      }, 1000);

      resetPopup();
    } catch (error) {
      console.error("Error restoring files:", error);
      setStatus("error");
      setTitle("Error");
      setMessage("Error restoring files");
      resetPopup();
    }
  };

  const download = async () => {
    try {
      setStatus("success");
      setTitle("Downloading");
      setMessage("Files are downloading");
      resetPopup();
      const response = await axios.get(`${API_BASE_URL}/download/all`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStatus("idle");
      setTimeout(() => {
        setStatus("success");
        setTitle("Downloaded");
        setMessage("Files downloaded");
      }, 1000);
      resetPopup();

      const blob = new Blob([response.data], { type: "application/zip" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "all_files.zip";
      link.click();
    } catch (error) {
      console.error("Error downloading files:", error);
      setStatus("error");
      setTitle("Error");
      setMessage("Error downloading files");
      resetPopup();
    }
  };

  const deleteAll = async () => {
    try {
      setStatus("success");
      setTitle("Deleting");
      setMessage("Files are deleting");
      resetPopup();
      await axios.delete(`${API_BASE_URL}/uploads`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStatus("idle");
      setTimeout(() => {
        setStatus("success");
        setTitle("Deleted");
        setMessage("Files deleted");
      }, 1000);
      resetPopup();
    } catch (error) {
      console.error("Error deleting files:", error);
      setStatus("error");
      setTitle("Error");
      setMessage("Error deleting files");
      resetPopup();
    }
    setCanDelete(false);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const changePassword = async () => {
    try {
      if (
        !password.oldPassword ||
        !password.newPassword ||
        !password.confirmPassword
      ) {
        setStatus("error");
        setTitle("failed");
        setMessage("Please fill all fields");
        resetPopup();
        return;
      }

      if (password.newPassword !== password.confirmPassword) {
        setStatus("error");
        setTitle("Error");
        setMessage("Passwords do not match");
        resetPopup();
        return;
      }

      await axios.post(
        `${API_BASE_URL}/api/auth/change-password/${localStorage.getItem(
          "userId"
        )}`,
        {
          currentPassword: password.oldPassword,
          newPassword: password.newPassword,
          confirmPassword: password.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setStatus("success");
      setTitle("Password updated");
      setMessage("Password updated successfully");
      resetPopup();
    } catch (error) {
      console.error("Error changing password:", error);
      setStatus("error");
      setTitle("Error");
      setMessage("Error changing password");
      resetPopup();
    }
  };

  const handleUpdateDetailsInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const updateUserDetails = async () => {
    try {
      if (!userDetails.name || !userDetails.username || !userDetails.email) {
        setStatus("error");
        setTitle("failed");
        setMessage("Please fill all fields");
        resetPopup();
        return;
      }

      await axios
        .put(
          `${API_BASE_URL}/api/auth/user/${localStorage.getItem("userId")}`,
          userDetails,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setStatus("success");
          setTitle("Details updated");
          setMessage("Details updated successfully");
          resetPopup();
        });
    } catch (error) {
      if ((error as any).response?.status === 400) {
        setStatus("error");
        setTitle("Failed");
        setMessage("Username already exists");
        resetPopup();
        return;
      }
      if ((error as any).response?.status === 401) {
        setStatus("error");
        setTitle("Failed");
        setMessage("Email already exists");
        resetPopup();
        return;
      }
      console.error("Error updating details:", error);
      setStatus("error");
      setTitle("Error");
      setMessage("Error updating details");
      resetPopup();
    }
  };

  return (
    <div className="container-fluid">
      {/* popup */}
      {status === "success" ? (
        <CustomPopup
          status="success"
          message={`${message}`}
          title={title ? `${title}` : `${title}`}
        />
      ) : status === "error" ? (
        <CustomPopup
          status={`${status}`}
          message={`${message}`}
          title={`${title}`}
        />
      ) : (
        ""
      )}
      <div className="container-stack">
        <div className="btn btn-slim btn-faded">
          <Link to="/">
            <i className="fa-regular fa-arrow-left icon-left"></i>Back
          </Link>
        </div>
        <div className="container-narrative">
          <h1>Profile</h1>
          <p>You can manage your account here.</p>
        </div>
      </div>
      <div className="container-stack-horizontal">
        <div className="container-sidebar">
          <div className="stack-title-card">
            <i className="fa-regular fa-file"></i>
            <h1>{userDetails?.username}</h1>
          </div>
          <div className="divider-horizontal"></div>
          <div className="stack-details">
            <div className="stack-progress">
              <div className="progress-circle"></div>
              <div className="progress-line"></div>
              <span className="stack-name">Profile</span>
            </div>
            <div className="stack-progress">
              <div className="progress-circle"></div>
              <div className="progress-line"></div>
              <span className="stack-name">Home</span>
            </div>
          </div>
        </div>
        <div className="container-card-cover">
          <div className="container-card">
            <div className="container-card-header">
              <h2>Manage Profile</h2>
            </div>
            <hr className="divider-horizontal" />
            <div className="container-card-form form">
              <div className="form-input">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={userDetails.name}
                  onChange={handleUpdateDetailsInput}
                />
              </div>
              <div className="form-input">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="johndoe"
                  value={userDetails.username}
                  onChange={handleUpdateDetailsInput}
                />
              </div>
              <div className="form-input">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  value={userDetails.email}
                  onChange={handleUpdateDetailsInput}
                />
              </div>
              <div className="form-input form-btns">
                <button className="btn btn-primary" onClick={updateUserDetails}>
                  Update
                </button>
              </div>
            </div>
          </div>
          <div className="container-card">
            <div className="container-card-header">
              <h2>Update Password</h2>
            </div>
            <hr className="divider-horizontal" />
            <div className="container-card-form form">
              <div className="form-input">
                <label htmlFor="oldPassword">Old Password</label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  placeholder="********"
                  onChange={handlePasswordInput}
                />
              </div>
              <div className="form-input">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="********"
                  onChange={handlePasswordInput}
                />
              </div>
              <div className="form-input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="********"
                  onChange={handlePasswordInput}
                />
              </div>
              <div className="form-input form-btns">
                <button className="btn btn-primary" onClick={changePassword}>
                  Update
                </button>
              </div>
            </div>
          </div>
          {userDetails.role === "admin" && (
            <>
              <div className="container-card">
                <div className="container-card-header">
                  <h2>Backup and Restore</h2>
                </div>
                <hr className="divider-horizontal" />
                <div className="container-card-form form">
                  <div className="form-input">
                    <label htmlFor="restore">Restore (Only Zip)</label>
                    <input
                      type="file"
                      id="restore"
                      name="restore"
                      onChange={handleRestoreInput}
                    />
                  </div>
                  <div className="form-input form-btns">
                    <button className="btn" onClick={download}>
                      Backup
                    </button>
                    <Popup
                      trigger={
                        <button className="btn btn-primary">Restore</button>
                      }
                    >
                      <div className="popup">
                        <div className="popup-upper">
                          <div className="popup-title">Restore</div>
                          <div className="popup-message">
                            Restoring data may replace your existing files. Are
                            you sure?
                          </div>
                        </div>
                        <hr className="divider-horizontal" />
                        <div className="popup-btns">
                          <button className="btn btn-danger" onClick={restore}>
                            Restore
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </div>
                </div>
              </div>

              <div className="container-card container-card-danger">
                <div className="container-card-header">
                  <h2>Delete all files</h2>
                </div>
                <hr className="divider-horizontal" />
                <div className="container-card-form form">
                  <div className="form-input">
                    <p>
                      This action will delete all the files present in the
                      database.
                    </p>
                  </div>
                  <hr className="divider-horizontal no-margin" />
                  <div className="form-input form-btns">
                    <Popup
                      trigger={
                        <button className="btn btn-danger">
                          Delete all files
                        </button>
                      }
                    >
                      <div className="popup">
                        <div className="popup-upper">
                          <div className="popup-title">Delete</div>
                          <div className="popup-message">
                            Are you sure you want to delete all files?
                          </div>
                          <div className="form-input">
                            <input
                              type="text"
                              id="confirm"
                              name="confirm"
                              placeholder="Type 'confirm' to delete"
                              onChange={(e) => {
                                if (e.target.value === "confirm") {
                                  setCanDelete(true);
                                } else {
                                  setCanDelete(false);
                                }
                              }}
                            />
                          </div>
                        </div>

                        <hr className="divider-horizontal" />
                        <div className="popup-btns">
                          <button
                            className="btn btn-danger"
                            onClick={deleteAll}
                            disabled={!canDelete}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
