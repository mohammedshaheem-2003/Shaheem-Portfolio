import React from 'react';
import { User, Briefcase, GraduationCap, Award, Zap, Code, CheckCircle, Database } from 'lucide-react';

export default function About() {
  const experiences = [
    {
      role: "Full-Stack Python Developer Intern",
      company: "7-Month Intensive Training & Internship Program",
      period: "7 Months",
      description: "Built decoupled web applications utilizing Python, Django, and React. Developed secure CRUD interfaces, implemented complex relational models via Django ORM, and integrated third-party APIs. Collaborated on code reviews, Git/GitHub workflows, and Postman API contract verification.",
      icon: <Briefcase size={18} />
    },
    {
      role: "Degree in Artificial Intelligence & Machine Learning",
      company: "Sree Saraswathi Thyagaraja College",
      period: "Undergraduate Program",
      description: "Specialized in Machine Learning Algorithms, Python Programming, Database Management Systems (DBMS), Data Structures, and Object-Oriented Software Design.",
      icon: <GraduationCap size={18} />
    },
  ];

  const stats = [
    { number: "7 Mo", label: "Intensive Full-Stack Internship", icon: <Briefcase size={22} /> },
    { number: "AI & ML", label: "Academic Specialization", icon: <GraduationCap size={22} /> },
    { number: "UPI / QR", label: "Transactional Workflows", icon: <Zap size={22} /> },
    { number: "Django+React", label: "Decoupled Architecture", icon: <Code size={22} /> },
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <User size={14} />
            <span>Profile & Background</span>
          </div>
          <h2 className="section-title">
            Engineering with <span className="gradient-text">Precision & Purpose</span>
          </h2>
          <p className="section-subtitle">
            Bridging backend relational architectures, payment integrations, and reactive frontend experiences.
          </p>
        </div>

        {/* Narrative & Stats */}
        <div className="about-grid">
          <div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1.2rem', lineHeight: '1.3' }}>
              Full-Stack Python Engineer with an AI & ML Foundation
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.2rem', lineHeight: '1.75' }}>
              I am a Full-Stack Developer with a degree in Artificial Intelligence and Machine Learning from
              <strong> Sree Saraswathi Thyagaraja College</strong>. Over a rigorous 7-month intensive internship,
              I honed my ability to build production-grade web systems utilizing <strong>Python, Django, and React</strong>.
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.2rem', lineHeight: '1.75' }}>
              From designing contactless QR-driven dining systems with seamless UPI checkouts to engineering
              full-fledged e-commerce platforms, I focus on building robust backend systems married to intuitive
              user experiences.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                <CheckCircle size={17} color="var(--primary)" />
                <span>Hands-on MVT / MVC and decoupled RESTful API design</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                <CheckCircle size={17} color="var(--primary)" />
                <span>Dynamic QR & Deep-Linked UPI Payments (Google Pay, PhonePe, Paytm)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                <CheckCircle size={17} color="var(--primary)" />
                <span>Relational Schema Optimization with PostgreSQL & SQLite</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="glass-card stat-card">
                <div style={{ color: 'var(--primary)', display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  {stat.icon}
                </div>
                <div className="stat-number" style={{ fontSize: '2rem' }}>{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience & Education Timeline */}
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '2.5rem' }}>
            Experience & <span className="gradient-text">Education</span>
          </h3>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="glass-card timeline-card">
                  <div className="timeline-header">
                    <span className="timeline-role">{exp.role}</span>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  <div className="timeline-company">{exp.company}</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
