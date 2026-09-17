import React from 'react';
import { Terminal, ArrowUp, Github, Linkedin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-content">
        {/* Brand & Tagline */}
        <div>
          <div className="brand-logo" style={{ marginBottom: '0.4rem' }}>
            <div className="brand-badge">
              <Terminal size={18} />
            </div>
            <span>Shaheem<span className="gradient-text">.dev</span></span>
          </div>
          <p style={{ color: 'var(--text-subtle)', fontSize: '0.9rem' }}>
            Mohammed Shaheem M | Full-Stack Python & React Developer (AI & ML Graduate)
          </p>
        </div>

        {/* Stack Attribution Badge */}
        <div>
          <div className="backend-badge">
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Stack:</span>
            <span>Django REST Framework + React + PostgreSQL</span>
          </div>
        </div>

        {/* Socials and Scroll-To-Top */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="https://github.com/mohammedshaheem-2003"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon"
            aria-label="GitHub Profile"
            title="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/shaheemmm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon"
            aria-label="LinkedIn Profile"
            title="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:mhdshaheem@gmail.com"
            className="btn-icon"
            aria-label="Email"
            title="Direct Email"
          >
            <Mail size={16} />
          </a>

          <button
            onClick={scrollToTop}
            className="btn-icon"
            aria-label="Back to Top"
            title="Back to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-color)', marginTop: '2rem', paddingTop: '1.5rem', color: 'var(--text-subtle)', fontSize: '0.85rem' }}>
        © {new Date().getFullYear()} Mohammed Shaheem M. Built with Django REST Framework and React.
      </div>
    </footer>
  );
}
