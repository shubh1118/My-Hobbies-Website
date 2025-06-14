import React from 'react';

const Blogs = ({ blogs, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="blogs">
        <h2>📖 Latest Coding Blogs</h2>
        <div className="loading">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blogs">
        <h2>📖 Latest Coding Blogs</h2>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="blogs">
      <h2>📖 Latest Coding Blogs</h2>
      {blogs.map((blog, index) => (
        <div key={index} className="blog-card">
          <h3>{blog.title}</h3>
          <p>{blog.description}</p>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">Read More</a>
        </div>
      ))}
    </div>
  );
};

export default Blogs; 