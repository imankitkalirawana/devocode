import { Link } from "react-router-dom";

const Contribute = () => {
  return (
    <div className="container-fluid">
      <div className="container-stack">
        <div className="btn btn-slim btn-faded">
          <Link to="/">
            <i className="fa-regular fa-arrow-left icon-left"></i>Back
          </Link>
        </div>
        <div className="container-narrative">
          <h1>Contribute</h1>
          <p>
            Use this form to add a files. You can add the title, description and
            file.
          </p>
        </div>
      </div>
      <div className="container-stack-horizontal">
        <div className="container-sidebar">
          <div className="stack-title-card">
            <i className="fa-regular fa-file"></i>
            <h1>Contribute</h1>
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
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdFBSjoY5HW4QeUwOPn2gBruzUwW4utGR1TAGIXa4UoQwmKgg/viewform?embedded=true"
            width="100%"
            height="789"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
