import { Suspense } from "react";
import "./home.css";
import Maincard from "../Maincard/Maincard";


function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">My Hobbies & Creative Showcase</h1>
          <p className="hero-subtitle">
            Crafting Excellence Through Diverse Passions
          </p>
          <div className="hero-description">
            Discover a curated collection of professional endeavors and creative
            expressions. Each section unveils a distinct dimension of expertise
            and innovation.
          </div>
        </div>
      </div>

      <div className="sections">
        <Suspense
          fallback={
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading...</p>
            </div>
          }
        >
          <Maincard />
        </Suspense>
      </div>
    </div>
  );
}

export default Home;
