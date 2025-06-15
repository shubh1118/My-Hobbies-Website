import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import React, { lazy, Suspense, useMemo } from "react";

const Home = lazy(() => import("./components/Home/Home"));
const Coding = lazy(() => import("./components/Coding/Coding"));
const Cricket = lazy(() => import("./components/Cricket/Cricket"));
const Paint = lazy(() => import("./components/Paint/Paint"));
const Reading = lazy(() => import("./components/Reading/Reading"));

const NavbarMemo = React.memo(Navbar);
const FooterMemo = React.memo(Footer);

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const location = useLocation();
  const showFooter = useMemo(
    () => location.pathname === "/",
    [location.pathname]
  );

  return (
    <div className="App">
      <NavbarMemo />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coding" element={<Coding />} />
          <Route path="/cricket" element={<Cricket />} />
          <Route path="/paint" element={<Paint />} />
          <Route path="/reading" element={<Reading />} />
        </Routes>
      </Suspense>

      {showFooter && <FooterMemo />}
    </div>
  );
}

export default App;
