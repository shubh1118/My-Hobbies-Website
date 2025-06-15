import React from "react";

const Blogs = React.memo(({ blogs, isLoading, error }) => {
  return (
    <div className="blogs">
      <h2>📖 Latest Coding Blogs</h2>

      {isLoading && <div className="loading">Loading blogs...</div>}
      {error && <div className="error">{error}</div>}

      {!isLoading && !error && (
        blogs.map((blog) => (
          <div key={blog.id || blog.title} className="blog-card">
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))
      )}
    </div>
  );
});

export default Blogs;