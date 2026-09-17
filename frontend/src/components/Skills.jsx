import React, { useState, useEffect } from 'react';
import { getSkills } from '../services/api';
import {
  Wrench,
  Code,
  Server,
  Cloud,
  Box,
  Terminal,
  Database,
  Layers,
  Palette,
  Shield,
  Cpu,
  GitBranch,
  GitPullRequest,
  CheckCircle,
  FileCode,
  Network,
  Zap,
  CheckCheck
} from 'lucide-react';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Icon mapping helper
  const getIconComponent = (iconName) => {
    const map = {
      Code: <Code size={22} />,
      Server: <Server size={22} />,
      Database: <Database size={22} />,
      Cloud: <Cloud size={22} />,
      Terminal: <Terminal size={22} />,
      Box: <Box size={22} />,
      Layers: <Layers size={22} />,
      Palette: <Palette size={22} />,
      Shield: <Shield size={22} />,
      Cpu: <Cpu size={22} />,
      GitBranch: <GitBranch size={22} />,
      GitPullRequest: <GitPullRequest size={22} />,
      CheckCircle: <CheckCircle size={22} />,
      FileCode: <FileCode size={22} />,
      Network: <Network size={22} />,
      Zap: <Zap size={22} />,
      CheckCheck: <CheckCheck size={22} />,
    };
    return map[iconName] || <Code size={22} />;
  };

  useEffect(() => {
    async function loadSkills() {
      setLoading(true);
      const res = await getSkills();
      setSkills(res.data);
      setLoading(false);
    }
    loadSkills();
  }, []);

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'devops', label: 'DevOps & Cloud' },
    { id: 'tools', label: 'Tools & Workflow' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="skills" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Wrench size={14} />
            <span>Technical Arsenal</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Proficiencies</span>
          </h2>
          <p className="section-subtitle">
            Tools, technologies, and modern frameworks leveraged to engineer bulletproof applications.
          </p>
        </div>

        {/* Category Filters */}
        <div className="skills-tabs">
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

        {/* Skills Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Loading skills repertoire...
          </div>
        ) : (
          <div className="skills-grid">
            {filteredSkills.map(skill => (
              <div key={skill.id || skill.name} className="glass-card skill-card">
                <div className="skill-header">
                  <div className="skill-icon-wrapper">
                    {getIconComponent(skill.icon)}
                  </div>
                  <span className="badge badge-primary">
                    {skill.proficiency_level}%
                  </span>
                </div>

                <div>
                  <div className="skill-name">{skill.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginTop: '2px', textTransform: 'capitalize' }}>
                    {skill.category_display || skill.category}
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="skill-progress-bar">
                  <div
                    className="skill-progress-fill"
                    style={{ width: `${skill.proficiency_level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
