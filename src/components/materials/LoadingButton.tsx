import React from "react";

const LoadingButton = () => {
  return (
    <div>
      <button className="button">
        <span className="submit">Submit</span>
        <span className="loading">
          <i className="fa fa-refresh"></i>
        </span>
        <span className="check">
          <i className="fa fa-check"></i>
        </span>
      </button>
    </div>
  );
};

export default LoadingButton;
