import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/api';
import ProjectModal from './ProjectModal';
import { FolderGit2, ExternalLink, Github, Eye, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLiveBackend, setIsLiveBackend] = useState(false);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend APIs' },
    { id: 'cloud_ai', label: 'Cloud & AI' },
  ];

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      const res = await getProjects({ category: activeCategory });
      setProjects(res.data);
      setIsLiveBackend(res.isLive);
      setLoading(false);
    }
    loadProjects();
  }, [activeCategory]);

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <FolderGit2 size={14} />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="section-title">
            Recent Work & <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="section-subtitle">
            Production web applications, microservices, and design systems built with modern stacks.
          </p>

          {/* Backend Status Pill */}
          <div style={{ marginTop: '1rem' }}>
            <span
              className="badge"
              style={{
                background: isLiveBackend ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                color: isLiveBackend ? '#10b981' : '#3b82f6',
                borderColor: isLiveBackend ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)'
              }}
              title={isLiveBackend ? "Connected to live Django REST API" : "Serving local cached portfolio data"}
            >
              <CheckCircle2 size={13} />
              <span>{isLiveBackend ? "Connected to Django REST API (Port 8000)" : "REST API Client Ready (Auto-Sync Active)"}</span>
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="projects-filter">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            Retrieving project showcases...
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id || project.slug} className="glass-card project-card">
                {/* Thumbnail Container */}
                <div
                  className="project-thumbnail"
                  onClick={() => setSelectedProject(project)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
                    alt={project.title}
                    loading="lazy"
                  />
                  {project.featured && (
                    <span className="project-badge-featured">
                      <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="project-content">
                  <h3
                    className="project-title"
                    onClick={() => setSelectedProject(project)}
                    style={{ cursor: 'pointer' }}
                  >
                    {project.title}
                  </h3>

                  <p className="project-description">
                    {project.description}
                  </p>

                  {/* Tech stack pills */}
                  <div className="project-tags">
                    {project.tech_stack?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="badge">
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack?.length > 4 && (
                      <span className="badge">+{project.tech_stack.length - 4}</span>
                    )}
                  </div>

                  {/* Card Actions Footer */}
                  <div className="project-actions">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="action-link"
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <Eye size={16} />
                      <span>Details</span>
                    </button>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                      {project.github_link && (
                        <a
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-link"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <Github size={16} />
                          <span>Code</span>
                        </a>
                      )}
                      {project.live_link && (
                        <a
                          href={project.live_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-link"
                          style={{ color: 'var(--primary)' }}
                          aria-label={`Open live demo of ${project.title}`}
                        >
                          <ExternalLink size={16} />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
}
