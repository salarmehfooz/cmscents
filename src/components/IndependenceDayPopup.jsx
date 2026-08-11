import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { isAzadiSaleActive } from '../utils/saleUtils';

export default function IndependenceDayPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Only trigger if Azadi Sale is currently active
    if (!isAzadiSaleActive()) return;

    // Show popup shortly after component mounts
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 400);

    const handleReopen = () => {
      if (isAzadiSaleActive()) {
        setIsOpen(true);
      }
    };
    window.addEventListener('open-azadi-popup', handleReopen);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-azadi-popup', handleReopen);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleShopNow = () => {
    handleClose();
    navigate('/collection');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#0A160E] border-2 border-gold/50 text-white shadow-2xl overflow-hidden z-10"
          >
            {/* Animated Pakistani Flag Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
              {/* Flag Container with wave motion */}
              <motion.div
                animate={{
                  y: [0, -8, 0, 8, 0],
                  scale: [1, 1.03, 1],
                  rotate: [0, 0.5, 0, -0.5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-full h-full relative flex opacity-25"
              >
                {/* White Stripe (Left 25%) */}
                <div className="w-1/4 h-full bg-white/90 shadow-2xl border-r border-white/20" />

                {/* Dark Green Field (Right 75%) */}
                <div className="w-3/4 h-full bg-[#01411C] relative flex items-center justify-center overflow-hidden">
                  {/* Subtle Wave Light Shimmer */}
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  />

                  {/* Crescent & Star SVG Emblem */}
                  <motion.svg
                    viewBox="0 0 200 200"
                    className="w-48 h-48 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]"
                    animate={{
                      scale: [0.98, 1.05, 0.98],
                      opacity: [0.85, 1, 0.85],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {/* Crescent */}
                    <path
                      d="M 100,25 A 75,75 0 1,0 175,100 A 63,63 0 1,1 100,25 Z"
                      fill="currentColor"
                    />
                    {/* 5-pointed Star facing top right */}
                    <path
                      d="M 142,52 L 148,68 L 165,68 L 151,78 L 156,94 L 142,84 L 128,94 L 133,78 L 119,68 L 136,68 Z"
                      fill="currentColor"
                    />
                  </motion.svg>
                </div>
              </motion.div>

              {/* Floating Green & Gold Spark Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-gold/70"
                  style={{
                    top: `${15 + i * 14}%`,
                    left: `${10 + (i * 17) % 80}%`,
                  }}
                  animate={{
                    y: [0, -25, 0],
                    opacity: [0.2, 0.9, 0.2],
                    scale: [0.8, 1.4, 0.8],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}

              {/* Vignette Overlay to maintain visual legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A160E] via-[#0A160E]/80 to-[#0A160E]/60" />
            </div>

            {/* Top Decorative Gold/Green Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-800 via-gold to-emerald-800 relative z-20" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 border border-gold/40 text-white/80 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close sale popup"
            >
              <X size={18} />
            </button>

            {/* Content Container */}
            <div className="p-6 sm:p-8 text-center space-y-6 relative z-20">
              {/* Subtle background glow */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

              {/* Tag / Header */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-950/90 border border-emerald-500/50 rounded-full text-emerald-300 text-[10px] sm:text-xs tracking-[0.25em] font-semibold uppercase shadow-lg shadow-emerald-950/50">
                <span>🇵🇰</span>
                <span>14th August Azadi Grand Sale</span>
                <Sparkles size={12} className="text-gold" />
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-display tracking-[0.3em] uppercase text-gold-light">
                  Pakistan Independence Day
                </p>
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-wide leading-tight">
                  FLAT <span className="text-gold font-extrabold drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">40% OFF</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-200 font-sans max-w-sm mx-auto leading-relaxed pt-1">
                  Celebrate freedom with luxury fragrances. Enjoy a storewide flat 40% discount on all premium C.M Scents collections.
                </p>
              </div>

              {/* Automatic Discount Confirmation Box */}
              <div className="bg-emerald-950/80 border border-gold/40 p-3.5 max-w-sm mx-auto flex items-center justify-center gap-2 text-gold-light text-xs font-display tracking-wider uppercase">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Flat 40% Off On All Products</span>
              </div>

              {/* Action CTAs */}
              <div className="space-y-3 pt-1 max-w-sm mx-auto">
                <button
                  onClick={handleShopNow}
                  className="w-full bg-gold hover:bg-gold-light text-luxury-dark font-display text-xs sm:text-sm font-bold tracking-[0.25em] uppercase py-4 px-6 transition-all duration-300 shadow-xl shadow-gold/20 flex items-center justify-center gap-2 group"
                >
                  <ShoppingBag size={16} className="group-hover:scale-110 transition-transform" />
                  <span>SHOP AZADI SALE NOW</span>
                </button>

                <button
                  onClick={handleClose}
                  className="text-[11px] tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors underline decoration-gray-600 hover:decoration-white underline-offset-4"
                >
                  Continue Browsing
                </button>
              </div>
            </div>

            {/* Bottom Accent line */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent relative z-20" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

