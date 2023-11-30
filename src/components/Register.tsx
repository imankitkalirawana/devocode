import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    try {
      axios
        .post("http://localhost:3000/api/users/register", {
          username,
          email,
          password,
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="section resources">
      <h1 className="section-heading">Register</h1>
      <form onSubmit={handleRegister} className="form">
        <div className="form-input">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div className="form-input">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="form-input">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        {/* button */}
        <div className="form-input">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
