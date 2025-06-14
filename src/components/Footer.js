import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  const location = useLocation(); // Get current route

  // Show footer ONLY on home page
  if (location.pathname !== "/") return null;

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} MyHobbyApp. All Rights Reserved.</p>
        <nav className="footer-nav">
          <a href="/coding" title="Coding">💻</a>
          <a href="/cricket" title="Cricket">🏏</a>
          <a href="/paint" title="Painting">🎨</a>
          <a href="/reading" title="Reading">📖</a>
        </nav>
        <div className="social-links">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">𝕏</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">f</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">📸</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;