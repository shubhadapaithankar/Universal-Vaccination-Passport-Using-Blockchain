import { useState } from "react";
import "./App.css";
import Appbar from "./components/Appbar";
import HospitalLogin from "./components/HospitalLogin";
import HospitalRegistration from "./components/HospitalRegistration";
import UploadCSV from "./components/UploadCSV";
import Vaccination from "./components/Vaccination";
import Admin from "./components/admin/Admin";
import Chat from "./components/ChatComponent";

import backimage from "./images/back.jpg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewRecords from "./components/ViewRecords";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token") !== null);

  return (
    <div
      className="bg_image"
      style={{
        backgroundImage: "url(" + backimage + ")",
        backgroundSize: "cover",
        height: "100vh",
        color: "#f5f5f5",
        textAlign: "center",

        backgroundRepeat: "no-repeat",
      }}
    >
      <Router>
        <Appbar isAuth={isAuth} setIsAuth={setIsAuth} />
        <Routes>
          <Route path="/" element={<Vaccination />} />
          <Route
            path="/hospitalLogin"
            element={<HospitalLogin setIsAuth={setIsAuth} />}
          />
          <Route
            path="/hospitalRegistration"
            element={<HospitalRegistration setIsAuth={setIsAuth} />}
          />
          <Route path="/uploadCSV" element={<UploadCSV />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/viewRecords" element={<ViewRecords />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
