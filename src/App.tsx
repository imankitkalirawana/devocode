import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Banner from "./components/Banner";
import data from "./Data";
import Resources from "./components/Resources";
import ResourcesDetails from "./components/ResourcesDetails";
import Files from "./components/Files";
import WarningPopup from "./components/WarningPopup";
import Request from "./components/Request";

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
          <Route
            path="/resources"
            element={<Resources subjects={data.subjects} />}
          />
          <Route
            path="/resources/:subjectCode"
            element={<ResourcesDetails />}
          />
          <Route path="/resources/:subjectCode/:fileName" element={<Files />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
