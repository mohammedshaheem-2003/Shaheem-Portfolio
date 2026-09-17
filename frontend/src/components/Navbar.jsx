import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, Terminal, Github, Linkedin } from 'lucide-react';

export default function Navbar({ activeSection }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="navbar" style={{
      boxShadow: scrolled ? 'var(--glass-shadow)' : 'none',
      borderBottomColor: scrolled ? 'var(--border-color)' : 'transparent'
    }}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#hero" className="brand-logo">
          <div className="brand-badge">
            <Terminal size={18} />
          </div>
          <span>Shaheem<span className="gradient-text">.dev</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`nav-link ${activeSection === link.name.toLowerCase() ? 'active' : ''}`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Social Quick Links */}
          <a
            href="https://github.com/mohammedshaheem-2003"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon"
            aria-label="GitHub Profile"
            title="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/shaheemmm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon"
            aria-label="LinkedIn Profile"
            title="LinkedIn"
          >
            <Linkedin size={18} />
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn-icon"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#3b82f6" />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-menu-btn btn-icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link"
              style={{ fontSize: '1.1rem', padding: '0.6rem 0' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a href="#contact" className="btn btn-primary" style={{ width: '100%' }} onClick={() => setMobileMenuOpen(false)}>
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
