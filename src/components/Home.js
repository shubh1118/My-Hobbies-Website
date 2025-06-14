import React, { Suspense } from 'react';
import { Link } from "react-router-dom";
import '../styles/home.css';

// Import images for each section
import codingImage from '../Assets/coding.jpg';
import cricketImage from '../Assets/cricket.jpg';
import paintingImage from '../Assets/painting.jpg';
import readingImage from '../Assets/reading.jpg';

// Image loading error handler
const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
  console.warn(`Failed to load image: ${e.target.alt}`);
};

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Portfolio & Creative Showcase</h1>
          <p className="hero-subtitle">Crafting Excellence Through Diverse Passions</p>
          <div className="hero-description">
            Discover a curated collection of professional endeavors and creative expressions. 
            Each section unveils a distinct dimension of expertise and innovation.
          </div>
        </div>
      </div>
      
      <div className="sections">
        <Suspense fallback={
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
          </div>
        }>
          {/* Coding Section */}
          <Link to="/coding" className="section-link">
            <div className="section-card">
              <div className="section-image-container">
                <img 
                  src={codingImage} 
                  alt="Coding" 
                  className="section-image" 
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="section-overlay">
                  <h3 className="section-title">Coding</h3>
                  <p className="section-description">
                    Exploring the digital frontier through elegant solutions and innovative projects
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Cricket Section */}
          <Link to="/cricket" className="section-link">
            <div className="section-card">
              <div className="section-image-container">
                <img 
                  src={cricketImage} 
                  alt="Cricket" 
                  className="section-image" 
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="section-overlay">
                  <h3 className="section-title">Cricket</h3>
                  <p className="section-description">
                    Embracing the spirit of sportsmanship and strategic gameplay
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Painting Section */}
          <Link to="/paint" className="section-link">
            <div className="section-card">
              <div className="section-image-container">
                <img 
                  src={paintingImage} 
                  alt="Painting" 
                  className="section-image" 
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="section-overlay">
                  <h3 className="section-title">Painting</h3>
                  <p className="section-description">
                    Expressing creativity through colors, strokes, and artistic vision
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Reading Section */}
          <Link to="/reading" className="section-link">
            <div className="section-card">
              <div className="section-image-container">
                <img 
                  src={readingImage} 
                  alt="Reading" 
                  className="section-image" 
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="section-overlay">
                  <h3 className="section-title">Reading</h3>
                  <p className="section-description">
                    Journeying through worlds of knowledge and imagination
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </Suspense>
      </div>
    </div>
  );
}

export default Home;