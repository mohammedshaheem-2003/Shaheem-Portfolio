import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Github, Linkedin, Download, Sparkles, QrCode, CreditCard, Cpu } from 'lucide-react';

export default function Hero() {
  const titles = [
    "Full-Stack Python & React Developer",
    "B.Sc. Artificial Intelligence & Machine Learning",
    "Django & Django REST Framework Specialist",
    "Dynamic QR & UPI Checkout Engineer",
  ];

  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullTitle = titles[titleIndex];
    let typingSpeed = isDeleting ? 35 : 70;

    if (!isDeleting && displayedText === currentFullTitle) {
      const pauseTimeout = setTimeout(() => setIsDeleting(true), 1900);
      return () => clearTimeout(pauseTimeout);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting
          ? currentFullTitle.substring(0, prev.length - 1)
          : currentFullTitle.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, titleIndex]);

  return (
    <section id="hero" className="section hero">
      {/* Background ambient lighting */}
      <div className="ambient-glow glow-blue"></div>
      <div className="ambient-glow glow-cyan"></div>

      <div className="container">
        <div className="hero-centered">
          {/* Availability Status Badge */}
          <div className="hero-status">
            <span className="status-dot"></span>
            <span>Open for Full-Stack Python & Software Engineer Opportunities</span>
          </div>

          {/* Centered Heading */}
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Mohammed Shaheem M</span>
          </h1>

          {/* Dynamic Typewriter */}
          <div className="typewriter-container">
            <span>Specializing in </span>
            <span style={{ color: 'var(--primary)', margin: '0 0.3rem' }}>
              {displayedText}
            </span>
            <span className="typewriter-cursor">|</span>
          </div>

          {/* Bio Copy */}
          <p className="hero-bio">
            Building scalable web architectures, transactional checkout systems, and clean interfaces
            with Django and modern frontend technologies. Backed by a 7-month full-stack Python
            internship and an AI & ML academic foundation.
          </p>

          {/* Centered Action CTAs */}
          <div className="hero-actions-centered">
            <a href="#projects" className="btn btn-primary">
              <span>View Case Studies</span>
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              <Mail size={18} />
              <span>Get In Touch</span>
            </a>
            <a
              href="mailto:mhdshaheem@gmail.com?subject=Resume%20Request%20-%20Mohammed%20Shaheem%20M"
              className="btn btn-secondary"
              title="Request Curriculum Vitae"
            >
              <Download size={17} />
              <span>Resume</span>
            </a>
          </div>

          {/* Centered Social Links */}
          <div className="hero-socials-centered">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', fontWeight: 600 }}>CONNECT:</span>
            <a
              href="https://linkedin.com/in/shaheemmm"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="Mohammed Shaheem M on LinkedIn"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/mohammedshaheem-2003"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="Mohammed Shaheem M on GitHub"
              title="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href="mailto:mhdshaheem@gmail.com"
              className="btn-icon"
              aria-label="Email Mohammed Shaheem M"
              title="Direct Email"
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Feature Highlight Pills */}
          <div className="hero-badges-strip">
            <span className="badge">
              <Sparkles size={14} style={{ color: 'var(--primary)' }} />
              Python & Django DRF
            </span>
            <span className="badge">
              <QrCode size={14} style={{ color: 'var(--accent)' }} />
              QR Code Generation & Scans
            </span>
            <span className="badge">
              <CreditCard size={14} style={{ color: '#10b981' }} />
              UPI Intent & Payment Gateways
            </span>
            <span className="badge">
              <Cpu size={14} style={{ color: '#f59e0b' }} />
              AI & Machine Learning
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
