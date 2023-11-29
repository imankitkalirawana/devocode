import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Banner from "./components/Banner";
import AddData from "./components/AddData";
import Resources from "./components/Resources";
import ResourcesDetails from "./components/ResourcesDetails";
import Files from "./components/Files";
import WarningPopup from "./components/WarningPopup";
import Request from "./components/Request";
import UpdateData from "./components/UpdateData";
import UpdateResources from "./components/UpdateResources";
import UpdateResourceDetails from "./components/UpdateResourceDetails";
import UpdateFile from "./components/UpdateFile";
import UpdateSubject from "./components/UpdateSubject";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Request />
                <WarningPopup />
              </>
            }
          />
          <Route path="/resources/add" element={<AddData />} />
          <Route path="/resources/update" element={<UpdateData />} />
          <Route
            path="/resources/update/subject/:subjectId"
            element={<UpdateSubject />}
          />
          <Route
            path="/resources/update/:subjectId"
            element={<UpdateResources />}
          />
          <Route
            path="/resources/update/:resourceType/:subjectId"
            element={<UpdateResourceDetails />}
          />
          <Route
            path="/resources/update/:resourceType/update/:resourceId"
            element={<UpdateFile />}
          />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:subjectId" element={<ResourcesDetails />} />
          <Route
            path="/resources/:resourceType/:subjectId"
            element={<Files />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
