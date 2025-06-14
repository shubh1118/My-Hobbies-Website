import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Coding from "./components/Coding";
import Cricket from "./components/Cricket";
import Paint from "./components/Paint";
import Reading from "./components/Reading";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coding" element={<Coding />} />
          <Route path="/cricket" element={<Cricket />} />
          <Route path="/paint" element={<Paint />} />
          <Route path="/reading" element={<Reading />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;