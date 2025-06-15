import { useState, useEffect } from "react";
import "./footer.css";
import { socialLinks } from "../../data/footerdata";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.innerHeight + window.scrollY;
      setIsVisible(scrollTop >= scrollHeight - 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className={`footer ${isVisible ? "visible" : ""}`}>
      <div className="footer-content">
        <p className="footer-text">Shubham Chaurasia @ 2025</p>
        <div className="social-links">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
