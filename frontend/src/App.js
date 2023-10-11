import "./App.css";
import Appbar from "./components/Appbar";
import HospitalLogin from "./components/HospitalLogin";
import Vaccination from "./components/Vaccination";
import backimage from "./images/back.jpg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div
      class="bg_image"
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
        <Appbar />
        <Routes>
          <Route path="/" element={<Vaccination />} />
          <Route path="/hospitalLogin" element={<HospitalLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
