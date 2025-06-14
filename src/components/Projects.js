import React from 'react';
import { projects } from '../config/projects';

const Projects = () => {
  return (
    <div className="projects">
      <h2>🔨 Projects</h2>
      {projects.map((project, index) => (
        <div key={index} className="project-card">
          <h3>{project.name}</h3>
          <p><strong>Tech:</strong> {project.tech}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      ))}
    </div>
  );
};

export default Projects; 