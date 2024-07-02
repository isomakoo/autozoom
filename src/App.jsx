import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "./App.css";
import Location from "./Location";
import Cars from "./Cars";
import Brend from "./Brend";
import Model from "./Model";
import City from "./City";
import Parol from "./Parol";
import Catigories from "./Catigories";
import Navbar from "./navbar";
function App() {
  return (
    <>
      <div className="app-container">
      <ToastContainer />
        <div className="rout-container">
          <Routes>
            <Route path="/" element={<Location />} />
            <Route path="/home" element={<Navbar />} />
            <Route path="/brend" element={<Brend />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/model" element={<Model />} />
            <Route path="/city" element={<City />} />
            <Route path="/catigories" element={<Catigories />} />
            <Route path="/parol" element={<Parol />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
