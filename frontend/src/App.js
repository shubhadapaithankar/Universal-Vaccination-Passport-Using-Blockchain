import { useState } from "react";
import "./App.css";
import Appbar from "./components/Appbar";
import HospitalLogin from "./components/HospitalLogin";
import HospitalRegistration from "./components/HospitalRegistration";
import UploadCSV from "./components/UploadCSV";
import Vaccination from "./components/Vaccination";
import Admin from "./components/admin/Admin";
import Chat from "./components/ChatComponent";
import VaccinationCard from "./components/VaccinationCard";

import backimage from "./images/back.jpg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewRecords from "./components/ViewRecords";

function App() {
  const token = localStorage.getItem("token");
  const [isAuth, setIsAuth] = useState(token !== null);
  const [isAdmin, setIsAdmin] = useState(false);

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
        <Appbar
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          setIsAdmin={setIsAdmin}
          isAdmin={isAdmin}
        />
        <Routes>
          <Route path="/" element={<Vaccination />} />
          <Route
            path="/hospitalLogin"
            element={
              <HospitalLogin setIsAuth={setIsAuth} setIsAdmin={setIsAdmin} />
            }
          />
          <Route
            path="/hospitalRegistration"
            element={<HospitalRegistration setIsAuth={setIsAuth} />}
          />
          <Route path="/uploadCSV" element={<UploadCSV isAuth={isAuth} />} />
          <Route path="/admin" element={<Admin isAdmin={isAdmin} />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/vaccinationCard/:uniqueId" element={<VaccinationCard />} />
          <Route
            path="/viewRecords"
            element={<ViewRecords isAuth={isAuth} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
