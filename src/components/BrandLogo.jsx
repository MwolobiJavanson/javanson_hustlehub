function BrandLogo({
  showText = true,
  size = 42,
  markClassName = "",
  textClassName = "",
  className = "",
}) {
  return (
    <span className={`d-inline-flex align-items-center ${className}`}>
      <span 
        className={`brand-logo-mark d-inline-flex align-items-center justify-content-center fw-bold text-white rounded-3 shadow-lg border position-relative overflow-hidden ${markClassName}`}
        style={{ 
          width: size, 
          height: size * 1.2, 
          background: 'linear-gradient(135deg, #2563eb, #1d4ed8 70%, #10b981)', 
          boxShadow: '0 8px 32px rgba(37, 99, 235, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
        }}
        aria-hidden="true"
      >
        <span className="position-relative z-index-1" style={{textShadow: '0 1px 2px rgba(0,0,0,0.3)'}}>
          Fixmtaa
        </span>
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-20" style={{background: 'radial-gradient(circle at 30% 30%, white, transparent)'}}></div>
      </span>
      {showText && (
        <span className={`brand-logo-text fw-bold ms-2 lh-1 ${textClassName}`} style={{letterSpacing: '-0.02em'}}>
          Fixmtaa
        </span>
      )}
    </span>
  );
}

export default BrandLogo;

