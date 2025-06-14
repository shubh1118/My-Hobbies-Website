import React, { useEffect, useState } from "react";
import "../styles/coding.css";
import Projects from "./Projects";
import Blogs from "./Blogs";
import { fetchBlogs } from "../services/blogService";

function Coding() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogs = async () => {
      setIsLoading(true);
      const { data, error } = await fetchBlogs();
      
      if (error) {
        setError(error);
      } else {
        setBlogs(data);
      }
      setIsLoading(false);
    };

    loadBlogs();
  }, []);

  return (
    <div className="coding-container">
      <h1>💻 My Coding World</h1>
      <Projects />
      <Blogs blogs={blogs} isLoading={isLoading} error={error} />
    </div>
  );
}

export default Coding;