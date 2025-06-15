import React, { useEffect, useState, useCallback } from "react";
import "./coding.css";
import Projects from "../Project/Projects";
import Blogs from "../Blog/Blogs";
import { fetchBlogs } from "../../services/blogService";

const ProjectsMemo = React.memo(Projects);
const BlogsMemo = React.memo(Blogs);

function Coding() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBlogs = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await fetchBlogs();

    if (error) {
      setError(error);
    } else {
      setBlogs(data);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  return (
    <div className="coding-container">
      <h1>💻 My Coding World</h1>
      <ProjectsMemo />
      <BlogsMemo blogs={blogs} isLoading={isLoading} error={error} />
    </div>
  );
}

export default Coding;
