import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ type = 'success', message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      {type === 'success' ? (
        <CheckCircle2 size={20} color="var(--success)" />
      ) : (
        <AlertCircle size={20} color="var(--error)" />
      )}
      <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          padding: '2px',
          marginLeft: '0.5rem',
        }}
        aria-label="Dismiss Notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
