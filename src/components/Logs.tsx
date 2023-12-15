import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { Link } from "react-router-dom";

const Logs = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Fetch logs from the server
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/logs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Check if the data received is a string before splitting
        if (typeof response.data === "string") {
          setLogs(response.data.split("\n"));
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="container-fluid">
      <div className="container-stack">
        <div className="btn btn-slim btn-faded">
          <Link to="/">
            <i className="fa-regular fa-arrow-left icon-left"></i>Back
          </Link>
        </div>
        <div className="container-narrative">
          <h1>Logs</h1>
          <p>You will get a list of all the logs here.</p>
        </div>
      </div>
      <div className="container-stack-horizontal">
        <div className="container-sidebar">
          <div className="stack-title-card">
            <i className="fa-regular fa-file"></i>
            <h1>Logs</h1>
          </div>
          <div className="divider-horizontal"></div>
          <div className="stack-details">
            <div className="stack-progress">
              <div className="progress-circle"></div>
              <div className="progress-line"></div>
              <span className="stack-name">Logs</span>
            </div>
            <div className="stack-progress">
              <div className="progress-circle"></div>
              <div className="progress-line"></div>
              <span className="stack-name">Home</span>
            </div>
          </div>
        </div>
        <div className="container-card container-logs">
          {logs.map((logLine, index) => (
            // log table
            <div className="card" key={index}>
              <div className="card-body">
                <p className="card-title">{index + 1}</p>
                <p className="card-text">{logLine}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logs;
