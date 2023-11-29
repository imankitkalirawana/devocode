import React from "react";

import "../css/Popup.css";
// popup based upon status
// status: idle, success, error

interface Props {
  status: string;
  message: string;
  title: string;
}

const Popup: React.FC<Props> = ({ status, message, title }) => {
  return (
    <div className={`popup ${status}`}>
      <div className="popup-content">
        <div className="popup-message">
          <p className="popup-status">{message}</p>
          <p className="popup-title">{title}</p>
        </div>
        <div className="popup-icon">
          {status === "success" ? (
            <i className="fa-sharp fa-regular fa-circle-check"></i>
          ) : (
            <i className="fa-sharp fa-regular fa-circle-xmark"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
