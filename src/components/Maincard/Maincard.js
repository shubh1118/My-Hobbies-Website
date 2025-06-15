import React from 'react'
import { Link } from 'react-router-dom';
import { sectionData } from '../../data/hobbiesdata';
import { handleImageError } from '../Utils';

function Maincard() {
  return (
    <>
      {sectionData.map((section) => (
        <Link to={section.path} className="section-link" key={section.path}>
          <div className="section-card">
            <div className="section-image-container">
              <img
                src={section.image}
                alt={section.alt}
                className="section-image"
                onError={handleImageError}
              />
              <div className="section-overlay">
                <h3 className="section-title">{section.title}</h3>
                <p className="section-description">{section.description}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default Maincard