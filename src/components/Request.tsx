const Request = () => {
  return (
    <div className="section request">
      {/* request data to be added form */}
      <h1>Request Subjects</h1>
      <form className="form">
        <div className="form-input-group">
          <div className="form-input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Subject"
              required
            />
          </div>
        </div>
        <div className="form-input">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            name="description"
            id="description"
            placeholder="Tell us a little bit more..."
          />
        </div>
      </form>
    </div>
  );
};

export default Request;
