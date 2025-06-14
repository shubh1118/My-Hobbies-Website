import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../Assets/logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="My Hobbies Logo" className="logo-image" />
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/coding" 
              className={`nav-link ${location.pathname === '/coding' ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Coding
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/cricket" 
              className={`nav-link ${location.pathname === '/cricket' ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Cricket
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/paint" 
              className={`nav-link ${location.pathname === '/paint' ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Paint
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/reading" 
              className={`nav-link ${location.pathname === '/reading' ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Reading
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar; 