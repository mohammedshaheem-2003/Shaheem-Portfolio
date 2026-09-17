import React, { useState } from 'react';
import { sendContactMessage } from '../services/api';
import Toast from './Toast';
import { Mail, Send, Phone, MapPin, Clock, MessageSquare, CheckCircle, Sparkles, Loader2, Linkedin, Github } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const validateForm = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Please enter your name (at least 2 characters).";
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = "Please enter a subject (at least 3 characters).";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Please write a message with at least 10 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await sendContactMessage(formData);
      if (response.success) {
        setToast({
          type: 'success',
          message: "Thank you! Your message has been sent to Mohammed Shaheem.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setToast({
          type: 'error',
          message: "Failed to send message. Please check the details and retry.",
        });
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: err.message || "Something went wrong sending your message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Mail size={14} />
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title">
            Let's Discuss <span className="gradient-text">Opportunities</span>
          </h2>
          <p className="section-subtitle">
            Seeking a Full-Stack Python Developer or Software Engineer role. Feel free to reach out directly.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info Card */}
          <div className="glass-card contact-info-card">
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.6rem' }}>
                Mohammed Shaheem M
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Available for full-time Full-Stack Python Developer roles, backend engineering positions,
                and technical collaborations.
              </p>
            </div>

            {/* Email */}
            <div className="info-item">
              <div className="info-icon">
                <Mail size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontWeight: 600 }}>EMAIL</div>
                <a href="mailto:mhdshaheem@gmail.com" style={{ fontWeight: 600, color: 'var(--primary)' }}>
                  mhdshaheem@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="info-item">
              <div className="info-icon">
                <Phone size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontWeight: 600 }}>PHONE</div>
                <a href="tel:+918156942717" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                  +91 8156942717
                </a>
              </div>
            </div>

            {/* Profiles */}
            <div className="info-item">
              <div className="info-icon">
                <Linkedin size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontWeight: 600 }}>PROFILES</div>
                <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.2rem' }}>
                  <a
                    href="https://linkedin.com/in/shaheemmm"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}
                  >
                    LinkedIn Profile →
                  </a>
                  <span style={{ color: 'var(--border-color)' }}>|</span>
                  <a
                    href="https://github.com/mohammedshaheem-2003"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </div>

            {/* Response Time & Location */}
            <div className="info-item">
              <div className="info-icon">
                <Clock size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontWeight: 600 }}>RESPONSE TIME & AVAILABILITY</div>
                <div style={{ fontWeight: 600 }}>Immediate Joining / Open for Relocation & Remote</div>
              </div>
            </div>

            <div style={{
              padding: '1.2rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              marginTop: 'auto'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                <Sparkles size={16} />
                <span>Automated DRF Pipeline</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Your message is stored via Django REST Framework <code>POST /api/contact/</code> and dispatches an instant notification.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="glass-card form-card">
            <form onSubmit={handleSubmit} noValidate>
              {/* Name Field */}
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Full Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Hiring Manager / Recruiter Name"
                  className="form-input"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address *</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. recruiter@company.com"
                  className="form-input"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>

              {/* Subject Field */}
              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject *</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Full-Stack Python Developer Role"
                  className="form-input"
                  disabled={isSubmitting}
                />
                {errors.subject && <p className="form-error">{errors.subject}</p>}
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about the role, team, or opportunity..."
                  className="form-textarea"
                  disabled={isSubmitting}
                />
                {errors.message && <p className="form-error">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message to Shaheem</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
