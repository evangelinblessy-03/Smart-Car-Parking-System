import React from 'react';

export default function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  variant = 'blue',
  trend,
  onClick,
  badge
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'green':
        return {
          iconBg: 'rgba(16, 185, 129, 0.12)',
          iconColor: '#10b981',
          borderLeft: '4px solid #10b981',
        };
      case 'red':
        return {
          iconBg: 'rgba(239, 68, 68, 0.12)',
          iconColor: '#ef4444',
          borderLeft: '4px solid #ef4444',
        };
      case 'orange':
        return {
          iconBg: 'rgba(245, 158, 11, 0.12)',
          iconColor: '#f59e0b',
          borderLeft: '4px solid #f59e0b',
        };
      case 'purple':
      case 'violet':
        return {
          iconBg: 'rgba(124, 58, 237, 0.12)',
          iconColor: '#7c3aed',
          borderLeft: '4px solid #7c3aed',
        };
      case 'teal':
        return {
          iconBg: 'rgba(8, 145, 178, 0.12)',
          iconColor: '#0891b2',
          borderLeft: '4px solid #0891b2',
        };
      case 'blue':
      default:
        return {
          iconBg: 'rgba(37, 99, 235, 0.12)',
          iconColor: '#2563eb',
          borderLeft: '4px solid #2563eb',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      onClick={onClick}
      className="card"
      style={{
        borderLeft: styles.borderLeft,
        padding: '1.25rem 1.4rem',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            {title}
          </span>
          {badge && (
            <span style={{
              marginLeft: '0.5rem',
              fontSize: '0.65rem',
              padding: '0.15rem 0.4rem',
              borderRadius: '4px',
              backgroundColor: '#f1f5f9',
              color: '#475569',
              fontWeight: 600
            }}>
              {badge}
            </span>
          )}
        </div>
        {Icon && (
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: styles.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: styles.iconColor,
            flexShrink: 0,
          }}>
            <Icon size={22} strokeWidth={2.2} />
          </div>
        )}
      </div>

      <div>
        <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1, marginBottom: '0.35rem' }}>
          {value}
        </div>
        {subtext && (
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            {trend && <span style={{ fontWeight: 600 }}>{trend}</span>}
            <span>{subtext}</span>
          </div>
        )}
      </div>
    </div>
  );
}
