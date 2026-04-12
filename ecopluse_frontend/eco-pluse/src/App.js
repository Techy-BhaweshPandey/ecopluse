import LandingPage from "./Components/LandingPage";
import CarbonTracker from "./Components/CarbonTracker";
import AI from "./Components/AI";
import WasteClassifier from "./Components/WasteClassifier";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Gamification from "./Components/Gamification";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Carbontracker" element={<CarbonTracker />} />
         <Route path="/AI" element={<AI />} />
         <Route path="/WasteClassifier" element={<WasteClassifier/>}/>
         <Route path="/Register" element={<Register/>}/>
        < Route path="/Login" element={<Login/>}/>
         <Route path="/Dashboard" element={<Dashboard />} />
         <Route path="/Gamification" element={<Gamification/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;