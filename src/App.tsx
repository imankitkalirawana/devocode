import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import AddData from "./components/AddData";
import Resources from "./components/Resources";
import ResourcesDetails from "./components/ResourcesDetails";
import Files from "./components/Files";
import UpdateData from "./components/UpdateData";
import UpdateResources from "./components/UpdateResources";
import UpdateResourceDetails from "./components/UpdateResourceDetails";
import UpdateFile from "./components/UpdateFile";
import UpdateSubject from "./components/UpdateSubject";
import Login from "./components/Login";
import { Analytics } from "@vercel/analytics/react";

import Home from "./components/Home";

import "./App.css";

const isAuthenticated = () => {
  // Check if the user is logged in (you can implement your own logic)
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = ({ element }: any) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* login route*/}
          <Route path="/login" element={<Login />} />
          {/* register route*/}

          <Route
            path="/resources/add"
            element={<PrivateRoute element={<AddData />} />}
          />
          <Route
            path="/resources/update"
            element={<PrivateRoute element={<UpdateData />} />}
          />
          <Route
            path="/resources/update/subject/:subjectId"
            element={<PrivateRoute element={<UpdateSubject />} />}
          />
          <Route
            path="/resources/update/:subjectId"
            element={<PrivateRoute element={<UpdateResources />} />}
          />
          <Route
            path="/resources/update/:resourceType/:subjectId"
            element={<PrivateRoute element={<UpdateResourceDetails />} />}
          />
          <Route
            path="/resources/update/:resourceType/update/:resourceId"
            element={<PrivateRoute element={<UpdateFile />} />}
          />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:subjectId" element={<ResourcesDetails />} />
          <Route
            path="/resources/:resourceType/:subjectId"
            element={<Files />}
          />
        </Routes>
      </Router>
      <Analytics />
    </>
  );
}

export default App;
