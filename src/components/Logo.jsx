import React from "react";

export const Logo = ({ className = "", size = "md" }) => {
  const heights = {
    sm: "h-10",
    md: "h-14",
    lg: "h-20",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const subSizes = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-[12px]",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image */}
      <img
        src="/logo.png"
        alt="C.M Scents Logo"
        className={`${heights[size]} w-auto object-contain`}
      />

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <span className={`font-display font-bold text-gold ${textSizes[size]}`}>
          C.M Scents
        </span>

        {/* Tagline */}
        <span
          className={`
            mt-1
            font-serif italic
            text-white/40
            tracking-[2px]
            ${subSizes[size]}
          `}
        >
          crafted to leave an impression
        </span>
      </div>
    </div>
  );
};
