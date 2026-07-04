function SkeletonLoader() {
  return (
    <div className="skeleton-block">
      <div className="skeleton-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div className="skeleton-line" style={{ height: 20, width: 120 }} />
          <div className="skeleton-line" style={{ height: 24, width: 64, borderRadius: 99 }} />
        </div>
        <div className="skeleton-line" style={{ height: 16, width: '85%', marginBottom: 12 }} />
        <div className="skeleton-line" style={{ height: 16, width: '60%', marginBottom: 24 }} />
        <div className="skeleton-line" style={{ height: 200, width: '100%', borderRadius: 8 }} />
      </div>

      <div className="skeleton-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div className="skeleton-line" style={{ height: 20, width: 120 }} />
          <div className="skeleton-line" style={{ height: 24, width: 64, borderRadius: 99 }} />
        </div>
        <div className="skeleton-line" style={{ height: 16, width: '70%', marginBottom: 12 }} />
        <div className="skeleton-line" style={{ height: 16, width: '45%', marginBottom: 24 }} />
        <div className="skeleton-line" style={{ height: 180, width: '100%', borderRadius: 8 }} />
      </div>
      
      <div className="skeleton-card" style={{ background: 'var(--color-success-bg)', borderColor: 'var(--color-success)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div className="skeleton-line" style={{ height: 24, width: 24, borderRadius: 99 }} />
          <div className="skeleton-line" style={{ height: 20, width: 200 }} />
        </div>
        <div className="skeleton-line" style={{ height: 16, width: '90%', marginBottom: 24 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
           <div className="skeleton-line" style={{ height: 80, width: '100%', borderRadius: 8 }} />
           <div className="skeleton-line" style={{ height: 80, width: '100%', borderRadius: 8 }} />
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoader
