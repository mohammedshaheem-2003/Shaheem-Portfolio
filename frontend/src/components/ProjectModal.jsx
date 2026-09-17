import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Layers, Calendar, CheckCircle } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Project Preview"
        >
          <X size={20} />
        </button>

        {/* Modal Header Image */}
        {project.image_url && (
          <img
            src={project.image_url}
            alt={project.title}
            className="modal-header-image"
          />
        )}

        {/* Modal Details Body */}
        <div className="modal-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
            <span className="badge badge-primary">
              {project.category_display || project.category}
            </span>
            {project.featured && (
              <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                Featured Project
              </span>
            )}
          </div>

          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{project.title}</h2>

          <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.8rem', fontSize: '1.05rem' }}>
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-subtle)', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
              Technologies & Infrastructure
            </div>
            <div className="project-tags">
              {project.tech_stack?.map((tech, index) => (
                <span key={index} className="badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            {project.live_link && (
              <a
                href={project.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <ExternalLink size={18} />
                <span>Open Live Demo</span>
              </a>
            )}
            {project.github_link && (
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Github size={18} />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
