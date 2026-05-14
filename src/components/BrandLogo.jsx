import React from "react";

function BrandLogo({
  showText = true,
  size = 40,
  markClassName = "",
  textClassName = "",
  className = "",
}) {
  return (
    <span className={`d-inline-flex align-items-center ${className}`}>
      {/* Icon Mark: Shows just the 'J' */}
      <span 
        className={`brand-logo-mark d-inline-flex align-items-center justify-content-center fw-bold text-white rounded-3 shadow-sm border border-white border-opacity-10 position-relative overflow-hidden ${markClassName}`}
        style={{ 
          width: size, 
          height: size, 
          background: 'linear-gradient(135deg, #0d6efd, #0a58ca)', 
          boxShadow: '0 4px 12px rgba(13, 110, 253, 0.2)'
        }}
        aria-hidden="true"
      >
        <span className="position-relative z-1" style={{ fontSize: size * 0.6 }}>
          J
        </span>
        {/* Subtle Shine Effect */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 opacity-25" 
          style={{ background: 'linear-gradient(to bottom right, white, transparent 70%)' }}
        ></div>
      </span>

      {/* Brand Name Text */}
      {showText && (
        <span 
          className={`brand-logo-text fw-bold ms-2 lh-1 ${textClassName}`} 
          style={{ 
            letterSpacing: '-0.03em', 
            fontSize: size * 0.55,
            color: 'inherit' // Inherits color from Navbar or Parent
          }}
        >
          JobHub
        </span>
      )}
    </span>
  );
}

export default BrandLogo;